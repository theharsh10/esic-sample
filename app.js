// Dashboard Data
const dashboardData = {
  networkOverview: {
    totalFacilities: 22,
    totalPatients: 36444,
    totalPrescriptions: 20091,
    totalReferrals: 3128,
    totalCertificates: 2300,
    medicalInterventions: 1474,
    dispensaries: 21,
    hospitals: 1
  },
  monthlyTrends: {
    months: ["April", "May", "June", "July", "August"],
    footfall: [16178, 23150, 24832, 29486, 28775],
    prescriptions: [9330, 11425, 13464, 18207, 17749],
    referrals: [2485, 2505, 2845, 3430, 3128],
    certificates: [2078, 2089, 2047, 2503, 2300]
  },
  topDispensaries: [
    {name: "Chinchwad", footfall: 4177, prescriptions: 1690, score: 98},
    {name: "Sanaswadi", footfall: 2790, prescriptions: 1789, score: 95},
    {name: "Chakan", footfall: 2439, prescriptions: 1652, score: 94},
    {name: "Talegaon", footfall: 2376, prescriptions: 998, score: 92},
    {name: "Baramati", footfall: 1735, prescriptions: 1006, score: 90}
  ],
  hospitalDepartments: [
    {name: "General Medicine (Dr. Dhage)", checkins: 3686, interventions: 218},
    {name: "Orthopaedics (Dr. Pallavi)", checkins: 1922, interventions: 939},
    {name: "Ayurveda (Dr. Sutar)", checkins: 628, interventions: 90},
    {name: "Eye (Ophthalmology)", checkins: 433, interventions: 0},
    {name: "ENT (Dr. Rupalee)", checkins: 378, interventions: 27}
  ],
  facilities: [
    {id: 1, name: "Alandi", type: "Dispensary", block: "Pune Urban", status: "Active", staff: 8, score: 85},
    {id: 2, name: "Baramati", type: "Dispensary", block: "Pune Rural", status: "Active", staff: 10, score: 90},
    {id: 3, name: "Bhosari", type: "Dispensary", block: "Pune Urban", status: "Active", staff: 9, score: 87},
    {id: 4, name: "Chakan", type: "Dispensary", block: "Pune Urban", status: "Active", staff: 12, score: 94},
    {id: 5, name: "Chinchwad", type: "Dispensary", block: "Pune Urban", status: "Active", staff: 15, score: 98},
    {id: 6, name: "Sanaswadi", type: "Dispensary", block: "Pune Rural", status: "Active", staff: 11, score: 95},
    {id: 7, name: "Talegaon", type: "Dispensary", block: "Pune Rural", status: "Active", staff: 9, score: 92},
    {id: 8, name: "Hadapsar", type: "Dispensary", block: "Pune Urban", status: "Active", staff: 13, score: 88},
    {id: 9, name: "Saswad", type: "Dispensary", block: "Pune Rural", status: "Active", staff: 7, score: 83},
    {id: 10, name: "Khed Shivapur", type: "Dispensary", block: "Pune Rural", status: "Active", staff: 6, score: 78},
    {id: 22, name: "Dhanwantari Hospital", type: "Hospital", block: "Pune Central", status: "Active", staff: 45, score: 98}
  ],
  alerts: [
    {type: "critical", message: "Bhosari dispensary showing declining footfall", priority: "High", time: "2 hours ago"},
    {type: "warning", message: "Medical supplies running low at 3 facilities", priority: "Medium", time: "4 hours ago"},
    {type: "info", message: "Staff training scheduled for next week", priority: "Low", time: "1 day ago"}
  ],
  targets: [
    {metric: "Daily Footfall", target: 30000, current: 28775, achievement: 95.9},
    {metric: "Monthly Prescriptions", target: 20000, current: 17749, achievement: 88.7},
    {metric: "Monthly Referrals", target: 3500, current: 3128, achievement: 89.4}
  ]
};

