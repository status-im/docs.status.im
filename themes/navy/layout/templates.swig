<div id="content-wrap">
  <div class="wrapper">
    <div class="inner">
      <header id="plugin-list-header">
        <h1 id="plugin-list-title">{{ page.title }}</h1>
      </header>
      <ul id="plugin-list">
        {% for template in _.sortBy(site.data[page.data], 'name') %}
          {{ partial('partial/' + page.partial, {template: template}) }}
        {% endfor %}
      </ul>
    </div>
  </div>
</div>
