// api/ssr.js
const fs = require('fs');
const path = require('path');

// Import the SSR render function from your built server bundle.
const { render } = require('../dist/server/entry-server.js');

module.exports = async (req, res) => {
  try {
    const url = req.url;
    // Read the pre-built HTML template from the client build.
    const templatePath = path.join(__dirname, '..', 'dist', 'client', 'index.html');
    const template = fs.readFileSync(templatePath, 'utf-8');

    // Render the app to a string using your SSR render function.
    const { appContent } = await render(url);
    const html = template.replace(`<!--app-html-->`, appContent);

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {
    console.error('SSR error:', err);
    res.status(500).send('Internal Server Error');
  }
};
