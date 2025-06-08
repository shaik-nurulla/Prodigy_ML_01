// API endpoint URL - this is the deployed backend URL
const API_URL = 'https://4lnh8imc7qyy.manus.space/api/predict';

document.getElementById('prediction-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const grLivArea = document.getElementById('grLivArea').value;
    const bedroomAbvGr = document.getElementById('bedroomAbvGr').value;
    const fullBath = document.getElementById('fullBath').value;
    const halfBath = document.getElementById('halfBath').value;
    
    // Show loading indicator
    document.getElementById('loading').style.display = 'block';
    document.getElementById('prediction-result').style.display = 'none';
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                GrLivArea: parseFloat(grLivArea),
                BedroomAbvGr: parseInt(bedroomAbvGr),
                FullBath: parseInt(fullBath),
                HalfBath: parseInt(halfBath)
            }),
        });
        
        const data = await response.json();
        
        // Hide loading indicator
        document.getElementById('loading').style.display = 'none';
        
        if (response.ok) {
            document.getElementById('price-value').textContent = '$' + data.prediction.toLocaleString();
            document.getElementById('prediction-result').style.display = 'block';
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        // Hide loading indicator
        document.getElementById('loading').style.display = 'none';
        
        console.error('Error:', error);
        alert('An error occurred while making the prediction. Please try again.');
    }
});