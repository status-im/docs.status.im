<li class="plugin on">
  <a href="{{ tutorial.link }}" class="plugin-name">{{ tutorial.name }}</a>
  <p class="plugin-desc">{{ tutorial.description }}</p>
  <div class="plugin-tag-list">
    {% for tag in tutorial.tags %}
      <a href="#{{ tag }}" class="plugin-tag">{{ tag }}</a>
    {% endfor %}
  </div>
</li>
