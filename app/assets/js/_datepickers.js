const MobileDetect = require('mobile-detect');
const $ = require('jquery');
const Pikaday = require('pikaday');

const md = new MobileDetect(window.navigator.userAgent);
const enableNativeDatepicker = md.mobile() || md.tablet();

if (enableNativeDatepicker) {
  $('.datepicker').each(function () {
    this.type = 'date';
  });
} else {
  // eslint-disable-next-line no-new
  new Pikaday({ field: document.getElementsByClassName('datepicker')[0], format: 'DD/MM/YYYY' });
}
