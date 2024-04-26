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
          $("#response").text(response);
        }
      },
      error: function (xhr, status, error) {
        console.error("There was a problem with the AJAX request:", error);
        if (xhr.status === 401) {
          alert("User already registerd, Please Login.");
        } else if (xhr.status === 400) {
          alert("Password should be Same.");
        } else {
          alert("An error occurred. Please try again later.");
        }
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
          $("#lg-response").text(response);
        }
      },
      error: function (xhr, status, error) {
        console.error("There was a problem with the AJAX request:", error);
        if (xhr.status === 404) {
          alert("User not found. Please register.");
        } else if (xhr.status === 401) {
          alert("Incorrect password.");
        } else {
          alert("An error occurred. Please try again later.");
        }
      },
    });
  });
});
