#!/usr/bin/env node

import {readdirSync, existsSync, readFileSync} from "node:fs";
import path from "node:path";
import assert from "node:assert";
import process from "node:process";
import { spawnSync } from "node:child_process";

function main() {
    const command = process.argv[2];
    const onlyPackages = process.argv.splice(3);
    let packages = listPackages(process.cwd());
    if (onlyPackages.length > 0) {
        packages = packages.filter(p => onlyPackages.includes(p.name));
    }
    switch (command) {
        case "list":
            for (const pkg of packages) {
              console.log(pkg.toString());
            }
            break;
        case "update":
            for (const pkg of packages) {
                pkg.update();
            }
            break;
        case "upgrade":
            const stats = new UpgradeStats();
            for (const pkg of packages) {
                pkg.upgrade(stats);
            }
            break;
        case "ci":
            for (const pkg of packages) {
                pkg.install();
                pkg.runScript("ci");
            }
            break;
        default:
            console.error("Usage: (list | test | upgrade | update) <projects>...");
            console.error("'list' lists all projects in the repository.");
            console.error("'ci' installs dependencies, then runs the script 'ci' for each project.");
            console.error("'upgrade' updates all dependencies to their latest version, for each project.");
            console.error("'update' runs 'npm update' / 'yarn up' / 'pnpm update' for each project.");
            console.error("If no projects are given, the command runs for all projects.");
            process.exit(1);
    }
}


/**
 * @param {string} baseDir
 * @param {number} depth
 * @return {Array<PackageEnt>}
 */
function listPackages(baseDir, depth = 2) {
    if (depth-- < 1) {
        return [];
    }
    const packages = [];
    for (const ent of readdirSync(baseDir, {withFileTypes: true})) {
        if (!ent.isDirectory()) {
            continue;
        }
        if (ent.name === "node_modules") {
            continue;
        }
        const entDir = path.join(baseDir, ent.name);
        const pkg = tryGetPackage(entDir);
        if (pkg) {
            packages.push(pkg);
        } else {
            packages.push(...listPackages(entDir, depth));
        }
    }
    return packages;
}


/**
 * @param {string} dir
 * @return {PackageEnt|null}
 */
function tryGetPackage(dir) {
    const pkgPath = path.join(dir, "package.json");
    if (!existsSync(pkgPath)) {
        return null;
    }
    return new PackageEnt(pkgPath);
}

function info(text) {
    console.log('\x1b[36m%s\x1b[0m', `INFO: ${text}`);
}
function warn(text) {
    console.log('\x1b[33m%s\x1b[0m', `WARNING: ${text}`);
}

class UpgradeStats {
    /**
     * @param {PackageEnt} pkg
     * @param {string} dependency
     * @param {string} version
     */
    skipPinned(pkg, dependency, version) {
      info(`Skipping upgrade of pinned dependency ${dependency}@${version} for ${pkg.toString()}.`);
    }

    /**
     * @param {PackageEnt} pkg
     * @param {string} dependency
     * @param {string} oldConstraint
     * @param {string} newConstraint
     */
    breaking(pkg, dependency, oldConstraint, newConstraint) {
        warn(`Potential breaking change upgrading ${dependency} from v${oldConstraint} to v${newConstraint} in ${pkg.toString()}.`);
    }

    /**
     * @param {PackageEnt} pkg
     * @param {string} dependency
     * @param {string} oldConstraint
     * @param {string} newConstraint
     */
    unrecognized(pkg, dependency, oldConstraint, newConstraint) {
        warn(`Found unrecognized dependency ${dependency} for ${pkg.toString()} while trying to upgrade from v${oldConstraint} to v${newConstraint}.`)
    }
}

class PackageEnt {

    /**
     * @param {string} pkgPath - The path to the package.json file for this package
     * @param {boolean} [isNpmWorkspace = false] - Whether or not this package is an NPM workspace
     */
    constructor(pkgPath, isNpmWorkspace = false) {
        const dir = path.dirname(pkgPath);
        let packageManager = undefined;
        if (existsSync(path.join(dir, "pnpm-lock.yaml"))) {
            packageManager = "pnpm";
        } else if (existsSync(path.join(dir, "package-lock.json")) || isNpmWorkspace) {
            packageManager = "npm";
        } else if (existsSync(path.join(dir, "yarn.lock"))) {
            packageManager = "yarn";
        }
        assert(typeof packageManager === "string");
        this.pkgPath = pkgPath;
        this.reloadPackageJson();
        this.path = dir;
        this.name = this.packageJson.name;
        this.packageManager = packageManager;
        this.workspaces = [];
        // If this is a package with workspaces, create a PackageEnt for each
        // and store it as part of the main package
        if (packageManager === "npm" && this.packageJson.workspaces) {
            this.workspaces = this.packageJson.workspaces.map((ws) => {
                const pkgPath = path.join(dir, ws, "package.json");
                return new PackageEnt(pkgPath, true);
            });
        }
    }

    reloadPackageJson() {
        const pkgJson = JSON.parse(readFileSync(this.pkgPath, "utf-8"));
        assert(typeof pkgJson === "object" && pkgJson !== null);
        assert(typeof pkgJson.name === "string");
        this.packageJson = pkgJson;
    }

    /**
     * @param {string} command
     */
    run(command) {
        const opt = {cwd: this.path, stdio: ["pipe", "inherit", "inherit"], shell: true};
        console.log(`manage ${this.name}$ ${command}`);
        const r = spawnSync(command, opt);
        if (r.error) {
            throw error;
        }
        if (r.status !== 0) {
            process.exit(r.status);
        }
    }

