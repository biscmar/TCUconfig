function initGame(gameId) {
	console.log('Spiel ' + gameId + ' wird geladen.');
	$.ajax({
		url: 'https://api-staging.swissunihockey.ch/bo/games/' + gameId + '?set=game-report',
		dataType: "json",
		type: "GET",
		success: function(r) {
			console.log('Spiel geladen.');

			var game = r.object;
			var references = r.references;

			// Section "Game"
			$('#game-id').val(game.id);
			$('#game-title').val('Meisterschaft NLA | Runde X | Saison 2017/2018');
			
			var date = game.attrs.starts_at.split('T')[0].split('-');
			$('#game-date').val(date[2] + '.' + date[1] + '.' + date[0]);

			var time = game.attrs.starts_at.split('T')[1].split(':');
			$('#game-time').val(time[0] + ':' + time[1]);
			
			$('#game-location').val(references[game.attrs.gym].attrs.name);
			$('#game-ref-1').val(references[game.attrs.referees[0]].attrs.first_name + ' ' + references[game.attrs.referees[0]].attrs.last_name);
			$('#game-ref-2').val(references[game.attrs.referees[1]].attrs.first_name + ' ' + references[game.attrs.referees[1]].attrs.last_name);

			// Section "Home"
			var home = references[game.attrs.home_team];
			$('#home-team-long').val(home.attrs.name);
			$('#home-team-short').val(home.attrs.streaming_name);
			parseRoster(game.attrs.lineups[0], references, 'roster-home');

			// Section "Away"
			var away = references[game.attrs.away_team];
			$('#away-team-long').val(away.attrs.name);
			$('#away-team-short').val(away.attrs.streaming_name);
			parseRoster(game.attrs.lineups[1], references, 'roster-away');
		}
	});
	


}

function parseRoster(lineUpList, references, elementId) {
	$('#' + elementId).empty();

	$.each(lineUpList, function(index, value) {
		var position = references[value];
		var player = references[position.attrs.player];
		
		var rosterRow = $('<div>', {
			'class': 'roster-tr',
			'data-player-id': player.id
		}).append(
			$('<div>', {
				'class': 'roster-td number'
			}).text(position.attrs.number)
		).append(
			$('<div>', {
				'class': 'roster-td name'
			}).text(player.attrs.name)
		).append(
			$('<div>', {
				'class': 'roster-td actions'
			}).append(getActionImg('addToStartingSix'))
			  .append(getActionImg('removePlayer'))
		);

		$('#' + elementId).append(rosterRow);
	});

	$('.roster-tr:odd').css('background-color', '#e9f1f0');
}

