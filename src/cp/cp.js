import { fork }from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const spawnChildProcess = async (args) => {
    const childFile = join(__dirname, 'files', 'script.js');

    const child = fork(
        childFile,
        args,
        {stdio: ['pipe', 'pipe', 'pipe', 'ipc']},
    );

    console.log(`Spawned child pid: ${child.pid}\n`);

    child.stdout.on('data', (m) => {
        console.log('\x1b[31m(PARENT)\x1b[0m Got message: \x1b[33m(CHILD)\x1b[0m',
            Buffer.from(m, 'utf-8').toString());
    });

    process.stdin.on('data', (m) => {
        child.stdin.write(m);
    });

    child.on('close', (code) => {
        console.log(`Child process with pid ${child.pid} exited with code ${code}`);
        process.exit(code);
    });
};

spawnChildProcess(['1', 'value', '-5', 3]);
