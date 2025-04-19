from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Variables to store initial random number and final score
random_number = random.randint(1, 50)
stake_percentage = 0
final_score = random_number


@app.route('/submit', methods=['POST'])
def submit():
    global stake_percentage, final_score
    data = request.get_json()
    stake_percentage = int(data['stakePercentage'])

    if stake_percentage > 200:
        return jsonify({"status": "error", "message": "Stake percentage cannot exceed 200%"})

    # Randomly call increment or decrement function
    if random.choice([True, False]):
        final_score += (final_score * stake_percentage) / 100
        print("Incremented")
    else:
        final_score -= (final_score * stake_percentage) / 100
        print("Decremented")

    print(f"Received stake percentage: {stake_percentage}")

    if final_score == 0:
        return jsonify({"status": "lost", "message": "Your score is 0 you have nothing to stake."})
    elif final_score >= 5000:
        return jsonify({"status": "won", "message": "You won! Congrats!"})
    else:
        return jsonify({"status": "success", "score": final_score})


@app.route('/')
def index():
    global random_number, final_score
    # Reset random_number and final_score on page load
    random_number = random.randint(1, 50)
    final_score = random_number
    return render_template('index.html', score=final_score)


if __name__ == '__main__':
    app.run(debug=True)