// Application State
let currentTab = 'overview';
let currentTheme = 'light';
let charts = {};

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
  console.log('Dashboard initializing...');
  
  // Initialize in correct order with delays to ensure DOM is ready
  setTimeout(() => {
    setupTabNavigation();
    setupThemeToggle();
    setupFilters();
    setupEventListeners();
    setupModals();
    setupMapInteractions();
    
    // Generate facility cards first
    generateFacilityCards();
    
    // Then initialize charts
    setTimeout(() => {
      initializeCharts();
    }, 200);
    
    // Start real-time updates
    setTimeout(() => {
      simulateRealTimeUpdates();
    }, 1000);
    
    console.log('Dashboard initialized successfully');
  }, 100);
});

// Tab Navigation - Completely Fixed
function setupTabNavigation() {
  console.log('Setting up tab navigation...');
  
  // Get all tab buttons and content areas
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  console.log('Found', tabButtons.length, 'tab buttons and', tabContents.length, 'tab contents');
  
  // Remove any existing event listeners and add new ones
  tabButtons.forEach((button) => {
    // Remove existing listeners by cloning the node
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    
    // Add click event listener
    newButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const targetTab = this.getAttribute('data-tab');
      console.log('Tab clicked:', targetTab);
      
      if (targetTab) {
        switchTab(targetTab);
      }
    });
  });
  
  console.log('Tab navigation setup complete');
}

function switchTab(tabId) {
  console.log('Switching to tab:', tabId);
  
  try {
    // Remove active class from all tab buttons
    const allButtons = document.querySelectorAll('.tab-btn');
    allButtons.forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Add active class to clicked tab button
    const targetButton = document.querySelector(`[data-tab="${tabId}"]`);
    if (targetButton) {
      targetButton.classList.add('active');
      console.log('Button activated for tab:', tabId);
    }
    
    // Hide all tab contents
    const allContents = document.querySelectorAll('.tab-content');
    allContents.forEach(content => {
      content.classList.remove('active');
      content.style.display = 'none';
    });
    
    // Show target tab content
    const targetContent = document.getElementById(`${tabId}-tab`);
    if (targetContent) {
      targetContent.classList.add('active');
      targetContent.style.display = 'block';
      console.log('Content shown for tab:', tabId);
      
      // Special handling for directory tab to ensure facility cards are present
      if (tabId === 'directory') {
        setTimeout(() => {
          generateFacilityCards();
        }, 50);
      }
      
      // Special handling for charts
      if (tabId === 'directory' || tabId === 'analysis' || tabId === 'overview') {
        setTimeout(() => {
          refreshCharts();
        }, 100);
      }
    } else {
      console.error('Tab content not found for:', `${tabId}-tab`);
    }
    
    currentTab = tabId;
    console.log('Tab switch completed successfully to:', tabId);
    
  } catch (error) {
    console.error('Error switching tabs:', error);
  }
}

