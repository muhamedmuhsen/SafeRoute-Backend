import ip from "ip";
import geoip from "geoip-lite";
import httpStatusText from "../utils/httpsStatusText.js";

/**
 * Gets the geolocation for a given IP address
 * @param {string} ipAddress - The IP address to look up
 * @returns {Object|null} Location object or null if not found
 */
function getlocation(ipAddress) {
  const location = geoip.lookup(ipAddress);
  return location || null;
}

export default getlocation;
