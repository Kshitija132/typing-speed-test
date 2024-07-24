let intervalId;
let counter = 0;
let quoteValue;
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let quoteInputEl = document.getElementById("quoteInput");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let resultEl = document.getElementById("result");
let spinnerEl = document.getElementById("spinner");

function displayResult(quote) {
    quoteDisplayEl.textContent = quote;
}

function setTimer() {
    intervalId = setInterval(function() {
        counter = counter + 1;
        timerEl.textContent = counter + "seconds";
    }, 1000);
}

function randomQuotation() {
    let options = {
        method: "GET"
    };
    let url = "https://apis.ccbp.in/random-quote";
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            displayResult(jsonData.content); // use jsonData.content instead
        });
    spinnerEl.classList.remove("d-none");
}
randomQuotation();
setTimer();
submitBtnEl.onclick = function() {
    spinnerEl.classList.add("d-none");
    quoteValue = quoteInputEl.value;
    if (quoteDisplayEl.textContent === quoteValue) {
        clearInterval(intervalId);
        resultEl.textContent = "You have typed correctly in " + counter + " seconds";
    } else {
        resultEl.textContent = "Please enter correctly";
    }
};
resetBtnEl.onclick = function() {
    randomQuotation();
    counter = 0;
    setTimer();
    quoteInputEl.value = "";
};