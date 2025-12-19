import { useState } from 'react'
import axios from 'axios'

function EventCard({ event, onUpdate }) {
  const [reminderEnabled, setReminderEnabled] = useState(event.reminderEnabled)
  const [showChecklist, setShowChecklist] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: event.name,
    date: event.date.split('T')[0],
    time: event.time,
    location: event.location,
    description: event.description,
    category: event.category,
    status: event.status
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const toggleReminder = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(
        `http://localhost:5000/api/events/${event._id}`,
        { reminderEnabled: !reminderEnabled },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setReminderEnabled(!reminderEnabled)
      onUpdate()
    } catch (error) {
      console.error('Error updating reminder:', error)
    }
  }

  const handleEdit = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value })
  }

  const saveEdit = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(
        `http://localhost:5000/api/events/${event._id}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setIsEditing(false)
      onUpdate()
    } catch (error) {
      console.error('Error updating event:', error)
    }
  }

  const deleteEvent = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const token = localStorage.getItem('token')
        await axios.delete(
          `http://localhost:5000/api/events/${event._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        onUpdate()
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      Work: 'bg-blue-600',
      Personal: 'bg-green-600',
      Social: 'bg-purple-600',
      Other: 'bg-gray-600'
    }
    return colors[category] || 'bg-gray-600'
  }

  const getStatusColor = (status) => {
    const colors = {
      Upcoming: 'text-blue-400',
      Completed: 'text-green-400',
      Cancelled: 'text-red-400'
    }
    return colors[status] || 'text-gray-400'
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <input
              name="name"
              value={editData.name}
              onChange={handleEdit}
              className="text-xl font-semibold bg-gray-700 text-white px-2 py-1 rounded"
            />
          ) : (
            <h3 className="text-xl font-semibold text-white">{event.name}</h3>
          )}
          <span className={`px-2 py-1 rounded text-xs text-white ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>
        </div>
        <button
          onClick={toggleReminder}
          className={`px-3 py-1 rounded text-sm ${
            reminderEnabled 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-600 text-gray-300'
          }`}
        >
          {reminderEnabled ? 'Reminder On' : 'Reminder Off'}
        </button>
      </div>
      
      <div className="mb-3">
        <span className={`text-sm font-medium ${getStatusColor(event.status)}`}>
          Status: {event.status}
        </span>
      </div>
      
      {isEditing ? (
        <div className="space-y-3 mb-4">
          <input name="date" type="date" value={editData.date} onChange={handleEdit} className="w-full px-2 py-1 bg-gray-700 text-white rounded" />
          <input name="time" type="time" value={editData.time} onChange={handleEdit} className="w-full px-2 py-1 bg-gray-700 text-white rounded" />
          <input name="location" value={editData.location} onChange={handleEdit} className="w-full px-2 py-1 bg-gray-700 text-white rounded" placeholder="Location" />
          <textarea name="description" value={editData.description} onChange={handleEdit} className="w-full px-2 py-1 bg-gray-700 text-white rounded" rows="2" />
          <select name="category" value={editData.category} onChange={handleEdit} className="w-full px-2 py-1 bg-gray-700 text-white rounded">
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Social">Social</option>
            <option value="Other">Other</option>
          </select>
          <select name="status" value={editData.status} onChange={handleEdit} className="w-full px-2 py-1 bg-gray-700 text-white rounded">
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      ) : (
        <div className="space-y-2 text-gray-300 mb-4">
          <p><span className="text-gray-400">Date:</span> {formatDate(event.date)}</p>
          <p><span className="text-gray-400">Time:</span> {event.time}</p>
          <p><span className="text-gray-400">Location:</span> {event.location}</p>
          <p><span className="text-gray-400">Description:</span> {event.description}</p>
        </div>
      )}
      
      <div className="flex space-x-2 mb-4">
        {isEditing ? (
          <>
            <button onClick={saveEdit} className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">Save</button>
            <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700">Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">Edit</button>
            <button onClick={deleteEvent} className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">Delete</button>
          </>
        )}
      </div>
      
      <div>
        <button
          onClick={() => setShowChecklist(!showChecklist)}
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          {showChecklist ? 'Hide Checklist' : 'Show Checklist'}
        </button>
        
        {showChecklist && (
          <div className="mt-3 space-y-2">
            <h4 className="text-sm font-medium text-gray-400">Event Checklist:</h4>
            {event.checklist.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={item.completed}
                  readOnly
                  className="rounded"
                />
                <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-300'}`}>
                  {item.item}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EventCard