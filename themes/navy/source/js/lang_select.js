(function() {
  'use strict';

  function changeLang() {
    var lang = this.value;
    var canonical = this.dataset.canonical;
    if (lang === 'en') lang = '';
    if (lang) lang += '/';

    location.href = '/' + lang + canonical;
  }

  var langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.addEventListener('change', changeLang);
  }
  var langSelectMobile = document.getElementById('mobile-lang-select');
  if (langSelectMobile) {
    langSelectMobile.addEventListener('change', changeLang);
  }
}());