// Generate Facility Cards - Enhanced
function generateFacilityCards() {
  console.log('Generating facility cards...');
  
  const facilitiesGrid = document.querySelector('.facilities-grid');
  if (!facilitiesGrid) {
    console.warn('Facilities grid not found, creating it...');
    
    // Find the directory tab content and add the grid if missing
    const directoryTab = document.getElementById('directory-tab');
    if (directoryTab) {
      // Check if facilities grid already exists in the HTML
      let existingGrid = directoryTab.querySelector('.facilities-grid');
      if (!existingGrid) {
        // Create the facilities grid section
        const facilitiesSection = document.createElement('div');
        facilitiesSection.innerHTML = `
          <div class="facilities-grid">
            <!-- Cards will be generated here -->
          </div>
        `;
        
        // Insert after the search filters
        const searchFilters = directoryTab.querySelector('.search-filters');
        if (searchFilters) {
          searchFilters.parentNode.insertBefore(facilitiesSection, searchFilters.nextSibling);
        } else {
          directoryTab.appendChild(facilitiesSection);
        }
        
        existingGrid = directoryTab.querySelector('.facilities-grid');
      }
    }
  }
  
  const grid = document.querySelector('.facilities-grid');
  if (!grid) {
    console.error('Could not create or find facilities grid');
    return;
  }
  
  // Clear existing cards
  grid.innerHTML = '';
  
  // Generate cards for all facilities
  dashboardData.facilities.forEach((facility, index) => {
    const card = document.createElement('div');
    card.className = 'facility-card';
    card.innerHTML = `
      <div class="facility-header">
        <h3>${facility.name}</h3>
        <span class="status-badge ${facility.status.toLowerCase()}">${facility.status}</span>
      </div>
      <div class="facility-details">
        <p><strong>Type:</strong> ${facility.type}</p>
        <p><strong>Block:</strong> ${facility.block}</p>
        <p><strong>Staff:</strong> ${facility.staff} personnel</p>
        <p><strong>Performance Score:</strong> <span class="score ${facility.score >= 90 ? 'high' : facility.score >= 80 ? 'medium' : 'low'}">${facility.score}</span></p>
      </div>
      <div class="facility-actions">
        <button class="btn btn--sm btn--outline view-details-btn" data-facility="${facility.name}">View Details</button>
        <button class="btn btn--sm btn--primary contact-btn" data-facility="${facility.name}">Contact</button>
      </div>
    `;
    grid.appendChild(card);
  });
  
  console.log(`Generated ${dashboardData.facilities.length} facility cards`);
}

// Theme Toggle - Fixed
function setupThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) {
    console.warn('Theme toggle button not found');
    return;
  }
  
  themeToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    this.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    
    console.log('Theme switched to:', currentTheme);
    showNotification(`Switched to ${currentTheme} mode`);
    
    // Update charts for theme change
    setTimeout(() => {
      refreshCharts();
    }, 100);
  });
}

// Initialize Charts - Enhanced Error Handling
function initializeCharts() {
  console.log('Initializing charts...');
  
  try {
    initializeTrendsChart();
    initializeDispensaryChart();
    initializeDepartmentChart();
    initializeTrendComparisonChart();
    console.log('All charts initialized successfully');
  } catch (error) {
    console.error('Error initializing charts:', error);
  }
}

function initializeTrendsChart() {
  const ctx = document.getElementById('trendsChart');
  if (!ctx) {
    console.warn('Trends chart canvas not found');
    return;
  }

  // Destroy existing chart if it exists
  if (charts.trends) {
    charts.trends.destroy();
  }

  charts.trends = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dashboardData.monthlyTrends.months,
      datasets: [
        {
          label: 'Patient Footfall',
          data: dashboardData.monthlyTrends.footfall,
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Prescriptions',
          data: dashboardData.monthlyTrends.prescriptions,
          borderColor: '#FFC185',
          backgroundColor: 'rgba(255, 193, 133, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Referrals',
          data: dashboardData.monthlyTrends.referrals,
          borderColor: '#B4413C',
          backgroundColor: 'rgba(180, 65, 60, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Certificates',
          data: dashboardData.monthlyTrends.certificates,
          borderColor: '#5D878F',
          backgroundColor: 'rgba(93, 135, 143, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'ESIC Pune Healthcare Network - Monthly Performance Trends (Apr-Aug 2025)'
        },
        legend: {
          position: 'bottom'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value.toLocaleString();
            }
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  });
  
  console.log('Trends chart initialized');
}

function initializeDispensaryChart() {
  const ctx = document.getElementById('dispensaryChart');
  if (!ctx) {
    console.warn('Dispensary chart canvas not found');
    return;
  }

  // Destroy existing chart if it exists
  if (charts.dispensary) {
    charts.dispensary.destroy();
  }

  charts.dispensary = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dashboardData.topDispensaries.map(d => d.name),
      datasets: [{
        label: 'Patient Footfall',
        data: dashboardData.topDispensaries.map(d => d.footfall),
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F', '#DB4545'],
        borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F', '#DB4545'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Top Performing ESIC Dispensaries by Patient Footfall'
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value.toLocaleString();
            }
          }
        }
      }
    }
  });
  
  console.log('Dispensary chart initialized');
}

