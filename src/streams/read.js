import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const read = async () => {
    const file = join(__dirname, 'files', 'fileToRead.txt');
    const stream = createReadStream(file, 'utf-8');
    const { stdout } = process;
    let data = '';

    stream.on('data', chunk => data += chunk);
    stream.on('end', () => stdout.write(data));
    stream.on('error', error => stdout.write(error.message));
};

read();
