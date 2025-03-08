import { getActivities, addActivity, updateVotes, subscribeToActivities } from './database.js'

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
    try {
        const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`)
        const data = await response.json()
        return data.data.screenshot.url
    } catch (error) {
        console.error('Error fetching thumbnail:', error)
        return null
    }
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
        
        const voteButton = document.createElement('button')
        voteButton.textContent = '👍 Vote'
        voteButton.onclick = () => handleVote(activity.id)
        
        content.appendChild(title)
        content.appendChild(link)
        content.appendChild(votes)
        content.appendChild(voteButton)
        
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
