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
        <p class="tweet-content">${tweet.content.text}</p>
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
    for (const tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetElement); 
    }
  };
  
  $(document).ready(function() {
    const loadTweets = function() {
      $.ajax({
        method: 'GET',
        url: '/tweets',
        success: function(response) {
          $('#tweets-container').empty(); 
          renderTweets(response); 
        },
        error: function(err) {
          console.error('Error loading tweets:', err);
        }
      });
    };
  
    loadTweets();
    $('#tweet-form').on('submit', function(event) {
      event.preventDefault(); 
  
      // Get tweet text and trim spaces
      const tweetText = $('#tweet-text').val().trim();
  
      if (!tweetText) {
        alert("🚫 Error! Your tweet is empty."); 
        return; 
      }
        if (tweetText.length > 140) {
        alert("🚫 Only 140 characters allowed per tweet."); 
        return; 
      }
  
      const formData = $(this).serialize();
        $.ajax({
        method: 'POST',
        url: '/tweets',
        data: formData,
        success: function() {
          $('#tweet-text').val(''); 
          loadTweets(); 
        },
        error: function(err) {
          console.error('Error posting tweet:', err);
        }
      });
    });
  });
  
  