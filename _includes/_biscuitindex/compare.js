/**
 * Compare 
 * -------
 */

BiscuitIndex.fn.compare = function () {
  var selected = BiscuitIndex.selected;
  var comparative = BiscuitIndex.data.comparatives[selected.comparative];

  var county = BiscuitIndex.data.counties[0];
  for (var i = 0; i < BiscuitIndex.data.counties.length; i++) {
    if (BiscuitIndex.data.counties[i].code == selected.county) {
      county = BiscuitIndex.data.counties[i];
    }
  }

  var icons = BiscuitIndex.fn.iconCount(comparative, county);

  BiscuitIndex.comparison.comparative = comparative;
  BiscuitIndex.comparison.county = county;

  BiscuitIndex.comparison.icons_count = icons.count;
  BiscuitIndex.comparison.icons_no = icons.no;
  BiscuitIndex.comparison.icons_multiple = icons.multiple;

  BiscuitIndex.fn.compareDefault(county);

  BiscuitIndex.fn.displayComparison(BiscuitIndex.comparison);

  return BiscuitIndex.comparison;
};


BiscuitIndex.fn.compareDefault = function (county) {
  var comparatives_defaults = [];
  for (var i = BiscuitIndex.data.comparatives.length - 1; i > BiscuitIndex.data.comparatives.length - 4; i--) {

    var comparison_default = {
      'comparative': BiscuitIndex.data.comparatives[i]
    };

    var icons = BiscuitIndex.fn.iconCount(comparison_default.comparative, county, 30);
    comparison_default.icons_count = icons.count;
    comparison_default.icons_no = icons.no;
    comparison_default.icons_multiple = icons.multiple;

    comparatives_defaults.push(comparison_default);
  }

  BiscuitIndex.comparison.comparatives_defaults = comparatives_defaults;

  return comparatives_defaults;
};


BiscuitIndex.fn.iconCount = function (comparative, county, max_icons) {

  var icons = {'count':0, 'no': 0, 'multiple': 1};

  icons.count = county.hospitality_budget / comparative.amount;
  icons.no = icons.count;

  if (typeof max_icons == 'undefined') {
    max_icons = BiscuitIndex.MAX_ICONS
  }

  while (icons.no > max_icons) {
    icons.multiple *= 10;
    icons.no /= 10;
  };

  icons.count = parseInt(icons.count);
  icons.no = parseInt(icons.no);

  return icons;
}
