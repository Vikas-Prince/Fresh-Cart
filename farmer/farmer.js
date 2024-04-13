$(document).ready(function () {
  $.getJSON("f.json", function (data) {
    $("#cropCategory").change(function () {
      var cropCategory = $(this).val();
      var relatedCropsSelect = $("#relatedCrops");
      relatedCropsSelect
        .empty()
        .append('<option value="">-Select Your Crop-</option>');

      if (cropCategory !== "") {
        var relatedCrops = data[cropCategory];
        $.each(relatedCrops, function (index, crop) {
          relatedCropsSelect.append($("<option>").text(crop));
        });
      }
    });

    $("#state").change(function () {
      var state = $(this).val();
      var districtsSelect = $("#district");
      districtsSelect
        .empty()
        .append('<option value="">-Select Your District-</option>');

      if (state !== "") {
        var districts = data[state];
        $.each(districts, function (index, district) {
          districtsSelect.append(
            $(
              '<option value="' + district + '"> ' + district + "</option>"
            ).val(district)
          );
        });
      }
      $("#district").change();
    });

    $("#district").change(function () {
      var district = $(this).val();
      var mandalsSelect = $("#mandal");
      mandalsSelect
        .empty()
        .append('<option value="">-Select Your Mandal-</option>');

      if (district !== "") {
        var mandals = data[district];
        $.each(mandals, function (index, mandal) {
          mandalsSelect.append(
            $('<option value="' + mandal + '"> ' + mandal + "</option>").val(
              mandal
            )
          );
        });
      }
    });
  });

  $(".catagories-list input[type='radio']").change(function () {
    var selectedCategory = $(this).siblings("label").text();
    $("#cropCategory").val(selectedCategory.toLowerCase());
  });

  $("#cropCategory").on("click", function () {
    $("#relatedCrops").removeAttr("disabled");
  });

  $("#state").on("click", function () {
    $("#district").removeAttr("disabled");
  });

  $("#district").on("click", function () {
    $("#mandal").removeAttr("disabled");
  });

  $(".registration-section").hide();
  $("#login").on("click", function () {
    $(".main-section").hide();
    $(".final-section").hide();
    $(".registration-section").show();
  });
});

$(".f-btn").on("click", function () {
  $(".main-section").hide();
  $(".final-section").hide();
  $(".registration-section").show();
});

$(document).ready(function () {
  $("#responseContainer").hide();
  $("#myForm").submit(function (event) {
    event.preventDefault();

    var formData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/submit",
      data: formData,
      success: function (response) {
        $(".registration-section").hide();
        $("#responseContainer").show();
      },
      error: function (xhr, status, error) {
        console.error("There was a problem with the AJAX request:", error);
      },
    });
  });
});
