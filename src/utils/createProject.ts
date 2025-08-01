import { execa } from "execa";
import chalk from "chalk";

export async function createAngularProject(projectName: string): Promise<void> {
  console.log(chalk.green(`\nCreating project ${projectName}...`));
  await execa("ng", ["new", projectName, "--routing", "--style=scss"], {
    stdio: "inherit",
  });
}

export async function addPackages(packages: string[]): Promise<void> {
  for (const pkg of packages) {
    switch (pkg) {
      case "material":
        console.log(chalk.yellow("Adding Angular Material..."));
        await execa("ng", ["add", "@angular/material"], { stdio: "inherit" });
        break;
      case "tailwind":
        console.log(chalk.yellow("Adding Tailwind CSS..."));
        await execa(
          "npm",
          ["install", "-D", "tailwindcss", "postcss", "autoprefixer"],
          { stdio: "inherit" }
        );
        break;
      case "ngrx":
        console.log(chalk.yellow("Adding NgRx..."));
        await execa("ng", ["add", "@ngrx/store"], { stdio: "inherit" });
        break;
      case "eslint":
        console.log(chalk.yellow("Adding ESLint..."));
        await execa("ng", ["add", "@angular-eslint/schematics"], {
          stdio: "inherit",
        });
        break;
      default:
        console.log(chalk.red(`Unknown package: ${pkg}`));
    }
  }
}