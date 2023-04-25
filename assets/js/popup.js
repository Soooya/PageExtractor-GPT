
function reqListener () {
    const response = JSON.parse(this.responseText);
    if (response.message === "ok") {
        on_ok();
    } else {
        on_fail(this.status);
    }
}

function reqError () {
    on_fail();
    console.log('Fetch Error', arguments);
}

function reqTabs(tabs) {
    let tab = tabs[0]; // Safe to assume there will only be one result
    makeRequest(tab.url);
}



function makeRequest (url) {
    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.onerror = reqError;
    oReq.open('post', 'http://localhost:2861', true);
    oReq.setRequestHeader('Content-Type', 'application/json');
    oReq.setRequestHeader('Access-Control-Allow-Origin', '*');
    oReq.send(JSON.stringify({"url": url }));
}

$(document).ready(() => {
    browser.tabs.query({currentWindow: true, active: true}).then(reqTabs, console.error);
});


function on_ok() {
    // Select the ul element with the id "alarmsList"
    const alarmsList = document.querySelector('ul#alarmsList');
    // Create a new li element
    const newAlarm = document.createElement('li');
    // Set the text of the new li element to the link sent
    newAlarm.textContent = "Sent!!!";
    // Append the new li element to the ul element
    alarmsList.appendChild(newAlarm);
}



function on_fail(num) {
    // Select the ul element with the id "alarmsList"
    const alarmsList = document.querySelector('ul#alarmsList');
    // Create a new li element
    const newAlarm = document.createElement('li');
    // Set the text of the new li element to the link sent
    newAlarm.textContent = "Error!!"+String(num);
    // Append the new li element to the ul element
    alarmsList.appendChild(newAlarm);
}