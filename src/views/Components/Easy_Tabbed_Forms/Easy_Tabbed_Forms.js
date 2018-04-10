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

import FileUpload from '../FileUpload/FileUpload.js';



class Easy_Tabbed_Forms extends Component {

    constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      layers: '0',
      dimensions_X: '0',
      dimensions_Y: '0',
      model_selected: '1',
      models: [ 'None', 'Xception', 'Inceptionv3', 'InceptionResNetv2', 'DenseNet121', 'DenseNet169', 'DenseNet201'  ],
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }



  handleLayerChange(e) {this.setState({layers: e.target.value});}
  handleDimensionX(e) {this.setState({dimensions_X: e.target.value}); }
  handleDimensionY(e) {this.setState({dimensions_Y: e.target.value}); }
  handleModelSelection(e) { this.setState({model_selected: this.state.models[e.target.value] }); }



  submit_form( e, component ){
    console.log(component.state.layers);
    var return_obj = {}
    return_obj.layers = component.state.layers;
    if (component.state.activeTab == '2'){
      return_obj.dimensions_X = component.state.dimensions_X;
      return_obj.dimensions_Y = component.state.dimensions_Y ;
      return_obj.model_selected = component.state.model_selected;
    }
    var return_value = JSON.stringify( return_obj );

    fetch("http://localhost:5000/input_test", {
      method: 'POST', // or 'PUT'
      body: return_value, 
      headers: new Headers({
      'Content-Type': 'application/json'
      })
    })
      .then(res => res)
      .then(
        (result) => {
          // this.setState({
          //   isLoaded: true,
          //   items: result.items
          // });
          console.log("ajax works");
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          // this.setState({
          //   isLoaded: true,
          //   error
          // });

          console.log("ajax has errors " + error);
        }
      )
  }




  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm="60">
            <Card className="card-accent-primary"> 
              <CardHeader>
              Submit a new CNN job request  <i className="fa fa-plus-circle fa-lg mt-4"></i>
              </CardHeader>
              <CardBlock className="card-body">
             <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1'})}
                  onClick={() => {
                                 this.toggle('1');

                                  }}
                >
                  Automatic
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2'  })}
                  onClick={() => { this.toggle('2'); }}
                >
                 Manual
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  Pre-trained
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              
              <TabPane tabId="1">
               <Form action="" method="post" className="form_1">
                <FormGroup>
                  <Label htmlFor="layer_count_1">No. of layers</Label>
                  <Input type="text" id="layer_count_1" value={this.state.layers} onChange={(e) => { this.handleLayerChange(e); }}
                              placeholder="Enter the number of layers for CNN model"/>
                </FormGroup>

                <FileUpload/>
                </Form>

              </TabPane>
              <TabPane tabId="2" >
                  <FormGroup>
                    <Label htmlFor="layer_count_2"></Label>No. of layers
                    <Input type="text" id="layer_count_2" value={this.state.layers} onChange={(e) => {this.handleLayerChange(e); }}
                              placeholder="Enter the number of layers for CNN model"/>
                  </FormGroup>
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="dimensions_X">Dimensions</Label>
                      <Input type="text" id="dimensions_X" value={this.state.dimensions_X} onChange={(e) => {this.handleDimensionX(e); }}
                                                 placeholder="0"/>
                    </FormGroup>
                  </Col>
                  <Col xs="8">
                    <FormGroup>
                    <Input type="text" id="dimensions_Y"  value={this.state.dimensions_Y} onChange={(e) => {this.handleDimensionY(e); }}
                                            placeholder="0"/>
                    </FormGroup>
                  </Col>
                    <FormGroup>
                      <Label htmlFor="model_choose">Model Selection</Label>
                      <Input type="select" name="model_choose" id="model_choose"
                                                  onChange={(e) => {this.handleModelSelection(e); }}>
                        <option value="1">{ this.state.models[1] }</option>
                        <option value="2">{ this.state.models[2] }</option>
                        <option value="3">{ this.state.models[3] }</option>
                        <option value="4">{ this.state.models[4] }</option>
                        <option value="5">{ this.state.models[5] }</option>
                        <option value="6">{ this.state.models[6] }</option>
                      </Input>
                    </FormGroup>
                    <FileUpload/>

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
                <FileUpload/>
              </TabPane>
            </TabContent>

              </CardBlock>
              <CardFooter>
                <Button type="submit" size="sm" color="success" onClick={(e) => {this.submit_form(e, this)}}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }







}

export default Easy_Tabbed_Forms;
