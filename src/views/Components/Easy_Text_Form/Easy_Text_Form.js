import React, {Component} from "react";
import {
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from "reactstrap";


import {Badge, TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap";
import classnames from "classnames";


class Easy_Text_Form extends Component {

    constructor(props) {
    super(props);
  }

  render() {
    return (
        <FormGroup>
          <Label htmlFor={ this.props.id }></Label>{ this.props.label }
          <Input type="text" id={ this.props.id }  onChange={(e) => {this.props.callback(e); }}
                    placeholder= { this.props.placeholder }/>
        </FormGroup>
    )
  }







}

export default Easy_Text_Form;
