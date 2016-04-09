import React from 'react';
import classnames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Slider.scss';

function getClassName(direction, className) {
  return classnames(
    'Slider',
    'Slider--' + direction,
    className
  );
}

function getSlides(currentIndex, children) {
  return React.Children.map( children, (slide, key) => {
    return currentIndex === key ? React.cloneElement(slide, { className: classnames('Slider__Slide', slide.props.className) }) : null;
  });
}

export default React.createClass({

  /*  Properties  */

  displayName: 'Slider',

  propTypes: {
    className: React.PropTypes.string,
    currentIndex: React.PropTypes.number,
    interval: React.PropTypes.number,
    onSlideChange: React.PropTypes.func,
    style: React.PropTypes.object,
    transitionDuration: React.PropTypes.number
  },

  /* Lifecycle */

  getDefaultProps() {
    return {
      currentIndex: 0,
      interval: 0,
      transitionDuration: 0
    };
  },

  getInitialState() {
    return {
      currentIndex: this.props.currentIndex,
      direction: 'next'
    };
  },

  componentDidMount() {
    if ( this.props.interval > 0 ) {
      setInterval(this.next, this.props.interval);
    }
  },

  render() {
    const transitionName = {
      enter: 'Slider__Slide--enter',
      leave: 'Slider__Slide--leave'
    };
    return (
      <ReactCSSTransitionGroup
        {...this.props}
        component="div"
        transitionName={transitionName}
        transitionEnterTimeout={this.props.transitionDuration}
        transitionLeaveTimeout={this.props.transitionDuration}
        className={ getClassName(this.state.direction, this.props.className) } >
        { getSlides(this.state.currentIndex, this.props.children) }
      </ReactCSSTransitionGroup >
    );
  },

  /* Custom */

  goTo(index) {
    const direction = index > this.state.currentIndex ? 'next' : 'previous';

    index = index < this.props.children.length ? index : 0;
    index = index >= 0 ? index : this.props.children.length - 1;

    this.setState({
      currentIndex: index,
      direction: direction
    });

    if ( this.props.onSlideChange ) {
      return this.props.onSlideChange(index);
    }
  },

  next() {
    this.goTo(this.state.currentIndex + 1)
  },

  previous() {
    this.goTo(this.state.currentIndex - 1)
  }

});
