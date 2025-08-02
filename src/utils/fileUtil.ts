import fs from "fs";

export function writeJsonFile(filePath: string, content: any) {
    const json = JSON.stringify(content, null, 2);
    fs.writeFileSync(filePath, json, "utf-8");
}

export function insertLineAtTopIfMissing(filePath: string, line: string) {
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, "utf-8");
    if (!content.includes(line)) {
        fs.writeFileSync(filePath, `${line}\n${content}`, "utf-8");
    }
}

export function updatePackageJson(updates: Record<string, any>) {
    const packageJsonPath = "package.json";
    if (!fs.existsSync(packageJsonPath)) return;

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

    // Merge scripts properly
    if (updates.scripts && packageJson.scripts) {
        updates.scripts = { ...packageJson.scripts, ...updates.scripts };
    }

    const updatedPackageJson = { ...packageJson, ...updates };

    writeJsonFile(packageJsonPath, updatedPackageJson);
}
