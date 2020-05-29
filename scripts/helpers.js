/* global hexo */

'use strict';

var join = require('path').join;
var _ = require('lodash');
var cheerio = require('cheerio');
var lunr = require('lunr');
require('es6-promise').polyfill();
require('isomorphic-fetch');

var localizedPath = ['docs', 'api'];

function startsWith(str, start) {
  return str.substring(0, start.length) === start;
}

/* helper for pointing status channel link at relevant channel based on path */
hexo.extend.helper.register('join_status_chat', function() {
  var channel = 'status';
  /* not pretty but does the job */
  if (this.path.includes('keycard')) { 
    channel = 'status-keycard';
  }
  if (this.path.includes('nimbus')) { 
    channel = 'status-nimbus';
  }
  var url = `https://join.status.im/chat/public/${channel}`;
  return `<a href="${url}" class="button">Join Status Chat</a>`;
});

hexo.extend.helper.register('employees', function(type) {
  var employees = this.site.data.employees,
    result = '';
  _.each(employees['employees'], function(employee, index) {
    result += '<li class="contributor col-md-1"> \
      <a href="#" class="contributor-trigger"><img src="'+ employee['photoUrl'] +'"></a> \
      <div class="contributor-info">\
        <img src="'+ employee['photoUrl'] +'"> \
        <b>'+ employee['displayName'] +'</b> \
        <span>'+ employee['jobTitle'] +'</span> \
        <ul>\
          <li><a href="https://join.status.im/user/'+ employee['customStatusPublicKey'] +'" target="_blank"><img src="/img/icon-status-purple.svg"></a></li> \
          <li><a href="https://github.com/'+ employee['customGitHubusername'] +'" target="_blank"><img src="/img/icon-github-purple.svg"></a></li> \
        </ul>\
      </div>\
    </li>'
  });
  return result;
});

hexo.extend.helper.register('contributors', function(type) {
  var employees = this.site.data.employees,
    contributors = this.site.data.contributors,
    result = '';

  _.each(contributors['result'], function(contributor, index) {
    result += '<li class="contributor col-md-1"> \
      <a href="#" class="contributor-trigger"><img src="'+ contributor['avatar_url'] +'"></a> \
      <div class="contributor-info">\
        <img src="'+ contributor['avatar_url'] +'"> \
        <b>'+ contributor['login'] +'</b> \
        <span></span> \
        <ul>\
          <li><a href="'+ contributor['url'] +'"><img src="/img/icon-github-purple.svg"></a></li> \
        </ul>\
      </div>\
    </li>'
  });

  return result;
});

hexo.extend.helper.register('sidebar', function(path) {
  return `
    <ul class="sidebar-menu">
      ${genSidebarList.call(this, "", this.site.data.sidebar[path])}
    </ul>
  `
});

function genSidebarList(parent, entries) {
  /* necessary due to changed context of map() */
  let self = this
  /* all languages except english needs a path prefix */
  let lang = (self.page.lang != 'en' && parent == "") ?  self.page.lang : ''
  return entries.map(entry => {
    /* normally path needs to be prefixed with lang and parent path */
    let fullPath = join('/', lang, parent, entry.path)
    /* sometimes paths are full URLs instead of sub-paths */
    if (entry.path.startsWith('http')) { fullPath = entry.path }
    /* path is active when it's the one we are on currently */
    let isActive = ('/'+self.path).startsWith(fullPath)
    return `
      <li class="${isActive ? "active" : ""}">
        <a href="${fullPath}">${entry.title}</a>
        ${(entry.children != undefined) ? `
        <ul class="sidebar-submenu">
          ${genSidebarList.call(self, fullPath, entry.children)}
        </ul>
        ` : ''}
      </li>`
  }).join('\n')
}

hexo.extend.helper.register('header_menu', function(className) {
  var menu = this.site.data.menu;
  var result = '';
  var self = this;
  var lang = this.page.lang;
  var isEnglish = lang === 'en';

  _.each(menu, function(path, title) {
    if (!isEnglish && ~localizedPath.indexOf(title)) {
      path = lang + path;
    }

    result += `<a href="${self.url_for(path)}" class="${className}'-link">${this.__('menu.' + title)}</a>`;
  });

  return result;
});

hexo.extend.helper.register('page_nav', function(lang) {
  return;
});

