const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
  try {
    const cwd = process.cwd();
    console.log('process.cwd():', cwd);
    console.log('__dirname:', __dirname);

    const clientDir = path.join(process.cwd(), 'dist', 'client');
    console.log('Contents of dist/client:', fs.existsSync(clientDir) ? fs.readdirSync(clientDir) : 'Directory not found');

    const templatePath = path.join(clientDir, 'index.html');
    const template = fs.readFileSync(templatePath, 'utf-8');

    const entryServerPath = path.join(process.cwd(), 'dist', 'server', 'entry-server.mjs');
    const { render } = await import(entryServerPath);

    const { appContent } = await render(req.url);
    const html = template.replace(`<!--app-html-->`, appContent);

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {
    console.error('SSR error:', err);
    res.status(500).send('Internal Server Error');
  }
};
