import { css } from "styled-components";
import { Themes } from "./themes";
import Color from 'color';
import { Moment } from "moment";
import moment from "moment";

// ------------------------
// Math Functions:
// * degToRad: Converts degrees to radians.
// * radToDeg: Converts radians to degrees.
// * rotate: Rotates a point around the origin.
// * translate: Translates a point.
// * scale: Scales a value between two numbers.
// * normalize: Normalizes a value between 0 and 1.
// ------------------------

export const degToRad = (deg: number) => {
  return deg * (Math.PI / 180);
};

export const radToDeg = (rad: number) => {
  return rad * (180 / Math.PI);
};

export const rotate = (position: number[], angle: number) => {
	return [
		Math.cos(angle) * position[0] - Math.sin(angle) * position[1],
		Math.sin(angle) * position[0] + Math.cos(angle) * position[1]
	];
};

export const translate = (position: number[], x: number, y: number) => {
	return [
		position[0] + x,
		position[1] + y
	]
};

// scale values between two numbers
export const scale = (value: number, min: number, max: number) => {
  return min + value * (max - min);
};

// normalize values between 0 and 1
export const normalize = (value: number, min: number, max: number): number => {
  if (min === max) {
    return 0.5;
  }
  return (value - min) / (max - min);
};


// ------------------------
// Gradient Functions:
//  * gradientBorder: Creates a gradient border.
//  * interpolateGradient: Interpolates a gradient between two colors.
// ------------------------

export const gradientBorder = (gradientFrom: string, gradientTo: string, gradientStart: string = '0%', gradientStop: string = '100%',  size: string = "2px") => {
  return `
    position: relative;
    background-clip: padding-box;
    border: solid ${size} transparent;
    

    &:before {
      content: '';
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      z-index: -1;
      margin: -${size};
      border-radius: inherit;
      background: linear-gradient(to bottom, ${gradientFrom} ${gradientStart}, ${gradientTo} ${gradientStop});
    }
  `;
};

export const getGradients = (gradientFrom: string, gradientTo: string, start: number = 0, end: number = 100) => {
  return [
          (gradientFrom && gradientTo ? interpolateGradientInLinearRGB(gradientFrom, gradientTo, start / 100) : ''),
          (gradientFrom && gradientTo ? interpolateGradientInLinearRGB(gradientFrom, gradientTo, end / 100) : '') 
  ];
};

/**
 * Performs interpolation in linear RGB space. 
 * 1. Convert the sRGB -> linear RGB
 * 2. Interpolates between the two linear RGB colors multiplied by their alpha values
 * 3. Converts the interpolated linear RGB -> sRGB
 * 4. Multiplies the interpolated sRGB color by the interpolated alpha value
 * 
 * This approach ensures a more perceptually accurate interpolation of colors, 
 * as it takes into account the non-linear relationship between sRGB and linear RGB.
 */
export const interpolateGradientInLinearRGB = (gradientFrom: string, gradientTo: string, value: number): string => {
  const fromRGB = Color(gradientFrom).rgb().object();
  const toRGB = Color(gradientTo).rgb().object();
  const fromLinear = multiplyByAlpha({
    r: srgbToLinear(fromRGB.r / 255),
    g: srgbToLinear(fromRGB.g / 255),
    b: srgbToLinear(fromRGB.b / 255),
    alpha: fromRGB.alpha || 1,
  });
  const toLinear = multiplyByAlpha({
    r: srgbToLinear(toRGB.r / 255),
    g: srgbToLinear(toRGB.g / 255),
    b: srgbToLinear(toRGB.b / 255),
    alpha: toRGB.alpha || 1,
  });

  const interpolatedLinear = {
    r: fromLinear.r + (toLinear.r - fromLinear.r) * value,
    g: fromLinear.g + (toLinear.g - fromLinear.g) * value,
    b: fromLinear.b + (toLinear.b - fromLinear.b) * value,
    alpha: fromLinear.alpha + (toLinear.alpha - fromLinear.alpha) * value,
  };

  const interpolatedSRGB = divideByAlpha(interpolatedLinear);
  const interpolatedColor = {
    r: Math.round(linearToSRGB(interpolatedSRGB.r) * 255),
    g: Math.round(linearToSRGB(interpolatedSRGB.g) * 255),
    b: Math.round(linearToSRGB(interpolatedSRGB.b) * 255),
    alpha: interpolatedSRGB.alpha,
  };
  return Color(interpolatedColor).hex();
};

