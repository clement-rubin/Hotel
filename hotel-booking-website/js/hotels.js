document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('active');
        });
    }

    // Exemple de données d'hôtels avec des images de placeholder
    const hotels = [
        {
            id: 1,
            name: 'Hôtel Royal Luxe',
            location: 'Paris, France',
            price: 250,
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Un hôtel de luxe au cœur de Paris avec vue sur la Tour Eiffel.'
        },
        {
            id: 2,
            name: 'Seaside Resort',
            location: 'Nice, France',
            price: 180,
            image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Profitez d\'une vue imprenable sur la mer Méditerranée.'
        },
        {
            id: 3,
            name: 'Mountain Lodge',
            location: 'Chamonix, France',
            price: 150,
            image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Un chalet confortable près des pistes de ski.'
        },
        {
            id: 4,
            name: 'Urban Boutique',
            location: 'Lyon, France',
            price: 120,
            image: 'https://images.unsplash.com/photo-1551882547-cdb5e87738d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Un hôtel boutique élégant au centre-ville de Lyon.'
        },
        {
            id: 5,
            name: 'Countryside Inn',
            location: 'Provence, France',
            price: 90,
            image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            description: 'Une auberge paisible entourée de champs de lavande.'
        }
    ];

    // Afficher les hôtels
    displayHotels(hotels);

    // Gestion du filtre
    const filterBtn = document.getElementById('filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            filterHotels(hotels);
        });
    }

    // Fonction pour afficher les hôtels avec animation
    function displayHotels(hotelsToDisplay) {
        const hotelsList = document.getElementById('hotels-list');
        if (!hotelsList) return;
        
        hotelsList.innerHTML = '';
        
        if (hotelsToDisplay.length === 0) {
            hotelsList.innerHTML = '<p class="no-results">Aucun hôtel ne correspond à votre recherche.</p>';
            return;
        }
        
        hotelsToDisplay.forEach((hotel, index) => {
            const hotelCard = document.createElement('div');
            hotelCard.className = 'hotel-card';
            hotelCard.style.opacity = '0';
            hotelCard.style.transform = 'translateY(20px)';
            
            hotelCard.innerHTML = `
                <img src="${hotel.image}" alt="${hotel.name}" class="hotel-image">
                <div class="hotel-info">
                    <h3>${hotel.name}</h3>
                    <div class="hotel-location">
                        <i class="fas fa-map-marker-alt"></i> ${hotel.location}
                    </div>
                    <div class="hotel-price">${hotel.price}€ par nuit</div>
                    <p>${hotel.description}</p>
                    <a href="reservations.html?hotel=${hotel.id}" class="book-btn">Réserver maintenant</a>
                </div>
            `;
            
            hotelsList.appendChild(hotelCard);
            
            // Animation d'entrée progressive
            setTimeout(() => {
                hotelCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                hotelCard.style.opacity = '1';
                hotelCard.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }

    // Fonction pour filtrer les hôtels
    function filterHotels(allHotels) {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const priceFilter = document.getElementById('price-filter').value;
        
        const filteredHotels = allHotels.filter(hotel => {
            // Filtre par recherche
            const matchesSearch = hotel.name.toLowerCase().includes(searchTerm) || 
                                hotel.location.toLowerCase().includes(searchTerm) ||
                                hotel.description.toLowerCase().includes(searchTerm);
            
            // Filtre par prix
            let matchesPrice = true;
            if (priceFilter === 'low') {
                matchesPrice = hotel.price < 100;
            } else if (priceFilter === 'medium') {
                matchesPrice = hotel.price >= 100 && hotel.price <= 200;
            } else if (priceFilter === 'high') {
                matchesPrice = hotel.price > 200;
            }
            
            return matchesSearch && matchesPrice;
        });
        
        // Animation de fondu avant de changer le contenu
        const hotelsList = document.getElementById('hotels-list');
        if (hotelsList) {
            hotelsList.style.opacity = '0';
            setTimeout(() => {
                displayHotels(filteredHotels);
                hotelsList.style.opacity = '1';
            }, 300);
        } else {
            displayHotels(filteredHotels);
        }
    }

    // Ajouter la fonctionnalité de recherche en temps réel
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => {
            filterHotels(hotels);
        }, 500));
    }

    // Fonction debounce pour limiter les appels fréquents
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }
});