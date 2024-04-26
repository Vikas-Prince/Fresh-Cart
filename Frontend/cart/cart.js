$(document).ready(function () {
  $.ajax({
    url: "/getCartItems",
    type: "GET",
    success: function (data) {
      if (!Array.isArray(data)) {
        console.error("Data is not an array:", data);
        return;
      }

      if (data.length === 0) {
        $("#cart-left").html(
          "<center ><h2>No items in cart Add it first 😒😒</h2><center>"
        );

        $(".cart-right").hide();
        return;
      }

      function removeItemFromCart(index) {
        $.ajax({
          url: "/removeFromCart",
          type: "POST",
          data: { index: index },
          success: function (response) {
            // If the removal was successful, remove the item from the UI
            if (response.success) {
              $("#cart-item-" + index).remove(); // Remove the HTML element of the item
              updateCartTotal(); // Update the total number of items in the cart
              calculateTotalPrice(); // Recalculate the total price
              $("#responseMessage").text(response.message);
              $(".toast").toast("show");
            }
          },
          error: function (xhr, status, error) {
            console.error("Error removing item from cart:", error);
          },
        });
      }

      $(document).on("click", ".remove-item-btn", function () {
        var index = $(this).data("index");
        removeItemFromCart(index);
      });

      function updateCartTotal() {
        var totalItems = $(".cart-main").length;
        $(".font-weight-bold").text("Cart (" + totalItems + " items)");
        $(".popup").text(totalItems);
      }

      function calculateTotalPrice() {
        var totalPrice = 0;
        data.forEach(function (item) {
          totalPrice += item.price;
          return totalPrice;
        });

        if (Array.isArray(data) && data.length > 0) {
          data.forEach(function (item) {
            if (
              typeof item.price === "number" &&
              typeof item.quantity === "number"
            ) {
              totalPrice += item.price * item.quantity;
            }
          });
        }

        $("#product_total_amt").text(totalPrice.toFixed(2));
        if (totalPrice > 50) {
          var shippingCharge = 50.0;
          $("#total_cart_amt").text((totalPrice + shippingCharge).toFixed(2));
        } else {
          $("#total_cart_amt").text(0.0);
        }
      }

      function updateItemTotal(index, newQuantity) {
        data[index].quantity = newQuantity;
        var itemPrice = data[index].price * newQuantity;
        $("#itemval-" + index).text(itemPrice.toFixed(2));
        $("#product_total_amt").text(itemPrice.toFixed(2));

        calculateTotalPrice();
      }

      function decreaseNumber(textboxId) {
        var currentValue = parseInt($("#" + textboxId).val());
        if (currentValue > 1) {
          $("#" + textboxId).val(currentValue - 1);
          return currentValue - 1;
        }
        return 1;
      }

      function increaseNumber(textboxId) {
        var currentValue = parseInt($("#" + textboxId).val());
        if (currentValue < 5) {
          $("#" + textboxId).val(currentValue + 1);
          return currentValue + 1;
        }
        return 5;
      }

      var totalItems = data.length;
      $(".font-weight-bold").text("Cart (" + totalItems + " items)");
      $(".popup").text(totalItems);

      $.each(data, function (index, item) {
        var initialPrice = item.price * item.quantity;
        var cardHtml = `
        <div id="cart-item-${index}" class="card p-4 cart-main">
          <div class="row card-menu">
            <div class="col-md-2 col-5 mx-auto bg-light d-flex justify-content-center cart-img align-items-center shadow product_img">
              <img src="../${item.imagePath}" class="img-fluid" alt="cart img">
            </div>
            <div class="col-md-7 col-12 mx-auto  mt-2 cart-desc">
              <div class="row">
                <div class="col-6 card-title">
                  <h1 class="mb-4 product_name">${item.title}</h1>
                  <p class="mb-2">QUANTITY: <span id="quantity-${index} +" class="i-quantity">${item.quantity}</span></p>
                </div>
                <div class="col-6">
                  <ul class="pagination justify-content-end set_quantity">
                    <li class="page-item">
                      <button class="page-link" onclick="updateQuantity(${index},'decrease')">
                        <i class="fas fa-minus"></i>
                      </button>
                    </li>
                    <li class="page-item">
                      <input type="text" name="" class="page-link" value="1" id="textbox-${index}" disabled>
                    </li>
                    <li class="page-item">
                      <button class="page-link" onclick="updateQuantity(${index},'increase')">
                        <i class="fas fa-plus"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-8 d-flex justify-content-between remove_wish">
                  <p><i class="fas fa-trash-alt remove-item-btn" data-index="${index}"></i> REMOVE ITEM</p>
                  <p  class="remove" onClick="addToList()"><i class="fas fa-heart"></i>MOVE TO WISH LIST</p>
                </div>
                <div class="col-4 d-flex justify-content-end price_money">
                  <h3>&#8377;<span id="itemval-${index}" class="i-price">${item.price}</span></h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
        $("#cart-left").append(cardHtml);
      });

      calculateTotalPrice();

      window.updateQuantity = function (index, action) {
        var currentValue = parseInt($("#textbox-" + index).val());
        var newValue;
        if (action === "increase") {
          newValue = increaseNumber("textbox-" + index);
        } else {
          newValue = decreaseNumber("textbox-" + index);
        }
        updateItemTotal(index, newValue);
        $("#" + index).text(newValue);

        calculateTotalPrice(data.price);
      };

      calculateTotalPrice();
    },
    error: function (xhr, status, error) {
      console.error("Error fetching wishlist items:", error);
    },
  });
});

var discountCode = document.getElementById("discount_code1");

let discountApplied = false;

const discount_code = () => {
  let totalamtcurr = parseInt(total_cart_amt.innerHTML);
  let error_trw = document.getElementById("error_trw");

  if (totalamtcurr >= 250) {
    if (!discountApplied) {
      if (discountCode.value === "vikas") {
        let newtotalamt = totalamtcurr - 50;
        total_cart_amt.innerHTML = newtotalamt;
        error_trw.innerHTML = "Hurray! code is valid";
        discountApplied = true;
      } else if (discountCode.value === "ajay") {
        let newtotalamt = totalamtcurr - 70;
        total_cart_amt.innerHTML = newtotalamt;
        error_trw.innerHTML = "Hurray! code is valid";
        discountApplied = true;
      } else {
        error_trw.innerHTML = "Try Again! Valid code is vikas or ajay";
      }
    } else {
      error_trw.innerHTML = "Discount has already been applied";
    }
  } else {
    error_trw.innerHTML = "Minimum amount for discount is 250";
  }
};

// delivery date

var currentDate = new Date();
var nextDay = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
var options = { month: "long", day: "numeric", year: "numeric" };
var formattedCurrentDate = currentDate.toLocaleDateString("en-US", options);
var formattedNextDay = nextDay.toLocaleDateString("en-US", options);
var output = formattedCurrentDate + " - " + formattedNextDay;

$(".delivery-date").text(output);

$(".delivery-address").hide();

$(".btn-success").on("click", function () {
  // $(".cart-main").hide();
  $(".delivery-address").show("slow");
  $(".font-weight-bold").hide();
  $(".cart-main").hide();

  $(this).hide();
});

$(document).ready(function () {
  $("#responseContainer").hide();
  $("#myForm").submit(function (event) {
    event.preventDefault();

    var formData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/order",
      data: formData,
      success: function (response) {
        $("#responseContainer").show();

        $("#cart-section").hide();
      },
      error: function (xhr, status, error) {
        console.error("There was a problem with the AJAX request:", error);
      },
    });
  });
});

function addToList() {
  const productDiv = $(event.target).closest(".card-menu");
  const imagePath = productDiv.find("img").attr("src");
  const title = productDiv.find(".product_name").text();
  const quantity = productDiv.find(".i-quantity").text();
  const price = parseFloat(productDiv.find(".i-price").text().replace("₹", ""));

  const item = {
    imagePath: imagePath,
    title: title,
    price: price,
    quantity: quantity,
  };

  $.ajax({
    url: "/saveToList",
    type: "POST",
    data: JSON.stringify(item),
    contentType: "application/json",
    success: function (response) {
      console.log("Item added to cart:", item);
      $("#responseMessage").text(response);
      $(".toast").toast("show");
    },
    error: function (xhr, status, error) {
      console.error("Error adding item to cart:", error);
    },
  });
}
