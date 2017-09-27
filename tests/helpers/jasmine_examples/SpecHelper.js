"use strict";

beforeEach(function () {
  jasmine.addMatchers({
    toBePlaying: function toBePlaying() {
      return {
        compare: function compare(actual, expected) {
          var player = actual;

          return {
            pass: player.currentlyPlayingSong === expected && player.isPlaying
          };
        }
      };
    }
  });
});