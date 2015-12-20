
$(function() {
  var template = _.template('<a class="title" href="<%= ListingUrl %>" title="<%= Title %>" target="_blank"> <%= CurrentPrice %> </a>');
  
  function get_items_html(ebay_items) {
		if (!ebay_items) {
			console.error("no results");
			return;
		}
    var items = [];
    for (var i = 0; i < 1; i++) {
      items.push(template(ebay_items[i]));
    }
    return items.join('\n');
  }
  
  var item_title = $('#productTitle').text();
	console.log("title: " + item_title)
	var ss = item_title.split(" ");
	console.log("ss: " + JSON.stringify(ss))
	var keywords = ss.slice(0, Math.min(10, ss.length))
	var endpoint = 'http://ebayprice-1164.appspot.com/api/keywords/'
	var url = endpoint + encodeURIComponent(keywords.join(" "))
	console.log("keywords: " + keywords)
	console.log('query ' + url)
  $.getJSON(url, function(resp) {
		console.log('got ' + JSON.stringify(resp));
    var str = '<span style="font-size: 12px; margin-top:3px;">' 
                + get_items_html(resp.Items) + '</span>'
    $('#title').append(str);
  }); 
});


