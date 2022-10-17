export const hoursAndMinutes = (date) => date.toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
});

export const getDate = (string) => {
  const date = new Date(string);
  return `${date.toDateString()} ${hoursAndMinutes(date)}`;
};

export const links = {
  homepage: 'Homepage',
  blockchain_site: 'Blockchain sites',
  official_forum_url: 'Official forums',
  chat_url: 'Chats',
  announcement_url: 'Announcements'
};

export const socialMediaStats = {
  facebook_likes: 'Facebook likes',
  twitter_followers: 'Twitter followers',
  reddit_average_posts_48h: 'Reddit average posts in 48h',
  reddit_average_comments_48h: 'Reddit average comments in 48h',
  reddit_subscribers: 'Reddit subscribers',
  reddit_accounts_active_48h: 'Reddit accounts active in 48h',
  telegram_channel_user_count: 'Telegram channel user count'
};
