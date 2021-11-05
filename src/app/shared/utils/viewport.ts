export interface ViewPortInfo {
  width: any;
  height: any;
  view: string;
}

export enum BreakpointsApp {
  IPHONE12 = 'Iphone 12',
  IPHONEX = 'Iphone X',
  IPHONE8PLUS = 'Iphone 8 Plus',
}

export function getBreakpoints(breakpoints: BreakpointsApp | string): ViewPortInfo {
  // console.log("getBreakpoints "+ typeof breakpoints+" "+JSON.stringify(BreakpointsApp[breakpoints]));
  const brr = BreakpointsApp[breakpoints] === undefined ? breakpoints : BreakpointsApp[breakpoints];
  switch (brr) {
      case BreakpointsApp.IPHONE12:
        return {width: 390, height: 844, view: 'Iphone 12'};
      case BreakpointsApp.IPHONEX:
        return {width: 375, height: 812, view: 'Iphone X'};
      case BreakpointsApp.IPHONE8PLUS:
        return {width: 414, height: 736, view: 'Iphone 8 Plus'};
  }
}
