import { Component, PropTypes } from 'react';

export default class RadioButtonGroup extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e);
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
      <div>
        <p>{this.props.question}</p>
        <ul>
          {options}
        </ul>
      </div>
    );
  }
}

RadioButtonGroup.defaultProps = {
  question: null,
  name: null,
  onChange: null,
  options: [],
  value: null,
}

RadioButtonGroup.propTypes = {
  options: PropTypes.array.isRequired
}
