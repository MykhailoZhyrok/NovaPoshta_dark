import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={props.width}
    height={props.height}
    viewBox="0 0 15.273 15.273"
    
  >
    <Path
      d="M0 1.803h.897V13.47H0V1.803zM1.446 13.47h.505V1.803h-.505V13.47zm.869 0h.504V1.803h-.504V13.47zm1.167 0h1.104V1.803H3.482V13.47zm1.988 0h.552V1.803H5.47V13.47zm1.408 0h2.288V1.803H6.878V13.47zm5.962 0h.752V1.803h-.752V13.47zm1.408-11.667V13.47h1.025V1.803h-1.025zM10.084 13.47h.492V1.803h-.492V13.47zm1.197 0h.492V1.803h-.492V13.47z"
      style={{
        fill: "#030104",
      }}
    />
    
  </Svg>
)

export default SvgComponent
