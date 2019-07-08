import React from "react";

export default class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.draw = this.draw.bind(this);
  }

  draw() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 300, 300);
    ctx.font = "9em Archivo Black";
    const lineWidth = 25;
    const borderWidth = 5;
    const margin = 5;
    let width = canvas.getBoundingClientRect().width - margin;
    let radius = width / 2;

    //Shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "rgba(0 0, 0, 0.25)";
    ctx.beginPath();
    ctx.ellipse(
      radius + margin / 2,
      radius + 7,
      radius - borderWidth,
      radius - borderWidth,
      1.5 * Math.PI,
      0,
      2 * Math.PI
    );
    ctx.fill();

    //Bottom dial
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.ellipse(
      radius + margin / 2,
      radius,
      radius - borderWidth,
      radius - borderWidth,
      1.5 * Math.PI,
      0,
      2 * Math.PI
    );
    ctx.fill();

    //Base RIng
    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(radius + margin / 2, radius, radius - borderWidth, 0, 2 * Math.PI);
    ctx.stroke();

    //Progess Ring
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.strokeStyle = "cornflowerblue";
    ctx.ellipse(
      radius + margin / 2,
      radius,
      radius - borderWidth * 4,
      radius - borderWidth * 4,
      1.5 * Math.PI,
      0,
      2 * this.props.fraction * Math.PI
    );

    //Timer Display
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.stroke();
    ctx.fillText(this.props.seconds, radius, radius);

    //Instructions
    ctx.font = "1em Archivo Black";
    ctx.fillText("TOUCH TO START", radius, radius + 60);
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  render() {
    return <canvas ref="canvas" width="300" height="300" />;
  }
}
