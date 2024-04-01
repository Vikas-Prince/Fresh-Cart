$(document).ready(function () {
  $.getJSON("cart.json", function (data) {
    if (!Array.isArray(data)) {
      console.error("Data is not an array:", data);
      return;
    }

    function removeItemFromCart(index) {
      $("#cart-item-" + index).remove();
      data.splice(index, 1);
      updateCartTotal();
    }

    function updateCartTotal() {
      var totalItems = data.length;
      $(".font-weight-bold").text("Cart (" + totalItems + " items)");
      $(".popup").text(totalItems);
    }

    function updateItemTotal(index, newQuantity) {
      data[index].quantity = newQuantity;
      var itemPrice = data[index].price * newQuantity;
      $("#itemval-" + index).text(itemPrice.toFixed(2));
      $("#product_total_amt").text(itemPrice.toFixed(2));
    }

    function updateCartTotal() {
      function calculateTotalPrice() {
        try {
          var totalPrice = 0;
          data.forEach(function (item) {
            totalPrice += parseFloat(item.price) * parseInt(item.quantity);
          });

          if (!isNaN(totalPrice)) {
            $("#product_total_amt").text(totalPrice.toFixed(2));

            // Assuming there's some initial shipping charge of $50, add it to the total
            var shippingCharge = 50.0;
            $("#total_cart_amt").text((totalPrice + shippingCharge).toFixed(2));
          } else {
            throw "Total price calculation failed!";
          }
        } catch (error) {
          console.error("Error calculating total price:", error);
        }
      }
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
          <div class="row">
            <div class="col-md-2 col-5 mx-auto bg-light d-flex justify-content-center cart-img align-items-center shadow product_img">
              <img src="../${item.imagePath}" class="img-fluid" alt="cart img">
            </div>
            <div class="col-md-7 col-12 mx-auto  mt-2 cart-desc">
              <div class="row">
                <div class="col-6 card-title">
                  <h1 class="mb-4 product_name">${item.title}</h1>
                  <p class="mb-2">QUANTITY: <span id="quantity-${index} +">${item.quantity}</span></p>
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
                  <p><i class="fas fa-heart"></i>MOVE TO WISH LIST</p>
                </div>
                <div class="col-4 d-flex justify-content-end price_money">
                  <h3>&#8377;<span id="itemval-${index}">${item.price}</span></h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      $("#cart-left").append(cardHtml);
    });

    $(".remove-item-btn").click(function () {
      var index = $(this).data("index");
      removeItemFromCart(index);
    });

    window.updateQuantity = function (index, action) {
      var currentValue = parseInt($("#textbox-" + index).val());
      var newValue;
      if (action === "increase") {
        newValue = increaseNumber("textbox-" + index);
      } else {
        newValue = decreaseNumber("textbox-" + index);
      }
      updateItemTotal(index, newValue);
      $("#quantity-" + index).text(newValue);

      updateCartTotal();
    };
  });
});

var discountCode = document.getElementById("discount_code1");

let discountApplied = false;

const discount_code = () => {
  if (!discountApplied) {
    let totalamtcurr = parseInt(totalCart.innerHTML);
    let error_trw = document.getElementById("error_trw");
    if (discountCode.value === "vikas") {
      let newtotalamt = totalamtcurr - 50;
      totalCart.innerHTML = newtotalamt;
      error_trw.innerHTML = "Hurray! code is valid";
      discountApplied = true;
    } else if (discountCode.value === "ajay") {
      let newtotalamt = totalamtcurr - 70;
      totalCart.innerHTML = newtotalamt;
      error_trw.innerHTML = "Hurray! code is valid";
      discountApplied = true;
    } else {
      error_trw.innerHTML = "Try Again! Valid code is vikas";
    }
  } else {
    let error_trw = document.getElementById("error_trw");
    error_trw.innerHTML = "Discount has already been applied";
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
