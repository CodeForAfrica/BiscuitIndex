jQuery(function($) {
	$(document).ready(function() {

		// cache

		var html			= $('html'),
			$body			= $('body'),
			wWidth 			= $(window).innerWidth(),
			wHeight 		= $(window).innerHeight();

		function baseFx() {

			// automatically go to input
			$('#expenditure').focus();

			// simulate infographics
			
			var units = 80,
				houseString = '',
				sodaString = '',
				coffeeString = '',
				cupcakeString = '',
				delay = 0.03;

			// house loop
			for (var i = units - 1; i >= 0; i--) {
				houseString += '<i class="house" style="transition-delay:' + delay.toFixed(2) + 's"></i> ';
				delay += 0.03;
			}

			// soda loop
			for (var i = units - 1; i >= 0; i--) {
				sodaString += '<i class="soda" style="transition-delay:' + delay.toFixed(2) + 's"></i> ';
				delay += 0.03;
			}

			// coffee loop
			for (var i = units - 1; i >= 0; i--) {
				coffeeString += '<i class="coffee" style="transition-delay:' + delay.toFixed(2) + 's"></i> ';
				delay += 0.03;
			}

			// cupcake loop
			for (var i = units - 1; i >= 0; i--) {
				cupcakeString += '<i class="cupcake" style="transition-delay:' + delay.toFixed(2) + 's"></i> ';
				delay += 0.03;
			}

			// insert into DOM
			$('.house-icons').html(houseString);
			$('.soda-icons').html(sodaString);
			$('.coffee-icons').html(coffeeString);
			$('.cupcake-icons').html(cupcakeString);

			$(window).load(function() {

				// remove preload class
				$body.removeClass('preload');

			}); // load
		}



		/* On Doc Ready --------------------------------------*/

		// run base functions 
		baseFx();

		// run page functions
		// if ($body.hasClass('home')) { homeFx(); }



		/* On Window Resize ----------------------------------*/

		$(window).resize(function() {

			wWidth = $(window).innerWidth();
			wHeight = $(window).innerHeight();

		});


		/* Abstracted Functions ------------------------------*/

		// activate email links

		function activateEmail (selector) {
			$(selector).html( function() {
				var adr = $(this).data('address');
				var dom = $(this).data('domain');
				var ext = $(this).data('ext');
				return adr + '@' + dom + ext;
			}).attr('href', function() {
				return 'mailto:' + $(this).html();
			}).attr('target', '_blank');
		}
		
	});
});