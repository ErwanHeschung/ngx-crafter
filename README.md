# ![logo](https://github.com/ErwanHeschung/ngx-crafter/blob/master/logo.png) ngx-crafter

> **Craft your Angular projects like a pro!** ⛏️

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/ngx-crafter.svg)](https://www.npmjs.com/package/ngx-crafter)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Angular](https://img.shields.io/badge/Angular-17+-red.svg)](https://angular.io/)

A powerful CLI tool that helps you **craft** Angular projects with pre-configured folder structures and essential packages. Think of it as your personal **crafting table** for Angular development! 🧰

## 🌟 Features

- **🏗️ Smart Project Generation**: Creates Angular projects with optimized folder structures
- **📦 Package Management**: Automatically installs commonly used packages (Tailwind CSS, Angular Material, NgRx, ESLint)
- **🔧 Dev Utilities**: Git hooks and development tools (Husky)
- **🎨 Tailwind CSS Integration**: Pre-configured utility-first CSS framework with PostCSS
- **🎯 Custom Structures**: Support for custom folder structure configurations
- **🔌 Plugin System**: Extensible plugin architecture for additional features (auth, i18n, PWA, etc.)
- **⚡ Fast Setup**: Get your project ready in seconds, not minutes
- **🔧 Angular 17-20 Support**: Compatible with the latest Angular versions

## 🚀 Quick Start

### Prerequisites

Before you start crafting, make sure you have:

- **Node.js** (v18 or higher) 📦
- **Angular CLI** (v17-20) ⚡

```bash
npm install -g @angular/cli
```

### Installation

```bash
npm install -g ngx-crafter
```

### Usage

```bash
# Basic usage with interactive prompts
ngx-crafter

# Use plugins for additional features (coming soon)
ngx-crafter -- --with auth
ngx-crafter -- --with auth,i18n,pwa

# Plugin-specific options (coming soon)
ngx-crafter -- --with auth --auth-provider firebase
ngx-crafter -- --with pwa --pwa-name "My Awesome App"
```

That's it! The tool will guide you through the setup process with interactive prompts.

## 🎯 What You Get

When you run `ngx-crafter`, you'll get a fully configured Angular project with:

### 📦 Pre-configured Packages
- **Tailwind CSS**: Automatically configured with PostCSS and ready to use
- **Angular Material**: UI components and theming setup
- **NgRx**: State management with store, effects, and devtools

### 🛠️ Development Utilities
- **Husky**: Git hooks configured with lint-staged for pre-commit code quality checks
- **ESLint**: Code linting and formatting rules
- **Prettier**: Code formatting and style consistency

### 📁 Default Folder Structure

```
src/
├── app/
│   ├── core/           # Core application logic
│   │   ├── services/   # Application services
│   │   ├── guards/     # Route guards
│   │   ├── interceptors/ # HTTP interceptors
│   │   ├── models/     # Data models
│   │   └── utils/      # Utility functions
│   ├── shared/         # Shared components & services
│   │   ├── components/ # Reusable components
│   │   ├── directives/ # Custom directives
│   │   ├── pipes/      # Custom pipes
│   │   ├── models/     # Shared models
│   │   └── services/   # Shared services
│   ├── features/       # Feature modules
│   ├── layouts/        # Layout components
│   └── assets/         # Static assets
│       ├── images/     # Image files
│       ├── icons/      # Icon files
│       └── fonts/      # Font files
└── environments/       # Environment configurations
```

### 🔌 Available Plugins

- **🔐 Auth**: Authentication setup with Angular Fire and Firebase (coming soon)
- **🌍 i18n**: Internationalization with ngx-translate (coming soon)
- **📱 PWA**: Progressive Web App setup with Angular PWA (coming soon)
- **📊 CRUD**: CRUD operations setup (coming soon)
- **🧪 Testing**: Enhanced testing setup (coming soon)
- **📚 Storybook**: Storybook integration (coming soon)

Plugin system infrastructure is ready! You can create your own plugins now.
Provided plugins will be available in future versions.
Meanwhile, check out demo-plugin as an example.

### 🛠️ Interactive Setup

The tool will ask you:

1. **Project Name**: What should we call your masterpiece?
2. **Package Selection**: Which packages do you want to include?
   - **Angular Material**: UI component library
   - **Tailwind CSS**: Utility-first CSS framework
   - **NgRx**: State management library
3. **Dev Utilities**: Which development utilities do you want to add?
   - **Husky**: Git hooks with lint-staged for pre-commit code quality
   - **ESLint**: Code linting and formatting
   - **Prettier**: Code formatting and style consistency
4. **Folder Structure**: Use default or custom structure?

## 🎨 Custom Structures

Want to craft your own folder structure? Create a JSON file like this:

```json
{
  "src": {
    "app": {
      "core": {
        "services": {},
        "guards": {},
        "models": {}
      },
      "features": {
        "auth": {},
        "dashboard": {}
      }
    }
  }
}
```

Then reference it during setup!

## 🧰 Development

### Building the Project

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Project Structure

```
ngx-crafter/
├── src/
│   ├── cli.ts                 # Main CLI entry point
│   ├── default-structure.json # Default folder structure
│   └── utils/                 # Utility functions
│       ├── checkAngularCLI.ts # Angular CLI version checker
│       ├── createFolders.ts   # Folder creation logic
│       ├── createProject.ts   # Project creation logic
│       └── prompt.ts          # Interactive prompts
├── test/                      # Test files
├── package.json               # Project configuration
└── tsconfig.json             # TypeScript configuration
```

## 🤝 Contributing

Want to help improve ngx-crafter? Here's how you can contribute:

1. **Fork** the repository 🍴
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request 🚀

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">

**Happy Crafting!** ⛏️✨

*Built with ❤️ by [TOROIMERA](https://github.com/ErwanHeschung)*

</div>
