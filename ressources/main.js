define('jquery', [], function() {
    return jQuery;
});
require.config({
	shim: {
      'easeScroll' : {
            deps : ['jquery']                        
      }, 'OwlCarousel' : {
            deps : ['jquery']                        
      }
	  },    
    // baseUrl: "wp-content/themes/sme/assets/js",
    paths: {
        // 'jquery': '//code.jquery.com/jquery-3.3.1.min',
        // 'jquery': 'libs/jquery-3.3.1.min',
        // 'jquery': 'https://code.jquery.com/jquery-3.3.1.min',

        'easeScroll': 'tools/jquery.easeScroll',
        // 'TweenMax': 'libs/gsap/TweenMax.min',     
        // 'TweenLite': 'libs/gsap/TweenLite.min',     
        // 'CSSPlugin': 'libs/gsap/CSSPlugin.min',     
        // 'EasePack': 'libs/gsap/EasePack.min',     
        // 'ScrollToPlugin': 'libs/gsap/ScrollToPlugin.min',     
        'lazysizes': 'tools/lazysizes.min', 
        'unveilhooks': 'tools/ls.unveilhooks.min', 
        'fontfaceobserver': 'libs/fontfaceobserver',    
        // 'fontfaceobserver': globalObject.url+'/wp-content/themes/sme/assets/js/libs/fontfaceobserver',    
        'OwlCarousel': 'tools/owl.carousel.min',     
        // 'TweenMax': 'libs/gsap/TweenMax.min',     
        'TweenMax': '//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min',
        // 'jquery.mCustomScrollbar': 'tools/jquery.mCustomScrollbar.min',        
        'app': 'apps/basic'
    }
});

require(['jquery','app','TweenMax','lazysizes','unveilhooks'],
    function($,app,TweenMax,lazysizes,unveilhooks) {

      // console.log('> RequireJS Load : Done');
      app.init();
      
});