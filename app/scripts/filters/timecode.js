(function() {
     function timecode() {
         return function(seconds) {

             timer = buzz.toTimer(seconds);

             if (Number.isNaN(seconds)) {
                return '-:--';
             }
             return timer;
         };
     }
 
     angular
         .module('blocJams')
         .filter('timecode', timecode);
 })();