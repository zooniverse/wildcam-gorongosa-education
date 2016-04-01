import { Component, PropTypes } from 'react';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'selected',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e);
    this.setState({selected: e.target.value});
  }

  render() {
    const options = this.props.options.map((option) =>
        <option
          key={option.value}
          value={option.label}>
            {option.label}
        </option>
    )
    return (
      <select
        className='form-control'
        name={this.props.name}
        value={this.state.selected}
        onChange={this.handleChange}>
          {options}
      </select>
    )
  }
}

Dropdown.defaultProps = {
  name: null,
  onChange: null,
  options: [],
  value: null,
}

Dropdown.PropTypes = {
  options: PropTypes.array.isRequired
}
