
$(function() {
  var template = _.template('<a style="color: red; text-decoration: underline" href="<%= ListingUrl %>" title="<%= Title %>" target="_blank">(Ebay Price: $<%= CurrentPrice %>) </a>');

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
	if (!item_title) {
		console.error("cannot find title!");
		return;
	}
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
		if (!resp.Items || resp.Items.length < 1) {
			console.error("no results");
			return;
		}
		var amazon_price_text = $("#priceblock_saleprice").text() || $("#priceblock_ourprice").text();
		if (!amazon_price_text) {
			console.error("cannot find amazon price.");
			return;
		}
		var amazon_price = parseFloat(amazon_price_text.substring(1));
		if (!amazon_price) {
			console.error("failed to parse amazon price: " + amazon_price_text);
			return;
		}
		console.log("amazon price: " + amazon_price);

		var ebay_price_str = resp.Items[0].CurrentPrice;
		if (!ebay_price_str) {
			console.log("ebay price not found!");
			return;
		}

		var ebay_price = parseFloat(ebay_price_str);
		if (!ebay_price) {
			console.log("failed to parse ebay price: " + ebay_price_str);
			return;
		}

		console.log("ebay price: " + ebay_price);

		if (amazon_price > ebay_price) {
			var str = '<span>' 
                + get_items_html(resp.Items) + '</span>'
			$('#title').append(str);
		}
  });
});


