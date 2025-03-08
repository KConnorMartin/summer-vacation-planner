# Summer Vacation Planner

A web application for collecting and voting on summer vacation activities. Features include:
- Add activities with URLs and titles
- Automatic website thumbnails
- Voting system
- Retro-styled interface
- Responsive design

## Deployment Options

### 1. GitHub Pages (Recommended for Beginners)
1. Create a GitHub account if you don't have one
2. Create a new repository
3. Push this code to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repository-url
   git push -u origin main
   ```
4. Go to repository Settings > Pages
5. Select 'main' branch and 'root' folder
6. Click Save - your site will be live at `https://username.github.io/repository-name`

### 2. Netlify (Alternative)
1. Create a Netlify account
2. Click "New site from Git"
3. Connect your repository
4. Deploy - Netlify will provide a URL

### 3. Traditional Web Hosting
Upload these files to your web hosting service:
- index.html
- styles.css
- script.js

## Local Development
Run a local server:
```bash
python -m http.server 8000
# or
npx serve
```

## Notes
- The app uses localStorage for data persistence
- Website thumbnails are provided by the Microlink API
- No backend server is required
