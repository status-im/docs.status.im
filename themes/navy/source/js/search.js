(function() {
  'use strict';

  var searchWrap = document.getElementById('search-input-wrap');
  var searchInput = document.getElementById('search-input');
  var className = 'active';

  searchWrap.onclick = function(e) {
    searchWrap.classList.add(className);
    searchInput.focus();
  };

  searchInput.onblur = function(e) {
    searchWrap.classList.remove(className);
  };
}());
