<div class="page-intro wrapper">
  <header class="article-header">
    <h1 class="article-title" itemprop="name">{{ page.title }}</h1>
    <a href="{{ raw_link(page.source) }}" class="article-edit-link" title="{{ __('page.improve') }}">Edit on Github</a>
  </header>
</div>
<div id="content-wrap">
  <div id="content" class="wrapper">
    <div id="content-inner">
      <ul id="plugin-list">
        {% for fiddle in site.data[page.data] %}
          {{ partial('partial/' + page.partial, {fiddle: fiddle}) }}
        {% endfor %}
      </ul>
    </div>
  </div>
</div>