# Mainland Polygon Identifier

### Installation

`npm install`

### Running the script 
`node index.js`


## Introduction

The goal of this code is to identify the mainland boundary for each country by assuming that the mainland boundary has the largest number of coordinate points.

## How It Works

### Reading the CSV File

The code reads the CSV file line by line using a read stream. Each line represents a boundary and contains information like a unique ID, country code, country name, and geographical coordinates.

### Parsing and Grouping

Each line is split into components to extract the relevant information. The geographical coordinates are also split by ':' to calculate the number of points in the polygon. Polygons are then grouped by country name, storing the polygon's ID and size (number of points).

### Identifying Mainland Boundaries

After reading the entire file, the code iterates through the countries and finds the largest polygon for each country, assuming that the largest polygon by the number of points is the mainland. The logic uses the `reduce` method to compare the size of the polygons within each country and identify the largest one.

### Writing the Results

The unique IDs of the mainland polygons are then written to a file called `mainlandIds.txt`.

## Reasoning

The underlying assumption that the largest polygon represents the mainland may or may not be accurate for all cases, depending on the data provided. However, in many cases, this assumption can be a reasonable heuristic to identify mainland boundaries.

If the data includes more explicit information about which boundaries are mainland versus islands, that would be preferable. In the absence of such information, the approach used here provides a straightforward way to infer mainland boundaries based on a plausible characteristic (i.e., having the largest number of coordinate points).

## Usage

To run the script, make sure the CSV file is located at the specified path, and simply execute the script using Node.js.
The resulting `mainlandIds.txt` file will contain the IDs of the mainland polygons.