function getActionImg(actionName) {
	var img = $('<img>', {
		'class': 'action'
	});

	switch(actionName) {
		case 'removePlayer':
			img.attr('data-action', 'removePlayer');
			img.attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABeElEQVRoQ+2a4U3DQAyFv04AGwATQDdhBDZgBGACGIGNoBuUCWADkKGVqtCm7+WsJop8P092zu/ZfokuXjCTtZgJDrKBPAO3wOURgtbAK/CURWQmkBfg3gwsgDyaPnvNM4F8AufAEng/EtwN8AZEZq6mBuR7E5BKjmvfi1c9VCHNDcy1bwIS6Y8ymMKKco2yHdQj4Xw9BRTAqo9UtbRSy8AgRj63gBistphWRg6xJzPTQv8eX/nczB4JqY7VlUh3fxfPKEAOHeruFxClrJUUu8y3PPNfzJk9UkB6SkLJ2q97ZcTQfLfkSrVKtToMuCWkNLJiU83ufli6mapmr2avZv9jQFEkxaZUq1RL7KmS35JfsVTqzS5KdMnv7OV3+9+w+2PI3R9dfhX1c21G+URxg1TsC4jbyAqrLTbpGfkCzsRhgJbAd323QwUfwkiIfNMYYxYPWRGaz5HGPNQr0zg7wNwBF2YgQ80jEzF4I82qOECGBnQSv9kA+QEb5rMzpnXFtwAAAABJRU5ErkJggg==');
			break;

		case 'addToStartingSix':
			img.attr('data-action', 'addToStartingSix');
			img.attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAnklEQVRoQ+3XQQqAMAwF0Xr/Q+vGjSIS+A1Sea7bNJmMqW5j8WdbPP+hgK872NmB/VZcy1ktQc/EFVDRUwdeKFGIQhUCFAopmUIUolBIgEIhQFOIQg0K3b8iwyOmb79o//QOKGA682vA/3dgFkB/ZBWSLjIXWcWTlzUUohCFQgIUCgGaQhSiUEiAQiFAUygEGG/v7ECcXCWAAiqUOtccVL8oMW7pmEkAAAAASUVORK5CYII=');
			break;

		case 'removeFromStartingSix':
			img.attr('data-action', 'removeFromStartingSix');
			img.attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAA/UlEQVRIS+2U0RHCMAxD1Q3YBJgAmBzYADZhhJ64mEuDbaX56A/0s2f72YqtCRt900Yc/A5oB+BaZL0AeAmJZbwnnSUdSvEHgAzWFe+BbgBOzQQRrIVYGmuwuc/ngVh070jVwiIIU58ATJF3qUg6dpTBmMs3XBQrzRFybt81Wm92m8FYsxsSTWSqZTBvCd1JLFAdbC8shaiJeieTkDWg6OFZQ91ZuHW1/tkK13ESlr1RL8SAKSxb7+xOWLznqFNnUBfPY+SnjnphxGssqN0uddRH5XWeqUYrHMHuxYakdLUs6k5a2JDXsaMvg3T8x2BhvLIgz9OG/v1BQ7IxaQbnvkwbI/VxvAAAAABJRU5ErkJggg==');
			break;

		case 'startingSixSymbolOne':
			img.addClass('startingSixSymbol');
			img.attr('data-action', 'startingSixSymbolOne');
			img.attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADkUlEQVRoQ+2aj5EMQRTGv4sAEXARIAJEgAgQASJABIgAESCCIwJEgAgQAfW76m+rd6Znprvn7d7dlq6aujt6+73vfe/fvp4jHcg6OhAcigRyWdItSTck3ZZ0LT25rX5I4vkk6aukz5J+RxgzAsgDSffS06PTB0k873o+7M+sAfJM0sOB1bEw1ubB0lg9X7AFczDGA4NeMPVK0useQD1AUOBNBgDl3yartroJoGDziaTrCQCAHiVjVGNqBfIyCUXAt/Q71o9YGAhGDIjfn9YeXAsEy52kQP4j6XkSWiunZR/scP6l5Jp3ahJCDRD8GlfiJywQF0Pfb1G0Zi+ycFfYQRauNitzCUjOBCCgvzUOahQv7UE2bmsws8wsAfmSMbFPEAY2BHNzyipzQAi2x8mdzgJECQypmRgarSkgKE5wE9j8vuuYWHI/YgY3IwHgYqNMOQXke6oTpD+YOQ8LJkj/1JnjoUIlIKQ+qjbBjSXWLnouDMNaisklWXgGwT8ycOlgs1GkcElS4f9tmAggdvkRK0Mg1AhqBm0HH1q7LNjnrGWEc8wKtYVaU6SaLvRuKkCbTY1o3M7TQ2GYfEUAsbE/5h13fjAK/EpSr3QUvqH1S/gjgBT1zA/Ggu9XuNW+gGAg0i9fAe6nrnsrizgoX6SmrdGjZrf/DcpaFjLSNWfEKKOyVY4sGsjIe3IgTrv0M9GVPBoI9Y0+ED1P+68cSLSwXTLC2Vv6/gfSmAl2wfbhM0L/cjUFz0UJ9k1je1HTr4vvpifMgRxMQVzboszFf3Swz7Yoa5vGfQFZbBpRJKKNLwGKZGSxjUcBb9qU/sZ6MbU9EohHVLNfrFDEaTiyeYwC4mz1c3j3Uvqi42lFJCtRQIpsDJvG3C3MynkcB43YmANiCpnz4mLRlb419GjbGRiSsZoGdAjyyBQQVaP9Vu0q9+eD9OaRqWV49HJWYIa3AZMDw6WpRtNov9LCtduarjSWgCC0+dKlVtOZfc2XSzVAkJczQwKgwey6fa0AyVUG5yOz+nKpFojlOwHwN3FDeo68DGXa7jiYDOySMVqBcAapmXEqX8IMCICMMFuv5bA6I1qKsAFQJ2iVmgzUA8QGQTiPAfHvflmAn1wSlV4Y4LLGLwzkg3IAYJCu+5g1QAwI6/FdBsv2LJik6+4dmp/KjABi5f1qRv5STc4W+whe3M8v1fhVjx4DbH0mEshqZdYccDBA/gFZHeozt664egAAAABJRU5ErkJggg==');
			break;

		case 'startingSixSymbolTwo':
			img.addClass('startingSixSymbol');
			img.attr('data-action', 'startingSixSymbolTwo');
			img.attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEGElEQVRoQ92agZENQRCG+yJABFwEiAARcBEgAkSACBABFwEiQASIABEgAupT82/1253dmZ6Z9566qdp6797NzvTff3fPP7N7YheknVwQHDYSyGUzu2VmN8zstpldS5f31Xcz4/poZl/M7JOZ/RrhzBFA7pvZvXS12PTOzLjOW27WPT1AnprZg5nX8TDe5sLTeN032II5GOOCQTWYemlmr1oAtQDBgNcOAMa/SV6NhgmgYPOxmV1PAAD0MDmjGlMUyIs0KRN8Td/x/oiGg2BEgPj+pHbgWiB47kNK5N9m9ixNWjtPpB/sMP6lFJp3agpCDRDimlDiExbIi3nsRwyt6ctchCvsMBehtjlnCYhnAhDQH82DGsNzfZibsBWYTWZKQD47Jg4JQsDmYG6ueWULCMn2KIXTMUDkwFCayaFFWwOC4SQ3ic33fedEKfzIGcKMAkCILSrlGpBvaZ2g/MHM/9BggvLPOnM6NygHhNLHqk1y44mWhs5iDD5hlAarkiIY09IYg+RfODgHRGxkKayYnfJMuV5rVD2c1SJFFPILVuZAZASyQ56ssH3qIvr5AUNhQPEsYYnIpLE2sFZEm1jZuX8OhInvNk5CGFGuKZlbRnrGiPVomOn+915xeyAY8DO550rDwqfcQo4z2VZTaV8tpxs3Z+30QKD+bdrstISVFs+a3FKst4Yw4coW4CyF784OUR59npIxGrt/0g0ltaBxo/29PQtb/aRCWePRKMhc/x4gi+jxQFR20TP7Xsl7w5j1jVDGzn/6ywPp8VCUIeQPedKjHHbsPTQQKg4yg6r2IymH1m3B0YCwzlAVCYsRYvQoQNBdrPowMmqXuQqEFfZqSp5RyT4/cWE1Jqxaw0m5qGSfhO2+yi+eRzhSnWjkAwBGnrhQMKYF1QPpXRC9t3RYQS4gRxh7ZNtcEHtrO4ZCOZ5SLjBmVBTWAN6UKL2ikftZpKhOCEeSuzcXcqCKopGbemS89iK960OJkaKMZwB1mpb+0qju/1K/rRum2qmy8+SUqspwVDyqrtcapH61apn+kv+wTghPLTeIQiTKyiGArLK+5g2x0iPqosyU+vsc3GFjrn79QKKQqkOIjVrpS8au/d+X9dABHQNqXw2IqqP9VisL9/mD9PCRqcbW0cuxwMyfBqweGJYqRuhofzAjoUcaJSCSHaGHLgMAhR8u1QDBLs9Mz5FnDUYeZSAKpdeqHmnUApEBKgD8Td5QnkdKc7bByoPQ4V0UiFZXQo1NmAABkE1TVCTidY5oWSMEoGnv0gJE7DA5lwDxu14W4JO9SO6FAR7W6IUBf6IJABzS9DymB4gAITTZd+DZlgaTqO6Wk/lNrdVijAoCHvYv1Xi26MMem/DTSzV61aN1zr0A6TamZ4ARodUz/7B7/wKaFhJCrhiYLgAAAABJRU5ErkJggg==');
			break;

		case 'startingSixSymbolThree':
			img.addClass('startingSixSymbol');
			img.attr('data-action', 'startingSixSymbolThree');
			img.attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEK0lEQVRoQ92aj7EMQRDG+0WACBABIkAEiAARIAJEgAgQASJABIgAESAC6vdqvqu+3Zmd6d597tVN1dbdvTc7019//W9698SOZJwcCQ7bEshFM7tpZtfN7JaZXSmX19UPM+P6ZGZfzeyzmf3eQplbALlvZnfLlZHpvZlxvc3crHvWAHlqZg8mWkfDaJsLTaN1P2AL5mCMCwY1YOqlmb3KAMoAQYDXDgDCvylajZoJoGDzsZldKwAA9LAoYxhTFMiLsikbfCvf0f4WAwXBiADx/cnowqNA0NzH4sh/zOxZ2XR0n8g82GH9C8U0b48EhBEg2DWmxCcs4BdT248IOjKXvTBX2GEvTG1xzx4QzwQgoD/qByOC1+awN2YrMIvM9IB8cUz8TxACNgVzo6WVJSA426NiTocAUQNDaMaHZqMFBMFxbhyb72ftEz3zw2cwMwIAJjaLlC0g30ueIPzBzHkYMEH4J89cnQpUA0LoI2vj3GgiM7BtzJJkpzVglVIE88gGDNbA+WcKrgERG1UKB1Ah+LtKwahb0ei9pLnK5GesTIGQI8gZlB3cFB0wgSL4hFHYlT2zHr/RKIxgHhlmxAq5hVxzOqZAoP5OSUC7SQE0PtK1zFKCNCNQZz8p+4OvuD0QtPirLHIpqS3uZ50ls2yax6DCqnJ6IDgmtp01K+T422B6KuPovBY2zJUjAL6GFe2ZlqLV82LLgwoKTxMjPxcCQm/RmayeEaHMRqve5vq/yp6sj7DOzHo8EIVd6pmtM7nO82iSIAAbfGaiFkC4F4Ug52n95YGstdslRrQ2cwCBRtcqa0/eQwCBBZhJnc2dtg4CROZAvUTXhbGX0EYd7DwAkQxKaPwmu1NuZEaTERa8XJxnrf32BFP4pJcFsOiQs+8K20OEX4SmC0mU3EWdIBLlol3y9kDWJsRo1IvO91gXE+LaEoVoxAluxO7FSDa7L5Yoa4tGqmUi0kiJoyo54yPdohHq1pTxcsBeaPVRK1NFdMt4BNCkrBPqXM1aMMSFQzKoVllfUSrbD1CttniwYkOF4Wzx6MG0glEWRLNyrp3ZJUiWFYVX1mFjNaWJ+Tgp/pFNglU22LDVDhIrWc0F08LQdCm4Gul6DTpCKiZ21pm+h4RAQsOweYweaZkCYqi135Mm+X/fSA+3TLWnOh6HAjN9GtBsGPa68aHWflLjrdtCjzR6QNgk/NBlA0Dhh0sjQJDLM7PVCa+Fl54xRaG6lUOPNEaBaFPVSPzGbwjPWz4MpdsuPwh1WaJAAICGKD04hAkQAGlhRrsiaJ0WLTlCAMgTlDEhBWWAiB025xIg/q6XBfjkIVHthQFKfb0w4BvlAEAhqecxa4AIENrjLINmMwMmqbozTfPdflsA0WJ6NcO/VOPZYh71Fuanl2r0qkdGAXv3bAlktTBrFjgaIP8AvEQZQs1sMNQAAAAASUVORK5CYII=');
			break;

		case 'startingSixSymbolFour':
			img.addClass('startingSixSymbol');
			img.attr('data-action', 'startingSixSymbolFour');
			img.attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADsklEQVRoQ92ai5FMQRSG/40AESACRIAIEAEiQASIABGwESACRIAIEAEioL6p/qd67rMfZ2Z3p6tuzezW3O7+zvuevic6knFyJByKBLks6bakm5LuSLqWrlxWPyVxfZb0TdIXSX8ihBkB8lDS/XS17OmDJK7Tlpt9Tw/Ic0mPBlJHwkibC0kj9XygLTSHxrjQoAeaei3pTQtQCwgbeJsBsPl3Saq1ZgIU2nwq6UYCAOhxEkYxUy3Iq7QoC3xP35F+xEBAaMRAfH9WOnEpCJL7lBz5r6QXadHSdWp+h3aY/1IyzbslAaEEBLvGlPhEC/jF0PZrNlryW9bCXNEOa2Fqi2uugeSaAAL11/pBycanfsPamK1hFjWzBvI108QhIQw2hLk1J5UlEJztSTKns4CYgiE040OjMQfCxnFuHJvv+/aJNfPDZzAzAgAmNoqUcyA/Up4g/KGZ8zDQBOGfPHN9uKEpEEIfWRvnRhJRg8T3Pk225ptza2IZOP9IwFMTWhuTKmykwmmZl09GK4hNfqSV4YTkCHIGZQc3RQ00gUY8WkG431oht5BrJiVDFXovJaDtjzppbFIEDpy1RyPca2F/zIWTSwa1/04LXQlKfLlJYdc4ay/I5D5zEEsu0qxsUp7zXwAIUxB+eQR4kKruHadztHqZirZOi9r4BCCYFNEPB40CGe0114gpI6LV0KSci6JARtaTgzjsUs/0ZvKhSVm7USBomDqQfW7qrxwkapEpk4oGYb6d/UaDzJnUhQOZM6kLBbJkUgcFITxeTc5T6+xrJhUNYmffFrZR4XfNpKJBXDxuk3cO0pMQHUFakmhLAbmYEHtKlEODLJYo+ygahxqKyFWrRSOL7qOMz2EiQFbL+LzW36b+FqNfuCcCxC2qxQcr9uAwHFE8RpuWo9Wv4dnLVMRwt2IfWunVyKQ2lp7UrJXz2A4aaWMJxCqkz4uJ1Wb6YNfaPJjRMCRiVTXo2IhbpkAUtfajd5/myxvp1S1T78mtl7OCGZ4GzDYM18qDqtZ+sEaqjjTWQNhb9aFLAFD14VIJCPvKNUMAoGhrOn0tgOQog/lZs/hwqRTE6zsA8Dd+Q3iOPAylgWc/mHXsKWHUgjAHoZl2Kg9hBgKQFmbtsRxSp0VLEjYAeYJ6qkpALSAWCItzGYj/+2UBPmnMTb0wQP/XLwzkjXIAEEjTeUwPiIGQHs8ySLZloEmq7q6meQSIN+9XM/KXanJt8TucF/PzSzV+1aNFADv3RIJ0b6ZngqMB+Q+5JANCwez/6wAAAABJRU5ErkJggg==');
			break;

		case 'startingSixSymbolFive':
			img.addClass('startingSixSymbol');
			img.attr('data-action', 'startingSixSymbolFive');
			img.attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEJUlEQVRoQ92aj7EMQRDG+0WACBABIkAEiAARIAJEgAh4ESACRIAIEAEioH6v5rua253d7e6Z89RN1dadZ3emv/76zzezd2JHMk6OBIeNBHLRzG6a2XUzu2VmV8pV++q7mXF9NLMvZvbJzH6NcOYIIPfN7G65Mja9MzOu08zDeqYHyFMzezDxOh7G21x4Gq/XA7ZgDsa4YFADpl6a2asMoAwQDHhdAcD4N8Wr0TABFGw+NrNrBQCAHhZnuDFFgbwoi7LA1/Id748YOAhGBIjvT7wTe4HguQ8lkX+b2bOyqHedyH2ww/wXSmje9hQEDxDimlDiExbIi2nsRwz13MtahCvssBahtrrmFpCaCUBAfzQPPIa37mFtwlZgVpnZAvK5YuJfghCwKZgbS15ZA0KyPSrhdB4gWmAozeTQbCwBwXCSm8Tm+6FzYiv8yBnCjAJAiM0q5RKQb6VPUP5g5n8YMEH5p89cnRrUAkLpo2uT3HgiOvBW3bHXnt/K0emzRAbJP3NwayKx0aTQgepnkSGOW8OiVSE/Y2UKhB5Bz0B28FB0oHhxBLlFxTnEECv0FnrN2ZgCQYXeKQ1od1PAGjnifYca3lquuUYNBA8SFoxLycankv28yIwtozL/37SzBoIKfdsRVhilRM/mlxeY1rlXVPdeaKla9XjzTyejXiAzW2tGer1JqUbS/CjCElXA3ygA6DPm794JFqSz6KmBqOyiZzKdXA1ry6vMTUhQQrNDTmOuM/1VA1FYRJuUjKHKsX9nwAqJDwMYrJ0gIXG5MIQBPWD27B0JxKOUAQQ4Ov/Om0laDgbEaw9gAAEze03NO0G579yBYMeIxrkIhHjFS9lkjzhUTY1qRvONDiX7TtiOLL9RY3qKi8TjThPWQEY0RC8YMZIVl6sNsUeiSGx6N2K9ObIqUXpEowwjz8ixtZMW1qFU0/EzVWtTNBIWPTJe+wQ+l45uMAJhSoxnd6CbMr4ui5lmVR8QwAiSBWOZCwDsc4htmCA3uD/T2dV4VzdWgFEZzkjx+oRwKfEBRz5mQKhaIYFwyG60dJXEX4YVTQz9GMvCHOHAgNRvZuepeZtsTEVjDVCseKuQt+z23CcHz9hYAyIKiXVCLCPre4yePkvIcmBIroUO6JhI+++1KjTS2KW56oP08JGpJvWU1EOCmb4NWDww3NpEhY72ByMKvdLYAoJt4ZcuAwCFXy55gGBXzQwFgMaWevvqAMmhBfOzpvvlkheI1lcB4N/kD+V55MtQTtuVB4uJ3XJGFAhzUJppamzCBAiAHJNGX8tJutAjBEDHSSEHZYDIISzOJUD8XT8W4JNu3vrBAJ1ePxioD8p18pJ6H9MDZCpHEIWZAZOo7h7pEn4/sWaofppR/6imZotnSV6dOsKWfuqRccDeMyMY6TZixARHA+QvgZMaQuPVh6YAAAAASUVORK5CYII=');
			break;

		case 'startingSixSymbolSix':
			img.addClass('startingSixSymbol');
			img.attr('data-action', 'startingSixSymbolSix');
			img.attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEQklEQVRoQ92aj5ENQRDG+yJwIkAEiAARIAJEgAgQASJABIiAi+BOBIgAEVC/qvleze7Ozk73zLun3lRt7Ttmp/vrP1/3zO6JHck4ORIcNhLIqZndMbNbZnbXzK6nK7fVDzPj+mpmF2Z2Zma/RxhzBJBHZvYgXRGdPpkZ14fIw3qmB8gLM3s8szoWxtpcWBqr5wNv4Tk8xoUHNfDUGzN7GwEUAYIC7zIAKP8+WdUbJoDCm8/M7GYCAKAnyRjNmLxAXiehCPiWfmP9EQMD4REB4vfz1oVbgWC5LymR/5jZyyS0VY5nHt5h/SspNO+1EEILEOKaUOKOF8iLeex7FG2ZiyzCFe8gi1CrytwCknsCELjfmwctipfmIJuwFZiqZ7aAnGeeuEwQAjYHc3vNKjUgJNvTFE6HAFECAzWTQ4uxBgTFSW4Sm9/7zomt8CNnCDMIgBBbMOUakO+pTkB/eOZ/GHgC+qfO3JgrVAIC9VG1SW4sERn0WazBHY8ysCJKvEr3yLpEBsm/MHAJiLxRdGGDdOgZuq4N6BR69Q6F/MIrcyBSgrZDlvQIk/t5hsSkGVQ8sx7tCATCiIatvDIxxhwIgu+nAuS1GGEEXUOZNYvLWNQj6BTreoae/5x33DkQFPiVVrwaKHzKLdpxhNUGRqL9J194zjOKeuZAcPvHtNmJhJWKZ0tuSRZhslrkKugIV7YAD1P4TnaIsmjESsj8mwRvdQvSzzs/x7XQNRcqlC0WLRmrRzFPaDF3ET05ENEuro5U8hwIcQw7IVC1iDUhE9ist/FkTUJ5F5o5kF6L6nkYiwoMmNIABHMA1TMm+u4DiJSDHmlv8jpCnYHeGbtEDaK5FCCtdYSeKRpmewcyKVQr1haxRBlywZJ5aFFhryVe70n2FtZTzxStI0r2XWN7SPrtIRcZYtcT5kCOpiD2tijqSj2hFd3zVFuUUU0j9QFqrQ220YRHJNk3m0YE97TxCIAw2FfX6JedI2HMeQCtv5d+N9t4gGhSlE0UnjIKBZGEZNCtAkCddbQgqsuubqwQKBpuifVS+ACG/QaeKQ08gcEiLYrY6uf83Uup5dZ2NeoVlCfMWAdQOpQmsVEeL3nDSQYpeoP/XNs7yCvRfXWwfao+JgMvvFEDIhdiOUIsUulHgqGSw3R42nVAhxI6MgVE09H+SM2ztfKDdPeRqdZRkTsUmPnbgNUDw639tetof7BHXK80toCgm/ulywBA7pdLLUBEp3rpAgFQ2EJvXxtAstdnfTzS/HKpFYjkiwD4m7yBnke+DGWvrzxYTeySMbxAWANqpnKzCRMgALIz9BY6rM4enhohANQJKr/LQBEgMgjCuQSIf9fHAtxpRUofDNC66IOB/EQTABgk9D6mB4gAYT1aEZ2ONKTBZAqepHXxHppPFhkBRAvq04z8o5rcW8wjeQk/fVSjTz284BfzRwLpVqZngaMB8g+O0SdCMvj3XAAAAABJRU5ErkJggg==');
			break;

		default:
			console.error('ActionImg nicht gefunden');
	}

	return img;
}

