export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Swagger UI</title>
      <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
    </head>
    <body>
      <div id="swagger-ui"></div>

      <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
      <script>
        SwaggerUIBundle({
          url: "/api/swagger",
          dom_id: "#swagger-ui"
        });
      </script>
    </body>
    </html>
  `);
}