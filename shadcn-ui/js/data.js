const vehiclesData = [
    {
        id: 1,
        name: "BMW M4 Competition",
        brand: "BMW",
        type: "Sports Car",
        price: 89900,
        year: 2024,
        mileage: 0,
        fuel: "Petrol",
        transmission: "Automatic",
        engine: "3.0L Twin Turbo I6",
        horsepower: 503,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop"
        ],
        showroomId: 1,
        features: ["Leather Seats", "Sunroof", "Navigation", "Bluetooth", "Backup Camera"],
        description: "Experience pure driving pleasure with the BMW M4 Competition. This high-performance coupe delivers exceptional power and precision."
    },
    {
        id: 2,
        name: "Mercedes-AMG GT 63 S",
        brand: "Mercedes-Benz",
        type: "Luxury Sports",
        price: 159900,
        year: 2024,
        mileage: 0,
        fuel: "Petrol",
        transmission: "Automatic",
        engine: "4.0L V8 Biturbo",
        horsepower: 630,
        image: "https://images.unsplash.com/photo-1563694983011-6f4d90358083?w=800&h=600&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1563694983011-6f4d90358083?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1564936281817-66d0b8b5d1c1?w=800&h=600&fit=crop"
        ],
        showroomId: 2,
        features: ["AMG Performance Seats", "Panoramic Roof", "Premium Sound", "Advanced Safety", "Carbon Fiber Trim"],
        description: "The Mercedes-AMG GT 63 S combines luxury with track-ready performance in a stunning four-door coupe design."
    },
    {
        id: 3,
        name: "Audi R8 V10 Plus",
        brand: "Audi",
        type: "Supercar",
        price: 199900,
        year: 2024,
        mileage: 0,
        fuel: "Petrol",
        transmission: "Automatic",
        engine: "5.2L V10",
        horsepower: 602,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop"
        ],
        showroomId: 1,
        features: ["Quattro AWD", "Carbon Fiber Body", "Virtual Cockpit", "Bang & Olufsen Audio", "Ceramic Brakes"],
        description: "The Audi R8 V10 Plus represents the pinnacle of Audi's engineering excellence with naturally aspirated V10 power."
    },
    {
        id: 4,
        name: "Porsche 911 Turbo S",
        brand: "Porsche",
        type: "Sports Car",
        price: 229900,
        year: 2024,
        mileage: 0,
        fuel: "Petrol",
        transmission: "PDK",
        engine: "3.8L Twin Turbo Flat-6",
        horsepower: 640,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop"
        ],
        showroomId: 3,
        features: ["All-Wheel Drive", "Active Suspension", "Sport Chrono", "Bose Audio", "Adaptive Cruise Control"],
        description: "The iconic Porsche 911 Turbo S delivers legendary performance with modern technology and timeless design."
    },
    {
        id: 5,
        name: "Lamborghini Huracán EVO",
        brand: "Lamborghini",
        type: "Supercar",
        price: 259900,
        year: 2024,
        mileage: 0,
        fuel: "Petrol",
        transmission: "Automatic",
        engine: "5.2L V10",
        horsepower: 631,
        image: "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=800&h=600&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
        ],
        showroomId: 2,
        features: ["All-Wheel Drive", "Dynamic Steering", "Performance Traction Control", "Alcantara Interior", "Carbon Fiber Package"],
        description: "The Lamborghini Huracán EVO embodies the perfect balance between performance and everyday usability with Italian flair."
    },
    {
        id: 6,
        name: "Tesla Model S Plaid",
        brand: "Tesla",
        type: "Electric Sedan",
        price: 129900,
        year: 2024,
        mileage: 0,
        fuel: "Electric",
        transmission: "Single Speed",
        engine: "Tri-Motor Electric",
        horsepower: 1020,
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop"
        ],
        showroomId: 3,
        features: ["Autopilot", "17-inch Touchscreen", "Premium Audio", "Glass Roof", "Over-the-Air Updates"],
        description: "The Tesla Model S Plaid redefines performance with instant acceleration and cutting-edge electric technology."
    }
];

// Showroom Data
const showroomsData = [
    {
        id: 1,
        name: "Elite Motors Bavaria",
        location: "Munich, Germany",
        address: "Maximilianstraße 15, 80539 München",
        phone: "+49 89 123 4567",
        email: "info@elitemotors.de",
        image: "https://images.unsplash.com/photo-1562141961-df1fa5bb8df8?w=800&h=600&fit=crop",
        specialties: ["BMW", "Audi", "Porsche"],
        rating: 4.8,
        description: "Premium German automotive dealer specializing in luxury performance vehicles.",
        hours: "Mon-Fri: 9AM-7PM, Sat: 9AM-6PM, Sun: 12PM-5PM",
        services: ["Sales", "Service", "Parts", "Financing", "Trade-in"]
    },
    {
        id: 2,
        name: "Prestige Auto Gallery",
        location: "London, UK",
        address: "Park Lane 42, Mayfair, London W1K 1PN",
        phone: "+44 20 7123 4567",
        email: "sales@prestigeauto.co.uk",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
        specialties: ["Mercedes-Benz", "Lamborghini", "McLaren"],
        rating: 4.9,
        description: "London's premier destination for exotic and luxury vehicles.",
        hours: "Mon-Sat: 9AM-8PM, Sun: 11AM-6PM",
        services: ["Exclusive Sales", "Concierge Service", "Custom Orders", "Maintenance", "Detailing"]
    },
    {
        id: 3,
        name: "Apex Performance Motors",
        location: "Los Angeles, USA",
        address: "Rodeo Drive 123, Beverly Hills, CA 90210",
        phone: "+1 310 555 0123",
        email: "contact@apexperformance.com",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        specialties: ["Porsche", "Tesla", "Ferrari"],
        rating: 4.7,
        description: "California's leading performance and electric vehicle specialist.",
        hours: "Mon-Sun: 10AM-9PM",
        services: ["Performance Tuning", "Electric Vehicle Sales", "Track Preparation", "Insurance", "Delivery"]
    }
];

// Export data for use in other files
window.vehiclesData = vehiclesData;
window.showroomsData = showroomsData;