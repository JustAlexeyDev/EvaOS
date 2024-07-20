export const NetworkUsage = () => {
  const resourceListEntries = performance.getEntriesByType('resource');
  const totalNetworkUsage = resourceListEntries.reduce((total, entry) => total + (entry.transferSize || 0), 0);
  return (totalNetworkUsage / 1024).toFixed(2);
};