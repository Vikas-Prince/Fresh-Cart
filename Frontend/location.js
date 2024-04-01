function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Call Google Maps API for reverse geocoding
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=fresh-cart-417604`
  )
    .then((response) => response.json())
    .then((data) => {
      const addressComponents = data.results[0].address_components;
      let city = "";
      for (let component of addressComponents) {
        if (component.types.includes("locality")) {
          city = component.long_name;
          break;
        }
      }
      document.getElementById("location").value = city;
    })
    .catch((error) => console.error("Error:", error));
}

function errorCallback(error) {
  console.error("Error getting current position:", error);
}
