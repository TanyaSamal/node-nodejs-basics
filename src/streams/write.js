import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const write = async () => {
    const file = join(__dirname, 'files', 'fileToWrite.txt');
    const output = createWriteStream(file, 'utf-8');

    process.stdin.on('data', data => output.write(data));
};

write();
