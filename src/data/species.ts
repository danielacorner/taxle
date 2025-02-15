import { Species } from "../types/game";
import { vertebrateSpecies } from "./vertebrate-species-mini";

// Original species database
// const originalSpecies: Species[] = [
//   // Mammals
//   {
//     scientificName: "Panthera tigris",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Tiger",
//     genus: "Panthera",
//     species: "tigris"
//   },
//   {
//     scientificName: "Panthera leo",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Lion",
//     genus: "Panthera",
//     species: "leo"
//   },
//   {
//     scientificName: "Canis lupus",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Wolf",
//     genus: "Canis",
//     species: "lupus"
//   },
//   {
//     scientificName: "Homo sapiens",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Human",
//     genus: "Homo",
//     species: "sapiens"
//   },
//   {
//     scientificName: "Gorilla gorilla",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Western_gorilla",
//     genus: "Gorilla",
//     species: "gorilla"
//   },
//   {
//     scientificName: "Ursus arctos",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Brown_bear",
//     genus: "Ursus",
//     species: "arctos"
//   },
//   {
//     scientificName: "Elephas maximus",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Asian_elephant",
//     genus: "Elephas",
//     species: "maximus"
//   },
//   {
//     scientificName: "Panthera onca",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Jaguar",
//     genus: "Panthera",
//     species: "onca"
//   },
//   {
//     scientificName: "Propithecus candidus",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Silky_sifaka",
//     genus: "Propithecus",
//     species: "candidus"
//   },
//   {
//     scientificName: "Diceros bicornis",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Black_rhinoceros",
//     genus: "Diceros",
//     species: "bicornis"
//   },
  
//   // Birds
//   {
//     scientificName: "Aquila chrysaetos",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Golden_eagle",
//     genus: "Aquila",
//     species: "chrysaetos"
//   },
//   {
//     scientificName: "Falco peregrinus",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Peregrine_falcon",
//     genus: "Falco",
//     species: "peregrinus"
//   },
//   {
//     scientificName: "Pavo cristatus",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Indian_peafowl",
//     genus: "Pavo",
//     species: "cristatus"
//   },
//   {
//     scientificName: "Spheniscus mendiculus",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Gal%C3%A1pagos_penguin",
//     genus: "Spheniscus",
//     species: "mendiculus"
//   },
//   {
//     scientificName: "Strigops habroptilus",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Kakapo",
//     genus: "Strigops",
//     species: "habroptilus"
//   },
  
//   // Reptiles
//   {
//     scientificName: "Python reticulatus",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Reticulated_python",
//     genus: "Python",
//     species: "reticulatus"
//   },
//   {
//     scientificName: "Crocodylus niloticus",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Nile_crocodile",
//     genus: "Crocodylus",
//     species: "niloticus"
//   },
//   {
//     scientificName: "Chelonia mydas",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Green_sea_turtle",
//     genus: "Chelonia",
//     species: "mydas"
//   },
//   {
//     scientificName: "Varanus komodoensis",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Komodo_dragon",
//     genus: "Varanus",
//     species: "komodoensis"
//   },
  
//   // Amphibians
//   {
//     scientificName: "Salamandra salamandra",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Fire_salamander",
//     genus: "Salamandra",
//     species: "salamandra"
//   },
//   {
//     scientificName: "Dendrobates tinctorius",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Dyeing_dart_frog",
//     genus: "Dendrobates",
//     species: "tinctorius"
//   },
  
//   // Fish
//   {
//     scientificName: "Carcharodon carcharias",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Great_white_shark",
//     genus: "Carcharodon",
//     species: "carcharias"
//   },
//   {
//     scientificName: "Hippocampus kuda",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Yellow_seahorse",
//     genus: "Hippocampus",
//     species: "kuda"
//   },
//   {
//     scientificName: "Rhincodon typus",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Whale_shark",
//     genus: "Rhincodon",
//     species: "typus"
//   },
//   {
//     scientificName: "Latimeria chalumnae",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Coelacanth",
//     genus: "Latimeria",
//     species: "chalumnae"
//   },
  
//   // Insects
//   {
//     scientificName: "Danaus plexippus",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Monarch_butterfly",
//     genus: "Danaus",
//     species: "plexippus"
//   },
//   {
//     scientificName: "Apis mellifera",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Western_honey_bee",
//     genus: "Apis",
//     species: "mellifera"
//   },
//   {
//     scientificName: "Papilio machaon",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Old_World_swallowtail",
//     genus: "Papilio",
//     species: "machaon"
//   },
  
//   // Plants
//   {
//     scientificName: "Quercus alba",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Quercus_alba",
//     genus: "Quercus",
//     species: "alba"
//   },
//   {
//     scientificName: "Sequoia sempervirens",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Sequoia_sempervirens",
//     genus: "Sequoia",
//     species: "sempervirens"
//   },
//   {
//     scientificName: "Rosa gallica",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Rosa_gallica",
//     genus: "Rosa",
//     species: "gallica"
//   },
//   {
//     scientificName: "Ginkgo biloba",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Ginkgo_biloba",
//     genus: "Ginkgo",
//     species: "biloba"
//   },
//   {
//     scientificName: "Rafflesia arnoldii",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Rafflesia_arnoldii",
//     genus: "Rafflesia",
//     species: "arnoldii"
//   },
//   {
//     scientificName: "Victoria amazonica",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Victoria_amazonica",
//     genus: "Victoria",
//     species: "amazonica"
//   },
  
//   // Fungi
//   {
//     scientificName: "Amanita muscaria",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Amanita_muscaria",
//     genus: "Amanita",
//     species: "muscaria"
//   },
//   {
//     scientificName: "Boletus edulis",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Boletus_edulis",
//     genus: "Boletus",
//     species: "edulis"
//   },
  
//   // Marine Invertebrates
//   {
//     scientificName: "Octopus vulgaris",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Common_octopus",
//     genus: "Octopus",
//     species: "vulgaris"
//   },
//   {
//     scientificName: "Aurelia aurita",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Moon_jelly",
//     genus: "Aurelia",
//     species: "aurita"
//   },
  
//   // Extinct Species
//   {
//     scientificName: "Tyrannosaurus rex",
//     wikipediaUrl: "https://en.wikipedia.org/wiki/Tyrannosaurus",
//     genus: "Tyrannosaurus",
//     species: "rex"
//   }
// ];

// Combine original species with vertebrate species
export const speciesDatabase: Species[] = vertebrateSpecies
