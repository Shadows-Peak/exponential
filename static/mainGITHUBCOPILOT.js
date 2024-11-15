/*
function hashData(data, secretKey) {
    return CryptoJS.SHA256(data + secretKey).toString();
}

function submitScore(username, score) {
    const secretKey = "your_secret_key"; // This should be securely managed
    const hashValue = hashData(username + score, secretKey);

    fetch('/submit_score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, score, hash: hashValue })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
*/