export interface CliArgs {
    plugins: string[];
    options: Record<string, any>;
}

export function parseCliArgs(): CliArgs {
    const args = process.argv.slice(2);
    const plugins: string[] = [];
    const options: Record<string, any> = {};

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        if (arg === '--with' && i + 1 < args.length) {
            const pluginArg = args[i + 1];

            const pluginList = pluginArg.split(',').map(p => p.trim());
            plugins.push(...pluginList);

            i++;
        } else if (arg.startsWith('--')) {
            const optionName = arg.slice(2);
            if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
                options[optionName] = args[i + 1];
                i++;
            } else {
                options[optionName] = true;
            }
        }
    }

    return { plugins, options };
}

export function displayHelp(): void {
    console.log(`
Usage: ngx-crafter [options] [--with plugin1,plugin2] [--plugin-option value]

Options:
  --with <plugins>    Specify plugins to include (comma-separated)
  --help             Show this help message

Plugin Examples:
  ngx-crafter --with demo-plugin
  ngx-crafter --with auth
  ngx-crafter --with auth,i18n,pwa
  ngx-crafter --with auth --auth-provider firebase
  ngx-crafter --with pwa --pwa-name "My App"

Available Plugins:
  - demo-plugin: A demonstration plugin with a simple counter component
  - auth: Authentication setup (coming soon)
  - i18n: Internationalization (coming soon)
  - pwa: Progressive Web App (coming soon)
  - crud: CRUD operations (coming soon)
  - testing: Testing setup (coming soon)
  - storybook: Storybook integration (coming soon)
`);
}
