// Product Filter
document.addEventListener("DOMContentLoaded", function () {

  const buttons = document.querySelectorAll('.filter_btn');
  const products = document.querySelectorAll('.product-item'); // FIXED

  buttons.forEach(button => {
    button.addEventListener('click', function () {

      const category = this.innerText.toLowerCase();

      // Active button
      buttons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter logic
      products.forEach(product => {
        const productCategory = product.getAttribute('data-category');

        if (category === 'all' || productCategory === category) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });

    });
  });

});