export function GetCurrentDate() {
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const dd = date < 10 ? `0${date}` : date;
  const mm = month < 10 ? `0${month}` : month;
  const yyyy = year;

  return `${dd}/${mm}/${yyyy}`;
}
