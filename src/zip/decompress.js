import { pipeline }  from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const decompress = async () => {
    const fileName = join(__dirname, 'files', 'fileToCompress.txt');
    const archive = join(__dirname, 'files', 'archive.gz');

    try {
        await pipeline(
            createReadStream(archive),
            createGunzip(),
            createWriteStream(fileName)
        );
    } catch (err) {
        if (err) throw new Error('Operation failed');
    }
};

decompress();
