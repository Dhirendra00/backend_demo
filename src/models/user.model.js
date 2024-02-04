import mongoose from 'mongoose';
import { Jwt } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: [true, 'username must be unique'],
      required: [true, 'username is required'],
    },
    email: {
      type: String,
      lowercase: true,
      unique: [true, 'username must be unique'],
      required: [true, 'username is required'],
    },
    fullName: {
      type: String,
      lowercase: true,
      required: [true, 'username is required'],
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    password: {
      type: String,
      lowercase: true,
      required: [true, 'password is required'],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {
  if(!this.isModified("password")) return next();
  this.password =  bcrypt.hash(this.password, 10)
  next();
} )

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function (){
  return jwt.sign(
    {
      _id :this._id,
      email : this.email,
      username : this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
   
  )
}

userSchema.methods.generateRefreshToken = function (){
  return jwt.sign(
    {
      _id :this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
   
  )
}

const User = mongoose.model('User', userSchema);
