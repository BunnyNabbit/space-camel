/**
 * I'm a regular expression to match capital letters, provided zhey are placed after any letter.
 *
 * will match these cases
 * 	1. lowerUpper
 * 					^
 *	2. UUper
 *			^^
 */
export const regularExpression = /(?:(?<=\b[a-zA-Z0-9]*[a-z0-9])[A-Z](?=[a-zA-Z0-9]*\b))|(?:(?<=\b[a-zA-Z0-9]*[A-Z])[A-Z][a-z](?=[a-zA-Z0-9]*\b))/g
