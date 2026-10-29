export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
