const MAX_DESCRIPTION_LENGTH: number = 50;

export const truncatedCarater = (text: string) => {
  return text.length > MAX_DESCRIPTION_LENGTH
    ? text.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
    : text;
};
