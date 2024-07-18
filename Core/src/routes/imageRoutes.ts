import { Router } from 'express';
import { uploadImage, getImage } from '../controllers/imageController';

const router = Router();

router.post('/upload', uploadImage);
router.get('/:filename', getImage);

export default router;