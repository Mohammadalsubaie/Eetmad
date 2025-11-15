#!/usr/bin/env node

/**
 * Interactive Scripts Menu
 * Easy way to discover and run all available scripts
 */

const readline = require('readline');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Menu structure
const menu = {
  main: {
    title: '🎯 Scripts Hub - Main Menu',
    options: [
      { key: '1', label: 'Validation Scripts', action: 'validation' },
      { key: '2', label: 'Quick Reference Cards', action: 'reference' },
      { key: '3', label: 'Documentation', action: 'docs' },
      { key: '4', label: 'Examples', action: 'examples' },
      { key: '5', label: 'Run Custom Command', action: 'custom' },
      { key: 'h', label: 'Help & Info', action: 'help' },
      { key: 'q', label: 'Quit', action: 'quit' },
    ],
  },
  validation: {
    title: '✅ Validation Scripts',
    options: [
      {
        key: '1',
        label: 'Design Rules Validation (Single File)',
        action: 'run',
        command: 'validate:design',
        prompt: 'Enter file path: ',
      },
      {
        key: '2',
        label: 'Design Rules Validation (Directory)',
        action: 'run',
        command: 'validate:design',
        prompt: 'Enter directory path: ',
      },
      {
        key: '3',
        label: 'Validate Current Git Changes',
        action: 'run',
        command: 'validate:design $(git diff --name-only --cached | grep -E "\\.(tsx|ts)$")',
        shell: true,
      },
      {
        key: '4',
        label: 'Type Validation',
        action: 'run',
        command: 'validate-types',
      },
      {
        key: '5',
        label: 'Naming Convention Check',
        action: 'run',
        command: 'validate-naming',
      },
      {
        key: '6',
        label: 'Structure Validation',
        action: 'run',
        command: 'node scripts/validate-structure.js',
        shell: true,
      },
      {
        key: '7',
        label: 'Run ALL Validations',
        action: 'run',
        command: 'validate:all',
      },
      { key: 'b', label: 'Back to Main Menu', action: 'back' },
    ],
  },
  reference: {
    title: '📖 Quick Reference Cards',
    options: [
      {
        key: '1',
        label: 'Design Rules Cheat Sheet',
        action: 'open',
        file: 'quick-reference/design-rules.md',
      },
      {
        key: '2',
        label: 'cssVars Complete Reference',
        action: 'open',
        file: 'quick-reference/css-vars.md',
      },
      {
        key: '3',
        label: 'Common Fixes & Solutions',
        action: 'open',
        file: 'quick-reference/common-fixes.md',
      },
      {
        key: '4',
        label: 'i18n Patterns',
        action: 'open',
        file: 'quick-reference/i18n-patterns.md',
      },
      { key: 'b', label: 'Back to Main Menu', action: 'back' },
    ],
  },
  docs: {
    title: '📚 Documentation',
    options: [
      {
        key: '1',
        label: 'Main INDEX (Start Here!)',
        action: 'open',
        file: 'INDEX.md',
      },
      {
        key: '2',
        label: 'Design Rules - Full Guide',
        action: 'open',
        file: 'validate-design-rules.README.md',
      },
      {
        key: '3',
        label: 'Quick Start Guide',
        action: 'open',
        file: 'QUICK_START_GUIDE.md',
      },
      {
        key: '4',
        label: 'Validation Summary',
        action: 'open',
        file: 'VALIDATION_SUMMARY.md',
      },
      {
        key: '5',
        label: 'Type Validation Guide',
        action: 'open',
        file: 'validate-types.README.md',
      },
      {
        key: '6',
        label: 'CI/CD Integration Examples',
        action: 'open',
        file: 'ci-integration-example.yml',
      },
      { key: 'b', label: 'Back to Main Menu', action: 'back' },
    ],
  },
  examples: {
    title: '💡 Code Examples',
    options: [
      {
        key: '1',
        label: 'Correct Component Example ✅',
        action: 'open',
        file: 'test-component-correct.tsx',
      },
      {
        key: '2',
        label: 'Common Mistakes Example ❌',
        action: 'open',
        file: 'test-component-example.tsx',
      },
      {
        key: '3',
        label: 'Test Validation on Correct Example',
        action: 'run',
        command: 'validate:design scripts/test-component-correct.tsx',
      },
      {
        key: '4',
        label: 'Test Validation on Mistakes Example',
        action: 'run',
        command: 'validate:design scripts/test-component-example.tsx',
      },
      { key: 'b', label: 'Back to Main Menu', action: 'back' },
    ],
  },
};

function printHeader() {
  console.clear();
  console.log(colors.cyan + colors.bright);
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║            🎯  Scripts Hub - Interactive Menu  🎯           ║');
  console.log('║                                                            ║');
  console.log('║           Easy access to all scripts & docs                ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(colors.reset);
}

function printMenu(menuKey) {
  const currentMenu = menu[menuKey];

  console.log('\n' + colors.bright + currentMenu.title + colors.reset);
  console.log(colors.dim + '─'.repeat(60) + colors.reset + '\n');

  currentMenu.options.forEach((option) => {
    const color =
      option.action === 'back'
        ? colors.yellow
        : option.action === 'quit'
          ? colors.red
          : colors.green;
    console.log(`  ${color}[${option.key}]${colors.reset} ${option.label}`);
  });

  console.log('');
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(colors.cyan + prompt + colors.reset, resolve);
  });
}

