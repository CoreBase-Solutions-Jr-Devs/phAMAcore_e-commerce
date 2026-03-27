// helpers/location.js

// Haversine formula to calculate distance in meters
export const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000; // Earth radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Check delivery availability based on zone
export const checkDelivery = (lat, lng, zone) => {
  const distance = getDistance(lat, lng, zone.lat, zone.lng);
  return distance <= zone.radius
    ? "Delivery available in your area!"
    : "Sorry, delivery not available in your area.";
};

export const getUserLocation = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        let city = "Unknown";
        let county = "Unknown";
        let postalCode = ""; // default empty

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          // Extract values safely
          city = data.address.city || data.address.town || data.address.village || "Unknown";
          county = data.address.county || "Unknown";
          postalCode = data.address.postcode || "";
        } catch {
          city = "Unknown";
          county = "Unknown";
          postalCode = "";
        }

        resolve({ latitude, longitude, city, county, postalCode });
      },
      (error) => {
        reject(error.message);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  });
};