
$(document).ready(function(){
  $('.row:first-child').fadeOut();
  $(document).scroll(function() {
    var y = $(this).scrollTop();
    var x = $(this).height();
    if (y > (x/3.1)) {
      $('.row:first-child').fadeIn(500);
    }
  });
  
});
