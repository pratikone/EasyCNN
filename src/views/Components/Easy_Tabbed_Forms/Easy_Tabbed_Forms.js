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
import Easy_Text_Form from '../Easy_Text_Form/';


class Easy_Tabbed_Forms extends Component {

    constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '2',
      batch_size: 16,
      initial_epoch: 4,
      final_epoch: 8,
      workers: 4,
      step_per_epoch: 64,
      dropout_list: 0,
      dense_list: 0,
      metrics: ['top_k_categorical_accuracy'],  
      model_list: ['xception'],
      models: [ 'xception', 'InceptionV3', 'InceptionResNetV2', 'DenseNet121', 'DenseNet169', 'DenseNet201'  ],
    };

    this.handleBatchSizeChange = this.handleBatchSizeChange.bind(this);

    this.handleEpochInitChange = this.handleEpochInitChange.bind(this);

    this.handleEpochFinalChange = this.handleEpochFinalChange.bind(this);
    
    this.handleWorkersChange = this.handleWorkersChange.bind(this);
    
    this.handleStepsInEpochChange = this.handleStepsInEpochChange.bind(this);
    
    this.handleDropoutListChange = this.handleDropoutListChange.bind(this);
    
    this.handleDenseListChange = this.handleDenseListChange.bind(this);
    
    this.handleStepsInEpochChange = this.handleStepsInEpochChange.bind(this);
    
    this.handleStepsInEpochChange = this.handleStepsInEpochChange.bind(this);


  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }



  handleBatchSizeChange(e) {this.setState({batch_size: Number(e.target.value) });}
 
  handleEpochInitChange(e) {this.setState({initial_epoch: Number(e.target.value) }); }

  handleEpochFinalChange(e) {this.setState({final_epoch: Number(e.target.value) }); }

  handleWorkersChange(e) {this.setState({workers: Number(e.target.value) }); }

  handleStepsInEpochChange(e) {this.setState({step_per_epoch: Number(e.target.value) }); }

  handleDropoutListChange(e) {this.setState({dropout_list: e.target.value}); }

  handleDenseListChange(e) {this.setState({dense_list: e.target.value}); }

  handleRadioButtonChange(e) { 
                              var new_metrics = this.state.metrics;
                              var radio_selection = e.target.value;
                              var checked = e.target.checked;
                              if ( radio_selection == "topk" ){
                                if( checked == true){
                                  new_metrics.push("top_k_categorical_accuracy");
                                }
                                else{
                                  new_metrics = new_metrics.filter(e => e !== "top_k_categorical_accuracy");
                                }
                                this.setState({metrics: new_metrics});
                              }
                              else{
                                if( checked == true ){
                                  new_metrics.push("accuracy");
                                }
                                else{
                                  new_metrics =  new_metrics.filter(e => e !== "accuracy");
                                }
                                this.setState({metrics: new_metrics});
                              }
                              
                             }


  handleModelSelection(e) {
                               this.setState({model_list: [ this.state.models[e.target.value] ]});
                          }



  submit_form( e, component ){
    var return_obj = {}
    return_obj.batch_size = component.state.batch_size;
    
    return_obj.initial_epoch = component.state.initial_epoch;
    return_obj.final_epoch = component.state.final_epoch;
    return_obj.workers = component.state.workers;
    return_obj.step_per_epoch = component.state.step_per_epoch;
    return_obj.dropout_list = component.state.dropout_list;
    return_obj.dense_list = component.state.dense_list;
    return_obj.metrics = component.state.metrics;
    return_obj.model_list = component.state.model_list;

    if (component.state.activeTab == '1'){
        return_obj.metrics = ['top_k_categorical_accuracy', 'accuracy'];
        return_obj.model_list = this.state.models;        
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
        if (result.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              result.status);
            return;
        }
        console.log("Data sent to backend");
      },
      (error) => {

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

                <FormGroup>
                  <Col xs="8">
                    <Easy_Text_Form id="phase1" value="adam" label="Phase1 Optimizer"
                                       placeholder="adam" callback={() => {}} />
                  </Col>                  

                  <Col xs="8">
                    <Easy_Text_Form id="dropout_list"  value={this.state.dropout_list} label="Dropout list"
                                       placeholder="Set comma separated dropout list" callback={this.handleDropoutListChange} />
                  </Col>

                  <Col xs="8">
                    <Easy_Text_Form id="dense_list" value={this.state.dense_list} label="Dense list"
                                       placeholder="Set comma separated dense list" callback={this.handleDenseListChange} />
                  </Col> 

                </FormGroup>

               <Form action="" method="post" className="form_1">
                <FileUpload/>
                </Form>

              </TabPane>
              <TabPane tabId="2" >
                  <Col xs="8">
                    <Easy_Text_Form id="batch_size" value={this.state.batch_size}  label="Batch Size"
                                       placeholder="Set Batch size" callback={this.handleBatchSizeChange} />
                  </Col>
                  <Col xs="8">
                    <Easy_Text_Form id="workers" value={this.state.workers}  label="Workers"
                                       placeholder="Set workers count" callback={this.handleWorkersChange} />
                  </Col>
                  <Col xs="8">
                      <Easy_Text_Form id="initial_epoch" value={this.state.initial_epoch}  label="Initial Epoch"
                                       placeholder="Set Initial Epoch" callback={this.handleEpochInitChange} />
                      <Easy_Text_Form id="final_epoch" value={this.state.final_epoch}  label="Final Epoch"
                                       placeholder="Set Final Epoch" callback={this.handleEpochFinalChange} />
                  </Col>
                  <Col xs="8">
                    <Easy_Text_Form id="step_per_epoch" value={this.state.step_per_epoch}  label="Steps per epoch"
                                       placeholder="Determine steps in every epoch" callback={this.handleStepsInEpochChange} />
                  </Col>
                  <Col xs="8">
                    <FormGroup>
                    <Row>
                    <Label check htmlFor="inline-radio1"> top_k_categorical_accuracy &nbsp; </Label>
                    <Label className="switch switch-3d switch-primary">
                      <Input type="checkbox"  id="inline-radio1" name="inline-radios1" className="switch-input" defaultChecked
                                                  value="topk" onChange={(e) => { this.handleRadioButtonChange(e); }}/>
                      <span className="switch-label"></span>
                      <span className="switch-handle"></span>
                    </Label>
                    </Row>
                    <Row>
                    <Label check htmlFor="inline-radio2"> accuracy   &nbsp; &nbsp; </Label>
                    <Label className="switch switch-3d switch-primary">
                      <Input type="checkbox"  id="inline-radio2" name="inline-radios2" className="switch-input"
                                                  value="accuracy" onChange={(e) => { this.handleRadioButtonChange(e); }}/>
                      <span className="switch-label"></span>
                      <span className="switch-handle"></span>
                    </Label>
                    </Row>

                    </FormGroup>
                  </Col>
                  <Col xs="8">
                    <Easy_Text_Form id="phase1" value="adam" label="Phase1 Optimizer"
                                       placeholder="adam" callback={() => {}} />
                  </Col>                  


                  <Col xs="8">
                    <Easy_Text_Form id="dropout_list"  value={this.state.dropout_list} label="Dropout"
                                       placeholder="Set dropout count" callback={this.handleDropoutListChange} />
                  </Col>

                  <Col xs="8">
                    <Easy_Text_Form id="dense_list" value={this.state.dense_list} label="Dense"
                                       placeholder="Set dense count" callback={this.handleDenseListChange} />
                  </Col>

                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="model_choose">Model Selection</Label>
                      <Input type="select" name="model_choose" id="model_choose"
                                                  onChange={(e) => {this.handleModelSelection(e); }}>
                        <option value="0">{ this.state.models[0] }</option>
                        <option value="1">{ this.state.models[1] }</option>
                        <option value="2">{ this.state.models[2] }</option>
                        <option value="3">{ this.state.models[3] }</option>
                        <option value="4">{ this.state.models[4] }</option>
                        <option value="5">{ this.state.models[5] }</option>
                      </Input>
                    </FormGroup>
                  </Col>

                  <FileUpload/>

              </TabPane>
              <TabPane tabId="3">

                <FormGroup row>
                  <Col xs="8">
                    <Easy_Text_Form id="choose_own_model_file" value="adam" label="Pre-trained model name"
                             placeholder="Enter model name" callback={() => {}} />

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
