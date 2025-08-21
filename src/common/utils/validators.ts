export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isEmpty(value: string | undefined | null): boolean {
  return !value || value.trim().length === 0;
}