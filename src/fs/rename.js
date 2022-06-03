import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { rename as fsRename } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const rename = async () => {
    const wrongFile = join(__dirname, 'files', 'wrongFilename.txt'); 
    const properFile = join(__dirname, 'files', 'properFilename.md'); 
    const errorMessage = 'FS operation failed';

    try {
        await fsRename(wrongFile, properFile);
    } catch (err) {
        if (err) throw new Error(errorMessage);
    }
};

rename();
