/**
 * Display 
 * -------
 */

BiscuitIndex.fn.displayComparison = function (comparison) {

  // Set the descriptions
  if (parseInt(comparison.county.hospitality_budget) == 0) {
    $('.bi-output #bi-hospitality-budget-amt-text').html('N/A');
    $('.bi-output #bi-comparative-count').html('N/A');
    $('.bi-output #bi-comparative-icons').html('No data available');
  };


  // Display comparative

  comparison.icons_html = '';
  $('.bi-comparative-icons').html(comparison.icons_html);

  for (var i = 0; i < comparison.icons_no ; i++) {
    comparison.icons_html += comparison.comparative.icon + ' ';
  };

  $('.bi-output #bi-county-name').html(comparison.county.name + " County's budget allocation on hospitality");

  $('.bi-output #bi-hospitality-budget-amt-text').html(comparison.county.hospitality_budget_text);

  $('.bi-output #bi-comparative-transaction').html(comparison.comparative.transaction);
  $('.bi-output #bi-comparative-count').html(numeral(comparison.icons_count).format('0,0'));
  $('.bi-output #bi-comparative-unit').html(comparison.comparative.unit + 's of ' + comparison.comparative.text)

  $('.bi-output .static-chart #bi-icons').html(comparison.icons_html);

  $('.bi-output .static-chart .icon-legend #bi-icon').html(comparison.comparative.icon);
  $('.bi-output .static-chart .icon-legend #bi-icons-multiple').html(comparison.icons_multiple);
  $('.bi-output .static-chart .icon-legend #bi-comparative-name').html(comparison.comparative.text);


  // Display default comparatives
  // TODO: Smarter selection incase defaults are less
  $('.bi-comparatives-defaults .icon-row').each(function(index, element){
    var comparison_default = comparison.comparatives_defaults[index];

    $(this).find('.bi-icon-count').html(numeral(comparison_default.icons_count).format('0,0'));
    $(this).find('.bi-comparative-name').html(comparison_default.comparative.text);

    comparison_default.icons_html = '';
    for (var i = 0; i < comparison_default.icons_no ; i++) {
      comparison_default.icons_html += comparison_default.comparative.icon + ' ';
    };
    $(this).find('.bi-icons').html(comparison_default.icons_html);

    $(this).find('.icon-legend #bi-icon').html(comparison_default.comparative.icon);
    $(this).find('.icon-legend #bi-icons-multiple').html(
      numeral(comparison_default.icons_multiple).format('0,0')
    );

  });

  return comparison.html;
};
