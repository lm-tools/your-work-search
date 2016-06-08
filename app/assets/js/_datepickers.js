const MobileDetect = require('mobile-detect');
const $ = require('jquery');
require('jquery-ui/datepicker');

const md = new MobileDetect(window.navigator.userAgent);
const enableNativeDatepicker = md.mobile() || md.tablet();

if (enableNativeDatepicker) {
  $('.datepicker').each(function () {
    this.type = 'date';
  });
} else {
  $('.datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
}
