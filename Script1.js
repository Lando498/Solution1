let questions = [];
let answers = [];
let currentIndex = 0;

// Equivalent to Form1_Load
async function init() {
    try {
        const [resQ, resA] = await Promise.all([
            fetch('Questions.txt'),
            fetch('Answers.txt')
        ]);

        const textQ = await resQ.text();
        const textA = await resA.text();

        // Split and remove empty lines
        questions = textQ.split(/\r?\n/).filter(line => line.trim() !== "");
        answers = textA.split(/\r?\n/).filter(line => line.trim() !== "");

        // Safety check (VB: If Answers.Length <> Questions.Length)
        if (questions.length !== answers.length) {
            alert("Questions and answers do not match!");
            return;
        }

        showNextQuestion();
    } catch (error) {
        document.getElementById('display').innerText = "Error loading files.";
    }
}

// Equivalent to ShowNextQuestion()
function showNextQuestion() {
    currentIndex = Math.floor(Math.random() * questions.length);
    document.getElementById('display').innerText = questions[currentIndex];
    document.getElementById('showBtn').disabled = false;
}

// Equivalent to Button1_Click
document.getElementById('showBtn').onclick = function () {
    // Show answer
    document.getElementById('display').innerText = answers[currentIndex];

    // Disable button so they can't spam it during timer
    this.disabled = true;

    // Equivalent to Timer1.Start() (5000ms = 5 seconds)
    setTimeout(() => {
        showNextQuestion();
    }, 2000);
};

init();