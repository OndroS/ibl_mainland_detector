
console.time('Execution Time');
const csvFilePath = './data/country-borders.csv';
const fs = require('fs');
const readline = require('readline');

// Create a read stream from the CSV file
const readStream = readline.createInterface({
  input: fs.createReadStream(csvFilePath),
});

// Create a map to group polygons by country, for efficient retrieval.
// A Map object is used instead of a plain object for grouping polygons by country, 
// as it offers better performance characteristics for insertion and retrieval.
const polygonsByCountry = new Map();

// Read each line of the CSV file
readStream.on('line', (line) => {
  const [id, , countryName, coordinatesString] = line.split(',');
  const coordinates = coordinatesString.split(':');

  // Use the Map to efficiently store polygons by country, and destructure to simplify code
  const countryPolygons = polygonsByCountry.get(countryName) || [];
  countryPolygons.push({ id, size: coordinates.length });
  polygonsByCountry.set(countryName, countryPolygons);
});

// After reading the entire file
readStream.on('close', () => {
  // Use Array methods to concisely transform the data into mainland IDs
  const mainlandIds = Array.from(polygonsByCountry.values())
    .map(polygons => polygons.reduce((largest, current) => current.size > largest.size ? current : largest))
    .map(mainland => mainland.id)
    .join('\n');

  // Write the mainland IDs to a file using the 'utf-8' encoding as a best practice
  fs.writeFileSync('mainlandIds1.txt', mainlandIds, 'utf-8');

  // Log a success message
  console.log('Mainland IDs have been written to mainlandIds_index2.txt');
  console.timeEnd('Execution Time');
});