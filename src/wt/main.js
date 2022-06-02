import { cpus } from 'os';
import { Worker } from 'worker_threads';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workerFile = join(__dirname, 'worker.js');

export const performCalculations = async () => {
    const promises = [];

    for(let i = 0; i < cpus().length; i += 1) {
        promises.push(getPromiseFromWorker(i));
    }

    const promiseResults = await Promise.allSettled(promises);
    const resultArr = [];

    promiseResults.forEach((result) => {
        resultArr.push({
            status : result.status === 'fulfilled' ? 'resolved' : 'error',
            data: result.status === 'fulfilled' ? result.value : null,
        })
    });

    console.log(resultArr);
};

const getPromiseFromWorker = (n) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(workerFile, { 
            workerData: 10 + n,
        });
        worker.on('message', (msg) => resolve(msg));
        worker.on('error', reject);
    });
}

performCalculations();
