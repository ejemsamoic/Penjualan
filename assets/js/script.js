// Function to handle login
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Here you would typically make an API call to verify credentials
    // For demo purposes, we'll use simple logic
    if (username === 'admin' && password === 'admin123') {
        window.location.href = 'pages/admin/sales-analysis.html';
    } else if (username === 'cashier' && password === 'cashier123') {
        window.location.href = 'pages/cashier/pos.html';
    } else {
        alert('Invalid credentials!');
    }
}

// Function to add product to cart
function addToCart(productId, productName, price) {
    const cartTable = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
    const row = cartTable.insertRow();
    row.innerHTML = `
        <td>${productName}</td>
        <td>${price}</td>
        <td><input type="number" value="1" min="1" onchange="updateTotal(this)"></td>
        <td>${price}</td>
        <td><button onclick="removeItem(this)">Remove</button></td>
    `;
    updateCartTotal();
}

// Function to update cart total
function updateCartTotal() {
    const cartTable = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
    let total = 0;
    for (let row of cartTable.rows) {
        total += parseFloat(row.cells[3].innerHTML);
    }
    document.getElementById('totalAmount').innerHTML = total.toFixed(2);
}

// Function to remove item from cart
function removeItem(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateCartTotal();
}

// Function to handle checkout
function handleCheckout() {
    const cartItems = [];
    const cartTable = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
    for (let row of cartTable.rows) {
        cartItems.push({
            product: row.cells[0].innerHTML,
            price: row.cells[1].innerHTML,
            quantity: row.cells[2].getElementsByTagName('input')[0].value,
            total: row.cells[3].innerHTML
        });
    }
    
    // Here you would typically send this data to your backend
    // For demo purposes, we'll just log it
    console.log('Transaction:', cartItems);
    alert('Transaction completed!');
    
    // Clear cart
    cartTable.innerHTML = '';
    updateCartTotal();
}

// Add event listeners when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
});