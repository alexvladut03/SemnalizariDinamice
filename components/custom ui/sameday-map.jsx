import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const SamedayMap = () => {
  const [selectedEasybox, setSelectedEasybox] = useState(null);

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
        console.error("Locker Plugin could not be loaded.");
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
      console.error("Locker Plugin is not loaded.");
      return;
    }

    const pluginInstance = window.LockerPlugin.getInstance();

    // Subscribe to the locker selection
    pluginInstance.subscribe((msg) => {
      setSelectedEasybox({
        address: msg.adress,
        city: msg.city,
        county: msg.county,
        name: msg.name,
        postalCode: msg.postalCode,
      });
      pluginInstance.close(); // Close the modal
    });

    // Open the modal
    pluginInstance.open();
  };

  return (
    <div className="mt-4 flex flex-col items-start">
      <Button
        onClick={openLockerPlugin}
        className="bg-amber-500 text-white p-2 rounded"
      >
        Selectează un Easybox
      </Button>
      {selectedEasybox && (
        <div className="mt-4 border-2 p-4 rounded border-amber-500">
          <p>Easybox selectat:</p>
          <p>Nume: {selectedEasybox.name}</p>
          <p>Adresă: {selectedEasybox.address}</p>
          <p>Oraș: {selectedEasybox.city}</p>
          <p>Județ: {selectedEasybox.county}</p>
          <p>Cod poștal: {selectedEasybox.postalCode}</p>
        </div>
      )}
    </div>
  );
};

export default SamedayMap;
