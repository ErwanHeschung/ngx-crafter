import inquirer from "inquirer";

export async function getProjectConfig(): Promise<{ projectName: string; packages: string[] }> {
  return await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      validate: (input) => {
        const valid = /^[a-zA-Z0-9-_\.]+$/.test(input);
        return valid || "Project name can only contain letters, numbers, '-', '_' and '.'";
      }
    },
    {
      type: "checkbox",
      name: "packages",
      message: "Select packages to add:",
      choices: [
        { name: "Angular Material", value: "material" },
        { name: "Tailwind CSS", value: "tailwind" },
        { name: "NgRx (state management)", value: "ngrx" },
        { name: "ESLint", value: "eslint" },
      ],
    },
  ]);
}

export async function getFolderStructureConfig(): Promise<{
  useCustomStructure: boolean;
  structureFilePath?: string;
}> {
  const { useCustomStructure } = await inquirer.prompt({
    type: "confirm",
    name: "useCustomStructure",
    message: "Do you want to provide a custom folder structure JSON file?",
    default: false,
  });

  if (!useCustomStructure) {
    return { useCustomStructure: false };
  }

  const { structureFilePath } = await inquirer.prompt({
    type: "input",
    name: "structureFilePath",
    message: "Enter the path to the folder structure JSON file:",
  });

  return { useCustomStructure, structureFilePath };
}