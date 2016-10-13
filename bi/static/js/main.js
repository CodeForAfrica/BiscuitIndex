//

jQuery(function($) {
	$(document).ready(function() {

		// fetch + cache

		var html			= $('html'),
			$body			= $('body'),
			bHeight 		= $body.innerHeight(),
			wWidth 			= $(window).innerWidth(),
			wHeight 		= $(window).innerHeight(),
			urlCat 			= '' + getUrlParameter('cat'),
			urlExp 			= parseInt(getUrlParameter('exp')),
			urlCounty 		= '' + getUrlParameter('county');
			urlmri 		= '' + getUrlParameter('sd');
			urldialysis 		= '' + getUrlParameter('cf');
			urlmalarial 		= '' + getUrlParameter('cc');

		function baseFx() {

			// load data 

			$('#expenditure').val(urlExp).focus();
			$('#category').val(urlCat);
			$('#county').val(urlCounty);
			$('#range-mri').val(urlmri);
			$('#range-dialysis').val(urldialysis);
			$('#range-malarial').val(urlmalarial);


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

				// send to analytics
				ga('send', 'event', 'biscuitindex', 'category', category);
				ga('send', 'event', 'biscuitindex', 'expenditure', expenditure);
				ga('send', 'event', 'biscuitindex', 'county', county);
				
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
				categoryDescription,
				comparison,
				comparisonString,
				comparisonUnits;

			// set human-readable labels
			comparatives = JSON.parse(comparatives.replace(/'/g, '"').replace(/None/g, '"None"'));
			for (k in comparatives) {
			    if (k == urlCat) {
			        categoryName = comparatives[k].name;
			        categoryDescription = comparatives[k].description;
			        comparisonUnits = comparatives[k].comparative_unit;
			        break;
			    }
			}

			// populate the DOM
			$('#output-category').html(categoryDescription);
			$('#output-county').html(urlCounty);



			// calculate comparison value
			comparison = Math.round(countyBudgetInteger / urlExp);
			comparisonString = comparison.toLocaleString();

			// Structure the months more favourably
			if (comparisonUnits) {
                if (comparisonUnits.toLowerCase() == 'months') {
                    if (comparison > 12) {
                        comparison = Math.round(comparison / 12);
                        comparisonString = comparison.toLocaleString();
                        comparisonUnits = 'years';
                    }
                } else if (comparisonUnits.toLowerCase() == 'days') {
                    if (comparison > 31) {
                        if (comparison > 365) {
                            comparison = Math.round(comparison / 365);
                            comparisonString = comparison.toLocaleString();
                            comparisonUnits = 'years';
                        } else {
                            comparison = Math.round(comparison / 30);
                            comparisonString = comparison.toLocaleString();
                            comparisonUnits = 'months';
                        }

                    } else {
                        comparisonUnits = 'days';
                    }
                }
            }
			
			// print it
			$('#output-comparison').html(comparisonString);

			text = urlCounty[0].toUpperCase() + urlCounty.slice(1)  + '\'s hospitality budget ' + countyBudgetString + ' ' + categoryDescription + ' ' + comparisonString + ' ' + comparisonUnits
			$('#twtbtn').attr('href', 'https://twitter.com/intent/tweet?button_hashtag=BiscuitIndex&text=' + text)


			// approximate number of icons we want

			var iconMax = 80
			    iconmriMax = 30, // specific to mri
				icondialysisMax = 30, // specific to dialysis
				iconmalarialMax = 40, // specific to malarials
				outputRatio = Math.ceil( (parseInt(comparison) / iconMax) / 100 ) * 100,
				outputIconsNumber = Math.ceil(comparison / outputRatio),
				outputRatioUnits = '';
			

			// generate infographics
			
			var mainOutputString = '',
				outputComparisonUnits = '',
				outputRatioUnits = '',
				mriString = '',
				dialysisString = '',
				malarialString = '',
				delay = 0.005; 	// animation interval for icons,
								// ndio zisiingie zote tu pap!

			// main output loop
			for (var i = 0; i < outputIconsNumber; i++) {
			    for (k in comparatives) {
			        if (k == urlCat) {
			            mainOutputString += '<i class="'+ k +'" style="transition-delay:' + delay.toFixed(2) + 's" title="' + ((i + 1) * outputRatio).toLocaleString() + '"></i> ';
                        outputComparisonUnits = comparatives[k].comparative_unit;
                        outputRatioUnits = comparatives[k].comparative_unit;
                        $('#output-ratio').siblings('i').removeAttr('class').addClass(k);
                        break;
			        }
			    }
				delay += 0.005;
			}

			if (comparisonUnits == 'days' || comparisonUnits == 'months' || comparisonUnits == 'years') {
				outputComparisonUnits = comparisonUnits;
				outputRatioUnits = comparisonUnits;
			}

			$('#output-ratio').html(outputRatio);
			$('#output-comparison-units').html(outputComparisonUnits);
			$('#output-ratio-units').html(outputRatioUnits);


			// secondary outputs

			var thirdCountyBudgetInteger = Math.round(countyBudgetInteger),
				mriPrice = 150000000,
				dialysisPrice = 3000000,
				malarialPrice = 15,

				mriCount = Math.round(thirdCountyBudgetInteger / mriPrice),
				dialysisCount = Math.round(thirdCountyBudgetInteger / dialysisPrice),
				malarialCount = Math.round(thirdCountyBudgetInteger / malarialPrice),

				mriRatio = Math.ceil( (parseInt(mriCount) / iconmriMax) / 1 ) * 1,
				mriIconsNumber = Math.ceil(mriCount / mriRatio),

				dialysisRatio = Math.ceil( (parseInt(dialysisCount) / icondialysisMax) / 10 ) * 10,
				dialysisIconsNumber = Math.ceil(dialysisCount / dialysisRatio),

				malarialRatio = Math.ceil( (parseInt(malarialCount) / iconmalarialMax) / 1000 ) * 1000,
				malarialIconsNumber = Math.ceil(malarialCount / malarialRatio);
				console.log(thirdCountyBudgetInteger);
				console.log(dialysisRatio);
				console.log(dialysisCount);

				$('#output-mri-ratio').html(mriRatio.toLocaleString());
				$('#output-dialysis-ratio').html(dialysisRatio.toLocaleString());
				$('#output-malarial-ratio').html(malarialRatio.toLocaleString());

				$('#batch-count--mri').html(Math.ceil(mriCount).toLocaleString());
				$('#batch-count--dialysis').html(Math.ceil(dialysisCount).toLocaleString());
				$('#batch-count--malarial').html(Math.ceil(malarialCount).toLocaleString());

			delay = 0;

			// mri loop
			for (var i = 0; i < mriIconsNumber; i++) {
				mriString += '<i class="mri" style="transition-delay:' + delay.toFixed(2) + 's" title="' + ((i + 1) * mriRatio).toLocaleString() + '"></i> ';
				delay += 0.005;
			}

			delay = 0;

			// dialysis loop
			for (var i = 0; i < dialysisIconsNumber; i++) {
				dialysisString += '<i class="dialysis" style="transition-delay:' + delay.toFixed(2) + 's" title="' + ((i + 1) * dialysisRatio).toLocaleString() + '"></i> ';
				delay += 0.005;
			}

			delay = 0;

			// malarial loop
			for (var i = 0; i < malarialIconsNumber; i++) {
				malarialString += '<i class="malarial" style="transition-delay:' + delay.toFixed(2) + 's" title="' + ((i + 1) * malarialRatio).toLocaleString() + '"></i> ';
				delay += 0.005;
			}

			// insert into DOM
			$('.output-icons').html(mainOutputString);
			$('.mri-icons').html(mriString);
			$('.dialysis-icons').html(dialysisString);
			$('.malarial-icons').html(malarialString);

			gridSet('.dynamic-chart', '.icon-container');


			// when sliders are moved

			$('input[type="range"]').on('change', function(e) {

				var mri = parseInt($('#range-mri').val()),
					dialysis = parseInt($('#range-dialysis').val()), 
					malarial = parseInt($('#range-malarial').val());

				var total = mri + dialysis + malarial;

				// number of items equals -> countyBudgetInteger multiplied by the ratio of item to the rest,
				// (according to current set state of sliders), then divided by the cost of a single item
				
				mriCount = Math.round((countyBudgetInteger * ( mri / total)) / mriPrice);
				dialysisCount = Math.round((countyBudgetInteger * ( dialysis / total)) / dialysisPrice);
				malarialCount = Math.round((countyBudgetInteger * ( malarial / total)) / malarialPrice);

				// get number of icons to display according to initially computed ratios
				mriIconsNumber = Math.round(mriCount / mriRatio);
				dialysisIconsNumber = Math.round(dialysisCount / dialysisRatio);
				malarialIconsNumber = Math.round(malarialCount / malarialRatio);

				// reset (otherwise icons would increment ad infinitum)
				mriString = dialysisString = malarialString = '';

				// mri loop, generate markup
				for (var i = 0; i < mriIconsNumber; i++) {
					mriString += '<i class="mri" style="transition-delay:' + delay.toFixed(2) + 's" title="' + ((i + 1) * mriRatio).toLocaleString() + '"></i> ';
					delay += 0.005;
				}

				// dialysis loop
				for (var i = 0; i < dialysisIconsNumber; i++) {
					dialysisString += '<i class="dialysis" style="transition-delay:' + delay.toFixed(2) + 's" title="' + ((i + 1) * dialysisRatio).toLocaleString() + '"></i> ';
					delay += 0.005;
				}

				// malarial loop
				for (var i = 0; i < malarialIconsNumber; i++) {
					malarialString += '<i class="malarial" style="transition-delay:' + delay.toFixed(2) + 's" title="' + ((i + 1) * malarialRatio).toLocaleString() + '"></i> ';
					delay += 0.005;
				}

				// inject that shtuff, man!
				$('.mri-icons').html(mriString);
				$('.dialysis-icons').html(dialysisString);
				$('.malarial-icons').html(malarialString);

				// pima pima, basic stuff
				$('#batch-count--mri').html(mriCount.toLocaleString()); // 30 mris in a crate
				$('#batch-count--dialysis').html('<em>+</em>' + dialysisCount.toLocaleString()); // 5 cups per litre
				$('#batch-count--malarial').html('<em>+</em>' + malarialCount.toLocaleString()); // 6 malarials in a packet

				// update URI without reload
				if (history.pushState) {

				var category 	= $("#category").val(),
					expenditure = $("#expenditure").val(),
					county 		= $("#county").val();
				
				var	newUrl = window.location.origin + window.location.pathname 
								+ '?cat=' + category 
								+ '&exp=' + expenditure 
								+ '&county=' + county
								+ '&sd=' + mri
								+ '&cf=' + dialysis
								+ '&cc=' + malarial;
					window.history.pushState({path:newUrl},'',newUrl);
				}

			});


			$(window).load(function() {

				// remove preload class
				$body.removeClass('preload');

			}); // load

			// sticky sidebar
			// var $sideBar = $body.find('.side-col'),
			// 	sideBarPos = $sideBar.offset().top,
			// 	scrollPos, diff;


			// $(window).scroll(function() {
			// 	scrollPos = $body.scrollTop();

			// 	diff = (scrollPos - (sideBarPos - 88))

			// 	if ((diff > 0) && (wWidth > 800) && (diff < bHeight / 2)) {
			// 		$sideBar.css({'margin-top':diff});
			// 	} else if (diff < 0) {
			// 		$sideBar.removeAttr('style');
			// 	}

			// });

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

		// equalize columns

		function gridSet( wall, bricks ) {
			var maxHeight = -1,
				$bricks = $(wall).find(bricks);

			$bricks.each( function() {
				$(this).css({ 'height': 'auto' });
				maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
			});

			$bricks.each( function() {
				$(this).height(maxHeight);
			});
		}

        //If an immutable comparison is chosen, do not show the dynamic chart and controls
        $('#category').val()
        if ($('option:selected', $('#category')).attr('data-type') == 'false') {
            $('.dynamic-chart').css('display', 'none')
            $('.controls').css('display', 'none')
        } else {
            $('.dynamic-chart').css('display', 'block')
            $('.controls').css('display', 'block')
        }
        //Bind comparison element change to an action: Disabling the input area
        $('#category').change(function() {
            if ($('option:selected', this).attr('data-type') == 'false') {
                $('#expenditure').val($('option:selected', this).attr('data-amount'));
                $('#expenditure').attr('disabled', 'disabled');
            } else {
                $('#expenditure').val('');
                $("#expenditure").removeAttr("disabled");

            }
        });
	});
});