#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const projectRoot = path.join(__dirname, '..');
const nodeModulesPath = path.join(projectRoot, 'node_modules');
const markerFile = path.join(nodeModulesPath, '.deps-installed');

const log = (message) => console.log(`[deps] ${message}`);

const haveNodeModules = fs.existsSync(nodeModulesPath) && fs.statSync(nodeModulesPath).isDirectory();
const haveMarker = fs.existsSync(markerFile);

if (haveNodeModules && haveMarker) {
  log('Dependencies already installed.');
  process.exit(0);
}

log('Installing npm dependencies (this may take a minute)...');
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const result = spawnSync(npmCmd, ['install'], {
  cwd: projectRoot,
  stdio: 'inherit',
  env: process.env,
});

if (result.status !== 0) {
  console.error('\n[deps] npm install failed. Please check the logs above.');
  process.exit(result.status ?? 1);
}

fs.mkdirSync(nodeModulesPath, { recursive: true });
fs.writeFileSync(markerFile, `Installed via ensure-deps.js on ${new Date().toISOString()}\n`);
log('Dependencies installed successfully.');
