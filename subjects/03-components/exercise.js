////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render the data as tabs, with their `name` as the label in the tab
//   and their `description` inside the tab panel
// - Make it so that you can click a tab label and the panel renders
//   the correct content
// - Make sure the active tab has the active styles
////////////////////////////////////////////////////////////////////////////////

var React = require('react');

var DATA = [
  { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
  { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
  { id: 3, name: 'Russia', description: 'World Cup 2018!' },
];

var styles = {};

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
};

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: '#000'
};

styles.panel = {
  padding: 10
};

var {arrayOf, number, shape, string} = React.PropTypes;
var data = shape({
  id: number.isRequired,
  name: string,
  description: string
});


/*
  TODO: specify the shape of data so that Tabs knows nothing about countries
*/
var Tabs = React.createClass({
  propTypes: {
    data: arrayOf(data)
  },
  getInitialState () {
    return {
      selectedTab: 0
    };
  },
  selectTab(index) {
    this.setState({
      selectedTab: index
    });
  },
  tabs () {
    return this.props.data.map((datum, index) => {
      return (
        <div
          key = {datum.id}
          className="Tab"
          style={datum.id === this.props.data[this.state.selectedTab].id ? styles.activeTab : styles.tab}
          onClick = { () => { this.selectTab(index); } } >
          {datum.name}
        </div>
      )
    });
  },
  descriptionPanel(datum) {
    return (
      <div className="TabPanels" style={styles.panel}>
        { datum.description }
      </div>
    );
  },
  render () {
    return (
      <div className="Tabs">
        {this.tabs()}
        {this.descriptionPanel(this.props.data[this.state.selectedTab])}
      </div>
    );
  }
});

var App = React.createClass({
  propTypes: {
    countries: arrayOf(data)
  },
  render () {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={this.props.countries}/>
      </div>
    );
  }
});

React.render(<App countries={DATA}/>, document.getElementById('app'), function () {
  require('./tests').run(this);
});
