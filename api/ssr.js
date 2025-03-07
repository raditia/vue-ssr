const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
  console.log('Files in dist/client:', fs.readdirSync(path.join(__dirname, '..', 'dist', 'client')));
  try {
    // Build the absolute path to index.html based on __dirname
    const templatePath = path.join(__dirname, '..', 'dist', 'client', 'index.html');

    // Optionally, log available files for debugging
    // console.log('Files in dist/client:', fs.readdirSync(path.join(__dirname, '..', 'dist', 'client')));

    const template = fs.readFileSync(templatePath, 'utf-8');

    const entryServerPath = path.join(__dirname, '..', 'dist', 'server', 'entry-server.mjs');
    const { render } = await import(entryServerPath);

    const { appContent } = await render(req.url);
    const html = template.replace(`<!--app-html-->`, appContent);

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {
    console.log('Files in dist/client:', fs.readdirSync(path.join(__dirname, '..', 'dist', 'client')));
    console.error('SSR error:', err);
    res.status(500).send('Internal Server Error');
  }
};
