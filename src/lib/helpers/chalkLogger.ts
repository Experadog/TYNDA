import chalk from 'chalk';

function format(info: unknown) {
    if (typeof info === 'object') {
        return JSON.stringify(info, null, 2);
    }
    return String(info);
}

export const LOGGER = {
    success: (info: unknown) => {
        console.log(chalk.green(format(info)));
    },
    error: (info: unknown) => {
        console.log(chalk.red(format(info)));
    },
    warning: (info: unknown) => {
        console.log(chalk.yellow(format(info)));
    },
    info: (info: unknown) => {
        console.log(chalk.blue(format(info)));
    },
} as const;
