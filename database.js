import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// We'll replace these with your Supabase project credentials
const SUPABASE_URL = 'https://ttmvdzdaclecwrlxwoiu.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0bXZkemRhY2xlY3dybHh3b2l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NjQzNzksImV4cCI6MjA1NzA0MDM3OX0.MArVRj56CY8QyBSRw7VG2cIMuVeNwAhry8bUWc4Vnt4'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export async function getActivities() {
    const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('votes', { ascending: false })
    
    if (error) {
        console.error('Error fetching activities:', error)
        return []
    }
    return data
}

export async function addActivity(activity) {
    const { data, error } = await supabase
        .from('activities')
        .insert([activity])
        .select()
    
    if (error) {
        console.error('Error adding activity:', error)
        return null
    }
    return data[0]
}

export async function updateVotes(id, votes) {
    const { data, error } = await supabase
        .from('activities')
        .update({ votes })
        .eq('id', id)
        .select()
    
    if (error) {
        console.error('Error updating votes:', error)
        return null
    }
    return data[0]
}

// Subscribe to real-time changes
export function subscribeToActivities(callback) {
    return supabase
        .channel('activities')
        .on('postgres_changes', 
            { event: '*', schema: 'public', table: 'activities' }, 
            callback
        )
        .subscribe()
}
