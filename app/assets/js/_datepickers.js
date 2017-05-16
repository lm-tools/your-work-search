const MobileDetect = require('mobile-detect');
const $ = require('jquery');
require('jquery-ui/datepicker');

const md = new MobileDetect(window.navigator.userAgent);
const enableNativeDatepicker = md.mobile() || md.tablet();

if (!enableNativeDatepicker) {
  $('.date-real').addClass('hidden');

  $('.datepicker').removeClass('hidden');

  $('.datepicker').each(function () {
    const target = $(this).data('altField');

    var isoDate = $(target).val();
    var localDate = new Date(isoDate).toLocaleDateString('en-GB');
    console.log(localDate);

    $(this).val(localDate);

    $(this).datepicker({
      dateFormat: 'dd/mm/yy',
      altField: target,
      altFormat: 'yy-mm-dd'
    });
  })
}
