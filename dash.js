    let currentDate = new Date();
    let events = [
    {
        date: '2024-01-15',
        name: 'Diwali Lighting',
        energy: 50,
        type: 'festival'
    },
    {
        date: '2024-01-20',
        name: 'Wedding Celebration',
        energy: 30,
        type: 'wedding'
    },
    {
        date: '2024-01-25',
        name: 'School Function',
        energy: 20,
        type: 'community'
    }
    ];
    
   
    function generateCalendar() {
      const calendar = document.getElementById('calendar');
      const currentMonth = document.getElementById('currentMonth');
      
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      
      
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      currentMonth.textContent = `${monthNames[month]} ${year}`;
      
      
      calendar.innerHTML = '';
      
      
      const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.textContent = day;
        calendar.appendChild(header);
      });
      
      
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysInPrevMonth = new Date(year, month, 0).getDate();
      
     
      for (let i = firstDay - 1; i >= 0; i--) {
        const dayDiv = createDayElement(daysInPrevMonth - i, true, year, month - 1);
        calendar.appendChild(dayDiv);
      }
      
      
      for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = createDayElement(day, false, year, month);
        calendar.appendChild(dayDiv);
      }
      
     
      const totalCells = calendar.children.length - 7; // Subtract headers
      const remainingCells = 42 - totalCells; // 6 rows × 7 days - headers
      for (let day = 1; day <= remainingCells; day++) {
        const dayDiv = createDayElement(day, true, year, month + 1);
        calendar.appendChild(dayDiv);
      }
    }
    
    function createDayElement(day, isOtherMonth, year, month) {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'calendar-day';
      
      if (isOtherMonth) {
        dayDiv.classList.add('other-month');
      }
      
      
      const today = new Date();
      const dayDate = new Date(year, month, day);
      if (!isOtherMonth && 
          dayDate.toDateString() === today.toDateString()) {
        dayDiv.classList.add('today');
      }
      
      
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      const dayEvents = events.filter(event => event.date === dateStr);
      
      if (dayEvents.length > 0) {
        dayDiv.classList.add('has-event');
      }
      
     
      const dayNumber = document.createElement('div');
      dayNumber.className = 'day-number';
      dayNumber.textContent = day;
      dayDiv.appendChild(dayNumber);
      
      
      dayEvents.forEach(event => {
        const indicator = document.createElement('span');
        indicator.className = `event-indicator ${event.type}`;
        indicator.textContent = `${event.energy}kWh`;
        indicator.title = `${event.name} - ${event.energy}kWh`;
        dayDiv.appendChild(indicator);
      });
      
      return dayDiv;
    }
    
    function previousMonth() {
      currentDate.setMonth(currentDate.getMonth() - 1);
      generateCalendar();
    }
    
    function nextMonth() {
      currentDate.setMonth(currentDate.getMonth() + 1);
      generateCalendar();
    }
    
    
    function openBookingModal(eventType) {
      const modal = document.getElementById('bookingModal');
      const modalTitle = document.getElementById('modalTitle');
      const eventTypeSelect = document.getElementById('eventType');
      
      const titles = {
        community: 'Book Community Meeting',
        wedding: 'Book Wedding Ceremony',
        festival: 'Book Festival Celebration',
        other: 'Book Event'
      };
      
      modalTitle.textContent = titles[eventType] || 'Book Event';
      eventTypeSelect.value = eventType;
      
      modal.style.display = 'block';
    }
    
    function closeBookingModal() {
      const modal = document.getElementById('bookingModal');
      modal.style.display = 'none';
      document.getElementById('bookingForm').reset();
    }
    
    
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('eventName').value,
        date: document.getElementById('eventDate').value,
        energy: parseInt(document.getElementById('energyNeeded').value),
        type: document.getElementById('eventType').value,
        description: document.getElementById('description').value
      };
      
     
      events.push({
        date: formData.date,
        name: formData.name,
        energy: formData.energy,
        type: formData.type
      });
      
      const currentBorrowed = parseInt(document.getElementById('energyBorrowed').textContent);
      document.getElementById('energyBorrowed').textContent = (currentBorrowed + formData.energy) + ' kWh';
      
      
      generateCalendar();
      
      
      closeBookingModal();
      
      alert(`Event "${formData.name}" booked successfully for ${formData.date}!`);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
      const modal = document.getElementById('bookingModal');
      if (e.target === modal) {
        closeBookingModal();
      }

    generateCalendar();
    });
    

    


  