function initializeDepartmentChart() {
  const ctx = document.getElementById('departmentChart');
  if (!ctx) {
    console.warn('Department chart canvas not found');
    return;
  }

  // Destroy existing chart if it exists
  if (charts.department) {
    charts.department.destroy();
  }

  charts.department = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dashboardData.hospitalDepartments.map(d => d.name.split('(')[0].trim()),
      datasets: [{
        label: 'Patient Check-ins',
        data: dashboardData.hospitalDepartments.map(d => d.checkins),
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F', '#DB4545'],
        borderColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F', '#DB4545'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        title: {
          display: true,
          text: 'Dhanwantari Hospital - Department Utilization (June 2025)'
        },
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value.toLocaleString();
            }
          }
        }
      }
    }
  });
  
  console.log('Department chart initialized');
}

function initializeTrendComparisonChart() {
  const ctx = document.getElementById('trendComparisonChart');
  if (!ctx) {
    console.warn('Trend comparison chart canvas not found');
    return;
  }

  // Destroy existing chart if it exists
  if (charts.trendComparison) {
    charts.trendComparison.destroy();
  }

  charts.trendComparison = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dashboardData.monthlyTrends.months,
      datasets: [
        {
          label: 'Footfall Growth %',
          data: [0, 43, 7, 19, -2],
          borderColor: '#1FB8CD',
          backgroundColor: 'rgba(31, 184, 205, 0.1)',
          tension: 0.4,
          yAxisID: 'y'
        },
        {
          label: 'Prescription Rate %',
          data: [0, 22, 18, 35, -2],
          borderColor: '#FFC185',
          backgroundColor: 'rgba(255, 193, 133, 0.1)',
          tension: 0.4,
          yAxisID: 'y'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Growth Rate Comparison (%)'
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      }
    }
  });
  
  console.log('Trend comparison chart initialized');
}

function refreshCharts() {
  console.log('Refreshing charts...');
  Object.values(charts).forEach(chart => {
    if (chart && typeof chart.resize === 'function') {
      try {
        chart.resize();
        chart.update('none');
      } catch (error) {
        console.warn('Error refreshing chart:', error);
      }
    }
  });
}

// Modal Functionality - Enhanced
function setupModals() {
  const modal = document.getElementById('facilityModal');
  const closeModal = document.getElementById('closeModal');
  
  if (!modal || !closeModal) {
    console.warn('Modal elements not found');
    return;
  }
  
  // Close modal handlers
  closeModal.addEventListener('click', function(e) {
    e.preventDefault();
    hideModal();
  });
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      hideModal();
    }
  });

  // Use event delegation for dynamically generated buttons
  document.addEventListener('click', function(e) {
    // Handle view details buttons
    if (e.target.classList.contains('view-details-btn')) {
      e.preventDefault();
      e.stopPropagation();
      const facilityName = e.target.getAttribute('data-facility');
      if (facilityName) {
        showFacilityModal(facilityName);
      }
    }
    
    // Handle contact buttons
    if (e.target.classList.contains('contact-btn')) {
      e.preventDefault();
      e.stopPropagation();
      const facilityName = e.target.getAttribute('data-facility');
      if (facilityName) {
        showNotification(`Contacting ${facilityName}...`);
      }
    }
  });
  
  console.log('Modal functionality setup complete');
}

