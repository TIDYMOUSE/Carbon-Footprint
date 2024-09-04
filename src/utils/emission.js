import data from "../constants/emission.json";
export function annualCO2inMilTonnes(
  yearly_production,
  coal_type,
  yearly_exclusion_factor = null,
  conversion_factor = null,
  CO2_emission_factor = null
) {
  // TODO: React toastify ( plus this error shouldn't happen as we are using drop down menu )
  if (!data[coal_type]) throw new Error("Invalid Coal Type");

  if (!yearly_exclusion_factor)
    yearly_exclusion_factor = data[coal_type].exclusionFactor;
  if (!conversion_factor)
    conversion_factor = data[coal_type].conversionFactorTJ_kt;
  if (!CO2_emission_factor)
    CO2_emission_factor = data[coal_type].co2EmissionFactor_kg_CO2_TJ;

  return (
    (yearly_production *
      (1 - yearly_exclusion_factor) *
      conversion_factor *
      CO2_emission_factor) /
    10_00_000
  );
}
export function CO2ByTransport(mode, tonnes, distance) {
  if (mode === "Truck") {
    return 2.6444 * distance * tonnes;
  } else return 2.64 * distance * tonnes;
}