
BiscuitIndex.data.comparatives = [
  {% for comparative in site.data.comparatives %}
    {
      'text': toTitleCase("{{ comparative.name }}"),
      'amount': {{ comparative.amount }},
      'icon': '{{ comparative.icon }}',
      'unit': '{{ comparative.unit }}',
      'transaction': '{{ comparative.transaction }}'
    },
  {% endfor %}

  {
    'text': 'MRI MACHINES',
    'amount': 150000000,
    'icon': '<i class="mri"></i>'
  },
  {
    'text': 'DIALYSIS MACHINES',
    'amount': 3000000,
    'icon': '<i class="dialysis"></i>'
  },
  {
    'text': 'MALARIA DRUGS',
    'amount': 15,
    'icon': '<i class="malarial"></i>'
  }

];

BiscuitIndex.data.counties = [
  {% for county in site.data.counties %}
    {
      code: {{ county.code }},
      name: toTitleCase("{{ county.name }}"),
      governor: "{{ county.governor }}",
      governor_deputy: "{{ county.governor_deputy }}",
      party: "{{ county.party }}",
      area_km2: {{ county.area_km2 }},
      population: {{ county.population }},
      city: "{{ county.city }}",
      hospitality_budget: {{ county.hospitality_budget }},
      hospitality_budget_text: numeral({{ county.hospitality_budget }}).format('0.0 a'),
      total_budget: {{ county.total_budget }},
      total_budget_text: numeral({{ county.total_budget }}).format('0.0 a')
    },
  {% endfor %}
];
