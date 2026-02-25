# Vercel Deployment Guide for Tula Medical Equipment Store

## Project Overview
This is a React + TypeScript + Vite e-commerce application for Tula Medical Equipment Store. The site features:
- Complete e-commerce functionality with shopping cart and checkout
- Multiple product categories (Hospital Beds, Wheelchairs, Scooters, etc.)
- Product pages with variants, specifications, and reviews
- About Us, Contact Us, and FAQ pages
- Responsive design with Tailwind CSS
- Motion animations for enhanced user experience

## Deployment Preparation Completed

✅ **Phase 1: Clean up and configuration**
- Created `.env.local` file for local development
- Removed unnecessary backend dependencies (express, better-sqlite3, dotenv)
- Removed unused Gemini API dependency
- Updated package.json with clean dependencies

✅ **Phase 2: Build optimization**
- Updated vite.config.ts for production builds
- Configured proper path resolution for Vercel
- Added build optimizations (code splitting, sourcemap disabled)
- Tested build process - successful

✅ **Phase 3: Vercel-specific setup**
- Created `vercel.json` configuration file
- Configured SPA routing with rewrites
- Set up build and dev commands
- Configured framework detection for Vite

✅ **Phase 4: Content improvements**
- Updated product data with more relevant medical equipment
- Replaced generic placeholder images with relevant Unsplash medical images
- Added more product categories and variants
- Ensured all images are properly sized and relevant to content

## How to Deploy to Vercel

### Option 1: Using Vercel CLI (Recommended)
1. Install Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from project directory:
   ```bash
   cd /mnt/ssd1/Downloads/srt/storetheme
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy: `Y`
   - Which scope: Choose your account
   - Link to existing project: `N`
   - Project name: `tula-medical-store` (or your preferred name)
   - Directory: `.`
   - Override settings: `N`

### Option 2: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your Git repository or drag & drop the project folder
4. Configure project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Click "Deploy"

### Option 3: Using GitHub Integration
1. Push your code to a GitHub repository
2. Connect your GitHub account to Vercel
3. Import the repository
4. Vercel will automatically detect Vite configuration
5. Click "Deploy"

## Environment Variables (Optional)
No environment variables are required for this deployment since we removed the Gemini API dependency. If you add any API integrations in the future, you can set them in the Vercel dashboard under Project Settings → Environment Variables.

## Post-Deployment Checklist
- [ ] Test the live site URL
- [ ] Verify all pages load correctly
- [ ] Test shopping cart functionality
- [ ] Check responsive design on mobile/tablet
- [ ] Verify all images load properly
- [ ] Test contact form (if functional)
- [ ] Check console for any errors

## Troubleshooting

### Common Issues:

1. **Build fails on Vercel**
   - Check Node.js version (requires 18+)
   - Verify all dependencies are in package.json
   - Check build logs in Vercel dashboard

2. **Images not loading**
   - Verify image URLs are accessible
   - Check CORS settings for external images
   - Ensure referrerPolicy is set correctly

3. **Routing issues**
   - SPA routing is configured in vercel.json
   - All routes should redirect to index.html
   - Check 404 page behavior

4. **Performance optimization**
   - Images are already optimized with proper dimensions
   - Code splitting is configured
   - Consider adding image optimization CDN if needed

## Local Development
To run locally:
```bash
npm install
npm run dev
```

The site will be available at `http://localhost:3000`

## Project Structure
```
├── src/
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Entry point
│   ├── index.css            # Tailwind CSS styles
│   └── data/
│       └── products.ts      # Product data
├── public/                  # Static assets
├── vite.config.ts           # Build configuration
├── vercel.json             # Vercel deployment config
├── package.json            # Dependencies
└── README.md               # Project documentation
```

## Support
For deployment issues, check:
1. Vercel documentation: https://vercel.com/docs
