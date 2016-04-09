# react-basic-slider

A slider with basic markup, easy to style.

## Demo

http://alexjoffroy.github.io/react-basic-slider/example/

## Usage

### Install
```
npm install --save react-basic-slider
```

### Properties
|    Property    | Type |          Description          | Default value | Required |
| -------------  | ---- |          -----------          | ------------- | -------- |
| className      | string | Custom classname for the component | _ | no |
| currentIndex   | number | Index of the first slide to display on render | 0 | no |
| interval       | number | Delay (ms) between each slide. Set to 0 to disable autoloop | 0 | no |
| onSlideChange  | function | Closure when changing slide, called with state.currentIndex as argument | _ | no |
| style          | object | Custom styles | {} | no |
| transitionDuration | number | Duration (ms) of the transition when changing slide | 0 | no |

### Methods
|    Method      |                Description              |
| -------------  |                -----------              |
| goTo(index)    | Displays the specified slide            |
| next()         | Shortcut to display the next slide      |
| previous()     | Shortcut to display the previous slide  |

### Example
```javascript
<Slider
  style={ { height: '400px' } }
  transitionDuration={500}
  interval={2000} >
  <div>Slide1</div>
  <div>Slide2</div>
  <div>Slide3</div>
</Slider>
```

You'll also have to include the CSS or SCSS file in your project.
See example to get more details.

## Development
Clone the repository:
```
git clone https://github.com/the-cormoran/react-basic-slider.git
```
Install dependencies:
```
cd react-fitted-image && npm install
```
Commands:
```shell
npm run lib       # build the lib
npm run example   # build the example
npm run test      # run the tests
npm run lint      # lint the code
npm run build 	  # run lint, test, and lib in order to publish the package
```
