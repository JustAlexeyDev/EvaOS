import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { VersionCoreDir } from '../Config';

export const mkdir = async (req: Request, res: Response): Promise<void> => {
    const { title, path: relativePath } = req.body; 
    const startDir = path.join(__dirname, '../MainFolders');
    const createDirPath = path.join(startDir, relativePath, title);

    try {
        await fs.promises.mkdir(createDirPath, { recursive: true });
        res.json({ message: 'Directory Created:', path: createDirPath });
    } catch (error) {
        console.error('Error creating directory:', error);
        res.status(500).json({ error: 'Failed to create directory.' });
    }
};

export const ls = async (req: Request, res: Response): Promise<void> => {
    const { path: relativePath } = req.body;
    const startDir = path.join(__dirname, '../MainFolders');
    const directoryPath = path.join(startDir, relativePath);

    try {
        const files = await fs.promises.readdir(directoryPath);
        res.json({ contents: files });
    } catch (error) {
        console.error('Error reading directory:', error);
        res.status(500).json({ error: 'Failed to read directory.' });
    }
};

export const importFiles = async (req: Request, res: Response): Promise<void> => {
    const { path: relativePath } = req.body; // Получаем путь из body
    const file = req.file; // Получаем файл из req.file

    if (!file) {
        res.status(400).json({ error: 'No file uploaded.' });
        return; // Завершаем выполнение, возвращая void
    }

    const startDir = path.join(__dirname, '../MainFolders');
    const targetPath = path.join(startDir, relativePath);

    try {
        // Создаем директорию, если она не существует
        await fs.promises.mkdir(targetPath, { recursive: true });

        const filePath = path.join(targetPath, file.originalname); // Полный путь к файлу

        // Записываем файл на сервер
        await fs.promises.writeFile(filePath, file.buffer); 

        res.json({ message: 'File imported successfully', filePath });
    } catch (error) {
        console.error('Error importing file:', error);
        res.status(500).json({ error: 'Failed to import file.' });
    }
};

export const exportFiles = async (req: Request, res: Response): Promise<void> => {
    const { path: relativePath } = req.body; // Получаем путь из body

    // Проверяем, был ли передан путь
    if (!relativePath) {
        res.status(400).json({ error: 'Path is required.' });
        return;
    }

    const startDir = path.join(__dirname, '../MainFolders');
    const filePath = path.join(startDir, relativePath); // Полный путь к файлу

    try {
        // Проверяем, существует ли файл
        if (!fs.existsSync(filePath)) {
            res.status(404).json({ error: 'File not found.' });
            return;
        }

        // Отправляем файл клиенту
        res.download(filePath, (err) => {
            if (err) {
                console.error('Error exporting file:', err);
                res.status(500).json({ error: 'Failed to export file.' });
            }
        });
    } catch (error) {
        console.error('Error exporting file:', error);
        res.status(500).json({ error: 'Failed to export file.' });
    }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    const { path: relativePath, title } = req.body; // Получаем путь и название из body
    const startDir = path.join(__dirname, '../MainFolders');
    const itemPath = path.join(startDir, relativePath, title); // Полный путь к файлу или директории

    try {
        // Проверяем, существует ли файл или директория
        if (!fs.existsSync(itemPath)) {
            res.status(404).json({ error: 'File or directory not found.' });
            return;
        }

        // Удаляем файл или директорию
        if (fs.statSync(itemPath).isDirectory()) {
            // Если это директория, используем функцию для удаления директории
            fs.rmdirSync(itemPath, { recursive: true });
        } else {
            // Если это файл
            fs.unlinkSync(itemPath);
        }

        res.status(200).json({ message: 'File or directory removed successfully.' });
    } catch (error) {
        console.error('Error removing file or directory:', error);
        res.status(500).json({ error: 'Failed to remove file or directory.' });
    }
};

export const tree = async (req: Request, res: Response): Promise<void> => {
    const { path: relativePath } = req.body;
    const startDir = path.join(__dirname, '../MainFolders');
    const directoryPath = path.join(startDir, relativePath);

    const buildTree = async (dir: string) => {
        const result: { [key: string]: any } = {};
        const files = await fs.promises.readdir(dir);

        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = await fs.promises.stat(fullPath);
            if (stat.isDirectory()) {
                // Если это директория, рекурсивно обрабатываем её
                result[file] = await buildTree(fullPath);
            } else {
                // Если это файл, добавляем его с меткой "file"
                result[file] = 'file';
            }
        }
        return result;
    };

    try {
        const directoryTree = await buildTree(directoryPath);
        res.json({ tree: directoryTree });
    } catch (error) {
        console.error('Error reading directory:', error);
        res.status(500).json({ error: 'Failed to read directory.' });
    }
};

export const touch = async (req: Request, res: Response): Promise<void> => {
    const { path: relativePath, title, desc } = req.body;
    const startDir = path.join(__dirname, '../MainFolders');
    const filePath = path.join(startDir, relativePath, title); // Используем title как имя файла

    try {
        // Проверяем, существует ли файл
        if (fs.existsSync(filePath)) {
            // Если файл существует, изменяем его содержимое
            await fs.promises.writeFile(filePath, desc, 'utf8'); // Записываем только содержимое
            res.json({ message: `File updated: ${filePath}`, status: "updated" });
        } else {
            // Если файл не существует, создаем новый файл
            await fs.promises.writeFile(filePath, desc, 'utf8'); // Записываем содержимое
            res.json({ message: `File created: ${filePath}`, status: "created" });
        }
    } catch (error) {
        console.error('Error handling file:', error);
        res.status(500).json({ error: 'Failed to create or update file.' });
    }
};

export const cat = async (req: Request, res: Response): Promise<void> => {
    const { path: relativePath, title } = req.body;
    const startDir = path.join(__dirname, '../MainFolders');
    const filePath = path.join(startDir, relativePath, title); 

    try {
        // Проверяем, существует ли файл
        if (fs.existsSync(filePath)) {
            // Читаем содержимое файла
            const content = await fs.promises.readFile(filePath, 'utf8');
            res.json({ message: `File content: ${title}`, content });
        } else {
            res.status(404).json({ error: `File not found: ${filePath}` });
        }
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ error: 'Failed to read file.' });
    }
};

export const versionCoreDir = async (req: Request, res: Response): Promise<void> => {
    res.json({VersionCoreDir})
}