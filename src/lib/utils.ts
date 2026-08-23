export function cn(...inputs: (string | undefined | null | false | Record<string, boolean>)[]): string {
  const result: string[] = [];

  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === 'string') {
      result.push(input);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) result.push(key);
      }
    }
  }

  return result.join(' ');
}