function showFacilityModal(facilityName) {
  const modal = document.getElementById('facilityModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  
  if (!modal || !modalTitle || !modalBody) {
    console.warn('Modal elements not found');
    return;
  }
  
  console.log('Showing modal for facility:', facilityName);
  
  const facility = dashboardData.facilities.find(f => f.name === facilityName) || 
                  {name: facilityName, type: 'Dispensary', staff: 10, score: 85, block: 'Pune Urban', status: 'Active'};

  modalTitle.textContent = `${facility.name} - Details`;
  modalBody.innerHTML = `
    <div class="facility-modal-content">
      <div class="modal-section">
        <h4>Facility Information</h4>
        <p><strong>Type:</strong> ${facility.type}</p>
        <p><strong>Block:</strong> ${facility.block}</p>
        <p><strong>Status:</strong> <span class="status-badge active">${facility.status}</span></p>
        <p><strong>Staff Count:</strong> ${facility.staff} personnel</p>
        <p><strong>Performance Score:</strong> <span class="score ${facility.score >= 90 ? 'high' : facility.score >= 80 ? 'medium' : 'low'}">${facility.score}</span></p>
      </div>
      <div class="modal-section">
        <h4>Recent Performance</h4>
        <div class="performance-metrics">
          <div class="metric">
            <span class="metric-label">Monthly Footfall:</span>
            <span class="metric-value">${Math.floor(Math.random() * 3000) + 1000}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Prescriptions:</span>
            <span class="metric-value">${Math.floor(Math.random() * 2000) + 500}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Referrals:</span>
            <span class="metric-value">${Math.floor(Math.random() * 200) + 50}</span>
          </div>
        </div>
      </div>
      <div class="modal-section">
        <h4>Quick Actions</h4>
        <div class="modal-actions">
          <button class="btn btn--sm btn--primary" onclick="showNotification('Contacting facility...')">Contact Facility</button>
          <button class="btn btn--sm btn--outline" onclick="showNotification('Generating report...')">Generate Report</button>
          <button class="btn btn--sm btn--secondary" onclick="showNotification('Scheduling visit...')">Schedule Visit</button>
        </div>
      </div>
    </div>
  `;
  showModal();
}

function showModal() {
  const modal = document.getElementById('facilityModal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function hideModal() {
  const modal = document.getElementById('facilityModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Filter Functionality - Enhanced
function setupFilters() {
  // Month selector
  const monthSelector = document.getElementById('monthSelector');
  if (monthSelector) {
    monthSelector.addEventListener('change', updateChartsForMonth);
  }
  
  // Chart period selector
  const chartPeriod = document.getElementById('chartPeriod');
  if (chartPeriod) {
    chartPeriod.addEventListener('change', function(e) {
      console.log('Chart period changed to:', e.target.value);
      showNotification(`Updating charts for ${e.target.value}...`);
    });
  }
  
  // Facility filters (these will be applied when directory tab is active)
  setTimeout(() => {
    const facilitySearch = document.getElementById('facilitySearch');
    const typeFilter = document.getElementById('typeFilter');
    const blockFilter = document.getElementById('blockFilter');
    
    if (facilitySearch) {
      facilitySearch.addEventListener('input', filterFacilities);
    }
    
    if (typeFilter) {
      typeFilter.addEventListener('change', filterFacilities);
    }
    
    if (blockFilter) {
      blockFilter.addEventListener('change', filterFacilities);
    }
  }, 500);
  
  // Analysis filters
  const facilitySelector = document.getElementById('facilitySelector');
  const periodSelector = document.getElementById('periodSelector');
  
  if (facilitySelector) {
    facilitySelector.addEventListener('change', function(e) {
      console.log('Facility filter changed to:', e.target.value);
      showNotification(`Filtering by ${e.target.value}...`);
    });
  }
  
  if (periodSelector) {
    periodSelector.addEventListener('change', function(e) {
      console.log('Period filter changed to:', e.target.value);
      showNotification(`Switching to ${e.target.value}...`);
    });
  }
}

function filterFacilities() {
  const searchTerm = document.getElementById('facilitySearch')?.value.toLowerCase() || '';
  const typeFilter = document.getElementById('typeFilter')?.value || 'all';
  const blockFilter = document.getElementById('blockFilter')?.value || 'all';
  
  const facilityCards = document.querySelectorAll('.facility-card');
  
  facilityCards.forEach(card => {
    const facilityName = card.querySelector('h3').textContent.toLowerCase();
    const facilityDetails = card.querySelector('.facility-details').textContent.toLowerCase();
    
    const matchesSearch = facilityName.includes(searchTerm);
    const matchesType = typeFilter === 'all' || facilityDetails.includes(typeFilter.toLowerCase());
    const matchesBlock = blockFilter === 'all' || facilityDetails.includes(blockFilter.toLowerCase());
    
    if (matchesSearch && matchesType && matchesBlock) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
  
  console.log('Facilities filtered');
}

function updateChartsForMonth() {
  const monthSelector = document.getElementById('monthSelector');
  if (!monthSelector) return;
  
  const selectedMonth = monthSelector.value;
  console.log(`Updating charts for: ${selectedMonth}`);
  showNotification(`Charts updated for ${selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1)} 2025`);
  
  // Simulate data update
  refreshCharts();
}

// Map Interactions - Enhanced
function setupMapInteractions() {
  const markers = document.querySelectorAll('.marker');
  const facilityInfoPanel = document.getElementById('facilityInfo');
  
  markers.forEach(marker => {
    marker.addEventListener('click', function() {
      const facilityName = this.dataset.facility;
      if (facilityInfoPanel) {
        showFacilityInfo(facilityName, facilityInfoPanel);
      }
    });
  });

  // Zoom controls
  const zoomIn = document.getElementById('zoomIn');
  const zoomOut = document.getElementById('zoomOut');
  
  if (zoomIn) {
    zoomIn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Zooming in...');
      showNotification('Map zoomed in');
    });
  }
  
  if (zoomOut) {
    zoomOut.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Zooming out...');
      showNotification('Map zoomed out');
    });
  }
  
  // Data layer toggles
  const layerCheckboxes = document.querySelectorAll('.data-layers input[type="checkbox"]');
  layerCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function(e) {
      const layerName = e.target.nextSibling.textContent.trim();
      toggleDataLayer(layerName, e.target.checked);
    });
  });
}

