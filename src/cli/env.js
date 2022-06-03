export const parseEnv = () => {
    let resultStr = '';
    for (const prop in process.env) {
        if (prop.startsWith('RSS_')) {
            resultStr = resultStr.concat(`${prop}=${process.env[prop]}; `);
        }
    }
    console.log(resultStr.slice(0, -2));
};

parseEnv();
