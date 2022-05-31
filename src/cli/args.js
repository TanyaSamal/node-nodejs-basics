export const parseArgs = () => {
    let strResult = '';

    process.argv.forEach((arg) => {
        if (arg.startsWith('--') || arg.startsWith('-')) {
            const argName = arg.replace(/-{1,2}/g, '');
            strResult = strResult.concat(`${argName} is ${getArg(arg)}, `);
        }
    });

    console.log(strResult.slice(0, -2));
};

function getArg(argName) {
    const argIndex = process.argv.indexOf(argName);
    return argIndex !== -1 ? process.argv[argIndex + 1] : null;
}

parseArgs();
