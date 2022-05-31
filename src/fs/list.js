import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const list = async () => {
    const folder = join(__dirname, 'files');
    const errorMessage = 'FS operation failed';

    try {
        const files = await readdir(folder, { withFileTypes: true });
        for (const file of files) {
            if(file.isFile()) {
                console.log(`${file.name}`); 
            }
        }
    } catch (err) {
        if (err) throw new Error(errorMessage);
    }

};

list();
