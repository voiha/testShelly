async function getSensorData() {
    try {
        const response = await fetch('http://192.168.100.138:80/status');
        const data = await response.json();
        console.log('Received data:', data); // Log the fetched data
        
        // Extract external temperature and humidity readings
        const extTemperature = data.ext_temperature[0] ? data.ext_temperature[0].tC : null;
        const extHumidity = data.ext_humidity[0] ? data.ext_humidity[0].hum : null;
        return { extTemperature, extHumidity };
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        return { extTemperature: null, extHumidity: null };
    }
}

async function updateSensorReadings() {
    const { extTemperature, extHumidity } = await getSensorData();

    document.getElementById('sensorTemp').innerText = `${extTemperature !== null ? extTemperature + '°C' : 'Error'}`;
    document.getElementById('sensorHumidity').innerText = `${extHumidity !== null ? extHumidity + '%' : 'Error'}`;
}

// Update the sensor readings immediately when the page loads
updateSensorReadings();

// Update the sensor readings every 1 second
setInterval(updateSensorReadings, 1000);



function getRandomReading() {
    return (Math.random() * 100).toFixed(2); // Generate a random number between 0 and 100
}

function updateReadings() {
    document.getElementById('light1').innerText = getRandomReading() + ' lx'; // Light reading
    document.getElementById('co2-1').innerText = getRandomReading() + ' ppm'; // CO2 reading
    //document.getElementById('ext_temperature1').innerText = getRandomReading() + ' °C'; // Temperature reading
    //document.getElementById('ext_humidity1').innerText = getRandomReading() + ' %'; // Humidity reading
}

// Update readings every 5 seconds
setInterval(updateReadings, 2000);

// Initial update
updateReadings();
