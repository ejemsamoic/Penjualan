// Fungsi validasi form
function validateForm() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error-message');
    
    if (username.length < 3) {
        errorDiv.textContent = 'Username minimal 3 karakter!';
        return false;
    }
    
    if (password.length < 6) {
        errorDiv.textContent = 'Password minimal 6 karakter!';
        return false;
    }
    
    return true;
}

// Perbaikan pada fungsi handleCheckout
async function handleCheckout() {
    try {
        const cartItems = [];
        const cartTable = document.getElementById('cartTable').getElementsByTagName('tbody')[0];
        
        if (cartTable.rows.length === 0) {
            alert('Keranjang belanja kosong!');
            return;
        }

        for (let row of cartTable.rows) {
            const quantity = parseInt(row.cells[2].getElementsByTagName('input')[0].value);
            const price = parseFloat(row.cells[1].innerHTML);
            
            if (quantity <= 0 || isNaN(quantity)) {
                alert('Jumlah produk tidak valid!');
                return;
            }
            
            cartItems.push({
                product: row.cells[0].innerHTML,
                price: price,
                quantity: quantity,
                total: price * quantity
            });
        }
        
        // Simpan ke database (contoh menggunakan fetch API)
        const response = await fetch('save_transaction.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': sessionStorage.getItem('csrf_token')
            },
            body: JSON.stringify(cartItems)
        });
        
        if (!response.ok) throw new Error('Gagal menyimpan transaksi');
        
        alert('Transaksi berhasil!');
        cartTable.innerHTML = '';
        updateCartTotal();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan: ' + error.message);
    }
}
