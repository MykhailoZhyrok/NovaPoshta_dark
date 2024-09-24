import * as React from "react";
import Svg, { Defs, G, Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="175mm"
    height="175mm"
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    viewBox="0 0 3750 1500" 
    {...props}
  >
    <Defs></Defs>
    <G id="Layer_1" transform="translate(0, -1000)"> 
      <G id="g4203">
        <Path
          id="path3461"
          d="M2584 1345c6-2 14 2 22 13l362 352c21 21 21 53 0 69l-362 358c-8 10-16 13-22 10s-10-13-10-26v-753c0-13 4-21 10-23z"
          className="fil0"
        />
        <Path
          id="path3463"
          d="M1965 758h26l24 10 373 369c16 21 10 36-16 36h-155c-26 0-48 22-48 48v274c0 26-21 47-53 47h-271c-27 0-48-21-48-47v-274c0-26-21-48-48-48h-165c-27 0-32-15-16-36l373-369 24-10z"
          className="fil0"
        />
        <Path
          id="path3465"
          d="M1382 1337c6 4 10 13 10 26v768c0 14-4 22-10 24-7 3-16 0-27-8l-367-368c-21-16-21-48 0-69l367-363c11-10 20-13 27-10z"
          className="fil0"
        />
        <Path
          id="path3467"
          d="M1845 1942h271c32 0 54 21 54 48v289c0 32 21 53 47 53h144c27 0 37 15 16 31l-362 363c-11 11-24 16-37 16s-27-5-37-16l-362-363c-22-16-11-31 15-31h155c27 0 48-21 48-53v-289c0-27 21-48 48-48z"
          className="fil0"
        />
      </G>
    </G>
  </Svg>
);

export default SvgComponent;
