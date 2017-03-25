/**
 * Compare 
 * -------
 */

BiscuitIndex.fn.compare = function () {
  var selected = BiscuitIndex.selected;
  var comparison = BiscuitIndex.data.comparisons[selected.comparison];
  var budget = BiscuitIndex.data.budgets[selected.budget];

  var items = {
    count: 0,
    count_icons: 0,
    multiple: 1,
    comparison: comparison,
    budget: budget
  };

  items.count = budget.hospitality / comparison.amount;
  items.count_icons = items.count;

  while (items.count_icons > 100) {
    items.multiple *= 10;
    items.count_icons /= 10;
  };

  items.count = parseInt(items.count);
  items.count_icons = parseInt(items.count_icons);

  BiscuitIndex.fn.displayComparison(items);

  return items;
};
