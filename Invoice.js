// Function to load the invoice from localStorage
function loadInvoice() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const reservation = JSON.parse(localStorage.getItem('reservation')) || null;

    const invoiceDetailsElement = document.getElementById('invoice-details');
    let invoiceHTML = '';
    let total = 0;

    if (cart.length === 0 && !reservation) {
        invoiceHTML = '<p>Your cart is empty and no reservation was made!</p>';
    } else {
        // Display cart items
        if (cart.length > 0) {
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                invoiceHTML += `<p>${item.name} - $${item.price} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>`;
            });

            // Calculation of total price
            const tax = total * 0.15; 
            const totalWithTax = total + tax;

            invoiceHTML += `<hr><p>Subtotal: $${total.toFixed(2)}</p>`;
            invoiceHTML += `<p>Tax (15%): $${tax.toFixed(2)}</p>`;
            invoiceHTML += `<p><strong>Total: $${totalWithTax.toFixed(2)}</strong></p>`;
        }

        // Display reservation details if reservation was made
        if (reservation) {
            invoiceHTML += `<hr><h3>Appointment Details</h3>`;
            invoiceHTML += `<p>Name: ${reservation.name}</p>`;
            invoiceHTML += `<p>Date: ${reservation.date}</p>`;
            invoiceHTML += `<p>Time: ${reservation.time}</p>`;
            invoiceHTML += `<p>Service: ${reservation.service}</p>`;
        }
    }

    invoiceDetailsElement.innerHTML = invoiceHTML;
}

// Function for cancel button
document.getElementById('cancel-btn').addEventListener('click', () => {
    localStorage.removeItem('cart');
    localStorage.removeItem('reservation'); 
    window.location.href = "products.html";
});

// Function for exit button
document.getElementById('exit-btn').addEventListener('click', () => {
    window.location.href = "index.html"; 
});
// load invoice
window.onload = loadInvoice;
