$(document).ready(function () {
  $("#signup").submit(function (event) {
    event.preventDefault();

    var formData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/submit",
      data: formData,
      success: function (response) {
        if (response === "success") {
          window.location.href = "/home";
        } else {
          $("#response").text(response).show();
        }
      },
      error: function (xhr, status, error) {
        console.error("There was a problem with the AJAX request:", error);
      },
    });
  });

  $("#signup").submit(function (event) {
    event.preventDefault();
    var formData = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "/submit",
      data: formData,
      success: function (response) {
        if (response === "success") {
          window.location.href = "/home";
        } else {
          $("#lg-response").text(response).show();
        }
      },
      error: function (xhr, status, error) {
        console.error("There was a problem with the AJAX request:", error);
      },
    });
  });
});
