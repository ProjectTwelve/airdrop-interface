/**
 * default prop values
 */
const defaultProperties = {
  blendRatio: 2.4,
  rgbOffset: 0,
  bloomAmount: 1.6,
  bloomRadius: 1.6,
  baseColorHex: 0x0,
  color1Hex: 0xa011ff,
  color2Hex: 0xff9e76,
  // particleMouseForce: 0.001,
  // scatterDivider: 32,
  scatterDividerPowInv: 0.5,
  pulseDuration: 48,
  // pulseIntervalRatio: 0.5,
};

const getInputXY = (evt: any, wall: any) => {
  const rect = wall!.getBoundingClientRect();
  return {
    x: ((evt.clientX - rect.left) / rect.width) * 2 - 1,
    y: 1 - ((evt.clientY - rect.top) / rect.height) * 2,
  };
};

const butterflyHelpers = {
  defaultProperties,
  getInputXY,
};
export default butterflyHelpers;
