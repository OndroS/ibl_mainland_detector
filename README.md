# Mainland Polygon Identifier

### Installation

`npm install`

### Running the script 
`node index.js`


## Introduction

The goal of this code is to identify the mainland boundary for each country by assuming that the mainland is the largest polygon. 

## How It Works

### Reading the CSV File

The code reads the CSV data file line by line, parsing each line to extract the polygon's unique ID, country name, and its geographical coordinates. Polygons are grouped by their country name, storing the polygon's ID.

### Parsing and Grouping

The code reads the CSV data file line by line, parsing each line to extract the polygon's unique ID, country name, and its geographical coordinates. Polygons are grouped by their country name, storing the polygon's ID and its size. Before storing, the size is calculated by the shoelace formula. 

Shoelace algorithm, or shoelace method (also known as Gauss's area formula and the surveyor's formula) is a mathematical algorithm to determine the area of a simple polygon whose vertices are described by their Cartesian coordinates in the plane. It is called the shoelace formula because of the constant cross-multiplying for the coordinates making up the polygon, like threading shoelaces.

### Identifying Mainland Boundaries

After processing the entire file, the script identifies the largest polygon for each country, considering it as the mainland. Special provisions are made for countries known to have multiple main islands, such as Japan, New Zealand, and the United States.

### Writing the Results

The unique IDs of the mainland polygons are then written to a file called `mainlandIds.txt`.

### Testing and Validation

The testing script, test.js, validates the output by ensuring:

`node test.js`

Specific countries have only their mainland boundaries identified or the US includes both its mainland and Alaska and etc..
Any inconsistencies will be displayed, allowing users to cross-check and refine the input data or the logic.

## Usage

To run the script, make sure the CSV file is located at the specified path, and simply execute the script using Node.js.
The resulting `mainlandIds.txt` file will contain the IDs of the mainland polygons.
