
var spotify = require('../lib/spotify-node-applescript.js');
var expect = require('chai').expect;

describe('Spotify Controller', function(){

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Make sure spotify is open before running these tests
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    beforeEach(function(done){
        spotify.playTrack('spotify:track:3AhXZa8sUQht0UEdBJgpGc', function(){
            done();
        });
    });

    after(function(done){
        spotify.pause(function(){
            done();
        });
    });

    it('should return playing track', function(done){
        spotify.getTrack(function(error, track){
            expect(track.artist).to.equal('Bob Dylan');
            expect(track.name).to.equal('Like A Rolling Stone');
            done();
        });
    });

    it('should return player status', function(done){
        spotify.getState(function(error, state){
            expect(state.state).to.equal('playing');
            done();
        });
    });

    it('should pause a track', function(done){
        spotify.pause(function(){
            spotify.getState(function(error, state){
                expect(state.state).to.equal('paused');
                done();
            });
        });
    });

    it('should resume playing a track after pausing', function(done){
        spotify.pause(function(){
            spotify.play(function(){
                spotify.getState(function(error, state){
                    expect(state.state).to.equal('playing');
                    done();
                });
            });
        });
    });

    it('should play and pause a track', function(done){
        spotify.playPause(function(){
            spotify.getState(function(error, state){
                expect(state.state).to.equal('paused');
                spotify.playPause(function(){
                    spotify.getState(function(error, state){
                        expect(state.state).to.equal('playing');
                        done();
                    });
                });
            });
        });
    });

    it('should turn volume up', function(done){
        // first do volumeDown in case volume is already 100
        spotify.volumeDown(function(){
            spotify.getState(function(error, state){
                var volume = parseInt(state.volume);
                spotify.volumeUp(function(){
                    spotify.getState(function(error, state){
                        expect(parseInt(state.volume)).to.be.greaterThan(volume);
                        done();
                    });
                });
            });
        });
    });

    it('should turn volume down', function(done){
        // first do volumeUp in case volume is already 0
        spotify.volumeUp(function(){
            spotify.getState(function(error, state){
                var volume = parseInt(state.volume);
                spotify.volumeDown(function(){
                    spotify.getState(function(error, state){
                        expect(parseInt(state.volume)).to.be.lessThan(volume);
                        done();
                    });
                });
            });
        });
    });

    it('should set the volume', function(done){
        spotify.setVolume(0, function(){
            spotify.getState(function(err, state){
                if (err) throw err;

                expect(parseInt(state.volume, 10)).to.equal(0);
                done();
            });
        });
    });

// Next and previous show buggy behaviour which makes testing it useless
//	it('play next track', function(done){
//		spotify.next(function(error, track){
//			spotify.getTrack(function(error, track){
//                console.log('>',track.name);
//                expect(track.name).to.not.equal('Like A Rolling Stone');
//				done();
//			});
//		});
//	});
//
//	it('play previous track', function(done){
//		spotify.previous(function(error, track){
//			spotify.getTrack(function(error, track){
//                console.log('>',track.name);
//				expect(track.name).to.equal('Like A Rolling Stone');
//				done();
//			});
//		});
//	});

    it('play track', function(done){
        spotify.playTrack('spotify:track:4EZz8Byhbjk0tOKFJlCgPB', function(){
            spotify.getTrack(function(error, track){
                expect(track.name).to.equal('Never Gonna Give You Up - 7" Vocal Mix');
                done();
            });
        });
    });

    it('should jump to a specific position of the song', function(done){
        // spotify needs some time to catch up with the jump or it will
        // simply return 0 as current player position
        setTimeout(function(){
            spotify.jumpTo(15, function(){
                spotify.getState(function(err, state){
                    expect(parseInt(state.position, 10)).to.equal(15)
                    done();
                });
            });
        }, 1100);
    });

    it('should return the path to the PNG of the current artwork', function(done){
        spotify.getArtwork(function(err, path){
            if (err) throw err;

            var fileName = path.split('/').splice(-1)[0];
            expect(fileName).to.equal('spotify:track:3AhXZa8sUQht0UEdBJgpGc.png');
            done();
        });
    });
});