function showRosterActionOverlay(playerId) {
	var rosterActionOverlay = $('<div>', {
		'id': 'roster-action-overlay'
	}).append(getActionImg('startingSixSymbolOne'))
	  .append(getActionImg('startingSixSymbolTwo'))
	  .append(getActionImg('startingSixSymbolThree'))
	  .append(getActionImg('startingSixSymbolFour'))
	  .append(getActionImg('startingSixSymbolFive'))
	  .append(getActionImg('startingSixSymbolSix'))
	  .append(getActionImg('removeFromStartingSix'));

	if ($('.roster-tr[data-player-id="' + playerId + '"]').next().is('#roster-action-overlay')) {
	  	$('#roster-action-overlay').remove();
	} else {
	  	$('.roster-tr[data-player-id="' + playerId + '"]').after(rosterActionOverlay);
	  	$('#roster-action-overlay').focusout(function() {
	  		console.log('Focusout');
	  	});
	}
}

function changeStartingSixPosition(position, playerId) {
	$('.roster-tr[data-player-id="' + playerId + '"]').find('div[class="roster-td actions"]').empty();
	$('.roster-tr[data-player-id="' + playerId + '"]').find('div[class="roster-td actions"]').append(getActionImg(position));
	$('.roster-tr[data-player-id="' + playerId + '"]').find('div[class="roster-td actions"]').append(getActionImg('removePlayer'));
	$('#roster-action-overlay').remove();
}