    /**
     * @param {string} name
     */
    runScript(name) {
        if ("scripts" in this.packageJson && name in this.packageJson.scripts) {
            switch (this.packageManager) {
                case "yarn":
                    this.run(`yarn run ${name}`);
                    break;
                case "npm":
                    this.run(`npm run ${name}`);
                    break;
                case "pnpm":
                    this.run(`pnpm run ${name}`);
                    break;
                default:
                    throw `unknown package manager ${this.packageManager}`;
            }
        }
    }

    toString() {
        const ws = this.workspaces.length > 0 ? `, ${this.workspaces.length} workspaces` : "";
        return `${this.name} (${this.packageManager}${ws}) at ${this.path}`;
    }

    install() {
        switch (this.packageManager) {
            case "yarn":
                this.run(`yarn install`);
                break;
            case "npm":
                this.run(`npm ci`);
                break;
            case "pnpm":
                this.run(`pnpm install`);
                break;
            default:
                throw `unknown package manager ${this.packageManager}`;
        }
    }

    update() {
        switch (this.packageManager) {
            case "yarn":
                this.run(`yarn up`);
                break;
            case "npm":
                this.run(`npm update`);
                break;
            case "pnpm":
                this.run(`pnpm update`);
                break;
            default:
                throw `unknown package manager ${this.packageManager}`;
        }
    }

    /**
     * @param {UpgradeStats} stats
     */
    upgrade(stats) {
        const { directNames, devNames, versions, skippedPinnedNames } = this.filterDeps();
        for (const name of skippedPinnedNames) {
            stats.skipPinned(this, name, versions[name])
        }

        if ((directNames.length + devNames.length) > 0) {
            const deps = [...directNames, ...devNames].join(" ");
            switch (this.packageManager) {
                case "yarn":
                    this.run(`yarn remove ${deps}`);
                    break;
                case "pnpm":
                    this.run(`pnpm remove ${deps}`);
                    break;
                case "npm":
                    this.run(`npm remove ${deps}`);
                    break;
                default:
                    throw `unknown package manager ${this.packageManager}`;
            }
        }
        if (directNames.length > 0) {
            const deps = directNames.join(" ");
            switch (this.packageManager) {
                case "npm":
                    this.run(`npm install ${deps}`);
                    break;
                case "yarn":
                    this.run(`yarn add ${deps}`);
                    break;
                case "pnpm":
                    this.run(`pnpm install ${deps}`);
                    break;
                default:
                    throw `unknown package manager ${this.packageManager}`;
            }
        }
        if (devNames.length > 0) {
            const deps = devNames.join(" ");
            switch (this.packageManager) {
                case "npm":
                    this.run(`npm install --save-dev ${deps}`);
                    break;
                case "yarn":
                    this.run(`yarn add --dev ${deps}`);
                    break;
                case "pnpm":
                    this.run(`pnpm add --save-dev ${deps}`);
                    break;
                default:
                    throw `unknown package manager ${this.packageManager}`;
            }
        }

        this.reloadPackageJson();
        const newVersions = this.filterDeps().versions;
        const rePrereleaseConstraint = /^\^0\.(\d+)\.\d+$/;
        const reStableConstraint = /^\^([1-9]\d*)\.\d+\.\d+$/;
        for (const [key, oldConstraint] of Object.entries(versions)) {
            const newConstraint = newVersions[key];
            if (reStableConstraint.test(oldConstraint)) {
                const [, oldMajorStr] = oldConstraint.match(reStableConstraint);
                if (reStableConstraint.test(newConstraint)) {
                    const [, newMajorStr] = newConstraint.match(reStableConstraint);
                    if (parseInt(newMajorStr) > parseInt(oldMajorStr)) {
                        stats.breaking(this, key, oldConstraint, newConstraint);
                    }
                    continue;
                }
            } else if (rePrereleaseConstraint.test(oldConstraint)) {
                const [, oldMinorStr] = oldConstraint.match(rePrereleaseConstraint);
                if (rePrereleaseConstraint.test(newConstraint)) {
                    const [, newMinorStr] = newConstraint.match(rePrereleaseConstraint);
                    if (parseInt(newMinorStr) > parseInt(oldMinorStr)) {
                        stats.breaking(this, key, oldConstraint, newConstraint);
                    }
                    continue;
                }
            }
            stats.unrecognized(this, key, oldConstraint, newConstraint);
        }

        // Loop through any workspaces and call their forceupdate
        // Note that upgrade() removes deps first and then re-installs so packages
        // get the latest version. However, this might have issues updating all
        // versions to latest in some situations due to the vagaries of how NPM handles
        // workspaces.
        for (const ws of this.workspaces) {
            ws.upgrade(stats);
        }
    }

    /**
     * @typedef {Object} Deps
     * @property {string[]} skippedPinnedNames
     * @property {string[]} directNames
     * @property {string[]} devNames
     * @property {Record<string, string>} versions
     */
    /**
     * @return {Deps}
     */
    filterDeps() {
        const rePinned = /^\d+\.\d+\.\d+$/; // e.g. "1.2.3" or "0.2.3"
        const skippedPinnedNames = [];
        const directNames = [];
        const devNames = [];
        const versions = {};
        for (const [key, val] of Object.entries(this.packageJson.dependencies ?? {})) {
            versions[key] = val;
            if (rePinned.test(val)) {
                skippedPinnedNames.push(key);
                continue;
            }
            directNames.push(key);
        }
        for (const [key, val] of Object.entries(this.packageJson.devDependencies ?? {})) {
            if (rePinned.test(val)) {
                skippedPinnedNames.push(key);
                continue;
            }
            versions[key] = val;
            devNames.push(key);
        }
        return {
            skippedPinnedNames,
            directNames,
            devNames,
            versions,
        }
    }

}

main();
