$(document).ready(function() {
  $('#searchElement').affix({
  offset: { top: $('#searchElement').offset().top }
});
  var conductSearch = function(target) {
    $("#resultDiv").empty();
    var wikiAPI2 = "https://en.wikipedia.org/w/api.php?action=opensearch&limit=10&namespace=0&format=json&callback=?"
    $.getJSON(wikiAPI2, {
        search: target
      })
      .done(function(json) {
        for (var i = 0; i < json[1].length; i++) {
          searchTitle = json[1][i];
          searchText = json[2][i];
          searchLink = json[3][i];
          $("#resultDiv").append("<a href='" + searchLink + "' target='_blank'><div class='results'><h3>" + searchTitle + "<br><small>" + searchText + "</small></h3></div></a>");
          $(".results").addClass("resultStyle");
        }

      });
  }
  $("#searchBox").keydown(function(event) {
    conductSearch($("#searchBox").val());
  });
  $("#searchBox").keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      conductSearch($("#searchBox").val());
    }
  });
  $("#searchButton").click(function() {
    conductSearch($("#searchBox").val());
  });
});