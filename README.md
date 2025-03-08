# Summer Vacation Planner

A web application for collecting and voting on summer vacation activities. Features include:
- Add activities with URLs and titles
- Automatic website icons
- Real-time updates across devices
- Voting system
- Duplicate activity prevention
- Retro-styled interface
- Responsive design

## Features
- **Cross-Device Sync**: Activities and votes are synchronized across all devices in real-time
- **Duplicate Prevention**: Automatically detects and prevents duplicate activity submissions
- **Website Icons**: Automatically fetches website icons for visual recognition
- **Real-time Updates**: Changes appear instantly on all connected devices
- **Voting System**: Collaborative voting to prioritize activities

## Technical Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: [Supabase](https://supabase.com) for database and real-time updates
- **APIs**: Google Favicon service for website icons

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
- database.js

## Setup
1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Run the SQL setup script from `setup.sql`
4. Update `database.js` with your Supabase project URL and anon key
5. Deploy using one of the methods above

## Local Development
Run a local server:
```bash
python -m http.server 8000
# or
npx serve
```

## Notes
- The app uses Supabase for data persistence and real-time updates
- Website icons are provided by Google's Favicon service
- No additional backend server is required
