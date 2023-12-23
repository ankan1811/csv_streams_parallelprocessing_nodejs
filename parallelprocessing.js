const fs = require('fs');
const csv = require('csv-parser');
const { Transform } = require('stream');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;

// Readable Stream for reading the CSV file
const readStream = fs.createReadStream('data/input.csv')
  .pipe(csv());

// Transform Stream 1: Filter users older than 30
const filterAgeStream = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    if (parseInt(chunk.age) > 22) {
      this.push(chunk);
    }
    callback();
  }
});

// Transform Stream 2: Filter users from a specific city (e.g., 'New York')
const filterCityStream = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    if (chunk.city === 'New York') {
      this.push(chunk);
    }
    callback();
  }
});

// Writable Streams for storing the results
const ageResultStream = fs.createWriteStream('users_over_22.csv');
const cityResultStream = fs.createWriteStream('users_in_ny.csv');

// Create CSV stringifiers for writing CSV data
const ageCsvStringifier = createCsvStringifier({
  header: [
    { id: 'name', title: 'Name' },
    { id: 'age', title: 'Age' },
    { id: 'city', title: 'City' },
  ],
});

const cityCsvStringifier = createCsvStringifier({
  header: [
    { id: 'name', title: 'Name' },
    { id: 'age', title: 'Age' },
    { id: 'city', title: 'City' },
  ],
});

// Pipe the data through parallel streams
readStream
  .pipe(filterAgeStream)
  .on('data', (data) => ageResultStream.write(ageCsvStringifier.stringifyRecords([data])))
  .on('end', () => ageResultStream.end());

readStream
  .pipe(filterCityStream)
  .on('data', (data) => cityResultStream.write(cityCsvStringifier.stringifyRecords([data])))
  .on('end', () => cityResultStream.end());
