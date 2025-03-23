const fs = require('fs');
const path = require('path');

function countInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  return {
    lines: lines.length,
    characters: content.length
  };
}

function scanDirectory(dir) {
  let totalLines = 0;
  let totalCharacters = 0;

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      const subDirCounts = scanDirectory(filePath);
      totalLines += subDirCounts.lines;
      totalCharacters += subDirCounts.characters;
    } else {
      const counts = countInFile(filePath);
      totalLines += counts.lines;
      totalCharacters += counts.characters;
    }
  });

  return { lines: totalLines, characters: totalCharacters };
}

const srcDir = './src';
const totals = scanDirectory(srcDir);

console.log(`Total lines of code in ${srcDir}: ${totals.lines}`);
console.log(`Total characters in ${srcDir}: ${totals.characters}`);
