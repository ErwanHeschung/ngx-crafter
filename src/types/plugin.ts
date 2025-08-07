export interface Plugin {
  name: string;
  description: string;
  version: string;
  author?: string;
  keywords?: string[];
  dependencies?: string[];
  devDependencies?: string[];
  files?: PluginFile[];
  scripts?: Record<string, string>;
  setup: (options: PluginSetupOptions) => Promise<void>;
}

export interface PluginFile {
  path: string;
  content: string;
  type: 'file' | 'template';
}

export interface PluginSetupOptions {
  projectName: string;
  projectPath: string;
  options: Record<string, any>;
}

export interface PluginManifest {
  name: string;
  description: string;
  version: string;
  author?: string;
  keywords?: string[];
  entryPoint: string;
}

export interface PluginRegistry {
  [pluginName: string]: Plugin;
}
