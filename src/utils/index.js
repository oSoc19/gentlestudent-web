const getReadableDate = (timestamp) => {
  const months = [
    'januari',
    'februari',
    'maart',
    'april',
    'mei',
    'juni',
    'juli',
    'augustus',
    'september',
    'oktober',
    'november',
    'december'
  ];

  const date = timestamp ? timestamp.toDate() : new Date();
  const today = new Date();
  const seconds = Math.abs(today - date) / 1000;
  const days = Math.floor(seconds / 86400);

  if (days < 1) {
    return `${date.getHours()}:${date.getMinutes() < 10 ? 0 : ''}${date.getMinutes()}`;
  }
  if (days < 7) {
    return `${days} dag${days > 1 ? 'en' : ''} geleden`;
  }
  return `${date.getDate()} ${months[date.getMonth()]}`;
};

const getFullDate = (date) => {
  return new Intl.DateTimeFormat('nl-BE').format(new Date(date));
};

export { getReadableDate, getFullDate };
export { default as hasRole } from './hasRole';
export { default as saltedHash } from './saltedHash';
export { default as getBase64AsDataUrl } from './getBase64AsDataUrl';
export { default as createApiErrorMessage } from './createApiErrorMessage';
export { default as createNotification } from './createNotification';
export { default as getErrorResponse } from './getErrorResponse';
export { default as getCategoryConstantName } from './getCategoryConstantName';
export { default as getDifficultyConstantName } from './getDifficultyConstantName';
