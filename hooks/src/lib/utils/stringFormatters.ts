export const formatWithDelimiter = (str: string, segmentLength: number[], delimiter?: string) => {
  if (segmentLength.length === 0) return str;

  let result = [];
  let index = 0;

  for (let length of segmentLength) {
    if (index + length > str?.length) {
      result.push(str?.slice(index));
      break;
    }
    result.push(str?.slice(index, index + length));
    index += length;
  }

  return result.join(delimiter ?? ' ');
};

export const removeSpaces = (value: string) => value.replace(/\s+/g, '');
