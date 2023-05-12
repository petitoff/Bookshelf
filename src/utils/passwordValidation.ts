export const isPasswordValid = (
  password: string,
  minLength: number
): boolean => {
  return password.length >= minLength;
};
