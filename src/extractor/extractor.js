import fs from 'fs';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, '../extractor/input.csv');
const outputPath = join(__dirname, '../extractor/output.json');

const results = [];

fs.createReadStream(inputPath)
  .pipe(csv({
    separator: ',',
    skipLines: 0
  }))
  .on('data', (row) => {
    const extractedData = {
      id: row.ID || '',
      comment: row.COMENTARIO || '',
    };
    results.push(extractedData);
  })
  .on('end', () => {
    const validResults = results.filter(item => 
      item.id || item.comment
    );

    fs.writeFileSync(outputPath, JSON.stringify({ comments: validResults }, null, 2));
    console.log('Extração concluída! Arquivo gerado:', outputPath);
    console.log('Número de registros criados:', validResults.length);
  });
