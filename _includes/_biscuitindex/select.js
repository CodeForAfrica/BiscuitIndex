
$(document).ready(function() {

  $('select.bi-comparatives').select2();

  $('input#bi-compare-amt').val(BiscuitIndex.data.comparatives[BiscuitIndex.selected.comparative].amount);

  $('select#bi-county').select2({
    data: BiscuitIndex.data.counties
  });
  

  $('select#bi-comparatives').on('change', function() {
    BiscuitIndex.selected.comparative = $( this ).val();
    $('input#bi-compare-amt').val(BiscuitIndex.data.comparatives[BiscuitIndex.selected.comparative].amount);
  });

  $('input#bi-compare-amt').on('change', function() {
    BiscuitIndex.data.comparatives[BiscuitIndex.selected.comparative].amount = $( this ).val();
  });

  $('select#bi-county').on('change', function() {
    BiscuitIndex.selected.county = $( this ).val();
  });


  $('select#bi-county').val(28);
  $('select#bi-county').trigger('change');


  $('button#bi-compare').on('click', function () {
    BiscuitIndex.fn.compare();
  });
  $('button#bi-compare').trigger('click');

});
