export function convertMethaneToCO2(methaneVolumeM3) {
    const methaneToCO2eFactor = 0.01904; // MTCO2e per cubic meter of methane
    const co2EmissionsTonnes = methaneVolumeM3 * methaneToCO2eFactor;
    return co2EmissionsTonnes;
  }
export function calculateCO2ReductionFromTrees(treesPerHectare, areaHectares) {
    const numberOfTrees = treesPerHectare * areaHectares;
    const co2PerTreeKg = 24; // CO2 absorbed per tree in kg
    const totalCO2Kg = numberOfTrees * co2PerTreeKg;
    return totalCO2Kg/1000; // Kg to tonnes
  }