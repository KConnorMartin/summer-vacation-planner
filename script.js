import { getActivities, addActivity, updateVotes, subscribeToActivities, checkDuplicateUrl, deleteActivity } from './database.js'

let activities = []

async function loadActivities() {
    console.log('Loading activities...')
    activities = await getActivities()
    console.log('Loaded activities:', activities)
    renderActivities()
}

async function handleAddActivity() {
    console.log('Adding new activity...')
    const urlInput = document.getElementById('activityUrl')
    const titleInput = document.getElementById('activityTitle')
    const url = urlInput.value.trim()
    const title = titleInput.value.trim()

    if (!url || !title) {
        alert('Please enter both URL and title')
        return
    }

    if (!isValidUrl(url)) {
        alert('Please enter a valid URL')
        return
    }

    try {
        // Check for duplicate URL
        const duplicate = await checkDuplicateUrl(url)
        if (duplicate) {
            alert(`This activity has already been suggested! It's titled "${duplicate.title}"`)
            return
        }

        console.log('Fetching thumbnail...')
        const thumbnail = await fetchThumbnail(url)
        console.log('Thumbnail:', thumbnail)
        
        const newActivity = {
            url,
            title,
            votes: 0,
            thumbnail
        }

        console.log('Adding to database:', newActivity)
        const addedActivity = await addActivity(newActivity)
        console.log('Added activity:', addedActivity)
        
        if (addedActivity) {
            urlInput.value = ''
            titleInput.value = ''
            await loadActivities() // Reload activities after adding
        }
    } catch (error) {
        console.error('Error adding activity:', error)
        alert('Error adding activity. Please try again.')
    }
}

async function handleDelete(id, title) {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
        console.log('Deleting activity:', id)
        const success = await deleteActivity(id)
        if (success) {
            await loadActivities() // Reload activities after deletion
        } else {
            alert('Error deleting activity. Please try again.')
        }
    }
}

async function handleVote(id) {
    console.log('Voting for activity:', id)
    const activity = activities.find(a => a.id === id)
    if (!activity) return

    const newVotes = activity.votes + 1
    const updatedActivity = await updateVotes(id, newVotes)
    
    if (updatedActivity) {
        activity.votes = newVotes
        renderActivities()
    }
}

async function fetchThumbnail(url) {
    // Use a free service that provides OpenGraph previews
    return `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(url)}&size=128`
}

function renderActivities() {
    console.log('Rendering activities:', activities)
    const container = document.getElementById('activities-grid')
    container.innerHTML = ''

    activities.sort((a, b) => b.votes - a.votes)

    activities.forEach(activity => {
        const tile = document.createElement('div')
        tile.className = 'activity-tile'
        
        const thumbnailContainer = document.createElement('div')
        thumbnailContainer.className = 'thumbnail-container'
        
        if (activity.thumbnail) {
            const thumbnail = document.createElement('img')
            thumbnail.src = activity.thumbnail
            thumbnail.alt = activity.title
            thumbnail.onerror = () => {
                thumbnailContainer.style.display = 'none'
            }
            thumbnailContainer.appendChild(thumbnail)
        }

        const content = document.createElement('div')
        content.className = 'activity-content'
        
        const title = document.createElement('h3')
        title.textContent = activity.title
        
        const link = document.createElement('a')
        link.href = activity.url
        link.textContent = 'Visit Site'
        link.target = '_blank'
        
        const votes = document.createElement('div')
        votes.className = 'votes'
        votes.textContent = `${activity.votes} votes`
        
        const buttonContainer = document.createElement('div')
        buttonContainer.className = 'button-container'
        
        const voteButton = document.createElement('button')
        voteButton.textContent = '👍 Vote'
        voteButton.onclick = () => handleVote(activity.id)
        
        const deleteButton = document.createElement('button')
        deleteButton.textContent = '🗑️ Delete'
        deleteButton.className = 'delete-button'
        deleteButton.onclick = () => handleDelete(activity.id, activity.title)
        
        buttonContainer.appendChild(voteButton)
        buttonContainer.appendChild(deleteButton)
        
        content.appendChild(title)
        content.appendChild(link)
        content.appendChild(votes)
        content.appendChild(buttonContainer)
        
        tile.appendChild(thumbnailContainer)
        tile.appendChild(content)
        container.appendChild(tile)
    })
}

function isValidUrl(string) {
    try {
        new URL(string)
        return true
    } catch (_) {
        return false
    }
}

// Set up real-time subscription
subscribeToActivities((payload) => {
    console.log('Real-time update:', payload)
    loadActivities()
})

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...')
    loadActivities()
    document.getElementById('addActivityBtn').addEventListener('click', handleAddActivity)
})
