import multer from 'multer';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{width: 500, height: 500, crop: "limit"}]
    } as any
})

export const upload = multer({ storage });