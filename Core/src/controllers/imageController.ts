import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

export const uploadImage = (req: Request, res: Response): void => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      res.status(500).json({ message: 'Error uploading image' });
    } else {
      res.status(200).json({ message: 'Image uploaded successfully', filename: req.file?.filename });
    }
  });
};

export const getImage = (req: Request, res: Response): void => {
  const { filename } = req.params;
  const startPath = path.join(__dirname, '../../uploads')
  const imagePath = path.join(startPath, filename);

  if (!imagePath.startsWith(startPath)) {
    res.status(400).json({ error: 'Invalid file path.' });
    return;
}

  res.sendFile(imagePath);
};