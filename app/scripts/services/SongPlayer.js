(function() {
     SongPlayer.currentSong = null;

        /**
     * @desc Current playback time (in seconds) of currently playing song
     * @type {Number}
     */
     SongPlayer.currentTime = null;
     SongPlayer.volume = null;
     function SongPlayer($rootScope, Fixtures) {
          var SongPlayer = {};
          var currentAlbum = Fixtures.getAlbum();

         
          /**
 * @desc Buzz object audio file
 * @type {Object}
 */
         var currentBuzzObject = null;
        

    /** 
   * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 *   @param {Object} song
    */

    var setSong = function(song) {
        if (currentBuzzObject) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }
 
    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });

    currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
     });
 
    SongPlayer.currentSong = song;
 };

 var getSongIndex = function(song) {
     return currentAlbum.songs.indexOf(song);
 };

 

/** plays the song if current song is not the song being played */

     SongPlayer.play = function(song) {
         var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
         }

         song = song || SongPlayer.currentSong;
         if (SongPlayer.currentSong !== song) {
             setSong(song);
             playSong(song);
            
             } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
             }  
    
     };

/** Pauses the song  */

      SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;
        currentBuzzObject.pause();
        song.playing = false;
    };
    /** Method to go to previous song */
        SongPlayer.previous = function() {
            var playSong = function(song){
                currentBuzzObject.play();
                song.playing = true;
            }
            var stopSong = function(song){
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /** Method to go to next song */
        SongPlayer.next = function() {
            var playSong = function(song){
                currentBuzzObject.play();
                song.playing = true;
            }
            var stopSong = function(song){
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex === currentAlbum.songs.length) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
         /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        SongPlayer.setVolume = function(volume) {
            if(currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
        };

          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope' ,'Fixtures', SongPlayer]);
 })();