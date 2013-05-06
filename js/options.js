function saveOptions() {
  localStorage["ip"] = $("#ip").val();
}

function restoreOptions() {
  var ip = localStorage["ip"];
  if (!ip) { return; }
  $("#ip").val(ip);
}

$(document).ready(function() { 
  restoreOptions();
  $("#save").click(saveOptions);
});
