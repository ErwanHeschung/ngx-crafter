import { execa } from "execa";
import chalk from "chalk";
import fs from "fs";
import { updatePackageJson } from "../utils/fileUtil.js";

export default async function setupHusky() {
    console.log(chalk.yellow("Setting up Husky for git hooks..."));

    await execa("npm", ["install", "husky", "lint-staged", "--save-dev"], {
        stdio: "inherit",
    });

    await execa("npx", ["husky", "init"], {
        stdio: "inherit",
    });

    const preCommitContent = "npx lint-staged\n";
    fs.writeFileSync(".husky/pre-commit", preCommitContent, "utf-8");
    fs.chmodSync(".husky/pre-commit", 0o755);

    updatePackageJson({
        "lint-staged": {
            "*.{ts,html}": [
                "echo 'Add your linting stages here'"
            ]
        }
    });

    console.log(chalk.green("Husky configured with lint-staged for pre-commit hooks"));
} 