/**
 * This function directly interpolates the sRGB color values without any conversion
 * to linear RGB. This approach is simpler and faster but may result in less accurate 
 * interpolations perceptually.
 */
export const interpolateGradientInSRGB = (gradientFrom: string, gradientTo: string, value: number): string => {
  const fromRGB =  Color(gradientFrom).rgb().object();
  const toRGB = Color(gradientTo).rgb().object();

  const interpolatedColor = {
    r: Math.round(fromRGB.r + (toRGB.r - fromRGB.r) * value),
    g: Math.round(fromRGB.g + (toRGB.g - fromRGB.g) * value),
    b: Math.round(fromRGB.b + (toRGB.b - fromRGB.b) * value),
    alpha: (fromRGB.alpha || 1) + ((toRGB.alpha || 1) - (fromRGB.alpha || 1)) * value,
  };

  return Color(interpolatedColor).hex();
}

// ------------------------------------------------------------------------------------------------------------------------
// Color Functions:
// * multiplyByAlpha: Multiplies the RGB values by the alpha value.
// * divideByAlpha: Divides the RGB values by the alpha value.
// * sRGBToLinear: Converts an sRGB value to linear RGB.
// * linearToSRGB: Converts a linear RGB value to sRGB.
// * shortHandHexToFull: Converts a short hand hex color to full.
// * hexToRGB: Converts a hex color to RGB.
// * rgbToHex: Converts an RGB color to hex.
// * stringToColor: Converts a string to a color.
// ------------------------------------------------------------------------------------------------------------------------

// Multiply the RGB values by the alpha value
export const multiplyByAlpha = (color: any) => {
  return {
    r: color.r * color.alpha,
    g: color.g * color.alpha,
    b: color.b * color.alpha,
    alpha: color.alpha,
  };
};

// Divide the RGB values by the alpha value
export const divideByAlpha = (color: any) => {
  if (color.alpha === 0) {
    return { r: 0, g: 0, b: 0, alpha: 0 };
  }
  return {
    r: color.r / color.alpha,
    g: color.g / color.alpha,
    b: color.b / color.alpha,
    alpha: color.alpha,
  };
};

// Convert an sRGB value to linear RGB (gamma correction see https://en.wikipedia.org/wiki/SRGB)
// 0.5 -> 0.21404114048223255
export const srgbToLinear = (value: number) => {
  return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
};

// Convert a linear RGB value to sRGB (gamma correction see https://en.wikipedia.org/wiki/SRGB)
// 0.214 -> 0.49995554934020553
export const linearToSRGB = (value: number) => {
  return value <= 0.0031308 ? value * 12.92 : 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
};

// Expand shorthand hex form to full hex form
// 03F -> 0033FF
export const shortHandHexToFull = (hex: string) => {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (r, g, b) => {
    return r + r + g + g + b + b;
  });
  return hex;
};

// Convert a hex color to RGB/RGBA
export const hexToRGBA = (hex: string) => {
  hex = shortHandHexToFull(hex);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
  if (!result) return null;
  const alphaHex = result[4] ?? "ff";
  const alpha = parseInt(alphaHex, 16) / 255;
  return [    
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
    alpha,
  ];
};

// Convert an RGB/RGBA color to hex
export const rgbaToHex = (r: number, g: number, b: number, a: number = 1) => {
  const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  const alpha = Math.round(a * 255).toString(16).padStart(2, "0");
  return ("#" + hex + alpha).toUpperCase();
};

// Convert an RGB color to hex
export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

// ------------------------
// Date Functions:
//  * isDate(date): Check if a string is a date
//  * getDateInBetween(startDate, endDate): Get the date in between two dates
// ------------------------

// Check if a string is a date
export const isDate = (date: string) => {
  return moment(date).isValid();
};

// Get the date in between two dates
// 1/1/2020 - 2/1/2020 -> 1/16/2020
export const getDateInBetween = (startDate: string, endDate: string) => {
  const momentStartDate = moment(startDate);
  const momentEndDate = moment(endDate);
  const diff = momentEndDate.diff(momentStartDate, 'days');
  const dayInBetween = momentStartDate.add(Math.floor(diff / 2), 'days');
  return dayInBetween.format('YYYY-MM-DD');
};

