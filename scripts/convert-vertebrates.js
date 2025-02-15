import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vertebrataDir = path.join(__dirname, '..', 'src', 'Vertebrata');

// Function to get all JSON files recursively
function getAllFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            results = results.concat(getAllFiles(filePath));
        } else if (path.extname(file) === '.json') {
            results.push(filePath);
        }
    });
    return results;
}

// Function to process a scientific name into genus and species
function processScientificName(scientificName) {
    const parts = scientificName.split(' ');
    return {
        genus: parts[0],
        species: parts[1] || ''
    };
}

// Process all files
const files = getAllFiles(vertebrataDir);
const species = new Set(); // Use Set to avoid duplicates

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const data = JSON.parse(content);
    
    // Handle both array and single object formats
    const items = Array.isArray(data) ? data : [data];
    
    items.forEach(item => {
        if (item.scientific_name) {
            const { genus, species: speciesName } = processScientificName(item.scientific_name);
            const scientificName = `${genus} ${speciesName}`;
            
            // Only add if we have both genus and species
            if (genus && speciesName) {
                species.add(JSON.stringify({
                    scientificName,
                    wikipediaUrl: `https://en.wikipedia.org/wiki/${scientificName.replace(' ', '_')}`,
                    genus,
                    species: speciesName
                }));
            }
        }
    });
});

// Convert to array and format
const speciesArray = Array.from(species).map(s => JSON.parse(s));

// Generate the TypeScript code
const output = `import { Species } from "../types/game";

// Auto-generated from Vertebrata directory
export const vertebrateSpecies: Species[] = ${JSON.stringify(speciesArray, null, 2)};
`;

// Write to a new file
fs.writeFileSync(
    path.join(__dirname, '..', 'src', 'data', 'vertebrate-species.ts'),
    output
);

console.log(`Processed ${speciesArray.length} species`);
