var GOOD_RATIO = 1;

function backgroundSocket() {
  var dispatcher = new WebSocketRails('ws://10.118.182.171:3000/websocket');
  dispatcher.on_open = function(data) {
    console.log('background socket opened');
  };

  function addBioMetricDataToDom(data) {
    console.log("received data: " + data);
    var object = JSON.parse(data);
    lastMessage = object;
    console.log(object.standing);
    var ratio = (object.standing + object.walking) / object.sitting;
    console.log("ratio: " + ratio);

    if (ratio < GOOD_RATIO)
    {
      chrome.browserAction.setIcon({path: "images/female_red_icon.png"});
    }
    else
    {
      chrome.browserAction.setIcon({path: "images/female_green_icon.png"});
    }
  }
  var channel = dispatcher.subscribe('biometrics');
  channel.bind('updated_biometrics', addBioMetricDataToDom);
}

document.addEventListener('DOMContentLoaded', function () {
  backgroundSocket();
});
