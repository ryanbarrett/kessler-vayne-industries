export function futureDate2100s(): string {
  const array = new Uint32Array(3);
  crypto.getRandomValues(array);
  
  const year = 2103 + (array[0] % 97); // 2103-2199
  const month = 1 + (array[1] % 12);   // 1-12
  
  // Get the last day of the month
  const lastDay = new Date(year, month, 0).getDate();
  const day = Math.min(28 + (array[2] % 3), lastDay); // 28-30, clamped to valid days
  
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}