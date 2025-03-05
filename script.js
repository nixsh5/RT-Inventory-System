document.addEventListener('DOMContentLoaded', () => {
    let lastScanTime = 0;
    const scanCooldown = 1000; // 1 second cooldown in milliseconds
    let isProcessing = false;

    // DOM elements
    const resultDiv = document.getElementById('result');
    const productNameDiv = document.getElementById('product-name');
    const videoElement = document.querySelector('#scanner-video');

    // Initialize QuaggaJS
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: videoElement,
            constraints: {
                width: 640,
                height: 480,
                facingMode: "environment" // Use rear camera
            },
            area: { // Define scanning area
                top: "10%",
                right: "10%",
                left: "10%",
                bottom: "10%"
            }
        },
        decoder: {
            readers: [
                "code_128_reader",
                "ean_reader",
                "ean_8_reader",
                "code_39_reader",
                "upc_reader",
                "upc_e_reader"
            ],
            multiple: false // Only detect one barcode at a time
        },
        locator: {
            patchSize: "medium",
            halfSample: true
        },
        locate: true
    }, function(err) {
        if (err) {
            console.error('Quagga initialization error:', err);
            resultDiv.innerHTML = "Error initializing scanner: " + err.message;
            return;
        }
        console.log('Quagga initialized successfully');
        Quagga.start();
        resultDiv.innerHTML = "Scanner ready - Please scan a barcode";
    });

    // Handle barcode detection
    Quagga.onDetected(async (data) => {
        const currentTime = Date.now();
        
        // Check cooldown and processing state
        if (currentTime - lastScanTime < scanCooldown || isProcessing) {
            return;
        }

        isProcessing = true;
        const barcode = data.codeResult.code;
        lastScanTime = currentTime;

        try {
            // Show processing status
            resultDiv.innerHTML = "Processing barcode: " + barcode;
            productNameDiv.textContent = "";

            // Fetch products JSON
            const response = await fetch('products.json');
            if (!response.ok) {
                throw new Error('Failed to fetch products data');
            }
            
            const products = await response.json();
            const product = products.find(p => p.barcode === barcode);

            // Display result
            if (product) {
                productNameDiv.textContent = `Product: ${product.name}`;
                resultDiv.innerHTML = "Barcode scanned successfully";
            } else {
                productNameDiv.textContent = "Product not found";
                resultDiv.innerHTML = "Barcode not in database";
            }
        } catch (error) {
            console.error('Error processing barcode:', error);
            resultDiv.innerHTML = "Error: " + error.message;
            productNameDiv.textContent = "";
        } finally {
            isProcessing = false;
        }
    });

    // Handle Quagga processing event (optional - for debugging)
    Quagga.onProcessed((result) => {
        if (result) {
            console.log('Processing frame:', result.codeResult);
        }
    });

    // Cleanup on window close
    window.addEventListener('beforeunload', () => {
        Quagga.stop();
    });
});