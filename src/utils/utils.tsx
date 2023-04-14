export const isDate = (value: unknown) => {
  return isObject(value) && (value instanceof Date || Object.prototype.toString.call(value) === "[object Date]");
}

export const isObject = (value: unknown) => {
  return typeof value == "object" && value !== null;
}

export const range = (start: number, stop: number, step: number = 1) => Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step);

export const slice = (array: any[], start: number, stop: number, step: number = 1) => {
  let newArray = [...array].slice(start, stop);
  newArray = newArray.filter((_, index) => index % step === 0);
  return newArray;
};

// Extract the site name from a URL
export const extractName = (url: string) => {
  let site = url.replace(/^https?:\/\//i, "");
  site = site.replace(/^www\./i, "");
  site = site.split(".")[0];
  return site;
};

// Generate a random number using a Gaussian distribution
export const gaussianRand = (mean: number = 0, stdDev: number = 1) => {
  let u = 0, v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  const normalDist = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return (normalDist * stdDev) + mean;
};

// normalize values between 0 and 1
export const normalize = (value: number, min: number, max: number) => {
  return min + value * (max - min);
};