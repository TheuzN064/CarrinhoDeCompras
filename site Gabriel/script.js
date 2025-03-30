document.addEventListener("DOMContentLoaded", function () {
    const cartItems = document.querySelectorAll(".cart-item");
    const totalElement = document.getElementById("total");
    const subtotalElement = document.getElementById("subtotal");
    const checkoutButton = document.getElementById("checkoutButton");
  
    // Função para atualizar o total
    function updateTotal() {
      let subTotal = 0;
  
      // Recalcular o total para todos os itens no carrinho
      document.querySelectorAll(".cart-item").forEach((item) => {
        const price = parseFloat(item.querySelector(".price").textContent.replace("R$ ", "").replace(",", "."));
        const quantity = parseInt(item.querySelector(".quantity").textContent);
        const total = price * quantity;
  
        item.querySelector(".total").textContent = `R$ ${total.toFixed(2)}`;
        subTotal += total;
      });
  
      // Atualizar o subtotal e o total na interface
      subtotalElement.textContent = `R$ ${subTotal.toFixed(2)}`;
      totalElement.textContent = `R$ ${subTotal.toFixed(2)}`;
    }
  
    // Função para aumentar a quantidade
    function increaseQuantity(item) {
      const quantitySpan = item.querySelector(".quantity");
      let quantity = parseInt(quantitySpan.textContent);
      quantity++;
      quantitySpan.textContent = quantity;
      updateTotal();
    }
  
    // Função para diminuir a quantidade
    function decreaseQuantity(item) {
      const quantitySpan = item.querySelector(".quantity");
      let quantity = parseInt(quantitySpan.textContent);
      if (quantity > 1) {
        quantity--;
        quantitySpan.textContent = quantity;
        updateTotal();
      }
    }
  
    // Função para remover o item
    function removeItem(item) {
      item.remove();
      updateTotal();
    }
  
    // Adicionar eventos de aumentar/diminuir e remover
    cartItems.forEach((item) => {
      const increaseButton = item.querySelector(".increase");
      const decreaseButton = item.querySelector(".decrease");
      const removeButton = item.querySelector(".remove");
  
      increaseButton.addEventListener("click", function () {
        increaseQuantity(item);
      });
  
      decreaseButton.addEventListener("click", function () {
        decreaseQuantity(item);
      });
  
      removeButton.addEventListener("click", function () {
        removeItem(item);
      });
    });
  
    // Atualiza o total na inicialização
    updateTotal();
  });
  