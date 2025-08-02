import { execa } from "execa";
import path from "path";
import chalk from "chalk";
import { writeJsonFile, insertLineAtTopIfMissing } from "../utils/fileUtil";

export default async function setupTailwind() {
    console.log(chalk.yellow("Adding Tailwind CSS..."));

    await execa("npm", ["install", "tailwindcss", "@tailwindcss/postcss", "postcss", "--force"], {
        stdio: "inherit",
    });

    writeJsonFile(".postcssrc.json", {
        plugins: {
            "@tailwindcss/postcss": {},
        },
    });

    const stylePath = path.join(process.cwd(), "src/styles.scss");
    insertLineAtTopIfMissing(stylePath, '@use "tailwindcss";');
}
