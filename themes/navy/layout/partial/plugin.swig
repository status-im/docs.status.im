<li class="plugin on">
  <img src="/extensions/thumbnails/{{ plugin.thumbnail }}" style="display: block; width: 200px; height: 160px; margin-bottom: 20px;" />
  <a href="{{ plugin.link }}" class="plugin-name">{{ plugin.name }}</a>
  <p class="plugin-desc">{{ plugin.description }}</p>
  <div class="plugin-tag-list">
    {% for tag in plugin.tags %}
      <a href="#{{ tag }}" class="plugin-tag">{{ tag }}</a>
    {% endfor %}
  </div>
</li>
