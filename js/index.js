(() => {
    $document = $(document);

    $document.ready(() => {
    })
})();


// Function to calculate SVP (Saturation Vapor Pressure) in kPa
function calculateSVP(temperature) {
    const exponent = (temperature / (temperature + 238.3)) * 17.2694;
    const svp = (610.78 * Math.exp(exponent)) / 1000; // SVP in kPa
    return svp;
}

// Function to calculate VPD (Vapor Pressure Deficit) in kPa
function calculateVPD(svp, humidity) {
    const vpd = svp * (1 - humidity / 100); // VPD in kPa
    return vpd.toFixed(2);
}

// Function to update sensor readings
async function updateReadings() {
    try {
        const proxyUrl = 'http://localhost:8080/';
        const targetUrl = 'http://192.168.100.138/status';
        const response = await fetch(proxyUrl + targetUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data fetched from Shelly:', data);

        // Extract temperature, humidity, and other readings
        const temperature = data.ext_temperature["0"].tC;
        const humidity = data.ext_humidity["0"].hum;
        const svp = calculateSVP(temperature); // Calculate SVP
        const vpd = calculateVPD(svp, humidity); // Calculate VPD

        // Update UI with new sensor data
        document.getElementById('sensorTemp').innerText = temperature + ' °C';
        document.getElementById('sensorHumidity').innerText = humidity + ' %';
        document.getElementById('sensorVPD').innerText = vpd + ' kPa';
        // Update other readings if needed
    } catch (error) {
        console.error('Error fetching data from Shelly:', error);
    }
}

// Fetch and update readings every 5 seconds
setInterval(updateReadings, 5000);

// Initial fetch on page load
updateReadings();






/*
//Това работи на 100%
async function getShellyData() {
    try {
        const proxyUrl = 'http://localhost:8080/';
        const targetUrl = 'http://192.168.100.138/status';
        const response = await fetch(proxyUrl + targetUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data fetched from Shelly:', data); // Debugging line

        // Extract temperature and humidity from the JSON response
        const temperature = data.ext_temperature["0"].tC; // Temperature in Celsius
        const humidity = data.ext_humidity["0"].hum; // Humidity in percentage

        // Calculate SVP and VPD
        const svp = calculateSVP(temperature);
        const vpd = calculateVPD(svp, humidity);

        updateReadings(temperature, humidity, vpd);
    } catch (error) {
        console.error('Error fetching data from Shelly:', error);
    }
}

function calculateSVP(temperature) {
    const exponent = (temperature / (temperature + 238.3)) * 17.2694;
    const svp = (610.78 * Math.pow(2.71828, exponent)) / 1000; // SVP in kPa
    return svp;
}

function calculateVPD(svp, humidity) {
    const vpd = svp * (1 - humidity / 100); // VPD in kPa
    return vpd.toFixed(2);
}

function updateReadings(temperature, humidity, vpd) {
    document.getElementById('sensorTemp').innerText = temperature + ' °C'; // Temperature reading
    document.getElementById('sensorHumidity').innerText = humidity + ' %'; // Humidity reading
    document.getElementById('sensorVPD').innerText = vpd + ' kPa'; // VPD reading
    // Update other readings if needed
}

// Fetch and update readings every 2 seconds
setInterval(getShellyData, 2000);

// Initial fetch
getShellyData();
*/




/*
function getRandomReading() {
    return (Math.random() * 100).toFixed(2); // Generate a random number between 0 and 100
}

function updateReadings() {
    document.getElementById('light1').innerText = getRandomReading() + ' lx'; // Light reading
    document.getElementById('co2-1').innerText = getRandomReading() + ' ppm'; // CO2 reading
    document.getElementById('sensorTemp').innerText = getRandomReading() + ' °C'; // Temperature reading
    document.getElementById('sensorHumidity').innerText = getRandomReading() + ' %'; // Humidity reading
}

// Update readings every 5 seconds
setInterval(updateReadings, 2000);

// Initial update
updateReadings();


//Работи но с CORS грешка
async function getShellyData() {
    try {
        const response = await fetch('http://192.168.100.138/status');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data fetched from Shelly:', data); // Debugging line

        // Extract temperature and humidity from the JSON response
        const temperature = data.ext_temperature["0"].tC; // Temperature in Celsius
        const humidity = data.ext_humidity["0"].hum; // Humidity in percentage

        updateReadings(temperature, humidity);
    } catch (error) {
        console.error('Error fetching data from Shelly:', error);
    }
}

function updateReadings(temperature, humidity) {
    document.getElementById('sensorTemp').innerText = temperature + ' °C'; // Temperature reading
    document.getElementById('sensorHumidity').innerText = humidity + ' %'; // Humidity reading
    // Update other readings if needed
}

// Fetch and update readings every 2 seconds
setInterval(getShellyData, 2000);

// Initial fetch
getShellyData();
*/
