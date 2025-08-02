import { v2 as cloudinary } from 'cloudinary';
import { getEnvVar } from './getEnvVar.js';
import createHttpError from 'http-errors';
import fs from 'node:fs/promises';

export const saveFileToCloudinary = async (file) => {
  // Configuration
  cloudinary.config({
    secure: true,
    cloud_name: getEnvVar('CLOUDINARY_CLOUD_NAME'),
    api_key: getEnvVar('CLOUDINARY_API_KEY'),
    api_secret: getEnvVar('CLOUDINARY_API_SECRET'),
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(file.path, {
      asset_folder: 'contactsPhoto',
      unique_filename: false,
      use_filename: true,
      use_filename_as_display_name: true,
      resource_type: 'image',
      //   overwrite: true,
    })
    .catch((error) => {
      console.error(error);
      throw createHttpError(500, "Images cloud don't response. try again later!");
    })
    .finally(() => {
      fs.unlink(file.path);
    });

  //   console.log(uploadResult);
  //   uploadResult:{
  //   asset_id: '7db25b3f2c491ddeea7bd681dfedfc10',
  //   public_id: 'photo_688a129eb08a2c1f1a3b0608',
  //   version: 1754129502,
  //   version_id: 'deb74889e17e471e0d99fde9f6b7e5cf',
  //   signature: '3c85bb2f2b4e94ceaf0a2da39b9ca93618f754b7',
  //   width: 1135,
  //   height: 256,
  //   format: 'jpg',
  //   resource_type: 'image',
  //   created_at: '2025-08-02T10:11:42Z',
  //   tags: [],
  //   bytes: 42899,
  //   type: 'upload',
  //   etag: '766bbafb2090563f76ba687a74c12077',
  //   placeholder: false,
  //   url: 'http://res.cloudinary.com/dh7gonchl/image/upload/v1754129502/photo_688a129eb08a2c1f1a3b0608.jpg',
  //   secure_url: 'https://res.cloudinary.com/dh7gonchl/image/upload/v1754129502/photo_688a129eb08a2c1f1a3b0608.jpg',
  //   asset_folder: 'contactsPhoto',
  //   display_name: 'photo_688a129eb08a2c1f1a3b0608',
  //   overwritten: true,
  //   original_filename: 'photo_688a129eb08a2c1f1a3b0608',
  // }
  return uploadResult.secure_url;

  //   // Optimize delivery by resizing and applying auto-format and auto-quality
  //   const optimizeUrl = cloudinary.url('shoes', {
  //     fetch_format: 'auto',
  //     quality: 'auto',
  //   });

  //   console.log(optimizeUrl);

  //   // Transform the image: auto-crop to square aspect_ratio
  //   const autoCropUrl = cloudinary.url('shoes', {
  //     crop: 'auto',
  //     gravity: 'auto',
  //     width: 500,
  //     height: 500,
  //   });

  //   console.log(autoCropUrl);
};
