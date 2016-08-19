export const DownloadHelper = {
  generateFilename: (basename = 'wildcam-', extension = '.csv') => {
    let timeString = new Date();
    timeString =
      timeString.getDate() +
      ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][timeString.getMonth()] +
      timeString.getFullYear();
    return basename + timeString + extension;
  },
  
  blobbifyCsvData: (data) => {
    if (data) {
      let dataBlob = new Blob([data], {type: 'text/csv'});
      return dataBlob;
    }
    return null;
  },
};