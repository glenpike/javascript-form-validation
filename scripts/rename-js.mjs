import { readdirSync, renameSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const excludedDirs = new Set(['node_modules', '.git', basename(dirname(fileURLToPath(import.meta.url)))]);

const mode = process.argv[2];
if (mode !== 'hide' && mode !== 'restore') {
    console.error('Usage: node scripts/rename-js.mjs <hide|restore>');
    process.exit(1);
}

const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            if (!excludedDirs.has(entry.name)) {
                walk(join(dir, entry.name));
            }
            continue;
        }
        const path = join(dir, entry.name);
        if (mode === 'hide' && /\.m?js$/.test(entry.name)) {
            renameSync(path, `${path}.txt`);
            console.log(`${path} -> ${path}.txt`);
        } else if (mode === 'restore' && /\.m?js\.txt$/.test(entry.name)) {
            const restored = path.slice(0, -'.txt'.length);
            renameSync(path, restored);
            console.log(`${path} -> ${restored}`);
        }
    }
};

walk(process.cwd());
