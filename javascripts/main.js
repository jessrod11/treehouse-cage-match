console.log('Stix');

// Prints To Page
const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}

// Build Card
const stixDomString = (userArray) => {
    let domString = '';
    domString += `<div id="stix" class="player-one-card container col-md-6 hide">`;
    domString += `<div class="row">`;
    domString += `<h2>${userArray.name}</h2>`;
    domString += `<img src="${userArray.gravatar_url}">`;
    domString += `<h2>${userArray.points.total}</h2>`;
    domString += `</div>`;
    domString += `</div>`;
    printToDom(domString, 'player-one-output');
}

const yourDomString = (userArray) => {
    let domString = '';
    domString += `<div class="player-two-card container col-md-6">`;
    domString += `<div class="row">`;
    domString += `<h2>${userArray.name}</h2>`;
    domString += `<img src="${userArray.gravatar_url}">`;
    domString += `<h2>${userArray.points.total}</h2>`;
    domString += `</div>`;
    domString += `</div>`;
    printToDom(domString, 'player-two-output');
    
}

// Score Builder
let totalScore = [];

    const buildScore = (pointsArray) => {
        console.log('points', pointsArray);
        let domString = '';
        if (totalScore[0] > totalScore[1]) {
            console.log('totalScore', totalScore);
            domString += `<div class="col-md-6 col-md-offset-3 well well-lg">`;
            domString += `<h2>Stix Beat YA!!!</h2>`;
            domString += `</div>`;
        }
        else if (totalScore[0] < totalScore[1]) {
            domString += `<div class="col-md-6 col-md-offset-3 well well-lg ">`;
            domString += `<h2>You Beat Stix!</h2>`;
            domString += `</div>`;
        }
        else if (totalScore[0] = totalScore[1]) {
            domString += `<div class="col-md-6 col-md-offset-3">`;
            domString += `<div class="alert alert-warning" role="alert">`;
            domString += `<h2>You tied with Stix! Arm Wrestle to break the tie!!!</h2>`;
            domString += `</div>`;
            domString += `</div>`;
        }
        else {
            domString += `<div class="alert alert-danger" role="alert">`;
            domString += `<h2>Something went wrong!</h2>`;
            domString += `</div>`;
        }
        printToDom(domString, 'you-won');
    }

//Event Listener
const battleBtn = (e) => {
    const battle = document.getElementById('battle-button');
    battle.addEventListener('click', (e) =>{
        console.log(e.target);
        if (e.target.innerHTML === "Let's Battle!!!"){
            document.getElementById('stix').classList.remove('hide');
        }
        playerTwo();
    });
}

const nextBattle = () => {
    const nextBattleBtn = document.getElementById('next-battle');
    nextBattleBtn.addEventListener('click', (e) =>{
        document.getElementById('player-one-output').innerHTML = '';
        document.getElementById('player-two-output').innerHTML = '';
        document.getElementById('you-won').innerHTML = '';
        document.getElementById('player-two-input').innerHTML = '';
    })
}

// XHR
function codeFailed(){
    console.log('What happened, Stix?!');
}

function executeWhenPlayerOneLoads(){
    const data = JSON.parse(this.responseText);
    stixDomString(data);
    totalScore.push(data.points.total);
    // nextBattle();
}

function executeWhenPlayerTwoLoads(){
    const data = JSON.parse(this.responseText);
    yourDomString(data);
    totalScore.push(data.points.total);
    buildScore(totalScore);
    // nextBattle();
    // badgeDom(data);
}

const playerOne = () => {
    let myRequest = new XMLHttpRequest();
        myRequest.addEventListener('load', executeWhenPlayerOneLoads);
        myRequest.addEventListener('error', codeFailed);
        myRequest.open('GET', 'https://teamtreehouse.com/jessicarodgers3.json');
        myRequest.send();
}

const playerTwo = () => {
    let userName = document.getElementById('player-two-input').value;
    let myRequest = new XMLHttpRequest();
        myRequest.addEventListener('load', executeWhenPlayerTwoLoads);
        myRequest.addEventListener('error', codeFailed);
        myRequest.open('GET','https://teamtreehouse.com/' + userName + '.json');
        myRequest.send();
}

// Starts Application
const startApplication = () => {
    playerOne();
    battleBtn();
    nextBattle();
    
}

startApplication();