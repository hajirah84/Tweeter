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
          <div class="avatar">
            <img src="${tweet.user.avatars}" alt="${tweet.user.name}'s Avatar">
          </div>
          <div class="user-info">
            <span class="username">${tweet.user.name}</span>
            <span class="handle">${tweet.user.handle}</span>
          </div>
        </header>
        <div class="content">
          ${tweet.content.text}
        </div>
        <footer class="tweet-footer">
          <span class="icon"><i class="fas fa-comment"></i></span>
          <span class="icon"><i class="fas fa-retweet"></i></span>
          <span class="icon"><i class="fas fa-heart"></i></span>
        </footer>
      </article>
    `);
  
    const timeAgo = timeSince(tweet.created_at);
    $tweet.find('.tweet-footer').prepend(`<span class="time-ago">${timeAgo}</span>`);
  
    return $tweet;
  };
  
 
  const timeSince = function(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  };
   

