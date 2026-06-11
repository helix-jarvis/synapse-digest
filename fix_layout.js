import fs from 'fs';

const filePath = 'src/app/layout.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Fix unclosed tags from the broken state
content = content.replace(/<\/div/g, '</div>');
content = content.replace(/<\/footer/g, '</footer>');
content = content.replace(/<\/body/g, '</body>');
content = content.replace(/<\/html/g, '</html>');

fs.writeFileSync(filePath, content);
console.log('Successfully fixed unclosed tags in src/app/layout.tsx');
