import { Component, PropTypes } from 'react';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    let selected = this.getSelectedFromProps(props);
    this.state = {
      selected: selected,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let selected = this.getSelectedFromProps(nextProps);
    this.setState({
      selected: selected
    });
  }

  getSelectedFromProps(props) {
    let selected;
    if (props.value === null && props.options.length !== 0) {
        selected = props.options[0][props.valueField];
    } else {
        selected = props.value;
    }
    return selected;
  }

  render() {
    let options = this.props.options.map((option, i) =>
      <option key={i} value={option.value}>
        {option.label}
      </option>
    )
    return (
      <select
        className='form-control'
        value={this.state.selected}
        onChange={this.handleChange}>
        {options}
      </select>
    )
  }

  handleChange(e) {
    if (this.props.onChange) {
      let change = {
        oldValue: this.state.selected,
        newValue: e.target.value
      }
      this.props.onChange(change);
    }
    this.setState({selected: e.target.value});
  }
}

Dropdown.defaultProps = {
  value: null,
  valueField: 'value',
  labelField: 'label',
  onChange: null,
}

Dropdown.PropTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  valueField: PropTypes.string,
  labelField: PropTypes.string,
  onChange: PropTypes.func
}
