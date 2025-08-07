import { execa } from "execa";
import chalk from "chalk";
import { Plugin, PluginSetupOptions } from "../../types/plugin.js";

const demoPlugin: Plugin = {
    name: "demo-plugin",
    description: "A demonstration plugin with a simple counter component",
    version: "1.0.0",
    author: "ngx-crafter",
    keywords: ["demo", "example", "plugin", "counter"],

    dependencies: [],
    devDependencies: [],

    files: [
        {
            path: "src/app/shared/components/demo-counter/demo-counter.component.ts",
            content: `import { Component } from '@angular/core';

@Component({
  selector: 'app-demo-counter',
  standalone: true,
  template: \`
    <div class="demo-counter">
      <h3>Demo Counter</h3>
      <p>Count: {{ count }}</p>
      <div class="buttons">
        <button (click)="increment()">+</button>
        <button (click)="decrement()">-</button>
        <button (click)="reset()">Reset</button>
      </div>
    </div>
  \`,
  styles: [\`
    .demo-counter {
      padding: 1rem;
      border: 2px solid #10b981;
      border-radius: 0.5rem;
      background-color: #ecfdf5;
      margin: 1rem 0;
      text-align: center;
    }
    .demo-counter h3 {
      color: #047857;
      margin: 0 0 0.5rem 0;
    }
    .demo-counter p {
      font-size: 1.5rem;
      font-weight: bold;
      color: #065f46;
      margin: 0.5rem 0;
    }
    .buttons {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      margin-top: 1rem;
    }
    .buttons button {
      background-color: #10b981;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      cursor: pointer;
      font-size: 1rem;
      min-width: 3rem;
    }
    .buttons button:hover {
      background-color: #059669;
    }
    .buttons button:last-child {
      background-color: #ef4444;
    }
    .buttons button:last-child:hover {
      background-color: #dc2626;
    }
  \`]
})
export class DemoCounterComponent {
  count = 0;

  increment(): void {
    this.count++;
  }

  decrement(): void {
    this.count--;
  }

  reset(): void {
    this.count = 0;
  }
}`,
            type: "file"
        }
    ],

    scripts: {
        "demo:info": "echo 'Demo Plugin v1.0.0 - A demonstration plugin with counter component'",
        "demo:test": "echo 'Demo plugin is working! 🎉'"
    },

    setup: async (options: PluginSetupOptions) => {
        console.log(chalk.blue(' Setting up Demo Plugin...'));
        console.log(chalk.gray(`Project: ${options.projectName}`));
        console.log(chalk.gray(`Path: ${options.projectPath}`));

        if (options.options && Object.keys(options.options).length > 0) {
            console.log(chalk.gray(`   Options: ${JSON.stringify(options.options)}`));
        }

        await new Promise(resolve => setTimeout(resolve, 300));

        console.log(chalk.green('Demo Plugin setup complete!'));
        console.log(chalk.yellow('You can now use the DemoCounterComponent in your app.'));
        console.log(chalk.yellow('Import it and add <app-demo-counter></app-demo-counter> to your template.'));
        console.log(chalk.yellow('Try running: npm run demo:test'));
    }
};

export default demoPlugin;
