/* eslint-disable no-undef */

$(document).ready(function () {
  // Hide the error message on initial load
  $(".error-message").hide();

  // Toggle the tweet form 
  $("nav .new-tweet").on("click", function () {
    const $composeSection = $("section.new-tweet");
    $composeSection.slideToggle(300, function () {
      if ($composeSection.is(":visible")) {
        $("#tweet-text").focus();
      }
    });
  });

  const $scrollBtn = $("#scroll-to-top");
  const $composeBox = $("section.new-tweet");
  const $navToggle = $("nav .new-tweet");

  
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 200) {
      $scrollBtn.fadeIn();
      $navToggle.fadeOut();
    } else {
      $scrollBtn.fadeOut();
      $navToggle.fadeIn();
    }
  });

  $scrollBtn.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 300);
    $composeBox.slideDown(300, function () {
      $("#tweet-text").focus();
    });
  });

  // Validate tweet content and show error message
  const isTweetValid = (text) => {
    if (!text) return "Tweet cannot be empty!";
    if (text.length > 140) return "Tweet exceeds the maximum length of 140 characters!";
    return null;
  };

  // Display an error message
  const displayError = (msg) => {
    $(".error-message").text(msg).slideDown();
  };

  // Hide the error message
  const removeError = () => {
    $(".error-message").slideUp();
  };

  const buildTweet = (data) => {
    const $tweet = $("<article>").addClass("tweet");

    // Header row: avatar, name, handle
    const $header = $("<div>").addClass("row top-row");
    const $avatar = $("<div>")
      .addClass("profile-picture")
      .append(
        $("<img>")
          .attr("src", data.user.avatars)
          .attr("alt", `Profile picture of ${data.user.name}`)
      );
    const $name = $("<div>").addClass("name").text(data.user.name);
    const $handle = $("<div>").addClass("username").text(data.user.handle);
    $header.append($avatar, $name, $handle);

    const $body = $("<div>").addClass("row content").append(
      $("<p>").text(data.content.text)
    );

    
    const $footer = $("<div>").addClass("row bottom-row");
    const $time = $("<div>").addClass("date").text(timeago.format(data.created_at));
    const $actions = $("<div>")
      .addClass("icons")
      .append(
        $("<i>").addClass("fa-solid fa-retweet"),
        $("<i>").addClass("fa-solid fa-flag"),
        $("<i>").addClass("fa-solid fa-heart")
      );
    $footer.append($time, $actions);

    
    $tweet.append($header, $body, $footer);
    return $tweet;
  };

  const displayTweets = (list) => {
    const $container = $(".tweets-container");
    $container.empty(); 

    for (const entry of list) {
      const $tweetElement = buildTweet(entry);
      $container.prepend($tweetElement); // Add new tweets
    }
  };

  // render tweets
  const fetchTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (data) => {
        displayTweets(data);
      },
      error: (err) => {
        displayError("Error: Unable to load tweets. Please try again later.");
        console.error("Fetch error:", err);
      },
    });
  };

  //  validate and post tweet
  $(".new-tweet form").on("submit", function (e) {
    e.preventDefault();

    removeError();

    const input = $("#tweet-text").val().trim();
    const errorMsg = isTweetValid(input);

    if (errorMsg) {
      displayError(errorMsg);
      return;
    }

    const formData = $(this).serialize();

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: formData,
      success: () => {
        $("#tweet-text").val("");       // Clear input
        $(".counter").text("140");      // Reset character counter
        fetchTweets();                  // Refresh tweets
      },
      error: (err) => {
        displayError("Error: Unable to post tweet. Please try again later.");
        console.error("Post error:", err);
      },
    });
  });

  // Hide error message when the user focuses on the tweet box
  $("#tweet-text").on("focus", function () {
    removeError();
  });

  // Initial load of tweets
  fetchTweets();
});

