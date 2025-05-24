export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate();
  const daySuffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);

  return `${formattedDate.split(" ")[0]} ${day}${daySuffix} – ${
    formattedDate.split(" ")[1]
  }`;
}
