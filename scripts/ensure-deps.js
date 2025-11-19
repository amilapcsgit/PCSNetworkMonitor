#!/usr/bin/env node
/**
 * Robust dependency check for Windows + Node >=20
 * - Skips install if node_modules exists
 * - Runs npm install only when needed
 * - Avoids PowerShell npm.ps1 wrapper issues
 */

const { existsSync } = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const nodeModulesPath = path.join(projectRoot, 'node_modules');
const isWindows = process.platform === 'win32';

console.log('[deps] Checking dependencies...');

// If node_modules exists, assume dependencies already satisfied
if (existsSync(nodeModulesPath)) {
  console.log('[deps] node_modules found → skipping npm install.');
  process.exit(0);
}

console.log('[deps] node_modules missing → running npm install...');

const command = isWindows
  ? { file: 'cmd.exe', args: ['/c', 'npm', 'install'] }
  : { file: 'npm', args: ['install'] };

const result = spawnSync(command.file, command.args, {
  stdio: 'inherit',
  env: process.env,
  cwd: projectRoot,
});

if (result.status === 0) {
  console.log('[deps] npm install completed successfully.');
  process.exit(0);
}

// If exit code is non-zero but node_modules exists, treat it as success
if (existsSync(nodeModulesPath)) {
  console.warn('[deps] npm returned a non-zero exit code, but node_modules exists. Continuing.');
  process.exit(0);
}

// Real error
console.error('[deps] npm install failed with status:', result.status);
process.exit(1);
