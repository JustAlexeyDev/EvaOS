import { Router } from 'express';
import { uploadImage, getImage } from '../controllers/imageController';

import rateLimit from 'express-rate-limit';

const router = Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 100, // лимит на 100 запросов с одного IP за 15 минут
    message: 'Слишком много запросов с этого IP, попробуйте позже.' 
  });

router.post('/upload', limiter, uploadImage);
router.get('/:filename', limiter, getImage);

export default router;