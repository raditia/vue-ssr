const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
  try {
    const clientDir = path.join(process.cwd(), 'dist', 'client');
    console.log('Contents of dist/client:', fs.existsSync(clientDir) ? fs.readdirSync(clientDir) : 'Directory not found');

    const serverDir = path.join(process.cwd(), 'dist', 'server');
    console.log('Contents of dist/server:', fs.existsSync(serverDir) ? fs.readdirSync(serverDir) : 'Directory not found');

    const templatePath = path.join(clientDir, 'index.html');
    const template = fs.readFileSync(templatePath, 'utf-8');

    const entryServerPath = path.join(process.cwd(), 'dist', 'server', 'static', 'js', 'entry-server.js');
    const { render } = await import(entryServerPath);

    const clientScriptTag = `<script type="module" src="/src/entry-client.js"></script>`;

    console.log('manifest', manifest);
    console.log('clientEntry', clientEntry);
    console.log('clientScript', clientScriptTag);

    const { appContent } = await render(req.url);
    const html = template
    .replace(`<!--app-html-->`, appContent)
    .replace(`<!--CLIENT-ENTRY-->`, clientScriptTag);

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {
    console.error('SSR error:', err);
    res.status(500).send('Internal Server Error');
  }
};
