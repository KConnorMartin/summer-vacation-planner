// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // Get DOM elements
    const addButton = document.getElementById('addActivityBtn');
    const urlInput = document.getElementById('activityUrl');
    const titleInput = document.getElementById('activityTitle');
    const activitiesGrid = document.getElementById('activities-grid');

    // Load saved activities
    let activities = [];
    try {
        const saved = localStorage.getItem('activities');
        if (saved) {
            activities = JSON.parse(saved);
            // Add thumbnails to existing activities if they don't have them
            let needsUpdate = false;
            activities.forEach(activity => {
                if (!activity.thumbnail) {
                    activity.thumbnail = `https://api.microlink.io/?url=${encodeURIComponent(activity.url)}&screenshot=true&embed=screenshot.url`;
                    needsUpdate = true;
                }
            });
            if (needsUpdate) {
                localStorage.setItem('activities', JSON.stringify(activities));
            }
            console.log('Loaded saved activities:', activities);
        }
    } catch (error) {
        console.error('Error loading saved activities:', error);
    }

    // Add event listener to the button
    addButton.addEventListener('click', async function() {
        console.log('Add button clicked');
        
        const url = urlInput.value.trim();
        const title = titleInput.value.trim();
        
        console.log('Input values:', { url, title });

        if (!url || !title) {
            alert('Please enter both URL and title for the activity');
            return;
        }

        try {
            new URL(url);
        } catch (_) {
            alert('Please enter a valid URL (including http:// or https://)');
            return;
        }

        // Create new activity
        const activity = {
            id: Date.now(),
            url: url,
            title: title,
            votes: 0,
            thumbnail: `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&embed=screenshot.url`
        };

        // Add to activities array
        activities.push(activity);
        
        // Save to localStorage
        try {
            localStorage.setItem('activities', JSON.stringify(activities));
            console.log('Saved activities:', activities);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            alert('Error saving activity. Please try again.');
            return;
        }

        // Clear inputs
        urlInput.value = '';
        titleInput.value = '';

        // Render the updated list
        renderActivities();
    });

    function renderActivities() {
        console.log('Rendering activities:', activities);
        
        // Clear the grid
        activitiesGrid.innerHTML = '';

        // Sort by votes
        activities.sort((a, b) => b.votes - a.votes);

        // Create tiles
        activities.forEach(activity => {
            const tile = document.createElement('div');
            tile.className = 'activity-tile';
            
            // Create thumbnail container
            const thumbnailContainer = document.createElement('div');
            thumbnailContainer.className = 'thumbnail-container';
            
            // Create and setup thumbnail image
            const thumbnail = document.createElement('img');
            thumbnail.className = 'activity-thumbnail';
            thumbnail.src = activity.thumbnail;
            thumbnail.alt = `Preview of ${activity.title}`;
            thumbnail.onerror = function() {
                thumbnailContainer.style.display = 'none';
                tile.classList.add('no-thumbnail');
            };
            thumbnailContainer.appendChild(thumbnail);
            
            const title = document.createElement('h3');
            title.className = 'activity-title';
            title.textContent = activity.title;
            
            const link = document.createElement('a');
            link.href = activity.url;
            link.className = 'activity-url';
            link.textContent = activity.url;
            link.target = '_blank';
            
            const voteSection = document.createElement('div');
            voteSection.className = 'vote-section';
            
            const voteCount = document.createElement('span');
            voteCount.className = 'vote-count';
            voteCount.textContent = `${activity.votes} votes`;
            
            const voteButton = document.createElement('button');
            voteButton.className = 'vote-button';
            voteButton.textContent = 'Vote';
            voteButton.addEventListener('click', function() {
                activity.votes++;
                localStorage.setItem('activities', JSON.stringify(activities));
                renderActivities();
            });

            voteSection.appendChild(voteCount);
            voteSection.appendChild(voteButton);
            
            tile.appendChild(thumbnailContainer);
            tile.appendChild(title);
            tile.appendChild(link);
            tile.appendChild(voteSection);
            
            activitiesGrid.appendChild(tile);
        });
    }

    // Initial render
    renderActivities();
});
