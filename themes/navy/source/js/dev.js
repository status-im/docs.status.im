$(document).ready(function($) {

  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    $msnry;

  mobileMenu(w);
  mobileFooterMenu(w);

  $(window).on('resize', function(event) {
    w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    mobileMenu(w);
    mobileFooterMenu(w);

    if($('.using-snt').length){
      if(w > 767){
        if($msnry == null){
          $msnry = $('.items').masonry({
            itemSelector: '.item'
          });
          $msnry.masonry('layout');
        }
      }else{
        if($msnry != null){
          $msnry.masonry('destroy');
          $msnry = null;
        }
      }
    }

  });

  $('.language-selector-trigger').on('click', function (event) {
    event.preventDefault();
    $('.language-selector').toggleClass('active');
  });

  $('.using-snt').imagesLoaded( function() {
    if(w > 767){
      $msnry = $('.items').masonry({
        itemSelector: '.item'
      });
      $msnry.masonry('layout');
    }
  });

  $('.about-mission .inner .inline-links a, .snt-intro .inline-links a, .snt-basics a[href="#using-snt"], .snt-basics a[href="#research"]').on('click', function() {
    var id = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(id).offset().top + 5
    }, 500);
    return false;
  });

  function mobileMenu(w) {
    if (w < 1199) {
      $('header nav, header .btns').appendTo('.mobile-nav');
    } else {
      $('.mobile-nav nav, .mobile-nav .btns').insertBefore('.mobile-nav-trigger');
    }
  }

  function mobileFooterMenu(w) {
    if (w < 768) {
      $('footer .navigation h5 a').attr('aria-expanded', 'false').addClass('collapsed');
      $('footer .collapse').removeClass('show');
    } else {
      $('footer .navigation h5 a').attr('aria-expanded', 'true').removeClass('collapsed');
      $('footer .collapse').addClass('show');
    }
  }

  $('.mobile-nav-trigger-close, .mobile-nav-trigger, .backdrop').on('click', function(event) {
    event.preventDefault();
    $('body').toggleClass('nav-active');
  });

  $('.community-nav-trigger-close, .community-nav-trigger, .backdrop-community-nav').on('click', function(event) {
    event.preventDefault();
    $('body').toggleClass('community-nav-active');
  });

  try {
    highlight();
  } catch (err) {
    setTimeout(function() {
      highlight();
    }, 2500);
  }

  function highlight() {
    $('.editor-content pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  }

  if ($('.recently-updated').length) {

    var html = '';

    if (typeof Cookies.get('recently-updated') !== 'undefined') {
      $('.recently-updated').append(Cookies.get('recently-updated'));
    } else {
      fetch('https://api.github.com/users/status-im/repos?sort=updated&per_page=3')
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: '
              + response.status);
              return;
            }

            response.json().then(function(data) {

              data.forEach(function(element) {
                html += '<li><a href="' + element.html_url + '">' + element.full_name + '</a></li>';
              });

              Cookies.set('recently-updated', html, { expires: 1 });
              $('.recently-updated').append(html);

            });

          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    }

  }

  if ($('#advocacy-programs').length) {
    function retrieveAdvocacyPrograms() {
      $.ajax({
        type: 'get',
        url: 'https://statusphere.status.im/api/v1/boards/public/?is_featured=true&org=375',
        success: function(response) {
          $.each(response, function(index, program) {
            var description = program.description.substr(0, 200) + '...';
            $('#advocacy-programs').prepend('<div class="inner"> \
                <a href="https://statusphere.status.im/b/'+ program.uuid+'/view" class="card-inner"> \
                  '+program.title+'\
                </a> \
                <p class="details">'+description+'</p> \
              </div>');
          });
        }
      });
    }

    retrieveAdvocacyPrograms();

  }

  $('.sidebar').stick_in_parent({
    offset_top: 30
  });

  if ($('input[name="userSearch"]').length) {
    window.addEventListener('click', function(e) {
      if (document.getElementById('search-form').contains(e.target)) {
        $('#search-form').removeClass('inactive');
      } else {
        $('#search-form').addClass('inactive');
      }
    });
    $('input[name="userSearch"]').on('keyup', function() {
      var val = $(this).val();
      $('#search-results').empty();
      $.ajax({
        url: 'https://search.status.im/status.im/_search?size=10&_source=title,url&&q=' + val
      })
        .done(function(results) {
          $.each(results.hits.hits, function(index, value) {
            $('<a href="' + value._source.url + '">' + value._source.title + '</a>').appendTo('#search-results');
          });
        });
    });
  }

  $('.features-intro ul li a').on('click', function(event) {
    event.preventDefault();
    var id = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 300);
  });

  if ($('.home-intro .announcement').length) {
    var ghostContentKey = '10e7f8c1f793d2945ea1177076';
    $.ajax({
      url: 'https://our.status.im/ghost/api/v2/content/posts/?key='+ ghostContentKey +'&limit=1&fields=title,url'
    })
    .done(function(results) {
      $('.home-intro .announcement b').text(results.posts[0].title);
      $('.home-intro .announcement').attr('href', results.posts[0].url).removeClass('inactive');
    })
    .fail(function() {
      $.ajax({
        url: 'https://our.status.im/ghost/api/v0.1/posts/?include=tags&formats=plaintext&client_id=ghost-frontend&client_secret=2b055fcd57ba&limit=1'
      })
      .done(function(results) {
        $('.home-intro .announcement b').text(results.posts[0].title);
        $('.home-intro .announcement').attr('href', 'https://our.status.im' + results.posts[0].url).removeClass('inactive');
      });
    })
  }

  $('.sidebar-mobile-trigger, .mobile-sidebar-trigger-close').on('click', function(event) {
    event.preventDefault();
    $('body').toggleClass('sidebar-active');
  });

  if ($('.quick-nav').length) {
    var quickNavOffset = $('.quick-nav').offset().top;
    $(window).on('resize', function () {
      quickNavOffset = $('.quick-nav').offset().top;
    });
    $(window).on('scroll', function () {
      var y = $(window).scrollTop();
      if (y > quickNavOffset) {
        $('.quick-nav, .quick-nav-sub').addClass('fixed');
      } else {
        $('.quick-nav, .quick-nav-sub').removeClass('fixed');
      }
    });
    $('.quick-nav-sub ul li a').on('click', function(event) {
      event.preventDefault();
      var id = $(this).attr('href');
      $('html, body').animate({
        scrollTop: $(id).offset().top - 100
      }, 300);
    });
  }

  if ($('.open-issues').length) {

    var htmlReact = '';

    if (typeof Cookies.get('open-issues-react') !== 'undefined') {
      $('.open-issues-react').append(localStorage.getItem('open-issues-react'));
    } else {
      fetch('https://api.github.com/repos/status-im/status-react/issues?sort=created&per_page=30')
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' + response.status);
              return;
            }

            response.json().then(function(data) {

              var i = 0;

              data.forEach(function(element) {
                if (typeof element.pull_request === 'undefined') {
                  if(i < 4){
                    var current= new Date();
                    var labelsHtml = '<div class="tags">';
                    var labels = element.labels;
                    labels.forEach(function(label){
                      labelsHtml += '<div class="tag">'+ label.name +'</div>'
                    });
                    labelsHtml += '</div>';
                    htmlReact += '<li> \
                        <div class="number">#'+ element.number +'</div> \
                        <div class="details"> \
                          <b><a href="'+ element.html_url +'" target="_blank">' + element.title + '</a></b> \
                            '+ labelsHtml +' \
                          <div class="opened"> \
                            Opened: <time>'+ timeDifference(current, new Date(element.created_at)) +'</time> \
                          </div> \
                          <div class="activity"> \
                            Last activity: <time>'+ timeDifference(current, new Date(element.updated_at)) +'</time> \
                          </div> \
                        </div> \
                      </li>';
                    i++;
                  }
                }
              });

              localStorage.removeItem('open-issues-react');
              localStorage.setItem('open-issues-react', htmlReact);
              Cookies.set('open-issues-react', true, { expires: 1 });
              $('.open-issues-react').append(htmlReact);

            });

          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    }

    var htmlGo = '';

    if (typeof Cookies.get('open-issues-go') !== 'undefined') {
      $('.open-issues-go').append(localStorage.getItem('open-issues-go'));
    } else {
      fetch('https://api.github.com/repos/status-im/status-go/issues?sort=created&per_page=30')
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: '
                + response.status);
              return;
            }

            response.json().then(function(data) {

              var i = 0;

              data.forEach(function(element) {
                if (typeof element.pull_request === 'undefined') {
                  if(i < 4){
                    var current= new Date();
                    var labelsHtml = '<div class="tags">';
                    var labels = element.labels;
                    labels.forEach(function(label){
                      labelsHtml += '<div class="tag">'+ label.name +'</div>'
                    });
                    labelsHtml += '</div>';
                    htmlGo += '<li> \
                        <div class="number">#'+ element.number +'</div> \
                        <div class="details"> \
                          <b><a href="'+ element.html_url +'" target="_blank">' + element.title + '</a></b> \
                            '+ labelsHtml +' \
                          <div class="opened"> \
                            Opened: <time>'+ timeDifference(current, new Date(element.created_at)) +'</time> \
                          </div> \
                          <div class="activity"> \
                            Last activity: <time>'+ timeDifference(current, new Date(element.updated_at)) +'</time> \
                          </div> \
                        </div> \
                      </li>';
                    i++;
                  }
                }
              });

              localStorage.removeItem('open-issues-go');
              localStorage.setItem('open-issues-go', htmlGo);
              Cookies.set('open-issues-go', true, { expires: 1 });
              $('.open-issues-go').append(htmlGo);

            });

          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    }

  }

  $('.contributor .contributor-trigger').on('click', function (event) {
    event.preventDefault();
  });

  if($('.right-sub-navigation').length){
    $('.editor-content h1, .editor-content h2, .editor-content h3').each(function (index, element) {
      var id = $(this).attr('id');
      var title = $(this).text();
      $('.right-sub-navigation ul').append('<li class="li-'+ $(this)[0].nodeName.toLowerCase() +'"><a href="#'+ id +'">' + title + '</a></li>');
    });
    $('.right-sub-navigation').stick_in_parent({
      offset_top: 30
    });
    $('.right-sub-navigation a').on('click', function() {
      var id = $(this).attr('href');
      $('html, body').animate({
        scrollTop: $(id).offset().top - 50
      }, 500);
      return false;
    });
  }

  function timeDifference(current, previous) {
    
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    
    var elapsed = current - previous;
    
    if (elapsed < msPerMinute) {
      return Math.round(elapsed/1000) + ' seconds ago';   
    }
    
    else if (elapsed < msPerHour) {
      return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }
    
    else if (elapsed < msPerDay ) {
      return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
      return Math.round(elapsed/msPerDay) + ' days ago';   
    }
    
    else if (elapsed < msPerYear) {
      return Math.round(elapsed/msPerMonth) + ' months ago';   
    }
    
    else {
      return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

});
