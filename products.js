document.addEventListener("DOMContentLoaded", function () {
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    renderCart();

    // Load saved reservation
    const savedReservation = JSON.parse(localStorage.getItem('reservation'));
    if (savedReservation) {
        document.getElementById('reservation-confirmation').style.display = 'block';
        document.getElementById('reservation-details').innerHTML = `
            <p>Name: ${savedReservation.name}</p>
            <p>Date: ${savedReservation.date}</p>
            <p>Time: ${savedReservation.time}</p>
            <p>Service: ${savedReservation.service}</p>
        `;
    }

    // Function to render the cart items
    function renderCart() {
        const cartItemsElement = document.getElementById('cart-items');
        cartItemsElement.innerHTML = '';
        
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${item.name} - $${item.price} (Quantity: ${item.quantity}) 
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            `;
            cartItemsElement.appendChild(listItem);
        });

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                removeFromCart(id);
            });
        });
    }

    // Function to add product to cart
    function addToCart(id, name, price) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    // Function to remove product from cart
    function removeFromCart(id) {
        const itemIndex = cart.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity--;
            } else {
                cart.splice(itemIndex, 1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    // Attach event listeners for adding items to the cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const name = e.target.dataset.name;
            const price = parseInt(e.target.dataset.price);
            addToCart(id, name, price);
        });
    });

    // Checkout button event listener
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = "invoice.html";
    });

    // Reservation submission event listener
    document.getElementById('reservation-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const service = document.getElementById('service').value;

        const reservation = { name, date, time, service };
        localStorage.setItem('reservation', JSON.stringify(reservation));
        
        document.getElementById('reservation-confirmation').style.display = 'block';
        document.getElementById('reservation-details').innerHTML = `
            <p>Name: ${name}</p>
            <p>Date: ${date}</p>
            <p>Time: ${time}</p>
            <p>Service: ${service}</p>
        `;
    });

    // Cancel reservation button event listener
    document.getElementById('cancel-reservation-btn').addEventListener('click', function() {
        localStorage.removeItem('reservation');
        document.getElementById('reservation-confirmation').style.display = 'none';
        document.getElementById('reservation-form').reset();
        alert('Your reservation has been canceled.');
    });

    // Logout button event listener
    const logoutButton = document.getElementById("logout-btn");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("cart");
            localStorage.removeItem("reservation");
            localStorage.removeItem("userToken");
            sessionStorage.removeItem("userSession");
            window.location.href = "index.html";
        });
    }
});
