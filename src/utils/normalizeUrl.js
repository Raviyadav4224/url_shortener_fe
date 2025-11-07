/**
 *
 * @param {string} url
 * @returns shortenCode
 * @example http://13.200.254.26/api/v1/url/r/AiSjcHI --> AiSjcHI
 */

export const normalizeUrl = (url) => {
  return url?.split("/r/")[1] ?? "";
};
