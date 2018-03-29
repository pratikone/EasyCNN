import React, {Component} from "react";
import {Badge, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap";
import classnames from "classnames";

class Easy_Tabs extends Component {

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
          <Col xs="12" md="24" className="mb-4">
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
                Content 1
              </TabPane>
              <TabPane tabId="2" >
                Content 2 
                sdfsdf
              </TabPane>
              <TabPane tabId="3">
                Content 3
                sdfsdf sdfsd   23232  vcbclkv;
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Easy_Tabs;
