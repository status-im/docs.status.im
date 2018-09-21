<!-- Scripts -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="/js/bundle.js?v=0.0.1"></script>
<!-- build:js build/js/main.js -->
{{ js('js/lang_select') }}
{{ js('js/toc') }}
{{ js('js/mobile_nav') }}
{{ js('js/search') }}
<!-- endbuild -->
{% if page.layout === 'plugins' %}
<!-- Plugin search -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lunr.js/2.1.2/lunr.min.js"></script>
<!-- Lazy load -->
<script async src="https://cdn.jsdelivr.net/lazysizes/3.0.0/lazysizes.min.js"></script>
<!-- build:js build/js/plugins.js -->
{{ js('js/plugins') }}
<!-- endbuild -->
{% endif %}
<script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js"></script>
<script async src="/js/highlight.pack.js"></script>
<script async src="/js/solidity.js"></script>
<script>

function highlight() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
}

$(document).ready(function() {
  try {
    highlight();
  } catch(err) {
    console.log("retrying...")
    setTimeout(function() {
      highlight();
    }, 2500)
  }

  var clipboard = new ClipboardJS(".btn");
  clipboard.on('success', function(e) {
    var id = $(e.trigger).attr("data-clipboard-target");
    $(id).toggleClass("flash");
    setTimeout(function() {
      $(id).toggleClass("flash");
    }, 200);
    e.clearSelection();
  })
});

</script>
<style>
  mark {
    background: #232323;
    color: white;
    font-weight: bold;

    -webkit-transition: background 0.1s ease-in-out;
    -ms-transition:     background 0.1s ease-in-out;
    transition:         background 0.1s ease-in-out;
  }

  .clippy {
    margin-top: -3px;
    position: relative;
    top: 3px;
  }

  pre {
    position: relative;
  }

  .btn {
    transition: opacity .3s ease-in-out;
    padding: 2px 6px;
    position: absolute;
    display: inline-block;
    font-size: 13px;
    font-weight: 700;
    line-height: 20px;
    color: #333;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    background-color: #eee;
    background-image: linear-gradient(#fcfcfc,#eee);
    border: 1px solid #d5d5d5;
    border-radius: 3px;
    user-select: none;
    -webkit-appearance: none;
    top: 34px;
    right: 12px;
  }

  .flash {
    background-color: grey;
  }

</style>
<!-- Algolia -->
{% if config.algolia[page.lang] %}
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"></script>
<script type="text/javascript">
    document.getElementById('search-input-wrap').classList.add('on');
    docsearch({
        apiKey: '{{ config.algolia[page.lang].apiKey }}',
        indexName: '{{ config.algolia[page.lang].indexName }}',
        inputSelector: '#search-input'
    });
</script>
{% endif %}
