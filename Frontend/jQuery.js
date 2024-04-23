const items = [
  {
    imagePath: "Images/vegetables/tomato.jpg",
    title: "Tomatos",
    price: "1kg Rs 20",
  },
  {
    imagePath: "Images/vegetables/potato.jpg",
    title: "Potatos",
    price: "1kg Rs 25",
  },
  {
    imagePath: "Images/vegetables/onions.jpg",
    title: "Onions",
    price: "1kg Rs 25",
  },
  {
    imagePath: "Images/vegetables/beetroot.jpg",
    title: "Beetroots",
    price: "1kg Rs 20",
  },
  {
    imagePath: "Images/vegetables/carrot.jpg",
    title: "Carrots",
    price: "1kg Rs 15",
  },
  {
    imagePath: "Images/vegetables/onions.jpg",
    title: "Onions",
    price: "1kg Rs 25",
  },
  {
    imagePath: "Images/vegetables/beetroot.jpg",
    title: "Beetroots",
    price: "1kg Rs 20",
  },
];

const fruits = [
  {
    imagePath: "Images/Fruits/apples.jpg",
    title: "Apples",
    price: "1kg Rs 100",
  },
  {
    imagePath: "Images/Fruits/Graphes.jpg",
    title: "Graphes",
    price: "1kg Rs 50",
  },
  {
    imagePath: "Images/Fruits/bananas.jpg",
    title: "Bananas",
    price: "1kg Rs 40",
  },
  {
    imagePath: "Images/Fruits/strawberry.jpg",
    title: "Strawberry's",
    price: "1kg Rs 180",
  },
  {
    imagePath: "Images/Fruits/promogranets.jpg",
    title: "Promogranets",
    price: "1kg Rs 120",
  },
  {
    imagePath: "Images/Fruits/bananas.jpg",
    title: "Bananas",
    price: "1kg Rs 40",
  },
  {
    imagePath: "Images/Fruits/strawberry.jpg",
    title: "Strawberry's",
    price: "1kg Rs 180",
  },
];

const grains = [
  {
    imagePath: "Images/grains/Blackgram.jpg",
    title: "Blackgrams",
    price: "1kg Rs 65",
  },
  {
    imagePath: "Images/grains/cornflour.jpg",
    title: "Corn flour",
    price: "1kg Rs 48",
  },
  {
    imagePath: "Images/grains/Greengrams.jpeg",
    title: "Green Grams",
    price: "1kg Rs 75",
  },
  {
    imagePath: "Images/grains/wheat.jpg",
    title: "Wheat Flour",
    price: "1kg Rs 40",
  },
  {
    imagePath: "Images/grains/upma.jpg",
    title: "Upma Flour",
    price: "1kg Rs 36",
  },
  {
    imagePath: "Images/grains/cornflour.jpg",
    title: "Corn flour",
    price: "1kg Rs 48",
  },
  {
    imagePath: "Images/grains/Greengrams.jpeg",
    title: "Green Grams",
    price: "1kg Rs 75",
  },
];

function createVegItems(items) {
  const vegItems = $('<div class="thumbnail"></div>');
  vegItems.append(
    $(
      '<a href="login/signup.html"> <img src="' +
        items.imagePath +
        '" alt="" /></a>'
    )
  );
  vegItems.append(
    $(
      '<a href="products/productPage.html"><div class="caption"> <p>' +
        items.title +
        ' </p> <small class="price"> ' +
        items.price +
        " </small></div> </a>"
    )
  );
  $(".veg-section").append(vegItems);
}

const itemsList = $(".veg-section");

$.each(items, function (index, item) {
  itemsList.append(createVegItems(item));
});

function createFruitItems(item) {
  const fruitItems = $("<div class=thumbnail></div>");
  fruitItems.append(
    $(
      '<a href="products/productPage.html"> <img src="' +
        item.imagePath +
        '"></a>'
    )
  );
  fruitItems.append(
    $(
      '<a href="products/productPage.html"> <div class="caption"> <p>' +
        item.title +
        '</p> <small class="price">' +
        item.price +
        "</small></div></a>"
    )
  );

  $(".fruits-section").append(fruitItems);
}

const fruitList = $(".fruits-section");
$.each(fruits, function (index, fruit) {
  fruitList.append(createFruitItems(fruit));
});

function createGrainItems(item) {
  const grainItems = $("<div class=thumbnail></div>");
  grainItems.append(
    $(
      '<a href="products/productPage.html"> <img src="' +
        item.imagePath +
        '"></a>'
    )
  );
  grainItems.append(
    $(
      '<a href="products/productPage.html"> <div class="caption"> <p>' +
        item.title +
        '</p> <small class="price">' +
        item.price +
        "</small></div></a>"
    )
  );

  $(".grains-section").append(grainItems);
}

const grainList = $(".grains-section");
$.each(grains, function (index, grain) {
  grainList.append(createGrainItems(grain));
});

$(document).on("ready", function () {
  $(".logg").on("click", function () {
    $(".signup-form").css("display:none");
    $(".login-form").css("display:visibility");
  });

  $(".collapse-nav, .list").on("click", function () {
    $(".navbar").slideToggle(500);
    $(".navbar").removeClass(".nav");
  });
});

$(document).ready(function () {
  $(".veg-section, .fruits-section, .grains-section").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: true,
    speed: 800,
    autoplaySpeed: 2000,
    prevArrow:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill left-arrow-icon" viewBox="0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>',
    nextArrow:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill right-arrow-icon" viewBox="0 0 16 16"><path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/></svg>',

    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 570,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $(".bulk-order").on("mouseenter", function () {
    $(this).tooltip();
  });
});

function fetchUsername() {
  $.ajax({
    url: "/get-username/:email", 
    method: "GET",
    dataType: "json",
    success: function (data) {
      $("#username").text(`${data.username}`);
      console.log(data);
    },
    error: function (xhr, status, error) {
      console.error("Error fetching username:", error);
    },
  });
}

$(document).ready(function () {
  fetchUsername();
});
