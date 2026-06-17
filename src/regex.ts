/**I'm a regular expression to match capital letters, provided they are placed after any letter.
 *
 * Will match these cases:
 *
 * 1. Lower[U]pper
 * 2. [U][U]per
 */
export const regularExpression = /(?:(?<=\b[a-zA-Z0-9]*[a-z0-9])[A-Z](?=[a-zA-Z0-9]*\b))|(?:(?<=\b[a-zA-Z0-9]*[A-Z])[A-Z][a-z](?=[a-zA-Z0-9]*\b))/g
