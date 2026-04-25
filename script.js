const productGrid = document.getElementById('product-grid');
const cartCountElement = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const navButtons = document.querySelectorAll('.nav-btn');
const allPages = document.querySelectorAll('.page-view');
let CardColor;
let cardBgColor;
let cart = []; 
navButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const targetButton = event.target.closest('.nav-btn');
        const targetId = targetButton.getAttribute('data-target');

        allPages.forEach(page => page.classList.add('hidden'));

        document.getElementById(targetId).classList.remove('hidden');

        if (targetId === 'cart-page') {
            renderCartPage();
        }
    });
});

async function fetchProducts() {
    productGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">Loading products...</p>';
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        productGrid.innerHTML = '<p>Failed to load products. Please try again later.</p>';
    }
}

function displayProducts(products) {
        productGrid.innerHTML = ''; 

        products.forEach(product => {
            const card = document.createElement('div');
            card.id = 'product-card';
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-img">
                <h2 class="product-title">${product.title}</h2>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn">Add to Cart</button>
            `;
        
            const addToCartBtn = card.querySelector('.add-to-cart-btn');
            addToCartBtn.addEventListener('click', () => {
                addToCart(product); 
            });
            
            

            productGrid.appendChild(card);
        });

        const AllproductCard = document.querySelectorAll('.product-card');
        const AllProductTitles = document.querySelectorAll('.product-title');
        CardColor = (color)=>{
            AllproductCard.forEach(productCard=>{
                productCard.style.backgroundColor = color;
            })
            if(color !== 'white'){
                AllProductTitles.forEach(title=>{
                    title.style.color = 'white'
                })
            }else{
                AllProductTitles.forEach(title=>{
                    title.style.color = 'black'
                })
            }
        }
}

// === 5. Cart Logic ===
function addToCart(product) {
    cart.push(product); 
    cartCountElement.textContent = cart.length; 
}

function renderCartPage() {

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center;">Your cart is currently empty.</p>';
        return;
    }


    cartItemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        
        const cartItemDiv = document.createElement('div');
        cartItemDiv.style.display = 'flex';
        cartItemDiv.style.justifyContent = 'space-between';
        cartItemDiv.style.alignItems = 'center';
        cartItemDiv.style.borderBottom = '1px solid #ddd';
        cartItemDiv.style.padding = '10px 0';

        cartItemDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${item.image}" style="width: 40px; height: 40px; object-fit: contain;">
                <p id="cardTitle" style="font-size: 0.9rem; max-width: 250px;">${item.title}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <strong>$${item.price.toFixed(2)}</strong>
                <button class="remove-btn" style="background: #e74c3c; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 4px;">Remove</button>
            </div>
        `;
        const removeBtn = cartItemDiv.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            removeFromCart(index);
        });

        cartItemsContainer.appendChild(cartItemDiv);
    });


    const totalDiv = document.createElement('div');
    totalDiv.style.textAlign = 'right';
    totalDiv.style.marginTop = '20px';
    totalDiv.style.fontSize = '1.5rem';
    totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartItemsContainer.appendChild(totalDiv);
}

function removeFromCart(index) {
    cart.splice(index, 1); 
    cartCountElement.textContent = cart.length; 
 
    renderCartPage(); 
}

const CardItemsBgColor = document.getElementById('cart-items')
const TitleColor = document.getElementById('cardTitle');

cardBgColor=(color)=>{
    CardItemsBgColor.style.backgroundColor = color;
    TitleColor.style.color = 'white';
}


const BgColorIcon = document.getElementById('ThemeIcon');
const bodyColor = document.querySelector('body')
const navBar = document.querySelector('.nav-btn');
const cardIcon = document.querySelector('.cart-icon');
const navigationColor = document.querySelector('.navbar')
const pageTitle = document.querySelector('.page-title');
const pageTitle2 = document.querySelector('#page-title');
const logoColor = document.querySelector('.logo');
BgColorIcon.addEventListener('click',function(e){
    let color = bodyColor.style.backgroundColor;
    if(color !== 'black'){
        BgColorIcon.innerText = '⚫️'
        bodyColor.style.backgroundColor = 'black';
        navBar.style.backgroundColor = 'black';
        navBar.style.color = 'white';
        cardIcon.style.backgroundColor = 'black';
        cardIcon.style.color = 'white';
        navigationColor.style.backgroundColor = '#161313'
        logoColor.style.color = 'white'
        pageTitle.style.color = 'white'
        pageTitle2.style.color = 'white'
        CardColor('grey');
        cardBgColor('grey')
    }else{
        BgColorIcon.innerText = '🔆'
        bodyColor.style.backgroundColor ='white';
        navBar.style.backgroundColor = 'white';
        navBar.style.color = 'black';
        cardIcon.style.backgroundColor = 'white';
        cardIcon.style.color = 'black';
        navigationColor.style.backgroundColor = 'white'
        pageTitle.style.color = 'black'
        pageTitle2.style.color = 'black'
        logoColor.style.color = "#2c3e50"
        CardColor('white')
        cardBgColor('white')
    }
})

fetchProducts();