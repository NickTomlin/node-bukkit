/* ==========================================================================
   Helpers (move these into another module)
   ========================================================================== */
function rand(min,max){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

exports.rand = rand;