function getStartingSix(team) {
	var position1 = $('#roster-' + team).find('img[data-action="startingSixSymbolOne"]').closest('.roster-tr').find('div[class="roster-td number"]').text() + ',';
	var position2 = $('#roster-' + team).find('img[data-action="startingSixSymbolTwo"]').closest('.roster-tr').find('div[class="roster-td number"]').text() + ',';
	var position3 = $('#roster-' + team).find('img[data-action="startingSixSymbolThree"]').closest('.roster-tr').find('div[class="roster-td number"]').text() + ',';
	var position4 = $('#roster-' + team).find('img[data-action="startingSixSymbolFour"]').closest('.roster-tr').find('div[class="roster-td number"]').text() + ',';
	var position5 = $('#roster-' + team).find('img[data-action="startingSixSymbolFive"]').closest('.roster-tr').find('div[class="roster-td number"]').text() + ',';
	var position6 = $('#roster-' + team).find('img[data-action="startingSixSymbolSix"]').closest('.roster-tr').find('div[class="roster-td number"]').text();

	return position1 + position2 + position3 + position4 + position5 + position6;
}

function getRosterList(team) {
	var rosterList = new Object();	
	$('#roster-' + team).find('div[class="roster-tr"]').each(function() {
		var number = $(this).find('div[class="roster-td number"]').text();
		var name = $(this).find('div[class="roster-td name"]').text();
		rosterList[number] = name;
	});
	return rosterList;
}

