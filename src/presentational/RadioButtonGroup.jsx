import { Component, PropTypes } from 'react';

export default class RadioButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'false',
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
        <label>
        <input
          key={option.value}
          name={this.props.name}
          type="radio"
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

RadioButtonGroup.defaultProps = {
  name: null,
  onChange: null,
  options: [],
  value: [],
}

RadioButtonGroup.PropTypes = {
  options: PropTypes.array.isRequired
}
