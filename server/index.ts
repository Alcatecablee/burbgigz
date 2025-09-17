import express, { Express } from 'express';
import path from 'path';
import fs from 'fs';
import register from './routes';

const app: Express = express();
const PORT = parseInt(process.env.PORT || '5000', 10);

// Add JSON body parser
app.use(express.json());

// Register API routes
register(app);

async function createServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Development mode: Use Vite middleware
    console.log('[DEV] Starting development server with Vite middleware...');
    
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    
    app.use(vite.middlewares);
    
    // Handle all non-API routes for SPA (fallback)
    app.use(async (req, res, next) => {
      if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
      const url = req.originalUrl;
      
      try {
        // Read index.html
        let template = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
        
        // Transform the HTML using Vite's built-in HTML transforms
        template = await vite.transformIndexHtml(url, template);
        
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        // If an error is caught, let Vite fix the stack trace so it maps back to your actual source code
        const error = e as Error;
        vite.ssrFixStacktrace(error);
        console.error(error);
        res.status(500).end(error.message);
      }
    });
  } else {
    // Production mode: Serve static files
    console.log('[PROD] Starting production server...');
    
    app.use(express.static(path.resolve(__dirname, '../dist')));
    
    // Handle all non-API routes for SPA (fallback)
    app.use((req, res, next) => {
      if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
      res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SUCCESS] Server running on http://0.0.0.0:${PORT}`);
    console.log(`[INFO] API endpoints available at /api`);
    console.log(`[INFO] Frontend ${process.env.NODE_ENV === 'production' ? 'served from dist' : 'served via Vite middleware'}`);
  });
}

createServer().catch(error => {
  console.error('[ERROR] Server startup failed:', error);
  process.exit(1);
});