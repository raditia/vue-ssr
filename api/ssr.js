const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
  try {
    // Build absolute paths based on the function's directory
    const templatePath = path.join(__dirname, '..', 'dist', 'client', 'index.html');
    const entryServerPath = path.join(__dirname, '..', 'dist', 'server', 'entry-server.mjs');

    // Read the client template
    const template = fs.readFileSync(templatePath, 'utf-8');

    // Dynamically import the SSR bundle (which is an ES module)
    const { render } = await import(entryServerPath);

    // Use the render function to get your app's HTML
    const { appContent } = await render(req.url);

    // Inject the rendered content into your HTML template
    const html = template.replace(`<!--app-html-->`, appContent);

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {
    console.error('SSR error:', err);
    res.status(500).send('Internal Server Error');
  }
};
