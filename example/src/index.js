import React from 'react';
import { render } from 'react-dom';
import Slider from '../../lib/react-basic-slider.js';
import './index.scss';

const App = React.createClass({

  prev() {
    return this.refs.slider.previous();
  },

  next() {
    return this.refs.slider.next();
  },

  render() {
    return (
      <div className="App">
        <h1>Slider with controls</h1>
        <Slider
          className="Slider--1"
          transitionDuration={500}
          ref="slider" >
          <div key="1" className="Slider__Slide--1">Slide1</div>
          <div key="2"  className="Slider__Slide--2">Slide2</div>
          <div key="3"  className="Slider__Slide--3">Slide3</div>
        </Slider>
        <button onClick={this.prev}>Prev</button>
        <button onClick={this.next}>Next</button>
        <h1>Slider with autoloop</h1>
        <Slider
          className="Slider--2"
          transitionDuration={500}
          interval={2000}
          ref="slider2" >
          <div key="1" className="Slider__Slide--1">Slide1</div>
          <div key="2"  className="Slider__Slide--2">Slide2</div>
          <div key="3"  className="Slider__Slide--3">Slide3</div>
        </Slider>
      </div>
    );
  }

})

render(<App />, document.getElementById('app'));
