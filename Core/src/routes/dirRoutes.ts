import { Router } from 'express';
import express from 'express';
import {cat, exportFiles, importFiles, ls, mkdir, remove, ScanApp, touch, tree, versionCoreDir } from '../controllers/dirController';
import multer from 'multer';
import path from 'path';
const upload = multer();


const dirRoute = Router();
                                              // Post:
dirRoute.post('/mkdir', upload.none(), mkdir) // title, path
dirRoute.post('/ls', upload.none(), ls) // path
dirRoute.post('/tree', upload.none(), tree) // path
dirRoute.post('/remove', upload.none(), remove) // title, path
dirRoute.post('/import', upload.single('file'), importFiles) // path, file
dirRoute.post('/export', upload.none(), exportFiles) // path
dirRoute.post('/touch', upload.none(), touch) // path, title, desc
dirRoute.post('/cat', upload.none(), cat) // path, title
                                        // Get:
dirRoute.get('/versionCoreDir', upload.none(), versionCoreDir) 
dirRoute.get('/appScaner', ScanApp)
dirRoute.use('/apps', express.static(path.join(__dirname, 'MainFolder/home/app')));

export default dirRoute;