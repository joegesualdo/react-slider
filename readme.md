## react-slider [![Build Status](https://travis-ci.org/joegesualdo/react-slider.svg?branch=master)](https://travis-ci.org/joegesualdo/react-slider)
> A slider implemented in React.

## Install
```
$ npm install --save @joegesualdo/react-slider 
```

![react-slider-demo](https://github.com/joegesualdo/react-slider/raw/master/demo.gif)

## Usage
```javascript
import Slider from '@joegesualdo/react-slider'

<Slider
  width={300}
  onSlide={function(pos){console.log(pos)}}
  onStart={function(){console.log("Started!!!")}}
  onStop={function(){console.log("Stop!!!")}}
>
  <div style={
    {
      border: '1px solid #aaa',
      background: '#fff',
      borderRadius: '100%',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      height: 24,
      outline: 'none',
      width: 24,
    }
  }></div>
</Slider>
```

## Test
```
$ npm test
```
## Build
```
$ npm run build
```

## Related
- [react-range-slider](https://github.com/joegesualdo/react-slider) - A slider for selecting a range (min & max).

## License
MIT © [Joe Gesualdo]()
