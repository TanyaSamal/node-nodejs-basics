import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { copyFile, mkdir, readdir, stat } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const copy = async () => {
    const src = join(__dirname, 'files');
    const dest = join(__dirname, 'files_copy');
    const errorMessage = 'FS operation failed';

    try {
        await mkdir(dest);
        await copyFiles(src, dest);
    } catch(err) {
        if (err) throw new Error(errorMessage);
    }
};

async function copyFiles(from, to) {
    try {
        let stats = await stat(from);
        if (stats.isDirectory()) {
            for (const file of (await readdir(from)).values()) {
                let fileStats = await stat(join(from, file));
                if (fileStats.isDirectory()) {
                    await mkdir(join(to, file));
                    await copyFiles(join(from, file), join(to, file))
                } else {
                    await copyFile(join(from, file), join(to, file));
                }
            }
        }
    } catch(err) {
        if (err) throw new Error(errorMessage);
    }
}

copy();
