export async function hashCreds(account: string, password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${account}:${password}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = new Uint8Array(hashBuffer);
  return btoa(String.fromCharCode(...hashArray));
}

export function generateRandomBalance(): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return 503 + (array[0] % (998 - 503 + 1));
}