async function runCommand(command, shellMode = false) {
  return new Promise((resolve) => {
    console.log(colors.dim + '\nRunning: ' + command + colors.reset);
    console.log(colors.dim + '─'.repeat(60) + colors.reset + '\n');

    const child = shellMode
      ? spawn(command, [], { shell: true, stdio: 'inherit', cwd: path.join(__dirname, '../..') })
      : spawn('npm', ['run', command], { stdio: 'inherit', cwd: path.join(__dirname, '../..') });

    child.on('close', (code) => {
      console.log('\n' + colors.dim + '─'.repeat(60) + colors.reset);
      if (code === 0) {
        console.log(colors.green + '✓ Command completed successfully' + colors.reset);
      } else {
        console.log(colors.red + '✗ Command failed with code ' + code + colors.reset);
      }
      resolve();
    });
  });
}

async function openFile(filePath) {
  const fullPath = path.join(__dirname, '..', filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(colors.red + '\n✗ File not found: ' + filePath + colors.reset);
    console.log(colors.yellow + 'This file may not be created yet.' + colors.reset);
    await question('\nPress Enter to continue...');
    return;
  }

  console.log(colors.green + '\n✓ Opening: ' + filePath + colors.reset);
  console.log(colors.dim + 'Location: ' + fullPath + colors.reset);

  // Try to open with default editor
  const command =
    process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';

  spawn(command, [fullPath], { stdio: 'ignore', detached: true });

  console.log(colors.yellow + '\n💡 Tip: You can also view with:' + colors.reset);
  console.log(colors.dim + `   cat ${filePath}` + colors.reset);

  await question('\nPress Enter to continue...');
}

async function handleOption(menuKey, option) {
  switch (option.action) {
    case 'back':
      return 'main';

    case 'quit':
      console.log(colors.green + '\n👋 Thanks for using Scripts Hub!\n' + colors.reset);
      rl.close();
      process.exit(0);

    case 'run':
      if (option.prompt) {
        const input = await question(option.prompt);
        if (!input.trim()) {
          console.log(colors.red + '\n✗ No path provided' + colors.reset);
          await question('Press Enter to continue...');
          return menuKey;
        }
        await runCommand(`${option.command} ${input}`, option.shell);
      } else {
        await runCommand(option.command, option.shell);
      }
      await question('\nPress Enter to continue...');
      return menuKey;

    case 'open':
      await openFile(option.file);
      return menuKey;

    case 'custom':
      const command = await question('Enter npm script or command: ');
      if (command.trim()) {
        await runCommand(command);
        await question('\nPress Enter to continue...');
      }
      return menuKey;

    case 'help':
      await showHelp();
      await question('\nPress Enter to continue...');
      return menuKey;

    default:
      return option.action;
  }
}

async function showHelp() {
  console.log('\n' + colors.bright + '🆘 Help & Information' + colors.reset);
  console.log(colors.dim + '─'.repeat(60) + colors.reset);

  console.log('\n' + colors.bright + 'Quick Tips:' + colors.reset);
  console.log('  • Use number keys to select options');
  console.log('  • Press "b" to go back');
  console.log('  • Press "q" to quit');
  console.log('  • All files open in your default editor');

  console.log('\n' + colors.bright + 'Most Used Commands:' + colors.reset);
  console.log('  • Validate file:     npm run validate:design path/to/file.tsx');
  console.log('  • Check git changes: npm run validate:design $(git diff --cached --name-only)');
  console.log('  • Run all checks:    npm run validate:all');

  console.log('\n' + colors.bright + 'Documentation Locations:' + colors.reset);
  console.log('  • Main hub:    scripts/INDEX.md');
  console.log('  • Quick refs:  scripts/quick-reference/');
  console.log('  • Examples:    scripts/examples/');

  console.log('\n' + colors.bright + 'Useful Links:' + colors.reset);
  console.log('  • GitHub:      github.com/your-org/fisal');
  console.log('  • Docs:        /docs/design/');
}

async function runMenu(currentMenuKey = 'main') {
  while (true) {
    printHeader();
    printMenu(currentMenuKey);

    const input = await question('Select option: ');
    const trimmedInput = input.trim().toLowerCase();

    const currentMenu = menu[currentMenuKey];
    const option = currentMenu.options.find((o) => o.key === trimmedInput);

    if (option) {
      const nextMenu = await handleOption(currentMenuKey, option);
      if (nextMenu) {
        currentMenuKey = nextMenu;
      }
    } else {
      console.log(colors.red + '\n✗ Invalid option. Please try again.' + colors.reset);
      await question('Press Enter to continue...');
    }
  }
}

// Main execution
(async () => {
  try {
    await runMenu();
  } catch (error) {
    console.error(colors.red + '\n✗ Error: ' + error.message + colors.reset);
    rl.close();
    process.exit(1);
  }
})();
