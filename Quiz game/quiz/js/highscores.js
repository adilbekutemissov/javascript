const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
    .map(score => {
        return `<li><a href="#">${score.name} - ${score.score}</a></li>`;
    })
    .join("");