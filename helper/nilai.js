module.exports = function nilai(nilai){
  if(nilai > 89){
    return 'A'
  } else if(nilai < 90 && nilai > 69){
    return 'B'
  } else if(nilai < 70 && nilai > 49){
    return 'C'
  } else {
    return 'D'
  }
}
