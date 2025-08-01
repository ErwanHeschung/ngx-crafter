import fs from "fs";
import path from "path";
import chalk from "chalk";

type FolderStructure = {
  [folderName: string]: FolderStructure | {};
};

async function createFoldersRecursively(
  basePath: string,
  structure: FolderStructure
): Promise<void> {
  for (const folderName in structure) {
    const folderPath = path.join(basePath, folderName);
    await fs.promises.mkdir(folderPath, { recursive: true });
    console.log(chalk.green(`Created folder: ${folderPath}`));

    const subfolders = structure[folderName];
    if (subfolders && Object.keys(subfolders).length > 0) {
      await createFoldersRecursively(folderPath, subfolders as FolderStructure);
    }
  }
}


export async function createProjectStructure(
  userCwd:string,
  structureFilePath?: string
): Promise<void> {
  
  try {
    if (!structureFilePath) {
      structureFilePath = path.resolve(
        __dirname,
        "../assets/default-structure.json"
      );
      console.log(
        chalk.blue(
          `No structure file specified, loading default from ${structureFilePath}`
        )
      );
    } else {
      structureFilePath = structureFilePath.trim();
      structureFilePath = structureFilePath.replace(/^['"]|['"]$/g, "");
      
      if (!path.isAbsolute(structureFilePath)) {
        structureFilePath = path.resolve(userCwd, structureFilePath);
      }
      console.log(
        chalk.blue(`Loading folder structure from ${structureFilePath}`)
      );
    }

    const raw = await fs.promises.readFile(structureFilePath, "utf-8");
    const structure: FolderStructure = JSON.parse(raw);

    await createFoldersRecursively(process.cwd(), structure);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(
      chalk.red(
        `Failed to load or parse folder structure file: ${errorMessage}`
      )
    );
    process.exit(1);
  }
}
