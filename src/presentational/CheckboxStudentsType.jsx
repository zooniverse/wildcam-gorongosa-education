import { Component, PropTypes } from 'react';

export default class CheckboxStudentsType extends Component {
  constructor(props) {
    super(props);
    let selected = this.getSelectedFromProps(props);
    this.state = {
      data: props.data,
      selected: selected,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let selected = this.getSelectedFromProps(nextProps);
    this.setState({
      data: nextProps.data,
      selected: selected,
    });
  }

  getSelectedFromProps(props) {
    let selected;
    if (props.value === null && props.data.length !== 0) {
      selected = props.data[0][props.valueField];
    } else {
      selected = props.value;
    }
    return selected;
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

  render() {
    let checkboxes = this.props.data.map((item, i) =>
      <div>
        <label>
          <input type="checkbox" key={i} value={item.value}/>
          {item.label}
        </label>
        <br/>
      </div>
    )
    return (
      <div className="checkbox">
        {checkboxes}
      </div>
    )
  }
}

CheckboxStudentsType.defaultProps = {
  value: null,
  valueField: 'value',
  labelField: 'label',
  onChange: null,
}

CheckboxStudentsType.PropTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.string,
  valueField: PropTypes.string,
  labelField: PropTypes.string,
  onChange: PropTypes.func
}
