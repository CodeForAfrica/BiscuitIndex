
$(document).ready(function() {

  $('.bi-compare-items').select2({
    data: BiscuitIndex.data.comparisons,
    minimumResultsForSearch: Infinity
  });

  $('.bi-compare-amt').val(BiscuitIndex.data.comparisons[BiscuitIndex.selected.comparison].amount);

  $('.bi-county').select2({
    data: BiscuitIndex.data.budgets
  });
  


  $('.bi-compare-items').on('change', function() {
    BiscuitIndex.selected.comparison = $( this ).val();
    $('.bi-compare-amt').val(BiscuitIndex.data.comparisons[BiscuitIndex.selected.comparison].amount);
    BiscuitIndex.fn.compare();
  });

  $('.bi-compare-amt').on('change', function() {
    BiscuitIndex.data.comparisons[BiscuitIndex.selected.comparison].amount = $( this ).val();
    BiscuitIndex.fn.compare();
  });

  $('.bi-county').on('change', function() {
    BiscuitIndex.selected.budget = $( this ).val();
    BiscuitIndex.fn.compare();
  });


  $('.bi-county').val(28);
  $('.bi-county').trigger('change');


});
