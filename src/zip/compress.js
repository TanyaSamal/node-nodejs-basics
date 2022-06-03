import { pipeline }  from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const compress = async () => {
    const fileToCompress = join(__dirname, 'files', 'fileToCompress.txt');
    const archive = join(__dirname, 'files', 'archive.gz');

    try {
        await pipeline(
            createReadStream(fileToCompress),
            createGzip(),
            createWriteStream(archive)
        );
    } catch (err) {
        if (err) throw new Error('Operation failed');
    }
};

compress();
