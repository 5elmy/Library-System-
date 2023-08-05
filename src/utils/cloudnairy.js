
import * as dotenv from "dotenv"
dotenv.config() 
import cloudnairy from 'cloudinary';

cloudnairy.v2.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure:true
});

export default cloudnairy.v2


