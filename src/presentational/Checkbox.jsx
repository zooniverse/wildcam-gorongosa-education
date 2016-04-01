import { Component, PropTypes } from 'react';

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'selected',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e);
    this.setState({selected: e.target.checked});
  }

  render() {
    const options = this.props.options.map((option) =>
      <div>
        <input
          key={option.value}
          name={this.props.name}
          type="checkbox"
          value={option.label}
          onChange={this.handleChange} />
            {option.label}
        <br />
      </div>
    )
    return (
      <div>
        {options}
      </div>
    );
  }
}

Checkbox.defaultProps = {
  name: null,
  onChange: null,
  options: [],
  value: null,
}

Checkbox.PropTypes = {
  options: PropTypes.array.isRequired
}
