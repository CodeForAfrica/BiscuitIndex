/**
 * Display 
 * -------
 */

BiscuitIndex.fn.displayComparison = function (data) {

  data.icons_html = '';
  $('.bi-comparison-icons').html(data.icons_html);

  for (var i = 0; i < data.count_icons ; i++) {
    data.icons_html += data.comparison.icon + ' ';
  };

  $('.bi-county-name').html(data.budget.text);

  $('.bi-hospitality-budget-amt-text').html(data.budget.hospitality_text);

  $('.bi-comparison-transaction').html(data.comparison.transaction);
  $('.bi-comparison-count').html(data.count);
  $('.bi-comparison-unit').html(data.comparison.unit + 's of ' + data.comparison.text)


  $('.bi-comparison-icons').html(data.icons_html);

  $('.bi-comparison-icons-unit').html(
    data.comparison.icon + ' = ' + data.multiple + ' ' + data.comparison.unit + 's of ' + data.comparison.text
  );

  if (parseInt(data.budget.hospitality) == 0) {
    $('.bi-hospitality-budget-amt-text').html('N/A');
    $('.bi-comparison-count').html('N/A');
    $('.bi-comparison-icons').html('No data available');
  };

  return data.html;
};
