$(document).ready(function () {
  if ($('#countdown-clock').length) {
    timer = $('#countdown-clock').val();
    $('.countdown-clock').countdown(timer, function(event){
      $(this).html(event.strftime('%D 天, %H 時 %M 分 %S 秒'))
    });
  }
});
