import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});


const cloudinary = async(localFilePath) => {
  try {
    if(!localFilePath) return null;
    // upload the file 
    const response = await cloudinary.uploader.upload(localFilePath, {resource_type:"auto"})
  //  file has been uploaded successfully
    console.log("File is uploaded on cloudinary", response.url)
    return response;
  } catch (error) {
    // remove the temporary file from cloudinary as the operation got failed 
    fs.unlinkSync(localFilePath)
    console.log(`file operation got failed!!`)
    return null ;
  }
}


 