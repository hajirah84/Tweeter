const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "My Tweets"
    },
    "created_at": 1461116232227
  };
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user-info">
            <img class="avatar" src="${tweet.user.avatars}" alt="User avatar">
            <span class="name">${tweet.user.name}</span>
            <span class="handle">${tweet.user.handle}</span>
          </div>
        </header>
        <p class="tweet-content">${escape(tweet.content.text)}</p>
        <footer>
          <span class="time">${timeago.format(tweet.created_at)}</span>
          <div class="tweet-footer">
            <span class="icon"><i class="fas fa-flag"></i></span>
            <span class="icon"><i class="fas fa-retweet"></i></span>
            <span class="icon"><i class="fas fa-heart"></i></span>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };
  
  
  const renderTweets = function(tweets) {
    $('#tweets-container').empty(); 
    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetElement);
    }
  };
  
  const isTweetValid = function(tweetText) {
    if (!tweetText) {
      alert("Tweets with 0 characters are not allowed.");
      return false;
    }
    if (tweetText.length > 140) {
      alert("Only 140 characters allowed per tweet.");
      return false;
    }
    return true; 
  };
  
  $(document).ready(function() {
    const loadTweets = function() {
      $.ajax({
        method: 'GET',
        url: '/tweets',
        success: function(response) {
          renderTweets(response); 
        },
        error: function(err) {
          console.error('Error loading tweets:', err);
          alert("Failure to load tweets. Please refresh the page.");
        }
      });
    };
  
    loadTweets();
  
    $('#tweet-form').on('submit', function(event) {
      event.preventDefault(); 
  
      const tweetText = $('#tweet-text').val().trim(); 
      if (!isTweetValid(tweetText)) {
        return; 
      }
  
      const formData = $(this).serialize(); 
        $.ajax({
        method: 'POST',
        url: '/tweets',
        data: formData,
        success: function() {
          $('#tweet-text').val(''); 
          $('.counter').text(140); 
            loadTweets();
        },
        error: function(err) {
          console.error('Error posting tweet:', err);
          alert("❌ Failed to post your tweet. Please try again later.");
        }
      });
    });
  });
  