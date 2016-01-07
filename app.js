var applyArguments = function () {
  function safeRegexEscape(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  var current = arguments[0];
  for (var i = 1; i < arguments.length; i++) {
    var arg = arguments[i];
    current = current.replace(new RegExp(safeRegexEscape("%%")), arg);
  }
  return current;
};

var list_item = multiline(function () {
  /*
   <li>
   (%%)
   <a href="%%" target="_blank">%%</a>
   <span>- %% (%%) (%%)</span>
   </li>
   */
});

var fetchTopics = function (limit, callback) {
  $.ajax({
    url: "https://www.reddit.com/r/DotA2/.json?&limit=" + limit,
    jsonp: "jsonp",
    dataType: "jsonp",
    success: function (response) {
      console.log(response);
      callback(response.data.children);
    }
  });
};

var processTopic = function (topic) {
  $("#list").append(applyArguments(list_item, topic.ups, topic.url, topic.title, topic.author, topic.link_flair_text, topic.domain));
};

fetchTopics(25, function (data) {
  for (var i in data) {
    processTopic(data[i].data);
  }
});