hexo.extend.helper.register('url_for_lang', function(path) {
  var lang = this.page.lang;
  var url = this.url_for(path);

  if (lang !== 'en' && url[0] === '/') url = '/' + lang + url;

  return url;
});

hexo.extend.helper.register('raw_link', function(path) {
  return 'https://github.com/status-im/docs.status.im/edit/develop/source/' + path;
});

hexo.extend.helper.register('page_anchor', function(str) {
  var $ = cheerio.load(str, {decodeEntities: false});
  var headings = $('h1, h2, h3, h4, h5, h6');

  if (!headings.length) return str;

  headings.each(function() {
    var id = $(this).attr('id');

    $(this)
      .addClass('article-heading')
      .append('<a class="article-anchor" href="#' + id + '" aria-hidden="true"></a>');
  });

  return $.html();
});

hexo.extend.helper.register('lunr_index', function(data) {
  var index = lunr(function() {
    this.field('name', {boost: 10});
    this.field('tags', {boost: 50});
    this.field('description');
    this.ref('id');

    _.sortBy(data, 'name').forEach((item, i) => {
      this.add(_.assign({ id: i }, item));
    });
  });

  return JSON.stringify(index);
});

hexo.extend.helper.register('canonical_path_for_nav', function() {
  var path = this.page.canonical_path;

  if (startsWith(path, 'docs/') || startsWith(path, 'api/')) {
    return path;
  }
  return '';

});

hexo.extend.helper.register('lang_name', function(lang) {
  var data = this.site.data.languages[lang];
  return data.name || data;
});

hexo.extend.helper.register('disqus_lang', function() {
  var lang = this.page.lang;
  var data = this.site.data.languages[lang];

  return data.disqus_lang || lang;
});

hexo.extend.helper.register('hexo_version', function() {
  return this.env.version;
});

function generateMenu(){
  return fetch('https://raw.githubusercontent.com/status-im/status-global-elements/master/dist/html/header.html')
  .then(function(response) {
      return response.text();
    })
  .then(function(response) {
      return 'abc';
  })
  .catch(error => console.error(`Fetch Error =\n`, error));
}

hexo.extend.helper.register('global_header', function() {
  generateMenu().then(function(response){
    console.log(response);
    return response;
  });
  return 'asd';
});

/* DigitalOcean Spaces links don't use the CDN by default */
hexo.extend.helper.register('get_build_url', function(type, platform) {
  const buildType = this.site.data[type];
  if (buildType == undefined) {
    throw `Unable to find data for build type: ${type}`
  }
  const buildUrl = buildType[platform];
  if (buildUrl == undefined) {
    throw `Unable to find build for platform: ${platform}`
  }
  /* modify the URL to use the DigitalOcean CDN */
  const url = buildUrl.replace(/(cdn.)?digitaloceanspaces/, 'cdn.digitaloceanspaces')
  return url;
});

hexo.extend.helper.register('show_lang', function(lang) {
  if(this.page.lang != 'en'){
    return '/' + this.page.lang;
  }
});

hexo.extend.helper.register('language_selector', function() {

  var languages = this.site.data.languages,
      shortLang = this.page.lang,
      list = '',
      self = this,
      languageSelector = '';

  if(Object.keys(languages).length > 1){
    
    _.each(languages, function(l, i) {
  
      var path = self.page.path,
          active = '';
  
      if(i == shortLang){
        shortLang = l.short;
        active = 'active';
      }
  
      path = path.replace("index.html", "");
  
      if(path.substr(0, path.indexOf('/')) == shortLang){
        const pathSplitByShortLang = path.split(shortLang + '/')
        if (pathSplitByShortLang.length >= 3) {
          path = path.split('/')[1];
        }
        else {
          path = path.split(shortLang + '/')[1];
        }
      }
  
      if(i != 'en'){
        path = i + '/' + path;
      }
  
      list += '<li class="'+ active +'"><a href="/'+ path +'">'+ l.long + '</a></li>';
  
    });
  
    languageSelector = `
      <div class="language-selector">
        <a href="#" class="responsive-font responsive-lang language-selector-trigger btn btn-arrow">${shortLang}</a>
        <ul>
          ${list}
        </ul>
      </div>
    `;
  
  }
  
  return languageSelector;

});
