import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRelativeTime(date: Date): string {
  const formattedtDate = dayjs(date);

  const currentDate = dayjs();

  const diffInDays = currentDate.diff(formattedtDate, "day");
  const diffInMinutes = currentDate.diff(formattedtDate, "minute");
  const diffInHours = currentDate.diff(formattedtDate, "hour");

  if (diffInMinutes < 1) {
    return "Just now";
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }

  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's': ''} ago`;
  }

  return `${diffInDays} day${diffInDays === 1 ? "" : "1"} ago`;

  // Using 'day' and 'hour' differences to determine today and yesterday
  // if (currentDate.isSame(formattedtDate, 'day')) {
  //   return `Today, ${formattedtDate.format('h:mm a')}`;
  // }

  // if (currentDate.subtract(1, 'day').isSame(formattedtDate, 'day')) {
  //   return `Yesterday, ${formattedtDate.format('h:mm a')}`;
  // }

  // if (diffInDays <= 7) {
  //   return `${formattedtDate.format('dddd')}, ${formattedtDate.format(
  //     'h:mm a'
  //   )}`;
  // }

  // return `${formattedtDate
  //   .toDate()
  //   .toLocaleDateString()} • ${formattedtDate.format('h:mm a')}`;
}
