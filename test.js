const fs = require('fs');

function validateMainlandIds() {
    const data = fs.readFileSync('mainlandIds.txt', 'utf-8');
    const ids = data.split('\n').map(line => line.split(':')[1]); // Split to get only the ids

    let valid = true;

    // Validate Croatia, Greece, and Denmark have only their mainland
    ['HR', 'GR', 'DA'].forEach(countryCode => {
        if (ids.filter(id => id.startsWith(countryCode)).length !== 1) {
            console.error(`Validation error: ${countryCode} has none, or more than one mainland.`);
            valid = false;
        }
    });

    // Validate US should have exactly 2 IDs
    if (ids.filter(id => id.startsWith('US')).length !== 2) {
        console.error(`Validation error: US should have 2 mainlands.`);
        valid = false;
    }

    // Validate Japan should have exactly 4 IDs
    if (ids.filter(id => id.startsWith('JA')).length !== 4) {
        console.error(`Validation error: Japan should have 4 mainlands.`);
        valid = false;
    }

    // Validate New Zealand should have exactly 2 IDs
    if (ids.filter(id => id.startsWith('NZ')).length !== 2) {
        console.error(`Validation error: New Zealand should have 2 mainlands.`);
        valid = false;
    }

    // Final validation message
    if (valid) {
        console.log('Validation successful!');
    } else {
        console.log('Validation failed.');
    }
}

validateMainlandIds();