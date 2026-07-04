export const canEditMessage = (createdAt: Date | string): boolean => {
  if (!createdAt) return false;
  const created = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
  const fifteenMinutes = 15 * 60 * 1000;
  return Date.now() - created.getTime() < fifteenMinutes;
};