function showFacilityInfo(facilityName, panel) {
  const facility = dashboardData.facilities.find(f => 
    f.name.toLowerCase() === facilityName
  ) || {
    name: facilityName.charAt(0).toUpperCase() + facilityName.slice(1),
    type: 'Dispensary',
    score: Math.floor(Math.random() * 20) + 80,
    staff: Math.floor(Math.random() * 10) + 5
  };

  panel.innerHTML = `
    <h4>${facility.name}</h4>
    <div class="facility-quick-info">
      <p><strong>Type:</strong> ${facility.type}</p>
      <p><strong>Performance Score:</strong> <span class="score ${facility.score >= 90 ? 'high' : 'medium'}">${facility.score}</span></p>
      <p><strong>Staff:</strong> ${facility.staff} personnel</p>
      <p><strong>Status:</strong> <span class="status-badge active">Active</span></p>
    </div>
    <div class="facility-metrics">
      <div class="metric-item">
        <span class="metric-label">Monthly Patients:</span>
        <span class="metric-value">${Math.floor(Math.random() * 3000) + 1000}</span>
      </div>
      <div class="metric-item">
        <span class="metric-label">Prescriptions:</span>
        <span class="metric-value">${Math.floor(Math.random() * 2000) + 500}</span>
      </div>
    </div>
    <button class="btn btn--sm btn--primary view-details-btn" data-facility="${facility.name}">View Full Details</button>
  `;
}

function toggleDataLayer(layerName, isEnabled) {
  console.log(`${isEnabled ? 'Enabling' : 'Disabling'} ${layerName} layer`);
  showNotification(`${layerName} layer ${isEnabled ? 'enabled' : 'disabled'}`);
  
  const markers = document.querySelectorAll('.marker');
  markers.forEach(marker => {
    if (!isEnabled && layerName === 'Activity Rate') {
      marker.style.opacity = '0.5';
    } else {
      marker.style.opacity = '1';
    }
  });
}

