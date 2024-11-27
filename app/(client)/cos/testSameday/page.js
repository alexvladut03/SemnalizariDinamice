"use client";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [counties, setCounties] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [selectedLocality, setSelectedLocality] = useState(null);
  const [error, setError] = useState(null);
  const [deliveryCost, setDeliveryCost] = useState(null);

  useEffect(() => {
    const fetchCounties = async () => {
      try {
        const response = await fetch("/api/sameday/pickup-points", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "getCounty" }),
        });
        if (!response.ok) throw new Error("Failed to fetch counties");

        const data = await response.json();
        setCounties(data.data.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCounties();
  }, []);

  const fetchLocalities = async (countyId) => {
    try {
      const response = await fetch("/api/sameday/pickup-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "getLocalities",
          clientData: { countyId },
        }),
      });
      if (!response.ok) throw new Error("Failed to fetch localities");

      const data = await response.json();
      console.log("Rraspuns complet WEdadsdB", data);
      setLocalities(data.data.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const calculateDeliveryCost = async () => {
    if (!selectedCounty || !selectedLocality) {
      setError("Selectează un județ și o localitate");
      return;
    }

    try {
      const response = await fetch("/api/sameday/pickup-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "calculateTariff",
          clientData: {
            county: selectedCounty,
            locality: selectedLocality,
            weight: 1,
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to calculate delivery cost");

      const data = await response.json();
      console.log("Rraspuns complet WEB", data);
      console.log("Rraspuns WEB", data.data.amount);
      setDeliveryCost(data.data.amount);
    } catch (error) {
      setError(error.message);
    }
  };
  const calculateBasicEstimateCost = async () => {
    try {
      const response = await fetch("/api/sameday/pickup-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "calculateTarif2",
        }),
      });

      if (!response.ok)
        throw new Error("Failed to calculate basic estimate cost");

      const data = await response.json();
      console.log("Basic Estimate Cost Response:", data); // For debugging
      setDeliveryCost(data.data.amount); // Assuming response has an `amount` field
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCountyChange = (e) => {
    const countyId = e.target.value;
    setSelectedCounty(countyId);
    setSelectedLocality(null);
    fetchLocalities(countyId);
  };
  const fetchServices = async () => {
    try {
      const response = await fetch("/api/sameday/pickup-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "getServices" }),
      });

      if (!response.ok) throw new Error("Failed to fetch services");

      const data = await response.json();
      console.log("Available services:", data); // Log or display the services
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchPickupPoints = async () => {
    try {
      const response = await fetch("/api/sameday/pickup-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "pickuppoints" }),
      });

      if (!response.ok) throw new Error("Failed to fetch pickup points");

      const data = await response.json();
      console.log("Pickup points:", data); // Log or display the pickup points
    } catch (error) {
      console.error("Error fetching pickup points:", error);
    }
  };
  useEffect(() => {
    const loadLockerPlugin = () => {
      const script = document.createElement("script");
      script.src = "https://cdn.sameday.ro/locker-plugin/lockerpluginsdk.js";
      script.async = true;
      script.onload = initializeLockerPlugin;
      document.body.appendChild(script);
    };

    const initializeLockerPlugin = () => {
      if (!window.LockerPlugin) {
        setError("Locker Plugin could not be loaded.");
        return;
      }

      // Initialize the plugin
      window.LockerPlugin.init({
        clientId: "52375fba-2ab1-4cfb-bf78-2078d4a616df",
        apiUsername: "masyvteamTEST",
        countryCode: "RO",
        langCode: "ro",
        city: "București",
        county: "București",
        theme: "light",
        initialMapCenter: "City",
      });
    };

    loadLockerPlugin();
  }, []);

  const openLockerPlugin = () => {
    if (!window.LockerPlugin) {
      setError("Locker Plugin is not initialized.");
      return;
    }

    const pluginInstance = window.LockerPlugin.getInstance();

    // Subscribe to the locker selection
    pluginInstance.subscribe((msg) => {
      console.log("Locker selected:", msg);
      setSelectedLocker(msg); // Save locker details
      pluginInstance.close(); // Close the modal
    });

    // Open the modal
    pluginInstance.open();
  };

  return (
    <div>
      <h1>Calculare cost de livrare</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <select onChange={handleCountyChange} value={selectedCounty || ""}>
        <option value="" disabled>
          Selectează județul
        </option>
        {counties.map((county) => (
          <option key={county.id} value={county.id}>
            {county.name}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => setSelectedLocality(e.target.value)}
        value={selectedLocality || ""}
        disabled={!selectedCounty}
      >
        <option value="" disabled>
          Selectează localitatea
        </option>
        {localities.map((locality) => (
          <option key={locality.id} value={locality.id}>
            {locality.name}
          </option>
        ))}
      </select>

      <button
        onClick={calculateDeliveryCost}
        className="mt-4 bg-blue-500 text-white p-2"
      >
        Calculează costul de livrare
      </button>
      <button
        onClick={calculateBasicEstimateCost}
        className="mt-4 bg-green-500 text-white p-2 ml-4"
      >
        Calculează costul de estimare de bază
      </button>
      <button
        onClick={fetchServices}
        className="mt-4 bg-green-500 text-white p-2 ml-4"
      >
        Servicii disponibile
      </button>
      <button
        onClick={fetchPickupPoints}
        className="mt-4 bg-green-500 text-white p-2 ml-4"
      >
        Puncte de ridicare
      </button>
      <button
        onClick={openLockerPlugin}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Selectează un Easybox
      </button>

      {deliveryCost && (
        <div>
          <h2>Cost de livrare:</h2>
          <p>{deliveryCost} RON</p>
        </div>
      )}
    </div>
  );
}
