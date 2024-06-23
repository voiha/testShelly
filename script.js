async function getTemperature() {
    try {
        const response = await fetch(`http://192.168.100.118/rpc/Shelly.GetStatus`);
        const data = await response.json();
        console.log('Received data:', data); // Log the fetched data
        // Extract temperatures for sensors 100 and 101
        const sensor100Temp = data["temperature:100"] ? data["temperature:100"].tC : null;
        const sensor101Temp = data["temperature:101"] ? data["temperature:101"].tC : null;
        return { sensor100Temp, sensor101Temp };
    } catch (error) {
        console.error('Error fetching temperature:', error);
        return { sensor100Temp: null, sensor101Temp: null };
    }
}

async function updateTemperatureReadings() {
    const { sensor100Temp, sensor101Temp } = await getTemperature();

    document.getElementById('sensor100').innerText = `Sensor 100: ${sensor100Temp !== null ? sensor100Temp + '°C' : 'Error'}`;
    document.getElementById('sensor101').innerText = `Sensor 101: ${sensor101Temp !== null ? sensor101Temp + '°C' : 'Error'}`;
}

// Update the temperature readings immediately when the page loads
updateTemperatureReadings();

// Update the temperature readings every 1 seconds
setInterval(updateTemperatureReadings, 1000);

function getRandomReading() {
    return (Math.random() * 100).toFixed(2); // Generate a random number between 0 and 100
}

function updateReadings() {
    document.getElementById('reading1').innerText = getRandomReading() + ' lx'; // Light reading
    document.getElementById('reading2').innerText = getRandomReading() + ' ppm'; // CO2 reading
    document.getElementById('reading3').innerText = getRandomReading() + ' °C'; // Temperature reading
}

// Update readings every 5 seconds
setInterval(updateReadings, 2000);

// Initial update
updateReadings();
