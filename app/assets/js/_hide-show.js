const $ = require('jquery');

$('[data-toggle-visibility-for]').on('click', function (el) {
  const $currentElement = $(el.target);
  const $icon = $currentElement.find('i');
  const $target = $($currentElement.data('toggle-visibility-for'));
  $icon.toggleClass('fa-caret-right');
  $icon.toggleClass('fa-caret-down');
  $target.toggleClass('js-hidden');
});
