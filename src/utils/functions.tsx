import { Timestamp } from "firebase/firestore";

export const isSingleEmoji = (text: string) => {
  const emojiRegex = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)$/u;
  return emojiRegex.test(text);
};

export const showDateAndTime = (createdAt: Timestamp | null) => {
  if (!createdAt) {
    return "Invalid date";
  }
  const date = new Date(
    createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000
  );
  const formattedDateTime = date.toLocaleString();
  return formattedDateTime;
};

const urlRegex = /(https?:\/\/[^\s]+)/g;

export const convertTextToLinks = (text: string) => {
  return text.split(urlRegex).map((part, index) =>
    urlRegex.test(part) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 break-all"
        style={{ marginRight: "4px", wordBreak: "break-all" }}
      >
        {part}
      </a>
    ) : (
      <span key={index} style={{ marginRight: "4px", wordBreak: "break-all" }}>
        {part}
      </span>
    )
  );
};
export function isDifferentDay(timestamp1: Timestamp, timestamp2: Timestamp) {
  const date1 = timestamp1.toDate(); // Convert Firestore Timestamp to JavaScript Date
  const date2 = timestamp2.toDate(); // Convert Firestore Timestamp to JavaScript Date

  return (
    date1.getFullYear() !== date2.getFullYear() ||
    date1.getMonth() !== date2.getMonth() ||
    date1.getDate() !== date2.getDate()
  );
}
