import { spawn } from 'node:child_process';
const cli = new URL('../node_modules/expo/bin/cli', import.meta.url);
const { fileURLToPath } = await import('node:url');
const child = spawn(process.execPath, [fileURLToPath(cli), 'start', ...process.argv.slice(2)], { stdio: 'inherit', env: { ...process.env, EXPO_PUBLIC_AUTH_MODE: 'local' } });
child.on('exit', code => process.exit(code ?? 1));
