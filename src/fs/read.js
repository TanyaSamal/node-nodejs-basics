import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const read = async () => {
    const file = join(__dirname, 'files', 'fileToRead.txt'); 
    const errorMessage = 'FS operation failed';

    try {
        const data = await readFile(file, 'utf-8');
        console.log(data);
    } catch (err) {
        if (err) throw new Error(errorMessage);
    }
};

read();
