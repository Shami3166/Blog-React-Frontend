export const isEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const hasLettersAndNumbers = (v: string) => /[A-Za-z]/.test(v) && /\d/.test(v);
