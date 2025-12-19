const Event = require('../models/Event');

const generateChecklist = (eventName) => {
  const commonItems = ['Book venue', 'Send invites', 'Plan catering', 'Arrange decorations'];
  const eventSpecific = {
    'birthday': ['Order cake', 'Buy gifts', 'Plan games'],
    'wedding': ['Book photographer', 'Choose flowers', 'Send save the dates'],
    'meeting': ['Prepare agenda', 'Book conference room', 'Send calendar invites'],
    'party': ['Create playlist', 'Buy drinks', 'Plan activities']
  };

  const eventType = Object.keys(eventSpecific).find(type => 
    eventName.toLowerCase().includes(type)
  );

  const items = eventType ? [...commonItems, ...eventSpecific[eventType]] : commonItems;
  return items.map(item => ({ item, completed: false }));
};

const getEventSuggestions = async (userId) => {
  const userEvents = await Event.find({ userId }).limit(10);
  const suggestions = [];

  if (userEvents.length === 0) {
    return ['Birthday Party', 'Team Meeting', 'Dinner Party', 'Workshop'];
  }

  const eventTypes = userEvents.map(event => {
    const name = event.name.toLowerCase();
    if (name.includes('birthday')) return 'Birthday Celebration';
    if (name.includes('meeting')) return 'Business Meeting';
    if (name.includes('party')) return 'Social Party';
    return 'General Event';
  });

  const uniqueTypes = [...new Set(eventTypes)];
  return uniqueTypes.slice(0, 4);
};

const createEvent = async (req, res) => {
  try {
    const { name, date, time, location, description, category, status, reminderEnabled } = req.body;
    const userId = req.user.userId;

    const checklist = generateChecklist(name);

    const event = new Event({
      name,
      date,
      time,
      location,
      description,
      category: category || 'Other',
      status: status || 'Upcoming',
      reminderEnabled: reminderEnabled || false,
      checklist,
      userId
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getEvents = async (req, res) => {
  try {
    const userId = req.user.userId;
    const events = await Event.find({ userId }).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getSuggestions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const suggestions = await getEventSuggestions(userId);
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const event = await Event.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      { new: true }
    );
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const event = await Event.findOneAndDelete({ _id: id, userId });
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createEvent, getEvents, getSuggestions, updateEvent, deleteEvent };