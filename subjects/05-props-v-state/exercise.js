////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make tabs a "pure component" by not managing any of its own state, instead
// add a property to tell it which tab to show, and then have it communicate
// with its owner to get rerendered with a new active tab.
//
// Why would you move that state up? you might have a workflow where they can't
// progress from one step to the next until they've completed some sort of task
// but they can go back if they'd like. If the tabs keep their own state you
// can't control them with your application logic.
//
// Already done?
//
// Now put state back into the tabs (so that they can be used w/o a the owner
// being required to manage state) and synchronize the state between the App
// and Tabs.
////////////////////////////////////////////////////////////////////////////////

var React = require('react');
var styles = require('./lib/styles');
var data = require('./lib/data');

var Tabs = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
    activeTabIndex: React.PropTypes.number
  },

  handleTabClick(activeTabIndex) {
    if(this.props.handleTabClick) {
      this.props.handleTabClick(activeTabIndex);
    }
  },

  renderTabs() {
    return this.props.data.map((tab, index) => {
      var style = this.props.activeTabIndex === index ?
        styles.activeTab : styles.tab;
      var clickHandler = this.handleTabClick.bind(this, index);
      return (
        <div className="Tab" key={tab.name} style={style} onClick={clickHandler}>
          {tab.name}
        </div>
      );
    });
  },

  renderPanel() {
    var tab = this.props.data[this.props.activeTabIndex];
    return (
      <div>
        <p>{tab.description}</p>
      </div>
    );
  },

  render() {
    return (
      <div style={styles.app}>
        <div style={styles.tabs}>
          {this.renderTabs()}
        </div>
        <div style={styles.tabPanels}>
          {this.renderPanel()}
        </div>
      </div>
    );
  }

});

var makeTabs = (Tabs) => {
  return React.createClass({
    getInitialState() {
      return {
        activeTabIndex: 0
      };
    },

    handleTabClick(activeTabIndex) {
      this.setState({ activeTabIndex });
    },

    render() {
      return (
        <Tabs
          {...this.props}
          activeTabIndex={this.state.activeTabIndex}
          handleTabClick={this.handleTabClick}
        />
      );
    }
  });
}

var App = React.createClass({

  getInitialState() {
    return {
      activeTabIndex: 0
    };
  },

  handleTabClick(activeTabIndex) {
    this.setState({ activeTabIndex });
  },

  startOver() {
    this.setState({ activeTabIndex:0 });
  },

  next() {
    if(this.state.activeTabIndex < data.length-1) {
      this.setState({ activeTabIndex:this.state.activeTabIndex+1 });
    }
  },

  finish() {
    this.setState({ activeTabIndex:data.length-1 });
  },

  previous() {
    if(this.state.activeTabIndex > 0) {
      this.setState({ activeTabIndex:this.state.activeTabIndex-1 });
    }
  },

  render() {
    var StatefulTabs = makeTabs(Tabs);
    return (
      <div>
        <h1>Props v. State</h1>
        <button onClick={this.startOver}>Start Over</button>
        <button onClick={this.previous}>Previous</button>
        <button onClick={this.next}>Next</button>
        <button onClick={this.finish}>Finish</button>
        <Tabs
          ref="tabs"
          data={this.props.tabs}
          activeTabIndex={this.state.activeTabIndex}
          handleTabClick={this.handleTabClick}
        />
        <StatefulTabs
          ref="statefultabs"
          data={this.props.tabs}
        />
      </div>
    );
  }

});

React.render(<App tabs={data}/>, document.getElementById('app'), function () {
  require('./tests').run(this);
});
