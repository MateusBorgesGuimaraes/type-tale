export const formatMessage = (
  message: string | string[] | undefined,
): string => {
  if (!message) return "";
  if (Array.isArray(message)) {
    return message.join(". ");
  }
  return message;
};
