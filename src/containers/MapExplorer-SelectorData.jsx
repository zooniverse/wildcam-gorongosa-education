export default class SelectorData {
  constructor() {
    this.id = //Random ID.
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)];
    this.mode = SelectorData.ADVANCED_MODE;
    this.colour = '#000000';
    this.markerColor = '#000000';  //For... consistency, this is coLOR instead of coLOUR.
    this.markerSize = '10';
    this.markerOpacity = '0.6';
    this.sql = '';
    this.css = '';
  }
  
  copy() {
    var newCopy = new SelectorData();
    for (var i in this) {
      if (this.hasOwnProperty(i) & i !== 'copy') {
        newCopy[i] = this[i];
      }
    }
    return newCopy;
  }
}
SelectorData.GUIDED_MODE = 1;
SelectorData.ADVANCED_MODE = 2;
