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

        'easeScroll': 'jquery.easeScroll',    
        'lazysizes': 'lazysizes.min', 
        'unveilhooks': 'ls.unveilhooks.min', 
        'fontfaceobserver': 'fontfaceobserver',    
        'OwlCarousel': 'owl.carousel.min',      
        'TweenMax': 'TweenMax.min',     
        'app': 'basic'
    }
});

require(['jquery','app','TweenMax','lazysizes','unveilhooks'],
    function($,app,TweenMax,lazysizes,unveilhooks) {
        
      app.init();
      
});