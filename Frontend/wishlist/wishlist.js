$(document).ready(function () {
  $.ajax({
    url: "/getWishlistItems",
    type: "GET",
    success: function (data) {
      if (!Array.isArray(data)) {
        console.error("Data is not an array:", data);
        return;
      }

      if (data.length === 0) {
        $("#cart-left").html("<p>No items in wishlist </p>");
        return;
      }

      $.each(data, function (index, item) {
        var cardHtml = `
          <div class="thumbnail shadow product-thumbnail col-sm-3" id="${item._id}">
            <a href="#"> <img src= "../${item.imagePath}"></a>
            <div class="product-description">
              <p class="title">${item.title}</p>
              <p class="price">&#x20B9; ${item.price}/<small> ${item.quantity} </small></p>
            </div>
            <div class="cart-wishlist">
              <center>
                <button onClick="addToCart()" class="cart-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket" viewBox="0 0 16 16">
                    <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5"></svg> Add to Cart
                </button>
                <button class="wishlist-btn" onClick="removeFromList('${item._id}')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                  </svg> Remove
                </button>
              </center>
            </div>
          </div>
        `;
        $("#cart-left").append(cardHtml);
      });
    },
    error: function (xhr, status, error) {
      console.error("Error fetching wishlist items:", error);
    },
  });
});

function removeFromList(itemId) {
  $.ajax({
    url: "/removeFromList",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ index: itemId }),
    success: function (response) {
      if (response.success) {
        $("#" + itemId).remove();
      } else {
        console.error("Error removing item from wishlist.");
      }
    },
    error: function (xhr, status, error) {
      console.error("Error removing item from wishlist:", error);
    },
  });
}

$(document).on("click", ".wishlist-btn", function () {
  var itemId = $(this).closest(".thumbnail").attr("id");
  removeFromList(itemId);
});

function addToCart() {
  const productDiv = $(event.target).closest(".thumbnail");
  const imagePath = productDiv.find("img").attr("src");
  const title = productDiv.find(".title").text();
  const quantity = productDiv.find("small").text();
  const price = parseFloat(productDiv.find(".price").text().replace("₹", ""));

  const item = {
    imagePath: imagePath,
    title: title,
    price: price,
    quantity: quantity,
  };

  $.ajax({
    url: "/saveToCart", // Replace with the appropriate endpoint on your server
    type: "POST",
    data: JSON.stringify(item),
    contentType: "application/json",
    success: function (response) {
      console.log("Item added to cart:", item);
      alert(response);
    },
    error: function (xhr, status, error) {
      console.error("Error adding item to cart:", error);
      // Handle error response if needed
    },
  });
}
