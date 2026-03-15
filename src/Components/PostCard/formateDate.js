export default function formatPostTime(dateString) {
  const now = new Date();
  const postDate = new Date(dateString);

  const diff = Math.floor((now - postDate) / 1000); // seconds

  if (diff < 60) return "Just now";

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;

  return postDate.toLocaleDateString();
}