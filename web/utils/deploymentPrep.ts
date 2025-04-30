import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';
import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { exec } from 'child_process';
import { generateSW } from 'workbox-build';

const execPromise = promisify(exec);

// Optimize images
export const optimizeImages = async (inputPath: string, outputPath: string) => {
  const files = fs.readdirSync(inputPath);
  for (const file of files) {
    const inputFile = path.join(inputPath, file);
    const outputFile = path.join(outputPath, file);
    await sharp(inputFile)
      .resize(800)
      .toFormat('jpeg')
      .jpeg({ quality: 80 })
      .toFile(outputFile);
  }
};

// Add meta tags for SEO
export const addMetaTags = (title: string, description: string, keywords: string[]) => {
  return `
    <meta name="title" content="${title}">
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords.join(', ')}">
  `;
};

// Create sitemap.xml
export const createSitemap = async (req: NextApiRequest, res: NextApiResponse) => {
  const smStream = new SitemapStream({ hostname: 'https://example.com' });
  const pipeline = smStream.pipe(createGzip());

  smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  smStream.write({ url: '/about', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/menu', changefreq: 'weekly', priority: 0.8 });
  smStream.write({ url: '/contact', changefreq: 'monthly', priority: 0.5 });

  smStream.end();

  const sitemap = await streamToPromise(pipeline).then(sm => sm.toString('utf8'));

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Content-Encoding', 'gzip');
  res.send(sitemap);
};

// Set up analytics (Google Analytics)
export const setupAnalytics = () => {
  return `
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXX-X"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-XXXXXX-X');
    </script>
  `;
};

// Configure CI/CD pipeline
export const configureCICD = async () => {
  await execPromise('npm run build');
  await execPromise('npm run test');
  await execPromise('git push origin main');
};

// Add PWA support
export const addPWASupport = async () => {
  await generateSW({
    globDirectory: 'public/',
    globPatterns: ['**/*.{html,js,css,png,jpg}'],
    swDest: 'public/sw.js',
    clientsClaim: true,
    skipWaiting: true,
  });
};
