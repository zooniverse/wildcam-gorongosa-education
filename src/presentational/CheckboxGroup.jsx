import { Component, PropTypes } from 'react';

export default class CheckboxGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'false',
    }
    this.getCheckboxValues = this.getCheckboxValues.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getCheckboxValues(name) {
    const values = [];
    const options = document.getElementsByName(name);
    for (var i = 0; i < options.length; i++) {
      if (options[i].checked) {
        values.push(options[i].value);
      }
    }
    return values;
  }

  handleChange(e) {
    e.target.value = this.getCheckboxValues(e.target.name);
    this.props.onChange(e);
    this.setState({selected: e.target.checked});
  }
  render() {
    const options = this.props.options.map((option) =>
      <li>
        <label>
        <input
          key={option.value}
          name={this.props.name}
          type="checkbox"
          value={option.label}
          onChange={this.handleChange} />
          {option.label}
        </label>
      </li>
    )
    return (
      <ul>
        {options}
      </ul>
    );
  }
}

CheckboxGroup.defaultProps = {
  name: null,
  onChange: null,
  options: [],
  value: [],
}

CheckboxGroup.PropTypes = {
  options: PropTypes.array.isRequired
}
