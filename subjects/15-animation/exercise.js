////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Use TweenStateMixin to animate a sliding animation
// - Experiment with different types of easing (hint: use easingTypes at
//   https://github.com/chenglou/tween-functions/blob/master/index.js)
//
// Got more time?
//
// - Use a <Spring> to animate the transition
////////////////////////////////////////////////////////////////////////////////

var React = require('react/addons');
var easingTypes = require('react-tween-state').easingTypes;
var TweenStateMixin = require('react-tween-state').Mixin;
var { Spring } = require('react-motion');

var { number } = React.PropTypes;

require('./styles');

var ToggleSwitch = React.createClass({

  mixins: [ TweenStateMixin ],

  propTypes: {
    animationDuration: number
  },

  getDefaultProps() {
    return {
      animationDuration: 350
    };
  },

  getInitialState() {
    return {
      knobLeft: 0
    };
  },

  toggle() {
    this.tweenState('knobLeft', {
      duration: this.props.animationDuration,
      endValue: this.state.knobLeft === 0 ? 400 : 0
    });
  },

  handleClick() {
    this.toggle();
  },

  render() {
    console.log('render with tween value:' + this.getTweeningValue('knobLeft'));
    var knobStyle = {
      WebkitTransform: `translate3d(${this.getTweeningValue('knobLeft')}px,0,0)`,
      transform: `translate3d(${this.getTweeningValue('knobLeft')}px,0,0)`
    };

    return (
      <div>
        <p>{JSON.stringify(this.state)}</p>
        <p>{JSON.stringify(this.props)}</p>
        <div className="toggle-switch" onClick={this.handleClick}>
          <div className="toggle-switch-knob" style={knobStyle} />
        </div>
      </div>
    );
  }

});

React.render(<ToggleSwitch animationDuration={5000}/>, document.getElementById('app'));
