(() => {
    $document = $(document);

    $document.ready(() => {
    })
})();

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
