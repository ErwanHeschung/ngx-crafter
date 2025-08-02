#!/usr/bin/env node

import chalk from "chalk";
import semver from "semver";
import { checkAngularCLI } from "./utils/checkAngularCLI";
import { getProjectConfig, getFolderStructureConfig } from "./utils/prompt";
import {
  createAngularProject,
  addPackages,
  addDevUtilities,
} from "./utils/createProject";
import { createProjectStructure } from "./utils/createFolders";

async function validateAngularVersion(version: string): Promise<void> {
  if (!semver.satisfies(version, ">=17.0.0 <21.0.0")) {
    console.error(
      chalk.red(`ngx-crafter supports Angular CLI 17 to 20. Found: ${version}`)
    );
    process.exit(1);
  }
}


async function main(): Promise<void> {
  console.log(chalk.blue("\n🌱 Welcome to ngx-crafter!\n"));

  const cliVersion = await checkAngularCLI();
  await validateAngularVersion(cliVersion);

  const { projectName, packages, devUtilities } = await getProjectConfig();
  const { useCustomStructure, structureFilePath } =
    await getFolderStructureConfig();

  await createAngularProject(projectName);

  const userCwd = process.cwd();

  process.chdir(projectName);

  if (packages.length > 0) {
    await addPackages(packages);
  }

  if (devUtilities.length > 0) {
    await addDevUtilities(devUtilities);
  }

  await createProjectStructure(userCwd, useCustomStructure ? structureFilePath : undefined);

  console.log(chalk.green("\nAll done! Enjoy your project.\n"));
}

main().catch((error) => {
  console.error(chalk.red("An error occurred:"), error);
  process.exit(1);
});
