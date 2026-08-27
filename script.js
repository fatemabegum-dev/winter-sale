



let totalPrice = 0;
let discountAmount = 0;
let isCouponApplied = false;


let cartItems = {};


function addToCart(element, price) {
  
  let productName = "";
  if (element) {
    const titleElem = element.querySelector('.product-name');
    if (titleElem) productName = titleElem.innerText.trim();
  }

  if (productName) {
   
    if (cartItems[productName]) {
      cartItems[productName] += 1;
    } else {
     
      cartItems[productName] = 1;
    }

    
    totalPrice += parseFloat(price);

    if (isCouponApplied) {
      discountAmount = totalPrice * 0.20;
    }

    updateDisplay();
  }
}


function updateDisplay() {
  const grandTotal = totalPrice - discountAmount;

  
  const listContainer = document.getElementById('cart-item-list');
  if (listContainer) {
    listContainer.innerHTML = "";
    
   
    for (let item in cartItems) {
      listContainer.innerHTML += `
        <li>
          ${item} <span class="qty-count">${cartItems[item]}</span>
        </li>
      `;
    }
  }

  
  let totalElem = document.getElementById('total-price');
  let discountElem = document.getElementById('discount');
  let grandTotalElem = document.getElementById('grand-total');

  if (!totalElem) totalElem = document.querySelector('.price-box p:nth-child(1) span');
  if (!discountElem) discountElem = document.querySelector('.price-box p:nth-child(2) span');
  if (!grandTotalElem) grandTotalElem = document.querySelector('.price-box p:nth-child(3) span');

  if (totalElem) totalElem.innerText = totalPrice.toFixed(2) + " TK";
  if (discountElem) discountElem.innerText = discountAmount.toFixed(2) + " TK";
  if (grandTotalElem) grandTotalElem.innerText = (grandTotal > 0 ? grandTotal : 0).toFixed(2) + " TK";
}


document.addEventListener('DOMContentLoaded', () => {
  // Apply Coupon--------
  const applyBtn = document.querySelector('.btn-apply');
  if (applyBtn) {
    applyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const code = document.querySelector('.coupon-input input').value.trim();
      if (code === "SELL200") {
        if (totalPrice >= 200) {
          discountAmount = totalPrice * 0.20;
          isCouponApplied = true;
          alert("Coupon applied successfully! 20% discount added.");
        } else {
          alert("Please add at least 200 TK worth of products.");
        }
      } else {
        alert("Invalid coupon code! Please use: SELL200");
      }
      updateDisplay();
    });
  }

  // Make Purchase-----------
  const purchaseBtn = document.querySelector('.btn-purchase');
  if (purchaseBtn) {
    purchaseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (totalPrice > 0) {
        alert("Thank you! Your order has been placed successfully.");
        
        totalPrice = 0;
        discountAmount = 0;
        isCouponApplied = false;
        cartItems = {}; 
        
        const couponInput = document.querySelector('.coupon-input input');
        if (couponInput) couponInput.value = '';

        updateDisplay();
      } else {
        alert("Your cart is empty!");
      }
    });
  }
});
