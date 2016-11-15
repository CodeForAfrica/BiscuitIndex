
BiscuitIndex.data = [
  {% for county in site.data.county_hospitality_data %}
    {
      id: {{ forloop.index0 }},
      text: toTitleCase("{{ county.name }}"),
      hospitality: "{{ county.hospitality_budget }}",
      total: "{{ county.total_budget }}"
    },
  {% endfor %}
]
