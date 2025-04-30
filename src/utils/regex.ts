export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Matches a standard email format
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/; // At least 6 characters, at least one uppercase letter, one lowercase letter, and one number
export const SPACE_REGEX = /^(?!.*\s).*$/; // Matches any string that does not contain spaces
export const USERNAME_REGEX = /^[a-zA-Z0-9._-]{3,}$/; // Matches letters, numbers, dots, underscores, and hyphens
export const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/; // E.164 format
