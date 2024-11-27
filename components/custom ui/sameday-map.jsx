import React, { useEffect } from "react";

const SamedayMap = () => {
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
      console.log("Locker selected:", msg);
      pluginInstance.close(); // Close the modal
    });

    // Open the modal
    pluginInstance.open();
  };

  return (
    <button
      onClick={openLockerPlugin}
      className="bg-blue-500 text-white p-2 rounded"
    >
      Selectează un Easybox
    </button>
  );
};

export default SamedayMap;
