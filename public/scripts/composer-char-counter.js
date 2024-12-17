$(document).ready(function() {
    $('#tweet-text').on('keyup', function() {
      var remainingChars = 140 - this.value.length;
  
      $(this).siblings('.counter').text(remainingChars);
  
      if (remainingChars < 0) {
        $(this).siblings('.counter').addClass('counter-overflow');
      } else {
        $(this).siblings('.counter').removeClass('counter-overflow');
      }
    });
  });
  
  
  
  