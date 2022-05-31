import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { access, constants, writeFile } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const create = async () => {
    const file = join(__dirname, 'files', 'fresh.txt');
    const errorMessage = 'FS operation failed';

    access(file, constants.F_OK, (err) => {
        if (!err) {
            throw new Error(errorMessage);
        } else {
            writeFile(
                file,
                'I am fresh and young',
                (err) => {
                    if (err) throw new Error(errorMessage);
                }
            );
        }
    });
};

create();
