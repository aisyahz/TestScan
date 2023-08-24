$(document).ready(function() {
    const video = document.getElementById('qr-video');
    const scanButton = document.getElementById('scan-button');
    const scanResultElement = document.getElementById('scan-result');
    // Access the device camera
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(function(stream) {
            video.srcObject = stream;
        })
        .catch(function(error) {
            console.error('Camera access error:', error);
        });

    // Add event listener to the scan button
    scanButton.addEventListener('click', function() {
        scanQRCode();
    });

    // Initialize Firestore
    var config = {
        apiKey: "AIzaSyDJdjvmdJeS7_WYMIHU-zv4b4Fc2D5s-Yo",
        authDomain: "contact-form-7ec86.firebaseapp.com",
        databaseURL: "https://contact-form-7ec86-default-rtdb.firebaseio.com",
        projectId: "contact-form-7ec86",
        storageBucket: "contact-form-7ec86.appspot.com",
        messagingSenderId: "643370383331",
        appId: "1:643370383331:web:61c6ca2a2f257b24ba92d6"
    };
    firebase.initializeApp(config);
    const firestore = firebase.firestore();

    // Function to scan QR code
    function scanQRCode() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (qrCode) {
            const qrResult = qrCode.data;
            console.log('QR Code Result:', qrResult);

            // Check if the scanned URL exists in the 'register' collection
            firestore.collection('register').where('url', '==', qrResult)
                .get()
                .then(function(querySnapshot) {
                    if (!querySnapshot.empty) {
                        // URL exists in the collection, perform login/check-in action
                        const resultMessage = 'Login/Check-in successful for QR code: ' + qrResult;
                        scanResultElement.textContent = resultMessage;
                        //console.log('Login/Check-in successful for QR code:', qrResult);
                        // Implement your login/check-in logic here
                    } else {
                        const resultMessage = 'QR code URL not found in Firestore. QR not valid.';
                        scanResultElement.textContent = resultMessage; }
                })
                .catch(function(error) {
                    console.error('Error checking Firestore:', error);
                });
        }
    }
});
