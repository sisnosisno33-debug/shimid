const products = [
    { id: 1, name: 'Aqua', price: 5000, img: 'img/Aqua.jpeg' },
    { id: 2, name: 'Kanzler', price: 9000, img: 'img/Kanzler.jpg' },
    { id: 3, name: 'Golda', price: 4000, img: 'img/Golda.jpg' },
    { id: 4, name: 'Indomie', price: 4000, img: 'img/Indomie.jpg' },
    { id: 5, name: 'Sprite', price: 5000, img: 'img/Sprite.jpg' },
    { id: 6, name: 'SilverQueen', price: 12000, img: 'img/SilverQueen.jpeg' },
];

let cart = [];

// Menampilkan produk
function displayproducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rp ${product.price.toLocaleString('id-ID')}</p>
            <button onclick="addToCart(${product.id})">
                Tambah ke keranjang
            </button>
        `;

        productsContainer.appendChild(productDiv);
    });
}

// Menambah produk ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updatecart();
}

// Menampilkan keranjang
function updatecart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalprice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');

        listItem.textContent =
            `${item.name} x ${item.quantity} - Rp ` +
            (item.price * item.quantity).toLocaleString('id-ID');

        cartItemsContainer.appendChild(listItem);
        totalprice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent =
        totalprice.toLocaleString('id-ID');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong.');
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const payment = prompt(
        `Total belanja Anda Rp ${total.toLocaleString('id-ID')}. ` +
        'Masukkan jumlah pembayaran:'
    );

    if (payment === null || payment.trim() === '') {
        return;
    }

    const paymentAmount = Number(payment);

    if (!Number.isFinite(paymentAmount) || paymentAmount < 0) {
        alert('Masukkan jumlah pembayaran yang valid.');
        return;
    }

    if (paymentAmount >= total) {
        const change = paymentAmount - total;

        alert(
            `Pembayaran berhasil! Kembalian Anda: Rp ` +
            change.toLocaleString('id-ID')
        );

        cart = [];
        updatecart();
    } else {
        alert('Uang Anda tidak mencukupi.');
    }
}

// Tombol checkout
document.getElementById('checkout-btn')
    .addEventListener('click', checkout);

// Menampilkan produk saat halaman dibuka
displayproducts();
updatecart();