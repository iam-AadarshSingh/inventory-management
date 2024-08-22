import multer from "multer";

//this is a configration how file should be store
const storageConfig = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, 'public/images/'); // where to store file
        },
        filename: (req, file, cb) => {
            const name = Date.now() + "-" + file.originalname //modifying file name and appending current date into the file name
            cb(null, name);
        },
    }
);
export const uploadFile = multer({ storage: storageConfig });