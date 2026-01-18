# CV Maker (Resume.io Clone)

A professional resume builder web application built with React, TypeScript, and Vite.
Features a live preview, dynamic form sections, and export to PDF/DOCX.

## Features implemented
- **Real-time Preview**: See changes instantly as you type.
- **Stockholm Template**: Professional layout with clear typography.
- **Section Management**: Add, remove, and edit Employment and Education history.
- **Export Options**: 
  - **PDF**: High-quality print-ready PDF export.
  - **DOCX**: Editable Word document export.
- **Responsive Design**: Works on desktop and mobile.

## How to Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:5173 to view the app.

## How to Deploy to Vercel (Free)

Since this project is configured for Vercel, deployment is simple.

1. **Push to GitHub**:
   - Create a new repository on GitHub.
   - Run the following commands in this folder:
     ```bash
     git add .
     git commit -m "Initial release"
     git branch -M main
     git remote add origin <YOUR_REPO_URL>
     git push -u origin main
     ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click "Add New..." -> "Project".
   - Import your GitHub repository.
   - Vercel will auto-detect Vite. Click "Deploy".

## Tech Stack
- **Framework**: React + Vite
- **Language**: TypeScript
- **Styling**: CSS Modules / Vanilla CSS Variables
- **PDF Export**: Native Browser Print
- **Word Export**: `docx` library
- **Icons**: `lucide-react`
