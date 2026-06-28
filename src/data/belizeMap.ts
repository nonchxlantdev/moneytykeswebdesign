/** Belize outline derived from Natural Earth boundary data (simplified for web). */

export const BELIZE_VIEWBOX = { width: 100, height: 130 } as const

export const BELIZE_BOUNDS = {
  minLon: -89.2164,
  maxLon: -87.7789,
  minLat: 15.889851,
  maxLat: 18.489902,
} as const

/** Simplified mainland SVG path in BELIZE_VIEWBOX coordinates. */
export const BELIZE_OUTLINE =
  'M58.33,0.38 L63.78,0.37 L64.62,1.75 L62.43,3.46 L62.66,6.3 L78.25,5.87 L79.2,13.73 L78.35,18.81 L74.29,26.06 L70.54,29.99 L68.9,38.71 L65.04,42.7 L67.3,51.23 L64.19,60.29 L63.8,65.37 L64.9,69.23 L68.42,71.28 L70.1,76.06 L65.46,79.31 L63.63,92.18 L60.02,99.39 L59.05,99.39 L60.46,94.35 L57.2,97.4 L57.6,100.02 L47.75,109.58 L39.35,110.49 L33.05,113.56 L29.54,118.53 L20.17,125.22 L21.29,129.79 L3.48,128.93 L0.04,129.98 L4.98,73.8 L5.12,26.7 L13.31,24.19 L16.28,26.26 L26.1,29.31 L33.98,21.77 L37.24,15.23 L42.88,12.72 L43.74,9.68 L50.5,1.01 L58.33,0.38 Z'

export function projectBelizeCoords(lon: number, lat: number): { x: number; y: number } {
  const pad = 0.02
  const { width: w, height: h } = BELIZE_VIEWBOX
  const { minLon, maxLon, minLat, maxLat } = BELIZE_BOUNDS

  return {
    x: +(((lon - minLon) / (maxLon - minLon)) * (w - 2 * pad) + pad).toFixed(2),
    y: +(((maxLat - lat) / (maxLat - minLat)) * (h - 2 * pad) + pad).toFixed(2),
  }
}
