<li class="plugin on">
  <a href="{{ template.link }}" class="plugin-name" target="_blank">{{ template.name }}</a>
  <p class="plugin-desc">{{ template.description }}</p>
  <div class="plugin-tag-list">
    {% for tag in template.tags %}
      <a href="#{{ tag }}" class="plugin-tag">{{ tag }}</a>
    {% endfor %}
  </div>
</li>
