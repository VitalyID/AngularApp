export function insertSpace(element: string) {
  return element.replace(/(\d{4})(?=\d)/g, '$1 ');
}
