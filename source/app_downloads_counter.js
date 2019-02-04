/* This POSTs to the clicks-api service to click numbers of downloads of different releases */
$(document).ready(function () {
  $('a.app-download').click(function (ev) {
    let downloadType = $(this).closest('a').attr('id')
    $.post(`https://clicks.status.im/clicks/${downloadType}`)
  });
});
