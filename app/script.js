import React from 'react';
import { render } from 'react-dom';
//import AppDescription from './AppDescription';

const formatTime = (time) => {
  let minutes = Math.floor(time/60);
  let seconds = time%60;
  if(minutes < 10){
    minutes = '0' + minutes;
  }
  if(seconds < 10){
    seconds = '0' + seconds;
  }
  const parsedTime = minutes + ':' + seconds;
  return parsedTime
}



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'off',
      time: 5,
      timer: null,
    };
  }

  render() {

    const {status, time, timer} = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {/*<AppDescription />*/}
        {(status === 'off') && <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>}
        {(status === 'work') ? <img src="./images/work.png" /> : ''}
        {(status === 'rest') ? <img src="./images/rest.png" /> : ''}
        {(status !== 'off') ? <div className="timer">{formatTime(time)}</div> : ''}
        {(status === 'off') ? <button className="btn" onClick={this.startTimer.bind(this)}>Start</button> : ''}
        {(status !== 'off') ? <button className="btn" onClick={this.stopTimer.bind(this)}>Stop</button> : ''}
        <button className="btn btn-close"  onClick={this.closer}>X</button>
      </div>
    )
  }

  startTimer() {
    this.setState({
      timer: setInterval(this.step.bind(this), 1000),
      status: 'work',
    });
  };

  stopTimer() {
    clearInterval(this.state.timer);
    this.setState({
      time: 5,
      status: 'off'
    });
  };
  
  step() {
    let audioElement = new Audio('sounds/bell.wav');
    this.setState({
      time: this.state.time - 1,
    })
    let currentTime = this.state.time;

    if(currentTime < 0){
      switch (this.state.status) {

        case 'work':
        audioElement.play();
        this.setState({
          status: 'rest',
          time: 7,
        })
        break

        case 'rest':
        audioElement.play();
        this.setState({
          status: 'work',
          time: 5,
        })
        break
      }
    }
  };

  closer() {
    window.close();
  };
};

render(<App />, document.querySelector('#app'));

