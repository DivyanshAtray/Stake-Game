window.onload = function() {
    setTimeout(function() {
        document.getElementById('delayed-button').classList.add('visible-button');
    }, 2000);
};

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('delayed-button');
    const form = document.getElementById('stake-form');
    const submitButton = document.getElementById('submit-button');
    const scoreElement = document.getElementById('score');
    const scoreValueElement = document.getElementById('score-value');

    button.addEventListener('click', function() {
        button.style.display = 'none';
        form.style.display = 'flex'; // Change to 'flex' for better alignment with flexbox
        scoreElement.style.display = 'flex';
    });

    submitButton.addEventListener('click', function() {
        const stakePercentage = document.getElementById('stake-percentage').value;

        if (stakePercentage > 200) {
            alert("Stake percentage cannot exceed 200%");
            return;
        }

        // Send the value to the Flask app using AJAX
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stakePercentage: stakePercentage }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "error") {
                alert(data.message);
            } else if (data.status === "lost") {
                alert(data.message);
                scoreValueElement.textContent = 0;
                scoreElement.style.display = 'block';
            } else if (data.status === "won") {
                alert(data.message);
                scoreValueElement.textContent = 1000;
                scoreElement.style.display = 'block';
            } else {
                console.log('Success:', data);
                // Update the score in the HTML
                scoreValueElement.textContent = data.score;
                scoreElement.style.display = 'block';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
