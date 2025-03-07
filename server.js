// server.js
const fs = require('fs');
const path = require('path');
const express = require('express');
const { createServer: createViteServer } = require('vite');

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode for SSR
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  });
  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      // Read index.html and let Vite transform it.
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      );
      template = await vite.transformIndexHtml(url, template);

      // Load the SSR entry module using Vite's SSR loading
      const { render } = await vite.ssrLoadModule('/src/entry-server.js');

      // Render the app HTML.
      const { appContent } = await render(url);

      // Inject the rendered app HTML into the template.
      const html = template.replace(`<!--app-html-->`, appContent);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
}

createServer();
