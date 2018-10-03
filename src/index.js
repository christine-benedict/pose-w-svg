import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import posed from "react-pose";
import { tween } from "popmotion";
import { interpolate } from "flubber";
import "./styles.css";

const paths = {
  state:
    "M442.6,145.8l-3.7,46.3l-3.9,45.2l-17.1-1.6l-34.2-3.8l-17.1-2.2l-17.1-2.4l-33.9-5.9l3.7-21.8 l9.3-55.8l-0.5-0.5l0.4-0.8l1.8-11.4l31.5,4.8l24.9,3.6l28.9,3.3L442.6,145.8z"
};

const pathIds = Object.keys(paths);

const transition = {
  duration: 700,
  ease: [0.08, 0.69, 0.2, 0.99]
};

const Icon = posed.path(
  pathIds.reduce(
    (config, id) => {
      config[id] = {
        d: paths[id]
      };
      return config;
    },
    {
      hoverable: true,
      pressable: true,
      init: {
        scale: 1,
        x: 0,
        y: 0
      },
      hover: {
        scale: 1.02,
        x: -10,
        y: -10,
        transition: transition
      },
      hoverEnd: {
        scale: 1,
        x: 0,
        y: 0
      }
    }
  )
);

class Example extends React.Component {
  state = { pathIndex: 0 };

  render() {
    return (
      <Fragment>
        <svg viewBox="0 0 1000 1000">
          <defs>
            <filter id="dropshadow" height="130%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="2" dy="2" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <Icon
            pose={pathIds[this.state.pathIndex]}
            filter="url(#dropshadow)"
            fill="#000000"
          />
        </svg>
      </Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Example />, rootElement);

// Icons by Google
// https://www.flaticon.com/packs/material-design
