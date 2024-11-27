const samedayMap = () => {
  const clientId = "52375fba-2ab1-4cfb-bf78-2078d4a616df"; //each integrator will have an unique clientId
  const countryCode = "RO"; //country for which the plugin is used
  const langCode = "ro"; //language of the plugin
  const city = "Craiova"; //User's default city to be displayed at start
  const county = "Dolj"; //User's default county to be displayed at start
  const favLockerId = 143; //User's favorite delivery point which will be pre-selected at start. If favourite delivery point exists, city and county will be negligible.
  const favType = 0; //User's favorite delivery point type, 0 for lockers and 1 for pudos.
  const theme = "light"; //theme of the plugin: light, dark
  const apiUsername = process.env.SAMEDAY_USERNAME;
  const filters = [{ showLockers: true }, { showPudos: true }]; //default filters for lockers
  const initialMapCenter = "City"; //Where the map will be initially centered. Leave undefined to center on the user's favorite delivery point, if it exists.
  window.LockerPlugin.init({
    clientId: clientId,
    countryCode: countryCode,
    langCode: langCode,
    city: city,
    county: county,
    favLockerId: favLockerId,
    favType: favType,
    theme: theme,
    apiUsername: apiUsername,
    filters: filters,
    initialMapCenter: initialMapCenter,
  });
  var pluginInstance = window.LockerPlugin.getInstance();

  return pluginInstance;
};

export default samedayMap;
