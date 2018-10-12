<li class="plugin on">
  <img src="/fiddle/thumbnails/{{ fiddle.thumbnail }}" style="display: block; width: 200px; height: 200px; margin-bottom: 20px;" />
  <a href="{{ fiddle.link }}" class="plugin-name" target="_blank">{{ fiddle.name }}</a>
  <p class="plugin-desc">{{ fiddle.description }}</p>
  <div class="plugin-tag-list">
    {% for tag in fiddle.tags %}
      <a href="#{{ tag }}" class="plugin-tag">{{ tag }}</a>
    {% endfor %}
  </div>
</li>