// Event Listeners - Enhanced
function setupEventListeners() {
  // Module buttons
  document.querySelectorAll('.module-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const module = this.dataset.module;
      console.log(`Opening ${module} module...`);
      showNotification(`Opening ${module.charAt(0).toUpperCase() + module.slice(1)} module...`);
    });
  });

  // Export buttons
  document.addEventListener('click', function(e) {
    if (e.target.textContent && e.target.textContent.includes('Export')) {
      e.preventDefault();
      if (e.target.textContent.includes('CSV')) {
        simulateExport('CSV');
      } else if (e.target.textContent.includes('PDF')) {
        simulateExport('PDF');
      }
    }
  });

  // Alert action buttons
  document.querySelectorAll('.alert-actions .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const action = e.target.textContent;
      console.log(`Alert action: ${action}`);
      showNotification(`${action} initiated...`);
    });
  });

  // Recommendation buttons
  document.querySelectorAll('.recommendation-item .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const action = e.target.textContent;
      console.log(`Recommendation action: ${action}`);
      showNotification(`${action} process started...`);
    });
  });
}

// Utility Functions
function showNotification(message) {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(n => n.remove());
  
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-primary);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 1001;
    box-shadow: var(--shadow-lg);
    animation: slideIn 0.3s ease-out;
    max-width: 300px;
    font-size: 14px;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 3000);
}

function simulateExport(type) {
  const notification = document.createElement('div');
  notification.className = 'export-notification';
  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <div class="loading-spinner"></div>
      <span>Generating ${type} report...</span>
    </div>
  `;
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    padding: 16px 20px;
    border-radius: 8px;
    box-shadow: var(--shadow-lg);
    z-index: 1001;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px; color: var(--color-success);">
        <span>✅</span>
        <span>${type} report generated successfully!</span>
      </div>
    `;
  }, 2000);
  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 4000);
}

function simulateRealTimeUpdates() {
  // Simulate real-time updates every 30 seconds
  setInterval(() => {
    updateRealTimeMetrics();
  }, 30000);
}

function updateRealTimeMetrics() {
  // Simulate small random changes in metrics
  const elements = document.querySelectorAll('.stat-value, .kpi-value');
  
  elements.forEach(element => {
    const currentText = element.textContent.replace(/,/g, '');
    const currentValue = parseInt(currentText);
    if (!isNaN(currentValue)) {
      const variance = Math.floor(Math.random() * 20) - 10; // -10 to +10
      const newValue = Math.max(0, currentValue + variance);
      element.textContent = newValue.toLocaleString();
      
      // Add brief highlight effect
      element.style.backgroundColor = 'var(--color-primary)';
      element.style.color = 'white';
      element.style.transition = 'all 0.3s ease';
      element.style.borderRadius = '4px';
      element.style.padding = '2px 4px';
      
      setTimeout(() => {
        element.style.backgroundColor = '';
        element.style.color = '';
        element.style.padding = '';
      }, 1000);
    }
  });
  
  console.log('Real-time metrics updated');
}

// Make functions globally available
window.showNotification = showNotification;
window.simulateExport = simulateExport;

// CSS for animations and additional styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid var(--color-border);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .facility-modal-content .modal-section {
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--color-border);
  }
  
  .facility-modal-content .modal-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
  
  .performance-metrics, .modal-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  
  .performance-metrics .metric {
    flex: 1;
    min-width: 120px;
  }
  
  .metric-label {
    display: block;
    font-size: 12px;
    color: var(--color-text-secondary);
    margin-bottom: 4px;
  }
  
  .metric-value {
    font-weight: 600;
    color: var(--color-primary);
  }
  
  .facility-quick-info p {
    margin-bottom: 8px;
  }
  
  .facility-metrics {
    margin: 16px 0;
  }
  
  .facility-metrics .metric-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 8px 0;
    border-bottom: 1px solid var(--color-border);
  }
  
  .facility-metrics .metric-item:last-child {
    border-bottom: none;
  }
  
  .score.medium {
    color: var(--color-warning);
  }
  
  .score.low {
    color: var(--color-error);
  }
  
  /* Ensure proper tab content display */
  .tab-content {
    display: none;
  }
  
  .tab-content.active {
    display: block !important;
  }
`;
document.head.appendChild(style);

console.log('ESIC Pune Healthcare Dashboard script loaded and ready');