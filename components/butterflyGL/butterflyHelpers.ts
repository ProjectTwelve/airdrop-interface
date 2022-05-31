/**
 * default prop values
 */
const defaultProperties = {
  theme1: {
    blendRatio: 0.3,
    rgbOffset: 0,
    bloomAmount: 0.3,
    bloomRadius: 0.3,
    baseColorHex: 0x0e142c,
    color1Hex: 0xa011ff,
    color2Hex: 0xff9e76,
    particleMouseForce: 0.005,
    scatterDivider: 0.3,
    scatterDividerPowInv: 0.02,
    pulseDuration: 48,
    pulseIntervalRatio: 0.5,
  },
};

/**
 * helper function definitions
 */
const decideOneRandomChoice = (choices: any[]) => {
  return choices[Math.floor(Math.random() * choices.length)];
};

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getInputXY = (evt: any, wall: any) => {
  const rect = wall!.getBoundingClientRect();
  return {
    x: ((evt.clientX - rect.left) / rect.width) * 2 - 1,
    y: 1 - ((evt.clientY - rect.top) / rect.height) * 2,
  };
};

const resetParams = (defaultProperties: any, properties: any) => {
  Object.assign(properties, defaultProperties);
};

const startParamDrift = (defaultProperties: any, properties: any) => {
  const choices = ['dec', 'inc', 'other'];
  const colorParams = ['baseColorHex', 'color1Hex', 'color2Hex'];
  const invertibles = ['rgbOffset', 'bloomRadius'];
  const params = Object.keys(defaultProperties);
  for (let param of params) {
    let choice = decideOneRandomChoice(choices);
    switch (choice) {
      case 'dec':
        console.log(`dec before and after ${param} ${properties[param]}`);
        if (!colorParams.includes(param)) {
          properties[param] = properties[param] / 2;
        }
        break;
      case 'inc':
        console.log(`inc before and after ${param} ${properties[param]}`);
        if (!colorParams.includes(param)) {
          properties[param] = properties[param] * 2;
        }
        break;
      case 'other':
        let averageStrenth = 3;
        if (param === 'baseColorHex') {
          averageStrenth = 9;
        } else if (colorParams.includes(param)) {
          properties[param] = Math.floor(
            (averageStrenth * getRandomInt(0x0, 0xffffff) + properties[param]) / (averageStrenth + 1),
          );
        } else if (invertibles.includes(param)) {
          properties[param] = properties[param] * -1;
        }
        break;
      default:
    }
    /**
     * We implement here 'revert to default' mechanism, when param goes too extreme
     */
    // not needed for colorparams
    if (colorParams.includes(param)) {
      continue;
    }
    // when param goes too extreme, revert at 80% chance
    if (Math.random() < 0.8) {
      if (Math.abs(properties[param]) > Math.abs(defaultProperties[param] * 64)) {
        properties[param] = defaultProperties[param] * 4;
      } else if (Math.abs(properties[param]) < Math.abs(defaultProperties[param] / 64)) {
        properties[param] = defaultProperties[param] / 4;
      }
    }
  }
  const presentValues = params.reduce((prev: any, cur) => {
    prev[cur] = properties[cur];
    return prev;
  }, {});
  console.log('Param drifting');
  console.log(JSON.stringify(presentValues));
};

const getTouchBound = (fn: any) => {
  return function (evt: any) {
    if (evt.preventDefault) evt.preventDefault();
    fn.call(null, evt.changedTouches[0] || evt.touches[0]);
  };
};

const render = (hpgButterfly: any, time: any) => {
  const newTime = +new Date() / 1000;
  const deltaTime = newTime - time;
  hpgButterfly.render(deltaTime);
  return newTime;
};

const butterflyHelpers = {
  defaultProperties,
  decideOneRandomChoice,
  getRandomInt,
  getInputXY,
  startParamDrift,
  resetParams,
  getTouchBound,
  render,
};
export default butterflyHelpers;
