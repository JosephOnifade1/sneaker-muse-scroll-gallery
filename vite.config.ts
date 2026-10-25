import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

function saveRenderPlugin(): Plugin {
  return {
    name: "save-render-plugin",
    configureServer(server) {
      server.middlewares.use("/api/save-render", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          return res.end();
        }
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
          try {
            const { name, dataUrl } = JSON.parse(body);
            const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "");
            const outPath = path.resolve(__dirname, `src/assets/${name}.png`);
            fs.writeFileSync(outPath, Buffer.from(base64Data, "base64"));
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true, path: outPath }));
          } catch (e: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    saveRenderPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
