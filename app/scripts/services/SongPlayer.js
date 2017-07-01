(function() {
     SongPlayer.currentSong = null;
     function SongPlayer(Fixtures) {
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
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();