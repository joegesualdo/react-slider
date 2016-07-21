import Slider from './../index.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from '@joegesualdo/react-draggable';

ReactDOM.render(
  <div>
    <Slider
      width={300}
      leftColor='blue'
      rightColor='red'
      // onSlide={function(pos){console.log(pos)}}
      onStart={function(){console.log("Started!!!")}}
      onStop={function(){console.log("Stop!!!")}}
      onSlideMin ={function(pos){console.log(pos)}}
      onSlideMax ={function(pos){console.log(pos)}}
      range={true}
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
  </div>,
  document.querySelector('#app')
);



