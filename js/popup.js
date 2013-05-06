document.addEventListener('DOMContentLoaded', function () {
  openWebSocket();
});

function openWebSocket() {
  var dispatcher = new WebSocketRails('ws://10.118.182.171:3000/websocket');
  dispatcher.on_open = function(data) {
    console.log('socket opened');
  }

  function addBioMetricDataToDom(data) {
    console.log("received data: " + data);
    var parsedData = JSON.parse(data);
    var totalSeconds = parsedData.standing + parsedData.walking + parsedData.sitting;
    var goodBarPercentage = Math.round((parsedData.standing + parsedData.walking) / totalSeconds * 100);
    var badBarPercentage = Math.round(parsedData.sitting / totalSeconds * 100);
    var ratio = (parsedData.standing + parsedData.walking) / parsedData.sitting;

    var imgPath = "images/";
    imgPath += ratio < 1 ? "sad_lady.png" : "happy_lady.png";
    console.log("ratio: " + ratio)
    console.log(imgPath);

    document.getElementById('today_img').src = imgPath;
    document.getElementById('good_bar').setAttribute('style', "width: " + goodBarPercentage + "%;");
    document.getElementById('bad_bar').setAttribute('style', "width: " + badBarPercentage + "%;");
  }
  var channel = dispatcher.subscribe('biometrics')
  channel.bind('updated_biometrics', addBioMetricDataToDom);
}

// function clickHandler(e) { document.getElementById("hello").innerHTML = 'bar'; return false; }
function clickHandler(e) { toggle(); }

var iconStatus = 0;

function toggle() {
  // myDebug('mydebugging');
  if (iconStatus == 0){
    // chrome.browserAction.setBadgeText({text: "up"}); // so it's set for the tab user is in
    chrome.browserAction.setIcon({path: "images/female_red_icon.png"}); // so it's set for the tab user is in
    iconStatus++;
  }
  else if (iconStatus == 1){
    // chrome.browserAction.setBadgeText({text: "down"}); // so it's set for the tab user is in
    chrome.browserAction.setIcon({path: "images/female_green_icon.png"});
    iconStatus = 0;
  }
}
