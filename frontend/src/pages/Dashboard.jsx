import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import EventCard from '../components/EventCard'

function Dashboard() {
  const [events, setEvents] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/api/events', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setEvents(response.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSuggestions = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:5000/api/events/suggestions', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSuggestions(response.data)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
    }
  }

  useEffect(() => {
    fetchEvents()
    fetchSuggestions()
  }, [])

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date())

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => { fetchEvents(); fetchSuggestions(); }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Refresh
          </button>
          <Link
            to="/create-event"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Create New Event
          </Link>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="mb-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-3">Smart Event Suggestions</h2>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <span
                key={index}
                className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                {suggestion}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Upcoming Events</h2>
        {loading ? (
          <p className="text-gray-400">Loading events...</p>
        ) : upcomingEvents.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
            <p className="text-gray-400 mb-4">No upcoming events yet</p>
            <Link
              to="/create-event"
              className="text-blue-400 hover:text-blue-300"
            >
              Create your first event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <EventCard key={event._id} event={event} onUpdate={fetchEvents} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard