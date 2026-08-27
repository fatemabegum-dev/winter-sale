



let totalPrice = 0;
let discountAmount = 0;
let isCouponApplied = false;

// কার্টের সিলেক্ট করা প্রোডাক্ট ও কোয়ান্টিটি রাখার জন্য অবজেক্ট------
let cartItems = {};

// প্রোডাক্টে ক্লিক করলে কার্টে যোগ ও কোয়ান্টিটি বাড়ানার ফাংশন-------
function addToCart(element, price) {
  // ক্লিক করা প্রোডাক্টের নাম বের করা--------
  let productName = "";
  if (element) {
    const titleElem = element.querySelector('.product-name');
    if (titleElem) productName = titleElem.innerText.trim();
  }

  if (productName) {
    // যদি প্রোডাক্টটি আগে থেকেই কার্টে থাকে তবে কোয়ান্টিটি ১ বাড়বে--------
    if (cartItems[productName]) {
      cartItems[productName] += 1;
    } else {
      // না থাকলে নতুন হিসেবে ১ সেট হবে---------
      cartItems[productName] = 1;
    }

    // দাম যোগ করা-------
    totalPrice += parseFloat(price);

    if (isCouponApplied) {
      discountAmount = totalPrice * 0.20;
    }

    updateDisplay();
  }
}

// স্ক্রিনে কার্ট আইটেম ও দাম আপডেট করার ফাংশন---------
function updateDisplay() {
  const grandTotal = totalPrice - discountAmount;

  // ১. আইটেম এবং কোয়ান্টিটি লিস্ট আপডেট--------
  const listContainer = document.getElementById('cart-item-list');
  if (listContainer) {
    listContainer.innerHTML = "";
    
    // অবজেক্টের সব আইটেম লুপ করে লিস্টে দেখানো--------
    for (let item in cartItems) {
      listContainer.innerHTML += `
        <li>
          ${item} <span class="qty-count">${cartItems[item]}</span>
        </li>
      `;
    }
  }

  // ২. দামগুলো আপডেট করা--------
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

// কুপন এবং কেনাকাটা বাটন লিসেনার-------------
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
        // রিকুয়েস্ট শেষে সব ক্লিয়ার/রিসেট-----------
        totalPrice = 0;
        discountAmount = 0;
        isCouponApplied = false;
        cartItems = {}; // লিস্ট ক্লিয়ার
        
        const couponInput = document.querySelector('.coupon-input input');
        if (couponInput) couponInput.value = '';

        updateDisplay();
      } else {
        alert("Your cart is empty!");
      }
    });
  }
});