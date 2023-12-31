const csvFilePath = './data/country-borders.csv';
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

// Function to calculate the area of a polygon using the Shoelace formula
function calculateArea(coordinates) {
  let area = 0;
  const n = coordinates.length;

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const [x1, y1] = coordinates[i].split(' ').map(Number);
    const [x2, y2] = coordinates[j].split(' ').map(Number);
    area += x1 * y2 - x2 * y1;
  }

  return Math.abs(area) / 2;
}

// Read each line of the CSV file
readStream.on('line', (line) => {
  const parts = line.split(',');
  const id = parts[0];
  const coordinates = parts[3].split(':').slice(1);  // Exclude the first element which is not a coordinate
  const countryName = parts[2];
  
  if (!polygonsByCountry[countryName]) {
    polygonsByCountry[countryName] = [];
  }

  // Store the polygon's ID and area for later comparison
  polygonsByCountry[countryName].push({ id, area: calculateArea(coordinates) });
});

readStream.on('close', () => {
  const mainlandIds = [];

  // Iterate through the countries and find the largest polygons
  for (const country in polygonsByCountry) {
    const polygons = polygonsByCountry[country];
    
    // Sort polygons by area in descending order
    const sortedPolygons = polygons.sort((a, b) => b.area - a.area);
    
    // Store the ID of the largest polygon as the mainland
    mainlandIds.push(sortedPolygons[0].id);
    
    // For countries known to have multiple main islands, consider more than one polygon
    if (country === 'Japan') {
      for (let i = 1; i < 4; i++) { 
        mainlandIds.push(sortedPolygons[i].id);
      }
    } else if (country === 'New Zealand') {
      mainlandIds.push(sortedPolygons[1].id); 
    } else if (country === 'United States') {
      if (sortedPolygons.length > 1) {  // Make sure there is a second polygon to add
        mainlandIds.push(sortedPolygons[1].id);
      }
    }
  }

  // Write the mainland IDs to a file
  fs.writeFileSync('mainlandIds.txt', mainlandIds.join('\n'));

  console.log('Mainland IDs have been written to mainlandIds.txt');
});