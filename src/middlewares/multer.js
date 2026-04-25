import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const validType = file.mimetype.startsWith('image/');
    if (validType) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'), false);
    }
  },
});