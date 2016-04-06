import { Component, PropTypes } from 'react';

export default class RadioButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: null,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e);
    this.setState({checked: e.target.checked});
  }

  render() {
    const options = this.props.options.map((option) =>
      <li>
        <input
          key={option.value}
          name={this.props.name}
          type="radio"
          value={option.label}
          onChange={this.handleChange} />
          {option.label}
      </li>
    )
    return (
      <label>{this.props.label}
        <ul>
          {options}
        </ul>
      </label>
    );
  }
}

RadioButtonGroup.defaultProps = {
  label: null,
  name: null,
  onChange: null,
  options: [],
  value: null,
}

RadioButtonGroup.PropTypes = {
  options: PropTypes.array.isRequired
}
