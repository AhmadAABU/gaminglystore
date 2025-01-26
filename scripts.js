document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const emptyCartMessage = document.getElementById("empty-cart-message");
  const proceedButton = document.querySelector(".procced");
  const orderSummaryContainer = document.getElementById("order-summary");
  const placeOrderButton = document.getElementById("submit");
  const orderForm = document.getElementById("orderForm");
  const cartDataInput = document.getElementById("cartData");
  let cartTotal = 0;

  document.querySelectorAll(".add-to").forEach((button) => {
    button.addEventListener("click", () => {
      const productBox = button.closest(".box");
      const productName = productBox.querySelector(".product-name p").textContent;
      const productPrice = parseFloat(productBox.querySelector(".price p").textContent.split(" ")[0]);
      const productImage = productBox.querySelector(".img img").src; // Get the image source

      addToCart(productName, productPrice, productImage); // Pass the image source to the function
    });
  });

  function addToCart(name, price, imageSrc) {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    
    const imgElement = document.createElement("img");
    imgElement.src = imageSrc;
    imgElement.alt = name;
    imgElement.style.width = "65px";
    imgElement.style.marginRight = "10px";
    
    const details = document.createElement("span");
    details.innerHTML = `${name} - ${price} JOD `;
    
    const deleteButton = document.createElement("span");
    deleteButton.className = "delete-item";
    deleteButton.textContent = "Delete";
    
    cartItem.appendChild(imgElement);
    cartItem.appendChild(details);
    cartItem.appendChild(deleteButton);
    
    cartItemsContainer.appendChild(cartItem);

    cartTotal += price;
    cartTotalElement.textContent = cartTotal.toFixed(2);

    saveCart();
    updateCartState();
  }

  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-item")) {
      const cartItem = e.target.parentNode;
      const price = parseFloat(cartItem.querySelector("span").textContent.split(" - ")[1].split(" ")[0]);
      removeFromCart(cartItem, price);
    }
  });

  function removeFromCart(cartItem, price) {
    cartItemsContainer.removeChild(cartItem);
    cartTotal -= price;
    cartTotalElement.textContent = cartTotal.toFixed(2);

    saveCart();
    updateCartState();
  }

  function saveCart() {
    const cartItems = [];
    cartItemsContainer.querySelectorAll(".cart-item").forEach((item) => {
      const [name, price] = item.querySelector("span").textContent.split(" - ");
      const imageSrc = item.querySelector("img").src;
      cartItems.push({ name, price: parseFloat(price), imageSrc });
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("cartTotal", cartTotal.toFixed(2));
  }

  function loadCart() {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    const savedCartTotal = parseFloat(localStorage.getItem("cartTotal"));

    if (savedCartItems) {
      savedCartItems.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        
        const imgElement = document.createElement("img");
        imgElement.src = item.imageSrc;
        imgElement.alt = item.name;
        imgElement.style.width = "65px"; // Adjust the size as needed
        imgElement.style.marginRight = "10px"; // Add some spacing between image and details
        
        const details = document.createElement("span");
        details.innerHTML = `${item.name} - ${item.price} JOD `;
        
        const deleteButton = document.createElement("span");
        deleteButton.className = "delete-item";
        deleteButton.textContent = "Delete";
        
        cartItem.appendChild(imgElement);
        cartItem.appendChild(details);
        cartItem.appendChild(deleteButton);
        
        cartItemsContainer.appendChild(cartItem);
      });

      cartTotal = savedCartTotal;
      cartTotalElement.textContent = cartTotal.toFixed(2);
    }

    updateCartState();
  }

  function updateCartState() {
    if (cartItemsContainer.children.length === 0) {
      emptyCartMessage.style.display = "block";
      proceedButton.style.display = "none";
    } else {
      emptyCartMessage.style.display = "none";
      proceedButton.style.display = "inline-block";
    }

    updateOrderSummary();
  }

function updateOrderSummary() {
  orderSummaryContainer.innerHTML = "";
  cartItemsContainer.querySelectorAll(".cart-item").forEach((item) => {
    const orderItem = item.cloneNode(true);
    orderItem.classList.add("product-name-pro");

    // Ensure the delete button is visible and functional
    const deleteButton = orderItem.querySelector(".delete-item");
    if (deleteButton) {
      deleteButton.style.display = "inline";
      deleteButton.addEventListener("click", () => {
        const itemName = orderItem.querySelector("span").textContent.split(" - ")[0];

        // Find the corresponding item in the main cart
        const originalCartItem = [...cartItemsContainer.children].find(
          (originalItem) =>
            originalItem.querySelector("span").textContent.split(" - ")[0] === itemName
        );

        if (originalCartItem) {
          const price = parseFloat(
            originalCartItem.querySelector("span").textContent.split(" - ")[1].split(" ")[0]
          );
          removeFromCart(originalCartItem, price);
        }

        // Remove the item from the order summary
        orderSummaryContainer.removeChild(orderItem);
      });
    }

    orderSummaryContainer.appendChild(orderItem);
  });

  const orderTotal = document.createElement("p");
  orderTotal.classList.add("proceed-total");
  orderTotal.textContent = `Total: ${cartTotal.toFixed(2)} JOD`;
  orderSummaryContainer.appendChild(orderTotal);
}
  loadCart();

  orderForm.addEventListener("submit", (e) => {
    const cartItems = [];
    cartItemsContainer.querySelectorAll(".cart-item").forEach((item) => {
      const [name, price] = item.querySelector("span").textContent.split(" - ");
      cartItems.push({ name, price: parseFloat(price) });
    });

    const cartData = {
      items: cartItems,
      total: cartTotal.toFixed(2)
    };

    cartDataInput.value = JSON.stringify(cartData);

    // Clear local storage after form submission
    localStorage.clear();
  });
});

/*Slider*/
let currentSlideIndex = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  const bullets = document.querySelectorAll('.bullet');
  
  if (index >= slides.length) {
    currentSlideIndex = 0;
  } 
  
  else if (index < 0) {
    currentSlideIndex = slides.length - 1;
  } 
  
  else {
    currentSlideIndex = index;
  }
  
  const offset = -currentSlideIndex * 100;
  document.querySelector('.slides').style.transform = `translatex(${offset}%)`;
  
  bullets.forEach((bullet, i) => {
    bullet.classList.remove('active');
    if (i === currentSlideIndex) {
      bullet.classList.add('active');
    }
  });
}

function nextSlide() {
  showSlide(currentSlideIndex + 1);
}

function prevSlide() {
  showSlide(currentSlideIndex - 1);
}

function goToSlide(index) {
  showSlide(index);
}


setInterval(nextSlide, 3000);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.bullet')[0].classList.add('active');
});

/*Slider*/


/*alert added*/

document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            Swal.fire({
                icon: 'success',
                title: 'Added to Cart',
                text: 'The product has been added to your cart.',
                confirmButtonText: 'OK'
            });
        });
    });
});

/*alert added*/

