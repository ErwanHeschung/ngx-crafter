import { execa } from "execa";
import chalk from "chalk";

export async function checkAngularCLI(): Promise<string> {
  try {
    const { stdout } = await execa("ng", ["version"]);
    const match = stdout.match(/Angular CLI:\s+(\d+\.\d+\.\d+)/);
    if (!match) {
      throw new Error("Angular CLI version not found");
    }
    return match[1];
  } catch {
    console.error(
      chalk.red(
        "Angular CLI not found. Please install @angular/cli globally."
      )
    );
    process.exit(1);
  }
}
