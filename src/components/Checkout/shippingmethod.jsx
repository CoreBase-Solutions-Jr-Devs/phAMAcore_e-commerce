import React, { useState, useEffect } from "react";

const ShippingMethod = ({ onChangeMessage }) => {
  const [selectedMethod, setSelectedMethod] = useState("delivery");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");

  const cities = ["Nairobi", "Mombasa", "Kisumu"];
  const locationsByCity = {
    Nairobi: ["Westlands Pickup", "CBD Pickup", "Karen Pickup"],
    Mombasa: ["Nyali Pickup", "Mombasa CBD Pickup"],
    Kisumu: ["Kisumu CBD Pickup", "Kondele Pickup"],
  };

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
    setCity("");
    setLocation("");
  };

  // Update parent with current shipping message
  useEffect(() => {
    let message = "";
    if (selectedMethod === "delivery") {
      message = "Shipping charges will be calculated based on your shipping address";
    } else if (selectedMethod === "storePickup") {
      message = "Collect in store";
    
    }

    onChangeMessage && onChangeMessage(message);
  }, [selectedMethod, city, location, onChangeMessage]);

  return (
    <div className="mt-24">
      <h3 className="fw-semibold mb-4">Shipping Method</h3>

      {/* Delivery */}
      <div className="payment-item">
        <div className="form-check common-check common-radio py-10 mb-0">
          <input
            className="form-check-input"
            type="radio"
            name="shipping"
            id="delivery"
            value="delivery"
            checked={selectedMethod === "delivery"}
            onChange={handleMethodChange}
          />
          <label className="form-check-label fw-semibold text-neutral-600" htmlFor="delivery">
            Delivery
          </label>
        </div>
        {selectedMethod === "delivery" && (
          <div className="payment-item__content px-16 py-24 rounded-8 bg-main-50 position-relative d-block mt-16">
            <p>We will deliver the items to your shipping address.</p>
          </div>
        )}
      </div>

      {/* Store Pickup */}
      <div className="payment-item">
        <div className="form-check common-check common-radio py-16 mb-0">
          <input
            className="form-check-input"
            type="radio"
            name="shipping"
            id="storePickup"
            value="storePickup"
            checked={selectedMethod === "storePickup"}
            onChange={handleMethodChange}
          />
          <label className="form-check-label fw-semibold text-neutral-600" htmlFor="storePickup">
            Store Pickup
          </label>
        </div>

        {selectedMethod === "storePickup" && (
          <div className="payment-item__content px-16 py-24 rounded-8 bg-main-50 position-relative d-block mt-16">
            <div className="row g-3">
              {/* City Dropdown */}
              <div className="col-6">
                <label className="form-label fw-medium mb-2">Select City</label>
                <select
                  className="form-select"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setLocation("");
                  }}
                >
                  <option value="">-- Select City --</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pickup Location Dropdown */}
              <div className="col-6">
                <label className="form-label fw-medium mb-2">Select Pickup Location</label>
                <select
                  className="form-select"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={!city} // disabled until city is selected
                >
                  <option value="">-- Select Location --</option>
                  {city &&
                    locationsByCity[city].map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingMethod;