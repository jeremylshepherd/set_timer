import React from "react";
import Timer from "./Timer";

export default class Main extends React.Component {
  state = {
    name: "APP",
    sets: 0,
    seconds: 60,
    rest: 60,
    fraction: 0,
    editing: false,
    active: false
  };

  timerStop = () => {
    console.log("Timer stopped");
    clearInterval(this.timer);
    this.setState({ active: !this.state.active });
  };

  // Open/Close Rest Period input box
  toggleRest = () => {
    this.setState({ editing: !this.state.editing });
  };

  // Set Rest Period Update
  updateRest = e => {
    let value = parseInt(e.target.value);
    value = value > 300 ? 300 : value < 0 ? 0 : value;
    this.setState({ rest: value, seconds: value });
  };

  runClock = () => {
    let rest = this.state.rest; //Rest period
    let seconds = this.state.seconds; //Countdown seconds for the display
    let i = 0; //counter to decrement seconds on every 100th interval
    const fps = 50; //Frames per Second
    const interval = 1000 / fps;
    this.timer = setInterval(() => {
      //If starting, immediately set to next second to avoid extra second in countdown
      seconds = seconds === rest ? seconds - 1 : seconds;
      this.setState({ seconds });

      //Set seconds & rest to a multiple of 100 to offset the 10ms interval
      seconds = seconds * fps;
      seconds = seconds - i;
      rest = rest * fps;
      let fraction = (1.0 - seconds / rest).toPrecision(6);

      //Rest them to original-ish state
      seconds = Math.ceil(seconds / fps);
      rest = rest / fps;

      //if seconds get below 1, terminate; else keep counting down
      if (this.state.seconds <= 0) {
        this.timerStop();
        this.setState({ seconds: this.state.rest, fraction: 0 });
      } else {
        //Once i gets to 99, decrement seconds and reset i to zero
        if (i === fps - 1) {
          this.setState({
            seconds: seconds--
          });
          i = 0;
        }

        //Update fraction on every interval
        this.setState({
          fraction: fraction
        });
      }
      i++;
    }, interval);
  };

  // Start Timer, run countdown sequence if not already running
  countDown = () => {
    this.setState({ active: !this.state.active });
    if (!this.state.active) {
      this.runClock();
    } else {
      this.timerStop();
    }
  };

  setDone = () => {
    if (this.state.seconds === this.state.rest) {
      this.setState({
        sets: this.state.sets + 1
      });
    }
    this.countDown();
  };

  reset = () => {
    this.setState({
      sets: 0,
      seconds: this.state.rest,
      fraction: 0
    });
    clearInterval(this.timer);
  };

  render() {
    return (
      <div className="app">
        <div className="header">
          <h1 className="title">Set Counter/Rest Timer</h1>
        </div>
        <div id="viz">
          <h2 className="data">{`Sets: ${this.state.sets}`}</h2>
          <span id="timer_span" onClick={this.setDone}>
            <Timer
              fraction={this.state.fraction}
              seconds={this.state.seconds}
            />
          </span>
          <div className="rest">
            {this.state.editing ? (
              <React.Fragment>
                <h2 className="data">Rest: </h2>
                <input
                  type="number"
                  value={this.state.rest}
                  onChange={this.updateRest}
                  min={1}
                  step={1}
                />
                <span className="button start" onClick={this.toggleRest}>
                  CLOSE
                </span>
              </React.Fragment>
            ) : (
              <h2 className="data" onClick={this.toggleRest}>{`Rest: ${
                this.state.rest
              }`}</h2>
            )}
          </div>
        </div>
        <span className="button reset" onClick={this.reset}>
          RESET
        </span>
      </div>
    );
  }
}
