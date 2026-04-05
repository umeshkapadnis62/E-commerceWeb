// ===== E-COMMERCE APP DATA & LOGIC =====
class ECommerceApp {
    constructor() {
        this.products = this.getProductsData();
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        this.currentSlide = 0;
        this.init();
    }

    // Fake product data (JSON-like structure)
    getProductsData() {
        return [
            {
                id: 1,
                name: "iPhone 15 Pro Max",
                price: 119999,
                oldPrice: 139999,
                image: "https://images.unsplash.com/photo-1690483773574-6bc9d9a81f93?w=400&h=400&fit=crop",
                category: "electronics",
                rating: 4.9,
                reviews: 1247,
                description: "Latest iPhone with A17 Pro chip, 48MP camera, Titanium design",
                images: [
                    "https://images.unsplash.com/photo-1690483773574-6bc9d9a81f93?w=500&h=500&fit=crop",
                    "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop",
                    "https://images.unsplash.com/photo-1603508193022-d6a2e39501aa?w=500&h=500&fit=crop"
                ]
            },
            {
                id: 2,
                name: "MacBook Pro M3",
                price: 199999,
                oldPrice: 229999,
                image: "https://images.unsplash.com/photo-1677430840807-d2d0d95bd92f?w=400&h=400&fit=crop",
                category: "electronics",
                rating: 4.8,
                reviews: 856,
                description: "M3 Pro chip, Liquid Retina XDR display, 18hr battery life",
                images: [
                    "https://images.unsplash.com/photo-1677430840807-d2d0d95bd92f?w=500&h=500&fit=crop",
                    "https://images.unsplash.com/photo-1582379236846-9b7f6c3977a4?w=500&h=500&fit=crop"
                ]
            },
            {
                id: 3,
                name: "Nike Air Max 90",
                price: 12999,
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
                category: "shoes",
                rating: 4.7,
                reviews: 423,
                description: "Iconic Air Max design with premium cushioning and breathable mesh",
                images: [
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
                    "https://images.unsplash.com/photo-1541781774459-bb2af79d209d?w=500&h=500&fit=crop"
                ]
            },
            {
                id: 4,
                name: "Samsung 55\" QLED TV",
                price: 64999,
                oldPrice: 79999,
                image: "https://images.unsplash.com/photo-1593359677879-a4b7f7f1c8a9?w=400&h=400&fit=crop",
                category: "electronics",
                rating: 4.6,
                reviews: 678,
                description: "Quantum Dot technology, 4K UHD, Smart TV with voice control",
                images: [
                    "https://images.unsplash.com/photo-1593359677879-a4b7f7f1c8a9?w=500&h=500&fit=crop",
                    "https://images.unsplash.com/photo-1610945262588-5c994c1d4ce5?w=500&h=500&fit=crop"
                ]
            },
            {
                id: 5,
                name: "Levi's 501 Jeans",
                price: 3499,
                oldPrice: 4999,
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
                category: "fashion",
                rating: 4.8,
                reviews: 2345,
                description: "Classic straight fit jeans in premium denim fabric",
                images: [
                    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
                    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop"
                ]
            },
            {
                id: 6,
                name: "Sony WH-1000XM5",
                price: 29999,
                oldPrice: 34999,
                image: "https://images.unsplash.com/photo-1610548107366-4e032a811d67?w=400&h=400&fit=crop",
                category: "electronics",
                rating: 4.9,
                reviews: 1892,
                description: "Industry-leading noise cancellation, 30hr battery, Hi-Res audio",
                images: [
                    "https://images.unsplash.com/photo-1610548107366-4e032a811d67?w=500&h=500&fit=crop"
                ]
            },
            {
                id: 7,
                name: "Adidas Ultraboost",
                price: 14999,
                image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
                category: "shoes",
                rating: 4.7,
                reviews: 1567,
                description: "Responsive Boost cushioning, breathable Primeknit upper",
                images: [
                    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop"
                ]
            },
            {
                id: 8,
                name: "Dyson Airwrap",
                price: 44999,
                oldPrice: 49999,
                image: "https://images.unsplash.com/photo-1606853045736-6bb1396b877e?w=400&h=400&fit=crop",
                category: "home",
                rating: 4.8,
                reviews: 923,
                description: "Multi-styler with intelligent heat control, Coanda effect",
                images: [
                    "https://images.unsplash.com/photo-1606853045736-6bb1396b877e?w=500&h=500&fit=crop"
                ]
            }
        ];
    }

    // Initialize app
    init() {
        this.loadEventListeners();
        this.renderProducts();
        this.updateCartCount();
        this.updateWishlistCount();
        this.startSlider();
        this.hideLoading();
        this.loadTheme();
    }

