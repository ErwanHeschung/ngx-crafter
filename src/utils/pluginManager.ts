import { Plugin, PluginRegistry } from "../types/plugin.js";
import { execa } from "execa";
import chalk from "chalk";
import path from "path";
import { promises as fs } from "fs";
import { fileURLToPath, pathToFileURL } from "url";

export class PluginManager {
  private plugins: PluginRegistry = {};

  async loadPlugins(requestedPlugins: string[]): Promise<void> {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const pluginsDir = path.resolve(__dirname, '../plugins');

    try {
      const pluginFolders = await fs.readdir(pluginsDir);

      const foldersToLoad = pluginFolders.filter(folder =>
        requestedPlugins.some(reqPlugin => normalizeName(reqPlugin) === normalizeName(folder))
      );

      for (const folder of foldersToLoad) {
        const pluginPath = path.join(pluginsDir, folder, 'index.js');
        try {
          const pluginModule = await import(pathToFileURL(pluginPath).href);
          const plugin = pluginModule.default;
          if (plugin?.name) {
            this.plugins[plugin.name] = plugin;
            console.log(chalk.green(`Loaded plugin: ${plugin.name}`));
          } else {
            console.log(chalk.red(`Plugin in '${folder}' is missing a 'name' property.`));
          }
        } catch (e) {
          console.log(chalk.red(`Failed to load plugin from '${folder}'`));
        }
      }

      if (Object.keys(this.plugins).length === 0) {
        console.log(chalk.yellow("Plugin system is ready, but no valid plugins were provided."));
      }

    } catch (e) {
      console.log(chalk.yellow("Plugin system is available but no 'plugins' folder found or readable."));
    }
  }

  getAvailablePlugins(): string[] {
    return Object.keys(this.plugins);
  }

  getPlugin(name: string): Plugin | undefined {
    return this.plugins[name];
  }

  async executePlugin(pluginName: string, options: any): Promise<void> {
    const plugin = this.getPlugin(pluginName);
    if (!plugin) {
      throw new Error(`Plugin '${pluginName}' not found. Available plugins: ${this.getAvailablePlugins().join(', ')}`);
    }

    console.log(chalk.blue(`🔌 Setting up ${pluginName} plugin...`));
    await plugin.setup(options);
  }

  async installPluginDependencies(pluginName: string): Promise<void> {
    const plugin = this.getPlugin(pluginName);
    if (!plugin) {
      throw new Error(`Plugin '${pluginName}' not found`);
    }

    if (plugin.dependencies && plugin.dependencies.length > 0) {
      console.log(chalk.blue(`Installing ${pluginName} dependencies...`));
      await execa('npm', ['install', ...plugin.dependencies], { stdio: 'inherit' });
    }

    if (plugin.devDependencies && plugin.devDependencies.length > 0) {
      console.log(chalk.blue(`Installing ${pluginName} dev dependencies...`));
      await execa('npm', ['install', '--save-dev', ...plugin.devDependencies], { stdio: 'inherit' });
    }
  }

  async createPluginFiles(pluginName: string, projectPath: string): Promise<void> {
    const plugin = this.getPlugin(pluginName);
    if (!plugin) {
      throw new Error(`Plugin '${pluginName}' not found`);
    }

    if (plugin.files && plugin.files.length > 0) {
      console.log(chalk.blue(`Creating ${pluginName} files...`));

      for (const file of plugin.files) {
        const filePath = path.join(projectPath, file.path);
        const dirPath = path.dirname(filePath);

        await fs.mkdir(dirPath, { recursive: true });

        await fs.writeFile(filePath, file.content, 'utf8');
      }
    }
  }

  async updatePackageJson(pluginName: string): Promise<void> {
    const plugin = this.getPlugin(pluginName);
    if (!plugin) {
      throw new Error(`Plugin '${pluginName}' not found`);
    }

    if (plugin.scripts && Object.keys(plugin.scripts).length > 0) {
      console.log(chalk.blue(`Updating package.json with ${pluginName} scripts...`));

      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));

      packageJson.scripts = {
        ...packageJson.scripts,
        ...plugin.scripts
      };

      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
    }
  }
}

function normalizeName(name: string) {
  return name.toLowerCase().replace(/[-_]/g, '');
}