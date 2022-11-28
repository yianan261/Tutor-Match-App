import { v2 as cloudinary } from "cloudinary";

// Amanda
/**
 * to configurate cloudinary to store image
 */

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default cloudinary;
