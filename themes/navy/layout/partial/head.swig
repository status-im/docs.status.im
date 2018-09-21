<head prefix="og: http://ogp.me/ns#">
  <meta charset="utf-8">
  <title>{% if page.title %}{{ page.title }} | {% endif %}{{ config.title }}</title>
  <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Canonical links -->
  <link rel="canonical" href="{{ url }}">
  <!-- Alternative links -->
  {% if page.layout == 'page' or page.layout == 'index' %}
    {% for lang in site.data.languages %}
      <link rel="alternative" hreflang="{{ loop.key }}" href="{{ canonical_url(loop.key) }}">
    {% endfor %}
  {% endif %}
  <!-- Icon -->
  <meta name="msapplication-TileColor" content="#2f83cd">
  <meta name="msapplication-TileImage" content="{{ url_for('icon/mstile-144x144.png') }}">

  <link rel="icon" type="image/png" href="/img/logo-16.png?v=0.0.5" sizes="16x16" />
  <link rel="icon" type="image/png" href="/img/logo-32.png?v=0.0.5" sizes="32x32" />

  <link rel="apple-touch-icon" sizes="76x76" href="/img/apple-touch-icon-76.png?v=0.0.5">
  <link rel="apple-touch-icon" sizes="120x120" href="/img/apple-touch-icon-120.png?v=0.0.5">
  <link rel="apple-touch-icon" sizes="152x152" href="/img/apple-touch-icon-152.png?v=0.0.5">
  <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon-180.png?v=0.0.5">
  <link rel="apple-touch-icon" href="/img/apple-touch-icon-1024.png?v=0.0.5">
  <!-- CSS -->
  <!-- build:css build/css/navy.css -->
  {{ css('css/navy') }}
  <!-- endbuild -->
  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet" type="text/css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css" />
  <!-- RSS -->
  {{ feed_tag('atom.xml') }}
  <meta property="og:image" content="/img/share.png?v=0.0.5" />
  <!-- Google Analytics -->
  {{ partial('google_analytics') }}
  <link rel="stylesheet" href="/js/styles/railscasts.css" />
</head>
