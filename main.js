document.addEventListener('DOMContentLoaded', function() {
    fetch('/get_value')
        .then(response => response.json())
        .then(data => {
            document.getElementById('value-container').innerText = data.value;
        })
        .catch(error => console.error('Error fetching value:', error));
});