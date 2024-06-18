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