function downloadGameSettings(mode) {
	var homeTeamData = {
		HomeTeamLong: $('#home-team-long').val(),
		HomeTeamShort: $('#home-team-short').val(),
		HomeHeadcoach: $('#home-coach').val(),
		HomeStarting6: getStartingSix('home'),
		HomeTeamLineup: getRosterList('home')
	};

	var awayTeamData = {
		AwayTeamLong: $('#away-team-long').val(),
		AwayTeamShort: $('#away-team-short').val(),
		AwayHeadcoach: $('#away-coach').val(),
		AwayStarting6: getStartingSix('away'),
		AwayTeamLineup: getRosterList('away')
	};

	$.ajax({
		type: 'POST',
		url: '../file-handler/GameSettings.php',
		data: {
			GameNr: $('#game-id').val(),
			Title: $('#game-title').val(),
			Date: $('#game-date').val(),
			Time: $('#game-time').val(),
			Location: $('#game-location').val(),
			Referee1: $('#game-ref-1').val(),
			Referee2: $('#game-ref-2').val(),
			Commentator1: $('#game-com-1').val(),
			Commentator2: $('#game-com-2').val(),
			HomeTeamData: homeTeamData,
			AwayTeamData: awayTeamData
		},
		success: function(r) {
			switch(mode) {
				case 'preview':
					window.open(r, '_blank');
					break;

				case 'download':
					$('#game-settings-download-link').attr('href', r);
					$('#game-settings-download-link').text(r);
					$('#show-download-url').show();
					break;
			}
		}
	});
}