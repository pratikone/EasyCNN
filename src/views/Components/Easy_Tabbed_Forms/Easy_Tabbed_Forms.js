import React, {Component} from "react";
import {
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardFooter,
  CardBlock,
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

class Easy_Tabbed_Forms extends Component {

    constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="60">
            <Card>
              <CardHeader>
              Something
              </CardHeader>
              <CardBlock className="card-body">
             <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  Messages
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <FormGroup>
                  <Label htmlFor="company">Company</Label>
                  <Input type="text" id="company" placeholder="Enter your company name"/>
                </FormGroup>

              </TabPane>
              <TabPane tabId="2" >
                <FormGroup>
                  <Label htmlFor="vat">VAT</Label>
                  <Input type="text" id="vat" placeholder="DE1234567890"/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="street">Street</Label>
                  <Input type="text" id="street" placeholder="Enter street name"/>
                </FormGroup>


              </TabPane>
              <TabPane tabId="3">

                <FormGroup row>
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="city">City</Label>
                      <Input type="text" id="city" placeholder="Enter your city"/>
                    </FormGroup>
                  </Col>
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="postal-code">Postal Code</Label>
                      <Input type="text" id="postal-code" placeholder="Postal Code"/>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="country">Country</Label>
                  <Input type="text" id="country" placeholder="Country name"/>
                </FormGroup>

              </TabPane>
            </TabContent>

              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Easy_Tabbed_Forms;
