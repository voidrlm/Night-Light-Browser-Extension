var range = document.body.querySelector("#range"),
  args = ARGS,
  lis = document.querySelectorAll("li"),
  onBtn = document.querySelector(".switch-btn");

range.addEventListener("input", function () {
  setting("range", range.value);
});
chrome.storage.local.get(args, function (item) {
  if (!item.on) {
    onBtn.className = "switch-btn gray";
    onBtn.innerText = "off";
  }
  lis.forEach(function (li) {
    if (item.color == li.getAttribute("data-color")) {
      li.className = "active";
      return false;
    }
  });
  range.value = item.range;
});

onBtn.addEventListener("click", function () {
  var that = this;

  if (that.className.indexOf("gray") == -1) {
    that.className = "switch-btn gray";
    that.innerText = "off";
    setting("on", false);
  } else {
    that.className = "switch-btn";
    that.innerText = "on";
    setting("on", true);
  }
});

lis.forEach(function (item) {
  item.addEventListener("click", function () {
    var that = this;

    if (!that.className) {
      lis.forEach(function (item) {
        item.className = "";
      });
      that.className = "active";
      setting("color", that.getAttribute("data-color"));
    }
  });
});

function setting(key, value) {
  var obj = {};
  obj[key] = value;
  chrome.storage.local.set(obj);
}
