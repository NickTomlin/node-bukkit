/* ==========================================================================
   Helpers (move these into another module)
   ========================================================================== */
exports.rand = function rand(min,max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

// Shuffle implementation: http://stackoverflow.com/a/2450976/1048479
// potentially this should just be added to the array prototype

exports.shuffle = function(shuffleArray) {
    var i = shuffleArray.length, j, tempi, tempj;
    if ( i === 0 ) return false;
    while ( --i ) {
       j = Math.floor( Math.random() * ( i + 1 ) );
       tempi = shuffleArray[i];
       tempj = shuffleArray[j];
       shuffleArray[i] = tempj;
       shuffleArray[j] = tempi;
     }
     return shuffleArray;
};