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
    paths: {

        'easeScroll': 'tools/jquery.easeScroll',    
        'lazysizes': 'tools/lazysizes.min', 
        'unveilhooks': 'tools/ls.unveilhooks.min', 
        'fontfaceobserver': 'libs/fontfaceobserver',    
        'OwlCarousel': 'tools/owl.carousel.min',      
        'TweenMax': '//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenMax.min',     
        'app': 'apps/basic'
    }
});

require(['jquery','app','TweenMax','lazysizes','unveilhooks'],
    function($,app,TweenMax,lazysizes,unveilhooks) {
        
      app.init();
      
});