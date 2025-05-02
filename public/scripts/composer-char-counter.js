$(document).ready(function () {
  console.log("Character counter script loaded");

  $(".new-tweet textarea").on("input", function () {
    const maxLength = 140;
    const inputLength = $(this).val().length;
    const charsLeft = maxLength - inputLength;

    const $counter = $(this).closest("form").find(".counter");

    // Update the counter text
    $counter.text(charsLeft);

    // Turn counter red if limit exceeded
    if (charsLeft < 0) {
      $counter.addClass("over-limit");
    } else {
      $counter.removeClass("over-limit");
    }
  });
});

  
  
  
  