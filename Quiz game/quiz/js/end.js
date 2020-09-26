const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log("clicked the save button!");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };

    validate = () => {
        if (!frm.username.value.match(/^[a-zA-Z]+$/) && frm.username.value !== "") {
            frm.username.value = "";
            frm.username.focus();
            alert("Please Enter only alphabets in text");
        } else {
            highScores.push(score);
            highScores.sort((a, b) => b.score - a.score);
            highScores.splice(5);
            localStorage.setItem("highScores", JSON.stringify(highScores));
            window.location.assign("index.html");
            console.log(highScores);
        }
    }
};