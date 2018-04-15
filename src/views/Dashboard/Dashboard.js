import React, {Component} from "react";
import {Bar, Line} from "react-chartjs-2";
import {
  Badge,
  Row,
  Col,
  Progress,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBlock,
  CardFooter,
  CardTitle,
  Button,
  ButtonToolbar,
  ButtonGroup,
  ButtonDropdown,
  Label,
  Input,
  Table
} from "reactstrap";

import Easy_Tabbed_Forms from '../../views/Components/Easy_Tabbed_Forms/';
import Easy_Charts from '../../views/Components/Easy_Charts/';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }


  render() {

    return (
      <div className="animated fadeIn">

        <Row>
          <Easy_Tabbed_Forms/>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBlock className="card-body">
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Results</CardTitle>
                    <div className="small text-muted">Loss value</div>
                  </Col>
                </Row>

                <Easy_Charts url='http://localhost:5000/update_chart_data'/>

              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard;
