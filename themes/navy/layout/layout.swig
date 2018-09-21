<!DOCTYPE html>
<html lang="{{ page.lang }}">
{{ partial('partial/head') }}
<body>
  <div id="container">
    {% if page.source != 'index.md' %}
      {{ partial('partial/header') }}
    {% endif %}
    {{ body }}
    {{ partial('partial/footer') }}
  </div>
  <div id="mobile-nav-dimmer"></div>
  {{ partial('partial/mobile_nav') }}
  {{ partial('partial/after_footer') }}
</body>
</html>
