/**
 * default prop values
 */
const defaultProperties = {
  blendRatio: 3.6,
  rgbOffset: 0,
  bloomAmount: 1.6,
  bloomRadius: 1.6,
  baseColorHex: 0x0,
  color1Hex: 0xa011ff,
  color2Hex: 0xff9e76,
  // particleMouseForce: 0.001,
  scatterDivider: 32,
  scatterDividerPowInv: 0.5,
  pulseDuration: 48,
  pulseIntervalRatio: 48,
};

const getInputXY = (evt: any, wall: any) => {
  const rect = wall!.getBoundingClientRect();
  return {
    x: ((evt.clientX - rect.left) / rect.width) * 2 - 1,
    y: 1 - ((evt.clientY - rect.top) / rect.height) * 2,
  };
};

const decideOneRandomChoice = (choices: string[]) => choices[Math.floor(Math.random() * choices.length)];

const startParamDrift = (defaultProperties: Record<string, number>, properties: Record<string, number>) => {
  const choices = ['dec', 'inc', 'other'];
  const excludeParams = ['baseColorHex', 'color1Hex', 'color2Hex', 'scatterDividerPowInv', 'scatterDivider'];
  const invertibles = ['bloomRadius', 'bloomAmount'];
  const params = Object.keys(defaultProperties);
  params.map((param) => {
    const choice = decideOneRandomChoice(choices);
    switch (choice) {
      case 'dec':
        if (excludeParams.indexOf(param) === -1) {
          properties[param] = properties[param] / 2;
        }
        break;
      case 'inc':
        if (excludeParams.indexOf(param) === -1) {
          properties[param] = properties[param] / 2;
        }
        break;
      case 'other':
        if (invertibles.includes(param)) {
          properties[param] = properties[param] * -1;
        }
        break;
      default:
        break;
    }
    if (Math.random() < 0.8 && excludeParams.indexOf(param) === -1) {
      if (Math.abs(properties[param]) > Math.abs(defaultProperties[param] * 64)) {
        properties[param] = defaultProperties[param] * 4;
      } else if (Math.abs(properties[param]) < Math.abs(defaultProperties[param] / 64)) {
        properties[param] = defaultProperties[param] / 4;
      }
    }
  });
  return properties;
};

const butterflyHelpers = {
  defaultProperties,
  startParamDrift,
  getInputXY,
};
export default butterflyHelpers;
