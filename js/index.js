(() => {
    $document = $(document);
    
    $document.ready(() => {
        async function getShellyData() {
            try {
                // const proxyUrl = 'http://localhost:8080/';
                const targetUrl = 'http://192.168.100.138:80/status';
                const response = await fetch(targetUrl);
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
        
        // Function to toggle the Shelly device on or off
        async function toggleShelly(state) {
            try {
                const proxyUrl = 'http://localhost:8080/';
                const targetUrl = `http://192.168.100.138/relay/0?turn=${state}`;
                const response = await fetch(proxyUrl + targetUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(`Device turned ${state}`);
            } catch (error) {
                console.error(`Error toggling device ${state}:`, error);
            }
        }
        
        // Fetch and update readings every 5 seconds
        setInterval(getShellyData, 5000);
        
        // Initial fetch
        getShellyData();

        //ButtonAnimation
        $buttonShelly = $('.js-shelly-button');

        $buttonShelly.on('click', function() {
            const $this = $(this);
            const $btnState = $this.attr('state');
            $this.toggleClass('active');
            toggleShelly($btnState);
        })
    })
})();
