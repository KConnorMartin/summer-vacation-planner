# Summer Vacation Planner

A collaborative web application for collecting and voting on summer vacation activities. Perfect for families and groups planning trips together. All changes sync in real-time across devices!

## Features
- **Cross-Device Sync**: Activities and votes are synchronized across all devices in real-time
- **Duplicate Prevention**: Automatically detects and prevents duplicate activity submissions
- **Website Icons**: Automatically fetches website icons for visual recognition
- **Real-time Updates**: Changes appear instantly on all connected devices
- **Voting System**: Collaborative voting to prioritize activities
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## How to Use
1. **Add Activities**:
   - Enter a website URL (e.g., museum, restaurant, or attraction)
   - Add a descriptive title
   - Click "Add Activity"

2. **Vote on Activities**:
   - Click 👍 to vote for activities you like
   - Activities are automatically sorted by vote count
   - Everyone's votes are synchronized in real-time

3. **Manage Activities**:
   - Click 🗑️ to remove activities
   - Duplicate activities are automatically prevented
   - All changes sync instantly across devices

## Customization
You can easily customize the app by modifying these files:

### 1. Visual Style (`styles.css`)
- Change the color scheme:
  ```css
  :root {
    --primary-color: #40e0d0;    /* Buttons, links */
    --accent-color: #ff69b4;     /* Titles, highlights */
    --delete-color: #ff6b6b;     /* Delete button */
    --background: #f8f9fa;       /* Page background */
  }
  ```

### 2. App Behavior (`script.js`)
- Modify sorting order:
  ```javascript
  activities.sort((a, b) => b.votes - a.votes) // Most votes first
  // or
  activities.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Newest first
  ```

### 3. Database Schema (`setup.sql`)
- Add new fields:
  ```sql
  alter table activities 
  add column category text,
  add column description text;
  ```

## Technical Stack
- **Frontend**: HTML, CSS, JavaScript (ES6+)
- **Backend**: [Supabase](https://supabase.com) for database and real-time updates
- **APIs**: Google Favicon service for website icons
- **Hosting**: GitHub Pages (static hosting)

## Project Structure
```
summer-vacation-planner/
├── index.html          # Main HTML file
├── styles.css          # Retro-styled CSS
├── script.js           # Main application logic
├── database.js         # Supabase integration
└── setup.sql           # Database setup script
```

## Setup Guide

### 1. Supabase Configuration
1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Go to SQL Editor and run the contents of `setup.sql`
4. Go to Project Settings > API
5. Copy your project URL and anon/public key
6. Update `database.js` with your credentials:
   ```javascript
   const SUPABASE_URL = 'your-project-url'
   const SUPABASE_ANON_KEY = 'your-anon-key'
   ```

### 2. Deployment Options

#### GitHub Pages (Recommended)
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

#### Netlify (Alternative)
1. Create a Netlify account
2. Click "New site from Git"
3. Connect your repository
4. Deploy - Netlify will provide a URL

#### Traditional Web Hosting
Upload these files to your web hosting service:
- index.html
- styles.css
- script.js
- database.js

## Local Development
Run a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Contributing
Contributions are welcome! Here's how you can help:

1. **Report Bugs**
   - Open an issue describing the bug
   - Include steps to reproduce
   - Share browser and device details

2. **Suggest Features**
   - Open an issue describing the feature
   - Explain why it would be useful
   - Include mockups if relevant

3. **Submit Code**
   - Fork the repository
   - Create a feature branch
   - Submit a pull request
   - Follow existing code style

## Privacy & Security
- All data is stored in your Supabase project
- No personal information is collected
- Activities and votes are public to all users
- Consider enabling authentication for private deployments

## Notes
- The app uses Supabase for data persistence and real-time updates
- Website icons are provided by Google's Favicon service
- No additional backend server is required
- Perfect for family vacation planning, team outings, or group trips

## License
MIT License - feel free to use for any purpose!

## Support
Need help? Open an issue on GitHub or reach out to the maintainers.
