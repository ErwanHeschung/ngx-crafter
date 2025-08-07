#!/usr/bin/env node

import chalk from "chalk";
import semver from "semver";
import path from "path";
import { checkAngularCLI } from "./utils/checkAngularCLI.js";
import { getProjectConfig, getFolderStructureConfig } from "./utils/prompt.js";
import {
  createAngularProject,
  addPackages,
  addDevUtilities,
} from "./utils/createProject.js";
import { createProjectStructure } from "./utils/createFolders.js";
import { PluginManager } from "./utils/pluginManager.js";
import { parseCliArgs, displayHelp } from "./utils/cliArgs.js";

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

  const cliArgs = parseCliArgs();

  if (cliArgs.options.help) {
    displayHelp();
    return;
  }

  const cliVersion = await checkAngularCLI();
  await validateAngularVersion(cliVersion);

  const pluginManager = new PluginManager();
  await pluginManager.loadPlugins(cliArgs.plugins);

  const requestedPlugins = cliArgs.plugins;
  const availablePlugins = pluginManager.getAvailablePlugins();

  const { projectName, packages, devUtilities } = await getProjectConfig();
  const { useCustomStructure, structureFilePath } =
    await getFolderStructureConfig();

  await createAngularProject(projectName);

  const userCwd = process.cwd();
  const projectPath = path.join(userCwd, projectName);

  process.chdir(projectName);

  if (packages.length > 0) {
    await addPackages(packages);
  }

  if (devUtilities.length > 0) {
    await addDevUtilities(devUtilities);
  }

  await createProjectStructure(userCwd, useCustomStructure ? structureFilePath : undefined);

  if (requestedPlugins.length > 0 && availablePlugins.length > 0) {
    console.log(chalk.blue("\nSetting up plugins...\n"));

    for (const pluginName of requestedPlugins) {
      try {
        const pluginOptions = Object.keys(cliArgs.options)
          .filter(key => key.startsWith(pluginName.replace('-', '_')))
          .reduce((acc, key) => {
            const newKey = key.replace(`${pluginName.replace('-', '_')}_`, '');
            acc[newKey] = cliArgs.options[key];
            return acc;
          }, {} as Record<string, any>);

        const setupOptions = {
          projectName,
          projectPath,
          options: pluginOptions
        };

        await pluginManager.executePlugin(pluginName, setupOptions);

        await pluginManager.installPluginDependencies(pluginName);

        await pluginManager.createPluginFiles(pluginName, projectPath);


        await pluginManager.updatePackageJson(pluginName);

      } catch (error) {
        console.error(chalk.red(`Failed to setup plugin ${pluginName}: ${error}`));
        process.exit(1);
      }
    }
  }

  console.log(chalk.green("\nAll done! Enjoy your project.\n"));
}

main().catch((error) => {
  console.error(chalk.red("An error occurred:"), error);
  process.exit(1);
});
