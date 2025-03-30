// Adicionar produto ao carrinho
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const id = button.getAttribute("data-id");
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = { id, name, price, quantity: 1 };

    // Verifica se o produto já está no carrinho
    const existingProduct = cart.find((item) => item.id === id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Atualiza a contagem de itens no carrinho
    updateCartCount();
  });
});

// Atualiza a quantidade de itens no carrinho
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
  document.getElementById("cart-count").textContent = cartCount;
}

// Carregar carrinho na página do carrinho
if (document.body.contains(document.getElementById("cart-table"))) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTableBody = document.getElementById("cart-table").getElementsByTagName("tbody")[0];
  let subTotal = 0;

  cart.forEach((product) => {
    const row = cartTableBody.insertRow();

    row.innerHTML = `
      <td>
        <div class="product">
          <div class="info">
            <div class="name">${product.name}</div>
          </div>
        </div>
      </td>
      <td>R$ ${product.price.toFixed(2)}</td>
      <td>
        <div class="qty">
          <button class="decrease">-</button>
          <span class="quantity">${product.quantity}</span>
          <button class="increase">+</button>
        </div>
      </td>
      <td>R$ ${(product.price * product.quantity).toFixed(2)}</td>
      <td><button class="remove">Remover</button></td>
    `;

    subTotal += product.price * product.quantity;

    row.querySelector(".remove").addEventListener("click", function () {
      const index = cart.findIndex((item) => item.id === product.id);
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      row.remove();
      updateTotalAndSubtotal();
    });

    row.querySelector(".increase").addEventListener("click", function () {
      product.quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      row.querySelector(".quantity").textContent = product.quantity;
      updateTotalAndSubtotal();
    });

    row.querySelector(".decrease").addEventListener("click", function () {
      if (product.quantity > 1) {
        product.quantity--;
        localStorage.setItem("cart", JSON.stringify(cart));
        row.querySelector(".quantity").textContent = product.quantity;
        updateTotalAndSubtotal();
      }
    });
  });

  // Atualizar os totais
  function updateTotalAndSubtotal() {
    let subTotal = 0;
    cart.forEach((product) => {
      subTotal += product.price * product.quantity;
    });
    document.getElementById("subtotal").textContent = `R$ ${subTotal.toFixed(2)}`;
    document.getElementById("total").textContent = `R$ ${subTotal.toFixed(2)}`;
  }

  updateTotalAndSubtotal();
}

// Inicializa a contagem de itens no carrinho ao carregar a página
if (document.body.contains(document.getElementById("cart-count"))) {
  updateCartCount();
}
