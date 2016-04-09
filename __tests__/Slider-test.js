import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';

const component = '../src/Slider';
jest.dontMock( component );
jest.dontMock('classnames');
const Slider = require( component );

describe('Slider', () => {

  it('should render with the "Slider" class', () => {

    const instance = renderIntoDocument(
      <Slider></Slider>
    );
    const node = findDOMNode(instance);
    expect( node.nodeName ).toEqual( 'DIV' );
    expect( node.className ).toContain( 'Slider' );

  });

  it('should render the first slide', () => {

    const instance = renderIntoDocument(
      <Slider>
        <div>Slide1</div>
        <div>Slide2</div>
        <div>Slide3</div>
      </Slider>
    );
    const node = findDOMNode(instance);
    expect( node.childNodes.length ).toEqual( 1 );
    expect( node.childNodes[0].nodeName ).toEqual( 'DIV' );
    expect( node.childNodes[0].textContent ).toEqual( 'Slide1' );

  });

  it('should render starting with the slide specified by "currentIndex"', () => {

    const instance = renderIntoDocument(
      <Slider currentIndex={1}>
        <div>Slide1</div>
        <div>Slide2</div>
        <div>Slide3</div>
      </Slider>
    );
    const node = findDOMNode(instance);
    expect( node.childNodes.length ).toEqual( 1 );
    expect( node.childNodes[0].nodeName ).toEqual( 'DIV' );
    expect( node.childNodes[0].textContent ).toEqual( 'Slide2' );

  });

  it('should call onSlideChange after slide change', () => {

    const onSlideChange = jest.genMockFunction();
    const element = renderIntoDocument(
      <Slider onSlideChange={onSlideChange}>
        <div>Slide1</div>
        <div>Slide2</div>
        <div>Slide3</div>
      </Slider>
    );

    expect( onSlideChange ).not.toBeCalled();

    element.next()

    expect( onSlideChange ).toBeCalled();

  });

  it('renders specified slide when goTo(index) is called', () => {

    const element = renderIntoDocument(
      <Slider currentIndex={0}>
        <div>Slide1</div>
        <div>Slide2</div>
        <div>Slide3</div>
      </Slider>
    );

    let slides = scryRenderedDOMComponentsWithClass(element, 'Slider__Slide');
    expect(slides[0].textContent).toBe('Slide1');

    element.goTo(2);

    slides = scryRenderedDOMComponentsWithClass(element, 'Slider__Slide');
    expect(slides[0].textContent).toBe('Slide3');

  });

  it('renders next slide when next() is called', () => {

    const element = renderIntoDocument(
      <Slider currentIndex={0}>
        <div>Slide1</div>
        <div>Slide2</div>
        <div>Slide3</div>
      </Slider>
    );

    let slides = scryRenderedDOMComponentsWithClass(element, 'Slider__Slide');
    expect(slides[0].textContent).toBe('Slide1');

    element.next();

    slides = scryRenderedDOMComponentsWithClass(element, 'Slider__Slide');
    expect(slides[0].textContent).toBe('Slide2');

  });


  it('renders prev slide when prev() is called', () => {

    let element = renderIntoDocument(
      <Slider currentIndex={1}>
        <div>Slide1</div>
        <div>Slide2</div>
      </Slider>
    );

    let slides = scryRenderedDOMComponentsWithClass(element, 'Slider__Slide');
    expect(slides[0].textContent).toBe('Slide2');

    element.previous();

    slides = scryRenderedDOMComponentsWithClass(element, 'Slider__Slide');
    expect(slides[0].textContent).toBe('Slide1');

  });

  it('changes slides automatically when the prop "interval" is set', () => {

    let interval = 1000;
    let slides = null;
    let expected = [ 'Slide1', 'Slide2', 'Slide3', 'Slide1' ];
    let element = renderIntoDocument(
      <Slider interval={ interval } >
        <div>Slide1</div>
        <div>Slide2</div>
        <div>Slide3</div>
      </Slider>
    );

    expect(setInterval.mock.calls.length).toBe(1);
    expect(setInterval.mock.calls[0][1]).toBe( interval );

    for ( let i = 0; i < expected.length; i++ ) {
      slides = scryRenderedDOMComponentsWithClass(element, 'Slider__Slide');
      expect(slides[0].textContent).toBe( expected[i] );
      jest.runOnlyPendingTimers();
    }

  });

  it('should accept custom classes without override', () => {

    const customClass = 'Custom';
    const instance = renderIntoDocument(
      <Slider className={customClass}>
      </Slider>
    );
    expect( findDOMNode(instance).className ).toContain( 'Slider' );
    expect( findDOMNode(instance).className ).toContain( customClass );

  });

  it('should accept custom styles', () => {

    const customStyle = { height: '400px' };
    const instance = renderIntoDocument(
      <Slider style={customStyle}>
      </Slider>
    );
    expect( findDOMNode(instance).style.height ).toEqual( customStyle.height );

  });

});
