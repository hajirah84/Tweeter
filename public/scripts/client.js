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
    $('#tweets-container').empty();
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
          console.log('Tweets loaded successfully:', response);
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
      const formData = $(this).serialize();
  
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: formData,
        success: function(response) {
          console.log('Tweet posted successfully:', response);
          loadTweets();
        },
        error: function(err) {
          console.error('Error posting tweet:', err);
        }
      });
    });
    
  });
  