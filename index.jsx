import React from 'react';
import ReactDOM from 'react-dom';
import style from './index.css';
import Draggable from '@joegesualdo/react-draggable';

const propTypes = {
  // Width of slider (in pixels)
  width: React.PropTypes.number,
  // color of line
  lineColor: React.PropTypes.string,
  onSlide: React.PropTypes.func,
  onStop: React.PropTypes.func,
  onStart: React.PropTypes.func,
  // range slider
  range: React.PropTypes.func,
  onSlideMin: React.PropTypes.func,
  onSlideMax: React.PropTypes.func,
  leftColor: React.PropTypes.string,
  rightColor: React.PropTypes.string,
};

const defaultProps = {
  width: 1000,
  lineColor: 'black',
  onSlide() { },
  onStart() { },
  onStop() { },
  range: false,
};

class ReactSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 0,
      width: props.width,
      height: undefined,
      sliderHandle: {
        width: 0,
        height: 0,
      },
      // range slider
      minPosition: 0,
      maxPosition: 30,
    };
  }

  componentDidMount() {
    const componentNode = ReactDOM.findDOMNode(this);
    const sliderHandleNode = componentNode.childNodes[1]
    const componentRect = componentNode.getBoundingClientRect();
    const sliderHandleRect = sliderHandleNode.getBoundingClientRect();
    this.setState({
      height: sliderHandleRect.height,
      sliderHandle: {
        width: sliderHandleRect.width,
        height: sliderHandleRect.height,
      }
    })
  }

  onSlideMin = (e) => {
    let pos = e.x
    let width = this.state.width - this.state.sliderHandle.width
    let percent = (pos/width).toFixed(2);
    pos = pos >= this.state.maxPosition ? this.state.minPosition : pos;
    this.setState({
      minPosition: pos,
    }, () => {
      this.props.onSlideMin({
        percent: percent,
        value: pos,
        min: 0,
        max: width,
      })
    })
  }
  
  onSlideMax = (e) => {
    let pos = e.x
    let width = this.state.width - this.state.sliderHandle.width
    let percent = (pos/width).toFixed(2);
    pos = pos <= this.state.minPosition ? this.state.maxPosition : pos;
    this.setState({
      maxPosition: pos,
    }, () => {
      this.props.onSlideMax({
        percent: percent,
        value: pos,
        min: 0,
        max: width,
      })
    })
  }

  onSlide = (e) => {
    let pos = e.x
    let width = this.state.width - this.state.sliderHandle.width
    let percent = (pos/width).toFixed(2);
    this.setState({
      position: pos, 
    }, () => {
      this.props.onSlide({
        percent: percent,
        value: pos,
        min: 0,
        max: width,
      })
    })
  }

  renderSlideLines() {
    let slideLinesJSX =[];
    if (!this.props.range) {
      slideLinesJSX.push(
        <div style={{
          width: this.state.position,
          backgroundColor: this.props.leftColor ? this.props.leftColor : this.props.lineColor,
          height: 4,
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'inline-block',
          // http://stackoverflow.com/questions/15561013/why-does-my-first-inline-block-element-have-space-above-it
          verticalAlign: 'top',
        }}>
        </div>
      )
      slideLinesJSX.push(
        <div style={{
          width: this.state.width - this.state.position - this.state.sliderHandle.width,
          backgroundColor: this.props.rightColor ? this.props.rightColor : this.props.lineColor,
          height: 4,
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'inline-block',
          // http://stackoverflow.com/questions/15561013/why-does-my-first-inline-block-element-have-space-above-it
          verticalAlign: 'top',
        }}>
        </div>
      )
    } else {
      slideLinesJSX.push(
        <div style={{
          width: this.state.minPosition,
          backgroundColor: this.props.leftColor ? this.props.leftColor : this.props.lineColor,
          height: 4,
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'inline-block',
          // http://stackoverflow.com/questions/15561013/why-does-my-first-inline-block-element-have-space-above-it
          verticalAlign: 'top',
        }}>
        </div>
      )
      slideLinesJSX.push(
        <div style={{
          width: this.state.width - this.state.minPosition - (this.state.width - this.state.maxPosition),
          backgroundColor: this.props.lineColor,
          height: 4,
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'inline-block',
          // http://stackoverflow.com/questions/15561013/why-does-my-first-inline-block-element-have-space-above-it
          verticalAlign: 'top',
        }}>
        </div>
      )
      slideLinesJSX.push(
        <div style={{
          width: (this.state.width - this.state.sliderHandle.width) - this.state.maxPosition,
          backgroundColor: this.props.rightColor ? this.props.rightColor : this.props.lineColor,
          height: 4,
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'inline-block',
          // http://stackoverflow.com/questions/15561013/why-does-my-first-inline-block-element-have-space-above-it
          verticalAlign: 'top',
        }}>
        </div>
      )
    }
    return slideLinesJSX;
  }

  renderDraggableIcons = () => {
    let draggableIconsJSX = [];
    if (this.props.range) {
      draggableIconsJSX.push(
        <Draggable
          axis='x'
          position={{x: this.state.minPosition, y: 0}}
          onDrag={this.onSlideMin}
          onStart={this.props.onStart}
          onStop={this.props.onStop}
        >
          {this.props.children}
        </Draggable>
      )
      draggableIconsJSX.push(
        <Draggable
          axis='x'
          position={{x: this.state.maxPosition, y: 0}}
          onDrag={this.onSlideMax}
          onStart={this.props.onStart}
          onStop={this.props.onStop}
        >
          {this.props.children}
        </Draggable>
      )
    } else {
      draggableIconsJSX.push(
        <Draggable
          axis='x'
          position={{x: this.state.position, y: 0}}
          onDrag={this.onSlide}
          onStart={this.props.onStart}
          onStop={this.props.onStop}
        >
          {this.props.children}
        </Draggable>
      )
    }
    return draggableIconsJSX;
  }

  render() {
    return (
      <div style={{width: this.state.width, height: this.state.height, backgroundColor: 'rgba(0,0,255,0)'}}>
        <div style={
          {
            width: (this.state.width - this.state.sliderHandle.width),
            backgroundColor: 'rgba(0,0,255,0)',
            height: this.state.height,
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
          }
        }>
          {this.renderSlideLines()}
        </div>
        {this.renderDraggableIcons()}
      </div>
    );
  }
}

ReactSlider.propTypes = propTypes;
ReactSlider.defaultProps = defaultProps;

export default ReactSlider;
