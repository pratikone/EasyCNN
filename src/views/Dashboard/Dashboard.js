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
  CardColumns,
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
      dropdownOpen: false,
      small_charts: [ "val_top_k_categorical_accuracy",  "val_loss", "loss", "top_k_categorical_accuracy", "acc", "val_acc" ],
      colors: ["bg-primary", "bg-success", "bg-warning", "bg-info", "bg-danger"],
      best_mode_prefix: "/current",
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  //best mode switch
  handleBestMode(e) {
          var checked = e.target.checked;
          if ( checked )
            this.setState({best_mode_prefix: "/best"});
          else
            this.setState({best_mode_prefix: "/current"});
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
              <CardHeader>
                &nbsp; &nbsp; Best results
                <Label className="switch switch-lg switch-text switch-info float-left mb-0">
                  <Input type="checkbox" className="switch-input" onChange={(e) => { this.handleBestMode(e); }}/>
                  <span className="switch-label" data-on="ON" data-off="OFF"></span>
                  <span className="switch-handle"></span>
                </Label>
              </CardHeader>
              <CardBlock className="card-body">
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Results</CardTitle>
                    <div className="small text-muted">Loss value</div>
                  </Col>
                </Row>
                <Easy_Charts url={'http://localhost:5000/update_chart_data'+ this.state.best_mode_prefix}/>
              </CardBlock>
            </Card>
          </Col>
        </Row>
        <Row>
          <CardColumns className="cols-2">
            {this.state.small_charts.map( ( chart_type ) => {    //looping cards to create multiple small graphs
            return(
              <Card>
               <CardHeader className={  this.state.colors[ Math.floor(Math.random() * this.state.colors.length) ] } >
                
              </CardHeader>
                <CardBlock className="card-body">
                  <Row>
                    <Col sm="8">
                      <CardTitle className="mb-2">{chart_type}</CardTitle>
                      <div className="small text-muted">Value</div>
                    </Col>
                  </Row>
                  <Easy_Charts url={'http://localhost:5000/update_small_chart_data/' + chart_type + this.state.best_mode_prefix}   />
                </CardBlock>
              </Card>
            )

            })}

          </CardColumns>          


        </Row>
      </div>
    )
  }
}

export default Dashboard;
