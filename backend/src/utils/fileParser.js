import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import xlsx from 'xlsx';

export const parseCSVFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const records = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        records.push(row);
      })
      .on('end', () => {
        resolve(records);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

export const parseXLSXFile = (filePath) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const records = xlsx.utils.sheet_to_json(worksheet);
    return records;
  } catch (error) {
    throw new Error('Failed to parse XLSX file');
  }
};

export const parseFile = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.csv') {
    return await parseCSVFile(filePath);
  } else if (ext === '.xlsx' || ext === '.xls') {
    return parseXLSXFile(filePath);
  } else {
    throw new Error('Unsupported file format');
  }
};

export const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};
