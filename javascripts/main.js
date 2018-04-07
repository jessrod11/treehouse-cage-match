console.log('Stix');

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML = domString;
}

const battleBtn = ()=> {
    document.getElementById('battle-button').addEventListener('click', (e) => {
        console.log('button', e);
    })
}
const buildDomString = (userArray) => {
    let domString = '';
    domString += `<div class="player-one container">`;
    domString += `<div class="row">`;
    domString += `<h1>${userArray.name}</h1>`;
    domString += `<img src="${userArray.gravatar_url}">`;
    domString += `<h2>${userArray.points.total}</h2>`;
    domString += `</div>`;
    domString += `</div>`;
    printToDom(domString, 'player-one-output');
}

function codeFailed(){
    console.log('What happened, Stix?!');
}

function executeWhenPageLoads(){
    const data = JSON.parse(this.responseText);
    buildDomString(data);
    battleBtn();
}

const startApplication = () => {
    let myRequest = new XMLHttpRequest();
        myRequest.addEventListener('load', executeWhenPageLoads);
        myRequest.addEventListener('error', codeFailed);
        myRequest.open('GET','https://teamtreehouse.com/jessicarodgers3.json');
        myRequest.send();
}

startApplication();