    // Event Listeners
    loadEventListeners() {
        // Search
        document.getElementById('search-input').addEventListener('input', (e) => this.searchProducts(e.target.value));
        document.getElementById('search-btn').addEventListener('click', () => this.searchProducts());

        // Filters
        document.getElementById('category-filter').addEventListener('change', (e) => this.filterProducts(e.target.value));
        document.getElementById('sort-filter').addEventListener('change', (e) => this.sortProducts(e.target.value));

        // Cart/Wishlist
        document.getElementById('cart-btn').addEventListener('click', () => this.toggleCartModal());
        document.getElementById('wishlist-btn').addEventListener('click', () => this.showWishlist());

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());

        // Modal close
        document.querySelectorAll('.modal-close, .cart-close').forEach(btn => {
            btn.addEventListener('click', () => this.closeModals());
        });

        // Prevent modal close on click inside
        document.getElementById('quick-view-modal').addEventListener('click', (e) => {
            if (e.target.id === 'quick-view-modal') this.closeModals();
        });
        document.getElementById('cart-modal').addEventListener('click', (e) => {
            if (e.target.id === 'cart-modal') this.closeModals();
        });

        // Category filters
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                document.getElementById('category-filter').value = category;
                this.filterProducts(category);
            });
        });

        // Hero slider buttons
        document.querySelectorAll('.hero-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.target.dataset.slide);
                this.goToSlide(slideIndex);
            });
        });

        // Window events
        window.addEventListener('click', (e) => {
            if (e.target.id === 'modal-overlay') this.closeModals();
        });
    }

    // Products rendering
    renderProducts(products = this.products) {
        const grid = document.getElementById('products-grid');
        grid.innerHTML = '';

        products.forEach(product => {
            const productCard = this.createProductCard(product);
            grid.appendChild(productCard);
        });

        // Add event listeners to new cards
        this.attachProductListeners();
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-container">
                ${product.oldPrice ? `<span class="product-badge">${((product.oldPrice - product.price) / product.oldPrice * 100).toFixed(0)}% OFF</span>` : ''}
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    ₹${product.price.toLocaleString()}
                    ${product.oldPrice ? `<span class="product-old-price">₹${product.oldPrice.toLocaleString()}</span>` : ''}
                </div>
                <div class="product-rating">
                    <div class="stars">${'★'.repeat(Math.floor(product.rating)).padEnd(5, '☆')}</div>
                    <span class="rating-text">${product.rating} (${product.reviews})</span>
                </div>
                <div class="product-actions">
                    <button class="btn-primary quick-view-btn" data-id="${product.id}">
                        <i class="fas fa-eye"></i> Quick View
                    </button>
                    <button class="btn-secondary add-to-cart-btn" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
        return card;
    }

    // Attach listeners to product cards
    attachProductListeners() {
        document.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('.btn-primary').dataset.id);
                this.showProductModal(productId);
            });
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('.btn-secondary').dataset.id);
                this.addToCart(productId);
            });
        });
    }

    // Search functionality
    searchProducts(query = document.getElementById('search-input').value.toLowerCase()) {
        const filtered = this.products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
        this.renderProducts(filtered);
    }

    // Filter by category
    filterProducts(category = 'all') {
        const filtered = category === 'all' 
            ? this.products 
            : this.products.filter(p => p.category === category);
        this.renderProducts(filtered);
    }

    // Sort products
    sortProducts(sortBy) {
        let sorted = [...this.products];
        switch(sortBy) {
            case 'price-low':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
            default:
                sorted.sort((a, b) => a.name.localeCompare(b.name));
        }
        this.renderProducts(sorted);
    }

    // Product modal
    showProductModal(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // Populate modal
        document.getElementById('modal-main-img').src = product.images[0];
        document.getElementById('modal-title').textContent = product.name;
        document.getElementById('modal-price').innerHTML = `
            <span class="current-price">₹${product.price.toLocaleString()}</span>
            ${product.oldPrice ? `<span class="old-price">₹${product.oldPrice.toLocaleString()}</span>` : ''}
        `;
        document.getElementById('modal-rating').innerHTML = `
            <div class="stars">${'★'.repeat(Math.floor(product.rating)).padEnd(5, '☆')}</div>
            <span>${product.rating} (${product.reviews} reviews)</span>
        `;
        document.getElementById('modal-description').textContent = product.description;
        document.getElementById('modal-qty').value = 1;
        document.getElementById('modal-add-cart').dataset.id = product.id;

        // Thumbnails
        const thumbsContainer = document.getElementById('image-thumbs');
        thumbsContainer.innerHTML = '';
        product.images.forEach((imgSrc, index) => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.className = 'thumb-img';
            thumb.dataset.index = index;
            if (index === 0) thumb.classList.add('active');
            thumb.onclick = () => this.changeMainImage(imgSrc);
            thumbsContainer.appendChild(thumb);
        });

        // Show modal
        document.getElementById('quick-view-modal').classList.remove('hidden');
        document.getElementById('modal-overlay').classList.add('show');
        document.querySelector('.modal').classList.add('show');

        // Quantity controls
        document.getElementById('qty-plus').onclick = () => this.updateQuantity(1);
        document.getElementById('qty-minus').onclick = () => this.updateQuantity(-1);
        document.getElementById('modal-add-cart').onclick = () => this.addToCart(productId);
    }

    changeMainImage(src) {
        document.getElementById('modal-main-img').src = src;
        document.querySelectorAll('.thumb-img').forEach(thumb => thumb.classList.remove('active'));
        event.target.classList.add('active');
    }

    updateQuantity(change) {
        const qtyInput = document.getElementById('modal-qty');
        let newQty = parseInt(qtyInput.value) + change;
        if (newQty < 1) newQty = 1;
        qtyInput.value = newQty;
    }

    // Cart functionality
    addToCart(productId, quantity = 1) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({ ...product, quantity });
        }

        this.saveCart();
        this.updateCartCount();
        this.showToast('Product added to cart!', 'success');
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
        this.showToast('Product removed from cart', 'error');
    }

    updateCartQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.saveCart();
                this.updateCartCount();
                this.renderCart();
            }
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').textContent = count;
        document.getElementById('cart-count').classList.toggle('hidden', count === 0);
    }

    toggleCartModal() {
        const modal = document.getElementById('cart-modal');
        const overlay = document.getElementById('modal-overlay');
        modal.classList.toggle('hidden');
        overlay.classList.toggle('show');
        modal.classList.toggle('show');

        if (!modal.classList.contains('hidden')) {
            this.renderCart();
        }
    }

    renderCart() {
        const cartBody = document.getElementById('cart-body');
        const totalElement = document.getElementById('cart-total');

        if (this.cart.length === 0) {
            cartBody.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart" style="font-size: 4rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <h3>Your cart is empty</h3>
                    <p>Add some products to get started</p>
                    <button class="btn-primary" onclick="app.toggleCartModal(); app.renderProducts();">Continue Shopping</button>
                </div>
            `;
        } else {
            cartBody.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                        <div class="cart-item-quantity">
                            <button onclick="app.updateCartQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="app.updateCartQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="btn-secondary" onclick="app.removeFromCart(${item.id})" style="margin-top: 0.5rem;">
                            Remove
                        </button>
                    </div>
                    <div class="cart-item-total">
                        ₹${(item.price * item.quantity).toLocaleString()}
                    </div>
                </div>
            `).join('');
            
            totalElement.textContent = this.getCartTotal().toLocaleString();
        }
    }

    // Wishlist (bonus feature)
    addToWishlist(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!this.wishlist.find(item => item.id === productId)) {
            this.wishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
            this.updateWishlistCount();
            this.showToast('Added to wishlist!', 'success');
        }
    }

    updateWishlistCount() {
        const count = this.wishlist.length;
        const badge = document.getElementById('wishlist-count');
        badge.textContent = count;
        badge.classList.toggle('hidden', count === 0);
    }

    showWishlist() {
        alert('Wishlist feature:\n' + this.wishlist.map(item => `• ${item.name} (₹${item.price.toLocaleString()})`).join('\n') || 'Wishlist is empty');
    }

    // Slider
    startSlider() {
        setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    nextSlide() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.hero-dot');
        
        slides[this.currentSlide].classList.remove('active');
        dots[this.currentSlide].classList.remove('active');
        
        this.currentSlide = (this.currentSlide + 1) % slides.length;
        
        slides[this.currentSlide].classList.add('active');
        dots[this.currentSlide].classList.add('active');
    }

    goToSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.hero-dot');
        
        slides[this.currentSlide].classList.remove('active');
        dots[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        slides[this.currentSlide].classList.add('active');
        dots[this.currentSlide].classList.add('active');
    }

    // Theme management
    toggleTheme() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        document.querySelector('#theme-toggle i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    loadTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        if (theme === 'dark') {
            document.body.classList.add('dark');
            document.querySelector('#theme-toggle i').className = 'fas fa-sun';
        }
    }

    // Utility functions
    closeModals() {
        document.querySelectorAll('.modal, .cart-modal').forEach(modal => {
            modal.classList.add('hidden');
            modal.classList.remove('show');
        });
        document.getElementById('modal-overlay').classList.remove('show');
    }

    showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    hideLoading() {
        setTimeout(() => {
            document.getElementById('loading-screen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loading-screen').style.display = 'none';
            }, 500);
        }, 1500);
    }
}

// Initialize app when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ECommerceApp();
});

// Expose app to global scope for cart functions
window.app = null;