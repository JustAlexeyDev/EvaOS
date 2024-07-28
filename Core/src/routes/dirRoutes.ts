import { Router } from 'express';
import {cat, exportFiles, importFiles, ls, mkdir, remove, ScanApp, touch, tree, versionCoreDir } from '../controllers/dirController';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
const upload = multer();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 100, // лимит на 100 запросов с одного IP за 15 минут
    message: 'Слишком много запросов с этого IP, попробуйте позже.' 
  });


const dirRoute = Router();
                                              // Post:
dirRoute.post('/mkdir', limiter , upload.none(), mkdir) // title, path
dirRoute.post('/ls', limiter , upload.none(), ls) // path
dirRoute.post('/tree', limiter , upload.none(), tree) // path
dirRoute.post('/remove', limiter , upload.none(), remove) // title, path
dirRoute.post('/import', limiter , upload.single('file'), importFiles) // path, file
dirRoute.post('/export', limiter , upload.none(), exportFiles) // path
dirRoute.post('/touch', limiter , upload.none(), touch) // path, title, desc
dirRoute.post('/cat', limiter , upload.none(), cat) // path, title
                                        // Get:
dirRoute.get('/versionCoreDir', upload.none(), versionCoreDir) 
dirRoute.get('/appScaner', ScanApp)

export default dirRoute;