// ------------------------
// String Functions:
//   * capitalize(str): Capitalize the first letter of a string.
//   * getName(name): Format an author's name to be in the form "FirstName MiddleName LastName" or "FirstName LastName".
//   * getInitials(name): Get initials from author string.
// ------------------------

// Capitalize the first letter of a string
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Format Format an author's name to be in the form "FirstName MiddleName LastName" or "FirstName LastName"
// David Silver -> David Silver
// david silver -> David Silver
// Silver, David -> David Silver
export const getFormattedName = (name: string) => {
    // Remove extra spaces and split the input string into words.
    let words = name.trim().replace(/\s+/g, ' ').split(' ');
    let lastNameIndex = words.findIndex(word => word.includes(','));
    if (lastNameIndex !== -1) {
      words[lastNameIndex] = words[lastNameIndex].replace(',', '');
      const lastName = words.splice(lastNameIndex, 1);
      words.push(...lastName);
    }
    return words.map(capitalize).join(' ');
};

// Get initials from author string
// David Silver -> DS
export const getInitials = (name: string) => {
  return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
};

// ------------------------------------------------------------------------------------------------------------------------
// URL Functions
//   * extractDomainComponents(urlString): Extracts the domain components of a URL.
//   * extractURL(urlString): Extracts the components of a URL.
//   * isURL(str): Check if a string is a URL.
// ------------------------------------------------------------------------------------------------------------------------
// URL Structure:
//  * protocol: The protocol of an URL determines how data is transferred between the host and a client.
//  * full_domain: Identifies the host that holds the resource.
//    * subdomain: Identifies the location of the resource on the Web server.
//    * domain: Identifies the name of the Website.
//    * top-level-domain (TLD): Identifies the Website geographical area, or the organization that owns it.
//  * path: Identifies the specific resource in the host that the client wants to access.
//  * query string: Identifies the specific resource in the host that the client wants to access.
//  * anchor: Identifies the specific location of the resource within a page of the Website.
// ------------------------------------------------------------------------------------------------------------------------
// Example:  https://www.google.com/dir/1/2/search.html?arg=0-a&arg1=1-b&arg3-c#hash
//  * protocol: https
//  * full domain: www.google.com
//    * subdomain: www
//    * domain name: google
//    * top-level-domain (TLD): .com
//  * path: /1/2/search.html
//  * query string: arg=0-a&arg1=1-b&arg3-c
//  * anchor: hash
// ------------------------------------------------------------------------------------------------------------------------

// Extracts the domain components from a URL
// Domain consists of the subdomain, domain, and top-level-domain (TLD)
export const extractDomainComponents = (fullDomain: string) => {
  const domainPattern = /^(?:(?<subdomain>(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+?)?(?<domain>[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\.(?<tld>[a-z]{2,}))$/i;
  const match = fullDomain.match(domainPattern);

  if (!match) {
    return null;
  }

  const domainComponents = {
    subdomain: match.groups?.subdomain || '',
    domain: match.groups?.domain || '',
    tld: match.groups?.tld || '',
  };

  return domainComponents;
};

// Extracts the URL from a string
export const extractURL = (urlString: string) => {
  const urlPattern = /^(?:(https?):\/\/)?((?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+?[a-z]{2,}|(?:\d{1,3}\.){3}\d{1,3})(?::(\d{2,5}))?(\/[^\s#?]*)?(?:\?([^#\s]*))?(?:#([^\s]*))?$/i;
  const match = urlString.match(urlPattern);
  if (!match) {
    return null;
  }
  const fullDomain = match[2];
  const domainComponents = extractDomainComponents(fullDomain);

  const url = {
    protocol: match[1] || '',
    port: match[3] || '',
    path: match[4] || '',
    query_string: match[5] || '',
    anchor: match[6] || '',
    full_domain: fullDomain,
    ...domainComponents, // subdomain, domain, tld
  };

  return url;
};

// Checks if a string is a valid URL
export const isURL = (
  str: string,
) => {
  const url = extractURL(str);
  return url !== null;
}
