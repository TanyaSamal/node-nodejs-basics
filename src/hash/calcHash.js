import { createHash } from 'crypto';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const calculateHash = async () => {
    const file = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
 
    try {
        const fileBuffer = await readFile(file);
        const hashSum = createHash('sha256');
        
        hashSum.update(fileBuffer);

        console.log(hashSum.digest('hex'));
    } catch (err) {
        if (err) throw new Error('Operation failed');
    }
};

calculateHash();
