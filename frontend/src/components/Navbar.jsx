import { Link } from 'react-router-dom'

function Navbar({ onLogout }) {
  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-blue-400">
          PlanIt
        </Link>
        <div className="flex space-x-4">
          <Link 
            to="/dashboard" 
            className="text-gray-300 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <Link 
            to="/create-event" 
            className="text-gray-300 hover:text-white transition-colors"
          >
            Create Event
          </Link>
          <button 
            onClick={onLogout}
            className="text-gray-300 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar