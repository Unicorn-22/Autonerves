let filteredVehicles = [];
let cart = JSON.parse(localStorage.getItem('autonerves-cart')) || [];

// DOM elements
const vehiclesGrid = document.getElementById('vehicles-grid');
const showroomsGrid = document.getElementById('showrooms-grid');
const searchInput = document.getElementById('search-input');
const brandFilter = document.getElementById('brand-filter');
const typeFilter = document.getElementById('type-filter');
const fuelFilter = document.getElementById('fuel-filter');
const priceFilter = document.getElementById('price-filter');
const sortFilter = document.getElementById('sort-filter');
const clearFiltersBtn = document.getElementById('clear-filters');
const resultsCount = document.getElementById('results-count');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const vehicleModal = document.getElementById('vehicle-modal');
const cartModal = document.getElementById('cart-modal');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadVehicles();
    loadShowrooms();
    populateFilters();
    updateCartUI();
    setupNavigation();
}

function setupEventListeners() {
    // Search and filters
    searchInput.addEventListener('input', filterVehicles);
    brandFilter.addEventListener('change', filterVehicles);
    typeFilter.addEventListener('change', filterVehicles);
    fuelFilter.addEventListener('change', filterVehicles);
    priceFilter.addEventListener('change', filterVehicles);
    sortFilter.addEventListener('change', filterVehicles);
    clearFiltersBtn.addEventListener('click', clearFilters);

    // Cart
    cartBtn.addEventListener('click', openCartModal);

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModals);
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModals();
        }
    });

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

function setupNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Update active link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function updateActiveNavLink() {
    const sections = ['home', 'vehicles', 'showrooms', 'contact'];
    const scrollPos = window.scrollY + 100;

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const navLink = document.querySelector(`a[href="#${sectionId}"]`);
        
        if (section && navLink) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

function populateFilters() {
    // Get unique values for filters
    const brands = [...new Set(vehiclesData.map(v => v.brand))];
    const types = [...new Set(vehiclesData.map(v => v.type))];
    const fuels = [...new Set(vehiclesData.map(v => v.fuel))];

    // Populate brand filter
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });

    // Populate type filter
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeFilter.appendChild(option);
    });

    // Populate fuel filter
    fuels.forEach(fuel => {
        const option = document.createElement('option');
        option.value = fuel;
        option.textContent = fuel;
        fuelFilter.appendChild(option);
    });
}

function loadVehicles() {
    filteredVehicles = [...vehiclesData];
    renderVehicles();
}

function filterVehicles() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedBrand = brandFilter.value;
    const selectedType = typeFilter.value;
    const selectedFuel = fuelFilter.value;
    const selectedPriceRange = priceFilter.value;
    const sortBy = sortFilter.value;

    // Apply filters
    filteredVehicles = vehiclesData.filter(vehicle => {
        const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm) ||
                             vehicle.brand.toLowerCase().includes(searchTerm);
        const matchesBrand = !selectedBrand || vehicle.brand === selectedBrand;
        const matchesType = !selectedType || vehicle.type === selectedType;
        const matchesFuel = !selectedFuel || vehicle.fuel === selectedFuel;
        
        let matchesPrice = true;
        if (selectedPriceRange) {
            const [min, max] = selectedPriceRange.split('-').map(Number);
            matchesPrice = vehicle.price >= min && (max ? vehicle.price <= max : true);
        }

        return matchesSearch && matchesBrand && matchesType && matchesFuel && matchesPrice;
    });

    // Apply sorting
    filteredVehicles.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'year':
                return b.year - a.year;
            case 'horsepower':
                return b.horsepower - a.horsepower;
            default:
                return a.name.localeCompare(b.name);
        }
    });

    renderVehicles();
    updateResultsCount();
}

function clearFilters() {
    searchInput.value = '';
    brandFilter.value = '';
    typeFilter.value = '';
    fuelFilter.value = '';
    priceFilter.value = '';
    sortFilter.value = 'name';
    filterVehicles();
}

function renderVehicles() {
    if (filteredVehicles.length === 0) {
        vehiclesGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search" style="font-size: 4rem; color: #6b7280; margin-bottom: 1rem;"></i>
                <h3 style="color: #9ca3af; margin-bottom: 0.5rem;">No vehicles found</h3>
                <p style="color: #6b7280;">Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }

    vehiclesGrid.innerHTML = filteredVehicles.map(vehicle => `
        <div class="vehicle-card" onclick="openVehicleModal(${vehicle.id})">
            <div class="vehicle-image">
                <img src="${vehicle.image}" alt="${vehicle.name}" loading="lazy">
                <div class="vehicle-badges">
                    <span class="badge">${vehicle.year}</span>
                    ${vehicle.mileage === 0 ? '<span class="badge badge-new">New</span>' : ''}
                </div>
                <div class="vehicle-actions">
                    <button class="action-btn" onclick="event.stopPropagation(); toggleFavorite(${vehicle.id})" title="Add to favorites">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="action-btn" onclick="event.stopPropagation(); addToCart(${vehicle.id})" title="Add to cart">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
            <div class="vehicle-info">
                <div class="vehicle-brand">${vehicle.brand}</div>
                <div class="vehicle-name">${vehicle.name}</div>
                <div class="vehicle-specs">
                    <span>${vehicle.horsepower} HP</span>
                    <span>${vehicle.fuel}</span>
                    <span>${vehicle.mileage.toLocaleString()} mi</span>
                </div>
                <div class="vehicle-price">${formatPrice(vehicle.price)}</div>
                <div class="vehicle-footer">
                    <span class="vehicle-type">${vehicle.type}</span>
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${vehicle.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function loadShowrooms() {
    showroomsGrid.innerHTML = showroomsData.map(showroom => `
        <div class="showroom-card">
            <div class="showroom-image">
                <img src="${showroom.image}" alt="${showroom.name}" loading="lazy">
                <div class="showroom-rating">
                    <i class="fas fa-star" style="color: #fbbf24;"></i>
                    ${showroom.rating}
                </div>
            </div>
            <div class="showroom-content">
                <div class="showroom-name">${showroom.name}</div>
                <div class="showroom-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${showroom.location}
                </div>
                <div class="showroom-description">${showroom.description}</div>
                <div class="showroom-specialties">
                    <div class="specialties-title">
                        <i class="fas fa-car"></i>
                        Specialties
                    </div>
                    <div class="specialties-list">
                        ${showroom.specialties.map(specialty => 
                            `<span class="specialty-badge">${specialty}</span>`
                        ).join('')}
                    </div>
                </div>
                <div class="showroom-contact">
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        ${showroom.phone}
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        ${showroom.email}
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-clock"></i>
                        ${showroom.hours}
                    </div>
                </div>
                <div class="showroom-actions">
                    <button class="btn btn-primary">Contact</button>
                    <button class="btn btn-secondary" onclick="filterByShowroom(${showroom.id})">View Vehicles</button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateResultsCount() {
    resultsCount.textContent = `${filteredVehicles.length} of ${vehiclesData.length} vehicles found`;
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(price);
}

function openVehicleModal(vehicleId) {
    const vehicle = vehiclesData.find(v => v.id === vehicleId);
    const showroom = showroomsData.find(s => s.id === vehicle.showroomId);
    
    if (!vehicle) return;

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="vehicle-detail">
            <div class="vehicle-detail-header">
                <div class="vehicle-detail-image">
                    <img src="${vehicle.image}" alt="${vehicle.name}">
                </div>
                <div class="vehicle-detail-info">
                    <div class="vehicle-detail-badges">
                        <span class="badge">${vehicle.brand}</span>
                        <span class="badge">${vehicle.type}</span>
                        ${vehicle.mileage === 0 ? '<span class="badge badge-new">New</span>' : ''}
                    </div>
                    <h1 class="vehicle-detail-name">${vehicle.name}</h1>
                    <div class="vehicle-detail-price">${formatPrice(vehicle.price)}</div>
                    <p class="vehicle-detail-description">${vehicle.description}</p>
                    <div class="vehicle-detail-actions">
                        <button class="btn btn-primary" onclick="addToCart(${vehicle.id})">
                            <i class="fas fa-shopping-cart"></i>
                            Add to Cart
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-phone"></i>
                            Contact Dealer
                        </button>
                    </div>
                    ${showroom ? `
                        <div class="showroom-info" style="margin-top: 20px; padding: 15px; background: rgba(31, 41, 55, 0.5); border-radius: 8px;">
                            <h4 style="color: white; margin-bottom: 10px;">Sold by ${showroom.name}</h4>
                            <div style="color: #9ca3af; font-size: 14px;">
                                <div style="margin-bottom: 5px;"><i class="fas fa-map-marker-alt"></i> ${showroom.location}</div>
                                <div style="margin-bottom: 5px;"><i class="fas fa-phone"></i> ${showroom.phone}</div>
                                <div><i class="fas fa-star" style="color: #fbbf24;"></i> ${showroom.rating} rating</div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
            <div class="vehicle-specs-grid">
                <div class="spec-item">
                    <span class="spec-label"><i class="fas fa-calendar"></i> Year</span>
                    <span class="spec-value">${vehicle.year}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label"><i class="fas fa-tachometer-alt"></i> Mileage</span>
                    <span class="spec-value">${vehicle.mileage.toLocaleString()} mi</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label"><i class="fas fa-gas-pump"></i> Fuel</span>
                    <span class="spec-value">${vehicle.fuel}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label"><i class="fas fa-cogs"></i> Transmission</span>
                    <span class="spec-value">${vehicle.transmission}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label"><i class="fas fa-engine"></i> Engine</span>
                    <span class="spec-value">${vehicle.engine}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label"><i class="fas fa-bolt"></i> Horsepower</span>
                    <span class="spec-value">${vehicle.horsepower} HP</span>
                </div>
            </div>
            <div style="margin-top: 30px;">
                <h3 style="color: white; margin-bottom: 15px;">Features & Equipment</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                    ${vehicle.features.map(feature => 
                        `<div style="color: #d1d5db; display: flex; align-items: center;">
                            <div style="width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; margin-right: 10px;"></div>
                            ${feature}
                        </div>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
    
    vehicleModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function addToCart(vehicleId) {
    const vehicle = vehiclesData.find(v => v.id === vehicleId);
    if (!vehicle) return;

    const existingItem = cart.find(item => item.id === vehicleId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: vehicle.id,
            name: vehicle.name,
            brand: vehicle.brand,
            price: vehicle.price,
            image: vehicle.image,
            quantity: 1
        });
    }

    localStorage.setItem('autonerves-cart', JSON.stringify(cart));
    updateCartUI();
    
    // Show success message
    showNotification('Vehicle added to cart!');
}

function removeFromCart(vehicleId) {
    cart = cart.filter(item => item.id !== vehicleId);
    localStorage.setItem('autonerves-cart', JSON.stringify(cart));
    updateCartUI();
    renderCartItems();
}

function updateCartQuantity(vehicleId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(vehicleId);
        return;
    }

    const item = cart.find(item => item.id === vehicleId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('autonerves-cart', JSON.stringify(cart));
        updateCartUI();
        renderCartItems();
    }
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

function openCartModal() {
    renderCartItems();
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <h3>Your cart is empty</h3>
                <p>Add some vehicles to get started</p>
            </div>
        `;
        cartTotalElement.textContent = '$0';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove from cart">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = formatPrice(total);
}

function closeModals() {
    vehicleModal.style.display = 'none';
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function filterByShowroom(showroomId) {
    // Clear other filters and set showroom filter
    clearFilters();
    
    // Filter vehicles by showroom
    filteredVehicles = vehiclesData.filter(vehicle => vehicle.showroomId === showroomId);
    renderVehicles();
    updateResultsCount();
    
    // Scroll to vehicles section
    scrollToSection('vehicles');
}

function toggleFavorite(vehicleId) {
    // This would typically save to localStorage or send to server
    showNotification('Added to favorites!');
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize results count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateResultsCount();
});