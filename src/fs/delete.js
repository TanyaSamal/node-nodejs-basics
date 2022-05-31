import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { rm } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const remove = async () => {
    const fileToRemove = join(__dirname, 'files', 'fileToRemove.txt');
    const errorMessage = 'FS operation failed';

    try {
        await rm(fileToRemove);
    } catch (err) {
        if (err) throw new Error(errorMessage);
    }
};

remove();
