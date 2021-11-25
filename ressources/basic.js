    define(["jquery"], function ($) {

	var app = app || {};

    app.section__current = "section#home";
    app.section__previous = "section#home";


    app.getVideosFromPlaylist = function(playlist_id) {

        var api_key = 'AIzaSyBoATdXlPc2xMaUOHZKQlhkeX-GUFQcdDE';
        // var playlist_id =  'PLrQ0NMmFa4RZUjmGt5NMfJY7KVUXUSsB7'; 
        var api_url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=40&playlistId='+ playlist_id + '&key=' + api_key;

        //retrieve json
        jQuery.getJSON(api_url, function(data) {

            jQuery.each(data.items, function(i, item) {

                // console.log(item);

                $(app.section__current+' .posts__list').append('<article><a href="https://www.youtube.com/watch?v='+item.snippet.resourceId.videoId+'" title="'+item.snippet.title+'" data-id="'+item.snippet.resourceId.videoId+'" class="play__video"><figure><img class="lazyload" data-src="'+item.snippet.thumbnails.high.url+'" alt=""></figure><div class="post__content"><h2 class="">'+item.snippet.title+'</h2></div></a></article>');

            });

            app.refreshWindowSize();
                        
        }); 

    };

    app.home_anim = function(myDelay) {

        TweenMax.from('#home img.logo', 0.4, 
            { opacity:0, y: 300, rotation:15, transformOrigin:"left top", ease: Power2.easeOut, delay: (1+myDelay),
                onComplete: function() { 
                TweenMax.set('#home img.logo',{clearProps:"all"});
            }}
        );
        TweenMax.from('#home h1', 0.4, 
            { opacity:0, y: 300, rotation:15, transformOrigin:"left top", ease: Power2.easeOut, delay: (1.1+myDelay),
                onComplete: function() { 
                TweenMax.set('#home h1',{clearProps:"all"});
            }}
        );
       /* TweenMax.from('.main-nav-list li:nth-child(1) a', 0.4, 
            { opacity:0, x: 300, rotation:15, transformOrigin:"left top", ease: Power2.easeOut, delay: (1.5+myDelay),
                onComplete: function() { 
                TweenMax.set('.main-nav-list li:nth-child(1) a',{clearProps:"all"});
            }}
        );                
        TweenMax.from('.main-nav-list li:nth-child(2) a', 0.4, 
            { opacity:0, x: 300, rotation:-15, transformOrigin:"left top", ease: Power2.easeOut, delay: (1.5+myDelay),
                onComplete: function() { 
                TweenMax.set('.main-nav-list li:nth-child(2) a',{clearProps:"all"});
            }}
        );                
        TweenMax.from('.main-nav-list li:nth-child(3) a', 0.4, 
            { opacity:0, x: -300, rotation:15, transformOrigin:"left top", ease: Power2.easeOut, delay: (1.5+myDelay),
                onComplete: function() { 
                TweenMax.set('.main-nav-list li:nth-child(3) a',{clearProps:"all"});
            }}
        );                                        
        TweenMax.from('.main-nav-list li:nth-child(4) a', 0.4, 
            { opacity:0, x: 300, rotation:-15, transformOrigin:"left top", ease: Power2.easeOut, delay: (1.5+myDelay),
                onComplete: function() { 
                TweenMax.set('.main-nav-list li:nth-child(4) a',{clearProps:"all"});
            }}
        ); */
    };

    app.intro = function() {
        $('body').addClass('font-loaded');
        $('header').addClass('open');

        //-> Sur mobile, on va attendre que le background de home soit chargé pour enlever l'image de background flou d'attente :
        if( ($(window).width()<1000) && ($('body').hasClass('page-template-onepage')) ) {

            var image = document.createElement('img');
            var backgroundURL = $('#home .background').css('background-image').replace(/^url\(['"]?(.+?)['"]?\)/,'$1')
            if( (backgroundURL!='none') && (backgroundURL!='') ) {
                image.src = backgroundURL;
                image.onload = function () {
                    $(this).remove();
                    $('body').removeClass('loading');
                    // app.home_anim(0);
                };
            } else {
                image.remove();
                $('body').removeClass('loading');
                // app.home_anim(0);
            }


        } else {

            $('body').removeClass('loading');
            app.home_anim(0);

        }

        $('html, body').scrollTop(0);
    }; 

    app.init = function() {
        
        app.refreshWindowSize();

        $('body.loading-page').addClass('loading-page-close');

        app.intro();

        //-> Lancement des Vidéos
        $(document).on("click", "a.play__video", function(e) {
            e.preventDefault();

                $('html').css('overflow','hidden');
                $('html').css('margin-right','15px'); 
                $('.overlay').addClass('open');
                $('.overlay .video__wrapper').html('<iframe id="" frameborder="0" allowfullscreen="1" allow="autoplay; encrypted-media" title="YouTube video player" width="100%" height="100%" src="https://www.youtube.com/embed/'+$(this).data('id')+'?autoplay=1&rel=0"></iframe>  ');

        });          


        /**
         * Gestion du clavier :
         */
        $(document).on( "keydown", function( event ) {
            var keyCode = event.which || event.keyCode;
            // Key "esc" = close
            if(keyCode === 27) {
                $('.overlay-close').click();
            }
        });

        $(document).on("click", ".overlay-close", function(e) {
            e.preventDefault();

            $('.popup').remove();
            // $('.overlay').remove();
            // $('.overlay').addClass('close');
            $('.overlay').removeClass('open');
            $('.overlay .video__wrapper').empty();

            // $('.overlay.close').bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(e) { 
                // $(this).remove(); 
            // });

            $('html').css('overflow','visible');
            $('html').css('margin-right','0');  
            // history.pushState(null,null,globalObject.url);
        })        

        $(document).on("click", "a.share", function(e) {
            e.preventDefault();

            var url = $(this).attr('href');

            var width = 570,
                height = 700,
                left = (screen.width / 2) - (width / 2),
                top = (screen.height / 2) - (height / 2);
                    
            var w = window.open(url,
                                'Share',
                                'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
                               );

        });

        $(document).on("click", "a.more_post", function(e) {
            e.preventDefault();
            app.more_post($(this).data('posttype'));
        });  

        $(document).on("click", ".menu-button", function(e) {
            e.preventDefault();
            if( $('body').hasClass('menu-open') ) {
                $('body').removeClass('menu-open');
            } else {
                $('body').addClass('menu-open');    
            }            
        });


        $(document).on("click", "a.nav", function(e) {

          console.log('nav click');

            // if ( ($(this).attr('target') != '_blank') && ($('header nav ul li').hasClass('menu-buttons')) ) {

            e.preventDefault();

            if(!$('body').hasClass('nav-disabled')) {
                
                $('body').addClass('nav-disabled');

                // $('body').removeClass('menu-open');

                // $(document).off("scroll");

                
                $('#main-nav li.menu-buttons').removeClass("active");
                $(this).parent().addClass('active');

                var target = this.hash,
                // menu = target;
                $target = $(target);

                var currLink = $(this).attr("href");

                app.section__previous = app.section__current;
                app.section__current = 'section' + $(this).attr("href");
                // console.log('app.section__current',app.section__current);

                $(app.section__current).addClass('section__current');

                //-> Si on vient de charger une page Artiste, on va chercher les videos
                if( (($(app.section__current).hasClass('artiste-videos')) && ($(app.section__current).data('playlistid')!='')) || (app.section__current=='section#videos') ) {

                    // console.log('length',$(app.section__current+' .posts__list').children().length);

                    if ( $(app.section__current+' .posts__list').children().length == 0 ) {
                        
                        // console.log('> On va chercher les videos de youtube',$(app.section__current).data('playlistid'));

                        app.getVideosFromPlaylist($(app.section__current).data('playlistid'));                                 
                    }

                }

                var position = null;

                if(app.section__previous==='section#home') {
                $("section:not(#home)").each(function() {
                  $(this).data('position',$(this).data('start'));
                });
                }

                if(app.section__current==='section#home') {
                    position = $(app.section__previous).data('phome');
                } else {
                    position = $('section'+currLink).data('position');
                }

                
                // console.log('position',position);
                var x__current__to = 0;
                var x__next__from = 0;
                var y__current__to = 0;
                var y__next__from = 0;
                var position__previous = '';
                // var position__current = '';

                var transition__top = 0;
                var transition__left = 0;
                var transition__top__end = 0;
                var transition__left__end = 0;
                var transition__width__start = '100%';
                var transition__width__end = '100%';
                var transition__height__start = '100%';
                var transition__height__end = '100%';

                if(position==='right') {
                    
                    transition__top = '0';
                    transition__left = '100%';
                    transition__top__end = '0';
                    transition__left__end = '0';
                    // transition__width__start = '100%';
                    // transition__width__end = '100%';
                    // transition__height__start = '100%';
                    // transition__height__end = '100%';

                    x__current__to = -$(window).width();
                    x__next__from = $(window).width();
                    position__previous = 'left';

                } else if(position==='top') {

                    transition__top = '-100%';
                    transition__left = '0';
                    transition__top__end = '0';
                    transition__left__end = '0';

                    y__current__to = $(window).height();
                    y__next__from = -$(window).height();
                    position__previous = 'bottom';

                } else if(position==='left') {

                    transition__top = '0';
                    transition__left = '-100%';
                    transition__top__end = '0';
                    transition__left__end = '0';

                    x__current__to = $(window).width();
                    x__next__from = -$(window).width();
                    position__previous = 'right';

                } else if(position==='bottom') {

                    transition__top = '100%';
                    transition__left = '0';
                    transition__top__end = '0';
                    transition__left__end = '0';

                    y__current__to = -$(window).height();
                    y__next__from = $(window).height();
                    position__previous = 'top';
                }

                // $('body').css('overflow','hidden');


                // TweenMax.to('.transition__anim', 0.6, 
                //     { opacity:1, x:x__current__to, y:y__current__to, ease: Power2.easeOut, delay: 0.1,
                //     onComplete: function() { 
                //         TweenMax.set($(app.section__previous),{clearProps:"all"});
                //         $(app.section__previous).removeClass('section__current');
                //         $(app.section__previous).data('position',position__previous);
                //     }  },
                // ); 

                /*
                $('.transition__anim').css('z-index', parseInt($('.transition__anim').css('z-index'))+2 );

                TweenMax.fromTo('.transition__anim', 0.6, 
                    {css: {left: transition__left, top: transition__top, width:transition__width__start, height:transition__height__start}}, 
                    {css: {left: transition__left__end, top: transition__top__end, width:transition__width__end, height:transition__height__end}, ease: Power2.easeIn, delay: 0.1,
                    onComplete: function() { 
                        $(app.section__current).css('z-index', parseInt($('.transition__anim').css('z-index'))+1);
                        // TweenMax.set($(app.section__previous),{clearProps:"all"});
                        $(app.section__previous).removeClass('section__current');
                        $(app.section__previous).data('position',position__previous);
                    }},
                );
                */
                // if(app.section__previous=='section#home')
                //     $('footer').hide();

                TweenMax.to(app.section__previous, 0.8, 
                    { opacity:1, x:x__current__to, y:y__current__to, ease: Power2.easeOut, delay: 0.1,
                    onComplete: function() { 
                        TweenMax.set($(app.section__previous),{clearProps:"all"});
                        $(app.section__previous+' .section__container').scrollTop(0);
                        $(app.section__previous).removeClass('section__current');
                        $(app.section__previous).data('position',position__previous);
                    }},
                );   



                if(app.section__current=='section#home') {
                    // app.home_anim(0);
                } else {
                    // $(app.section__current+" .anim").css('opacity',0);    
                }

                app.refreshWindowSize();

                TweenMax.from(app.section__current, 0.8, 
                    { opacity:1, x:x__next__from, y:y__next__from, ease: Power2.easeOut, delay: 0.1,
                    onComplete: function() { 
                        // $('body').css('overflow','auto');
                        history.pushState(null, null, currLink);
                        $('body').removeClass('nav-disabled');

                        // console.log('section__current',app.section__current);

                        if(app.section__current=='section#home') {
                            // $('footer').show();

                        } else {
                            /*
                            var delay = 0;
                            $(app.section__current+" .anim" ).each(function() {

                                TweenMax.fromTo($(this), 0.4, 
                                    { opacity:0, y: 300, rotation:15, transformOrigin:"left top"}, 
                                    { opacity:1, y: 0, rotation:0, ease: Power2.easeOut, delay: delay, repeat:0,
                                    onComplete: function() { 
                                      TweenMax.set($(app.section__current+" .anim"),{clearProps:"all"});
                                    }                
                                });   

                                delay+=0.1;                     

                            });*/
                        }

                    }  },

                );                                 

                // TweenLite.to(window, 1.2, {scrollTo:{y:target, autoKill:false}, ease:Power2.easeInOut,
                //     onComplete: function() { 
                //         window.location.hash = target;
                //         $(document).on("scroll", onScroll);
                //     }
                // });

                // console.log('TOP = '+$target.offset().top);
/*
               $('html, body').stop().animate({
                    'scrollTop': $target.offset().top
                    // 'scrollTop': $target.offset().top+2
                }, 600, 'swing', function () {
                    window.location.hash = target;
                    // console.log('TOP 2 = '+$target.offset().top);
                    $(document).on("scroll", onScroll);

                });
*/
            // }
       
            }

        });


        var $_anchor = window.location.hash;
        // console.log($_anchor);
        if($_anchor!='#home') {
        setTimeout(function(){
            // $("li.menu-buttons a[href='"+$_anchor+"']").click();
            $("a.nav:not(.previous,.back)[href='"+$_anchor+"']").click();
        }, 2000);        
        }

    };

    app.refreshWindowSize = function() { 

        // console.log('> refreshWindowSize');

        app.windowHeight = $(window).height();
        app.windowWidth = $(window).width();

       // $('ul.main-nav-list li:nth-child(3)').css('bottom',$('footer').outerHeight());

        var articleHeight = ($(window).height() - $('.section__header').outerHeight() )/3;
        // console.log('windowHeight',$(window).height());
        // console.log('articleHeight',articleHeight);
        $('section#artistes article').css('height', articleHeight);
        $('section#videos article').css('height', articleHeight);
        $('.artiste-videos article').css('height', articleHeight);

/*
        $('section').css('min-height', app.windowHeight - $('footer').innerHeight() );
        $('section:not(#home) .container').css('min-height', app.windowHeight - $('footer').innerHeight() );
*/

    };      

    $(window).on("resize", function(){
        app.refreshWindowSize();
    });

    function onScroll(event) {
        
        var scrollPos = $(document).scrollTop();

        $('#main-nav li').each(function () {

            var currLi = $(this);
            var currLink = $(this).find('a');

            if ( currLink.attr('target') != '_blank' ) {

                var refElement = $(currLink.attr("href"));
                var RefElementPositionTop = Math.floor(refElement.position().top);

                if( (RefElementPositionTop <= scrollPos) && (RefElementPositionTop + refElement.outerHeight() > scrollPos) ) {

                    if(!currLi.hasClass("active")) {
                        $('#main-nav li.menu-buttons').removeClass("active");
                        currLi.addClass("active");
                        // window.location.hash = currLink.attr("href");             
                        if(history.pushState) {
                            history.pushState(null, null, currLink.attr("href"));
                        }
                        else {
                            location.hash = currLink.attr("href");
                        }  
                    }       

                } else {
                    currLi.removeClass("active");
                }

            }

        });

        if( !$('#main-nav li.menu-buttons').hasClass('active') ) {
            var uri = window.location.toString();
            if (uri.indexOf("#") > 0) {
                var clean_uri = uri.substring(0, uri.indexOf("#"));
                window.history.replaceState({}, document.title, clean_uri);
            }
        }

    };


    $(window).on("scroll", function(){

    });

    $(window).on('beforeunload', function(){
        // $(window).scrollTop(0);
    });


    return app;

});