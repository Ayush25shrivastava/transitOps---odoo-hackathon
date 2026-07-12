const { Parser } = require('json2csv');

exports.exportToCSV = (data, fields) => {
  const parser = new Parser({ fields });
  return parser.parse(data);
};
