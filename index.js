const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { Transform } = require('stream');

// Readable Stream for reading the CSV file
const readStream = fs.createReadStream('data/input.csv')
  .pipe(csv());

// Transform Stream: Modify data if needed
const transformStream = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    // Modify the data if needed
    chunk.age = parseInt(chunk.age) + 1; // Increment age by 1, for example
    callback(null, chunk);
  }
});

// Array to store modified records
const modifiedRecords = [];

// Collect modified records in an array
transformStream.on('data', (modifiedRecord) => {
  modifiedRecords.push(modifiedRecord);
});

transformStream.on('end', () => {
  // Writable Stream for writing the modified data to a new CSV file
  const csvWriter = createCsvWriter({
    path: 'output.csv',
    header: [
      { id: 'name', title: 'Name' },
      { id: 'age', title: 'Age' },
      // Add more headers as needed
    ],
  });

  // Write the modified records to the CSV file
  csvWriter.writeRecords(modifiedRecords)
    .then(() => {
      console.log('Writing complete');
    })
    .catch((error) => {
      console.error('Error writing CSV:', error);
    });
});

// Pipe the read stream through the transform stream
readStream.pipe(transformStream);
