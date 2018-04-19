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
import Easy_Large_Button from '../../views/Components/Easy_Large_Button/';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleBestMode = this.handleBestMode.bind(this);
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
          console.log(checked);
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
          <Col xs="12" sm="6" lg="3">
          <Easy_Large_Button text="Best Mode :" header="Choose mode :best/current" color="bg-danger" show_button={true} callback={this.handleBestMode}  />
          </Col>
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
