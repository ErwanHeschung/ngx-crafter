import { execa } from "execa";
import chalk from "chalk";
import { writeJsonFile } from "../utils/fileUtil.js";

export default async function setupPrettier() {
    console.log(chalk.yellow("Setting up Prettier..."));

    await execa("npm", ["install", "prettier", "--save-dev"], {
        stdio: "inherit",
    });

    writeJsonFile(".prettierrc", {
        semi: true,
        trailingComma: "es5",
        singleQuote: true,
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        bracketSpacing: true,
        arrowParens: "avoid",
        endOfLine: "lf"
    });

    const prettierIgnoreContent = `node_modules/
dist/
.git/
.husky/
*.min.js
*.min.css
package-lock.json
`;

    const fs = await import("fs");
    fs.writeFileSync(".prettierignore", prettierIgnoreContent, "utf-8");

    console.log(chalk.green("Prettier configured with .prettierrc and .prettierignore"));
} 