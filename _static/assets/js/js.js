// 	@martianskills up in this script. buda boss.
//
// 	I could make it more modular, object oriented,
// 	but I've been at it for 8 hours and I don't think
// 	I'm pretty sure I'm over the budget anyways.
//
// 	Life ni hard; hivo ndo kunaendanga.

jQuery(function($) {
	$(document).ready(function() {

		// fetch + cache

		var html			= $('html'),
			$body			= $('body'),
			wWidth 			= $(window).innerWidth(),
			wHeight 		= $(window).innerHeight(),
			urlCat 			= '' + getUrlParameter('cat'),
			urlExp 			= parseInt(getUrlParameter('exp')),
			urlCounty 		= '' + getUrlParameter('county');
			urlSoda 		= '' + getUrlParameter('sd');
			urlCoffee 		= '' + getUrlParameter('cf');
			urlCupcake 		= '' + getUrlParameter('cc');

		function baseFx() {

			// load data 

			$('#expenditure').val(urlExp).focus();
			$('#category').val(urlCat);
			$('#county').val(urlCounty);
			$('#range-soda').val(urlSoda);
			$('#range-coffee').val(urlCoffee);
			$('#range-cupcake').val(urlCupcake);


			// only show output if essential
			// data is provided
			if (urlExp && urlCat && urlCounty) {
				$('.output').css({'display':'block'});
			}

			// when call-to-action is clicked
			$('#compare').on('click', function(e) {
				e.preventDefault();

				// get values from input fields
				var category 	= $('#category').val(),
					expenditure = $('#expenditure').val(),
					county 		= $('#county').val();

					// someone tried to submit without input
					if ( expenditure == '' || expenditure == 0) {
						$('#expenditure').addClass('highlight').focus();
					} else {
						// simulate reload with set parameters
						location.href = '?cat=' + category 
										+ '&exp=' + expenditure 
										+ '&county=' + county;
					}
			});


			// write base data

			$('#output-budget').html(countyBudgetString);

			var countyName,
				categoryName,
				comparison,
				comparisonString;

			// set human-readable labels
			if (urlCat == 'rent') {
				categoryName = 'Monthly Rent';
			} else if (urlCat == 'fees') {
				categoryName = 'School Fees';
			} else if (urlCat == 'commute') {
				categoryName = 'Daily Commutes';
			}

			// populate the DOM
			$('#output-category').html(categoryName);
			$('#output-county').html(urlCounty);


			// calculate comparison value

			comparison = countyBudgetInteger / urlExp;
			comparison = Math.round(comparison);
			comparisonString = comparison.toLocaleString();
			
			// print it
			$('#output-comparison').html(comparisonString);


			// approximate number of icons we want

			var iconMax = 80, // default
				iconSodaMax = 90, // specific to soda
				iconCoffeeMax = 75, // specific to coffee
				iconCupcakeMax = 150, // specific to cupcakes
				outputRatio = Math.ceil( (parseInt(comparison) / iconMax) / 100 ) * 100,
				outputIconsNumber = Math.round(comparison / outputRatio),
				outputRatioUnits = '';
			

			// generate infographics
			
			var mainOutputString = '',
				outputComparisonUnits = '',
				outputRatioUnits = '',
				sodaString = '',
				coffeeString = '',
				cupcakeString = '',
				delay = 0.005; 	// animation interval for icons,
								// ndio zisiingie zote tu pap!

			// main output loop
			for (var i = outputIconsNumber - 1; i >= 0; i--) {
				if (urlCat == 'rent') {
					mainOutputString += '<i class="house" style="transition-delay:' + delay.toFixed(2) + 's"></i> ';
					outputComparisonUnits = 'people';
					outputRatioUnits = 'homes';
				} else if (urlCat == 'fees') {
					mainOutputString += '<i class="fee" style="transition-delay:' + delay.toFixed(2) + 's"></i> ';
					outputComparisonUnits = 'students';
					outputRatioUnits = 'students';
					$('#output-ratio').siblings('i').removeAttr('class').addClass('fee');
				} else if (urlCat == 'commute') {
					mainOutputString += '<i class="commute" style="transition-delay:' + delay.toFixed(2) + 's"></i> ';
					outputComparisonUnits = 'people';
					outputRatioUnits = 'daily commutes';
					$('#output-ratio').siblings('i').removeAttr('class').addClass('commute');
				}
				delay += 0.005;
			}

			$('#output-ratio').html(outputRatio);
			$('#output-comparison-units').html(outputComparisonUnits);
			$('#output-ratio-units').html(outputRatioUnits);


			// secondary outputs

			var thirdCountyBudgetInteger = Math.round(countyBudgetInteger / 3),
				sodaPrice = 30,
				coffeePrice = 200,
				cupcakePrice = 15,

				sodaCount = Math.round(thirdCountyBudgetInteger / sodaPrice),
				coffeeCount = Math.round(thirdCountyBudgetInteger / coffeePrice),
				cupcakeCount = Math.round(thirdCountyBudgetInteger / cupcakePrice),

				sodaRatio = Math.ceil( (parseInt(sodaCount) / iconSodaMax) / 1000 ) * 1000,
				sodaIconsNumber = Math.round(sodaCount / sodaRatio),

				coffeeRatio = Math.ceil( (parseInt(coffeeCount) / iconCoffeeMax) / 1000 ) * 1000,
				coffeeIconsNumber = Math.round(coffeeCount / coffeeRatio),

				cupcakeRatio = Math.ceil( (parseInt(cupcakeCount) / iconCupcakeMax) / 1000 ) * 1000,
				cupcakeIconsNumber = Math.round(cupcakeCount / cupcakeRatio);

				$('#output-soda-ratio').html(sodaRatio.toLocaleString());
				$('#output-coffee-ratio').html(coffeeRatio.toLocaleString());
				$('#output-cupcake-ratio').html(cupcakeRatio.toLocaleString());

				$('#batch-count--soda').html(Math.round(sodaCount / 30).toLocaleString()); // 30 sodas in a crate
				$('#batch-count--coffee').html('<em>+</em>' + Math.round(coffeeCount * 0.2).toLocaleString()); // 5 cups per litre
				$('#batch-count--cupcake').html('<em>+</em>' + Math.round(cupcakeCount / 6).toLocaleString()); // 6 cupcakes in a packet


			delay = 0;

			// soda loop
			for (var i = 0; i < sodaIconsNumber; i++) {
				sodaString += '<i class="soda" style="transition-delay:' + delay.toFixed(2) + 's" title="' + (i + 1) + '"></i> ';
				delay += 0.005;
			}

			delay = 0;

			// coffee loop
			for (var i = 0; i < coffeeIconsNumber; i++) {
				coffeeString += '<i class="coffee" style="transition-delay:' + delay.toFixed(2) + 's" title="' + (i + 1) + '"></i> ';
				delay += 0.005;
			}

			delay = 0;

			// cupcake loop
			for (var i = 0; i < cupcakeIconsNumber; i++) {
				cupcakeString += '<i class="cupcake" style="transition-delay:' + delay.toFixed(2) + 's" title="' + (i + 1) + '"></i> ';
				delay += 0.005;
			}

			// insert into DOM
			$('.output-icons').html(mainOutputString);
			$('.soda-icons').html(sodaString);
			$('.coffee-icons').html(coffeeString);
			$('.cupcake-icons').html(cupcakeString);


			// when sliders are moved

			$('input[type="range"]').on('change', function(e) {

				var soda = parseInt($('#range-soda').val()),
					coffee = parseInt($('#range-coffee').val()), 
					cupcake = parseInt($('#range-cupcake').val());

				var total = soda + coffee + cupcake;

				// number of items equals -> countyBudgetInteger multiplied by the ratio of item to the rest,
				// (according to current set state of sliders), then divided by the cost of a single item
				
				sodaCount = Math.round((countyBudgetInteger * ( soda / total)) / sodaPrice);
				coffeeCount = Math.round((countyBudgetInteger * ( coffee / total)) / coffeePrice);
				cupcakeCount = Math.round((countyBudgetInteger * ( cupcake / total)) / cupcakePrice);

				// get number of icons to display according to initially computed ratios
				sodaIconsNumber = Math.round(sodaCount / sodaRatio);
				coffeeIconsNumber = Math.round(coffeeCount / coffeeRatio);
				cupcakeIconsNumber = Math.round(cupcakeCount / cupcakeRatio);

				// reset (otherwise icons would increment ad infinitum)
				sodaString = coffeeString = cupcakeString = '';

				// soda loop, generate markup
				for (var i = 0; i < sodaIconsNumber; i++) {
					sodaString += '<i class="soda" style="transition-delay:' + delay.toFixed(2) + 's" title="' + (i + 1) + '"></i> ';
					delay += 0.005;
				}

				// coffee loop
				for (var i = 0; i < coffeeIconsNumber; i++) {
					coffeeString += '<i class="coffee" style="transition-delay:' + delay.toFixed(2) + 's" title="' + (i + 1) + '"></i> ';
					delay += 0.005;
				}

				// cupcake loop
				for (var i = 0; i < cupcakeIconsNumber; i++) {
					cupcakeString += '<i class="cupcake" style="transition-delay:' + delay.toFixed(2) + 's" title="' + (i + 1) + '"></i> ';
					delay += 0.005;
				}

				// inject that shtuff, man!
				$('.soda-icons').html(sodaString);
				$('.coffee-icons').html(coffeeString);
				$('.cupcake-icons').html(cupcakeString);

				// pima pima, basic stuff
				$('#batch-count--soda').html(Math.round(sodaCount / 30).toLocaleString()); // 30 sodas in a crate
				$('#batch-count--coffee').html('<em>+</em>' + Math.round(coffeeCount * 0.2).toLocaleString()); // 5 cups per litre
				$('#batch-count--cupcake').html('<em>+</em>' + Math.round(cupcakeCount / 6).toLocaleString()); // 6 cupcakes in a packet

				// update URI without reload
				if (history.pushState) {

				var category 	= $("#category").val(),
					expenditure = $("#expenditure").val(),
					county 		= $("#county").val();
				
				var	newUrl = window.location.origin + window.location.pathname 
								+ '?cat=' + category 
								+ '&exp=' + expenditure 
								+ '&county=' + county
								+ '&sd=' + soda
								+ '&cf=' + coffee
								+ '&cc=' + cupcake;
					window.history.pushState({path:newUrl},'',newUrl);
				}

			});


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

		// get param from url

		function getUrlParameter(sParam) {
			var sPageURL = decodeURIComponent(window.location.search.substring(1)),
				sURLVariables = sPageURL.split('&'),
				sParameterName,
				i;

			for (i = 0; i < sURLVariables.length; i++) {
				sParameterName = sURLVariables[i].split('=');

				if (sParameterName[0] === sParam) {
					return sParameterName[1] === undefined ? true : sParameterName[1];
				}
			}
		};

		// format thousands

		function commaSeparateNumber (val) {
			while (/(\d+)(\d{3})/.test(val.toString())) {
				val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
			}
			return val;
		}

	});
});