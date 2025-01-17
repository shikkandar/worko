import multer, { FileFilterCallback } from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  fileFilter: (req, file, cb: FileFilterCallback) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("Only PDF files are allowed."));
    }
  },

  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});
