const $ = require('jquery');

$('[data-submit-on-click]').on('change', function () {
  $(this).closest('form').submit();
});
