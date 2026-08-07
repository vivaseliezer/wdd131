// Static Weather Inputs (Metric)
const temperature = 8; // in °C (must be <= 10 °C for viable wind chill)
const windSpeed = 12;  // in km/h (must be > 4.8 km/h for viable wind chill)

// Wind Chill Calculation Function
// Metric Formula: 13.12 + 0.6215*T - 11.37*V^0.16 + 0.3965*T*V^0.16
const calculateWindChill = (t, v) => 13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16);

document.addEventListener("DOMContentLoaded", () => {
    // Populate static weather values in HTML
    const tempElement = document.getElementById("temperature-info");
    const windElement = document.getElementById("wind-speed");
    const windChillElement = document.getElementById("windchill-factor");

    if (tempElement) tempElement.textContent = `${temperature} °C`;
    if (windElement) windElement.textContent = `${windSpeed} km/h`;

    // Check conditions before calculating wind chill
    if (windChillElement) {
        if (temperature <= 10 && windSpeed > 4.8) {
            const windChillValue = calculateWindChill(temperature, windSpeed);
            windChillElement.textContent = `${windChillValue.toFixed(1)} °C`;
        } else {
            windChillElement.textContent = "N/A";
        }
    }

    // Populate copyright year
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Populate last modified date
    const lastModifiedElement = document.getElementById("lastModifiedDate");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last modified: ${document.lastModified}`;
    }
});
