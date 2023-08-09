// console.time('Execution Time');
const csvFilePath = './data/country-borders.csv';
// Import required modules
const fs = require('fs');
const readline = require('readline');

// Create an object to store polygons grouped by country
const polygonsByCountry = {};

// Create a read stream from the CSV file
const readStream = readline.createInterface({
  input: fs.createReadStream(csvFilePath),
  output: process.stdout,
  terminal: false
});

// Read each line of the CSV file
readStream.on('line', (line) => {
  // Split line into components
  const parts = line.split(',');
  // Get the unique ID of the boundary
  const id = parts[0];
  // Extract coordinates and calculate the number of points in the polygon
  const coordinates = parts[3].split(':');
  
  // Group polygons by country name
  const countryName = parts[2];
  if (!polygonsByCountry[countryName]) {
    polygonsByCountry[countryName] = [];
  }
  
  // Store the polygon's ID and size for later comparison
  polygonsByCountry[countryName].push({ id, size: coordinates.length });
});

// After reading the entire file
readStream.on('close', () => {
  // List to store the mainland IDs
  const mainlandIds = [];

  // Iterate through the countries and find the largest polygon (by number of points) for each
  for (const country in polygonsByCountry) {
    const polygons = polygonsByCountry[country];
    // Use reduce to find the largest polygon
    const mainland = polygons.reduce((largest, current) => {
      // If the current polygon has more points, consider it the largest so far
      return current.size > largest.size ? current : largest;
    });
    // Store the ID of the mainland polygon
    mainlandIds.push(mainland.id);
  }

  // Write the mainland IDs to a file
  fs.writeFileSync('mainlandIds.txt', mainlandIds.join('\n'));

  // Log a message to the console
  console.log('Mainland IDs have been written to mainlandIds.txt');
  // console.timeEnd('Execution Time');
});