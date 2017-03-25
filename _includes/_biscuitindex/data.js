
BiscuitIndex.data.comparisons = [
  {
    id: 0,
    text: 'Rent',
    amount: 35000,
    icon: '<i class="fa fa-home"></i>',
    unit: 'Month',
    transaction: 'pay for'
  },
  {
    id: 1,
    text: 'School Fees',
    amount: 10000,
    icon: '<i class="fa fa-graduation-cap"></i>',
    unit: 'Term',
    transaction: 'pay for'
  },
  {
    id: 2,
    text: 'Maize Flour',
    amount: 124,
    icon: '<i class="fa fa-cutlery"></i>',
    unit: 'Packet',
    transaction: 'buy'
  }
];


BiscuitIndex.data.budgets = [
  {% for county in site.data.county_hospitality_data %}
    {
      id: {{ forloop.index0 }},
      text: toTitleCase("{{ county.name }}"),
      hospitality: {{ county.hospitality_budget }},
      hospitality_text: numeral({{ county.hospitality_budget }}).format('0.0 a'),
      total: {{ county.total_budget }},
      total_text: numeral({{ county.total_budget }}).format('0.0 a')
    },
  {% endfor %}
];
