import React, {Component} from "react";
import {
  Row,
  Col,
  Button,
  Card,
  CardBlock,
  Input,
  Label,
} from "reactstrap";


import classnames from "classnames";


class Easy_Large_Button extends Component {

    constructor(props) {
    super(props);
  }



  showButton( button_flag, callback ) {
              if( button_flag ){
                return(
                        <Label className="switch switch-lg switch-text switch-info float-right mb-0">
                          <Input type="checkbox" className="switch-input" onChange={(e) => { callback(e); }}/>
                          <span className="switch-label" data-on="ON" data-off="OFF"></span>
                          <span className="switch-handle"></span>
                        </Label>
                      );
              }  
              else{
                return("");
              } 
          }

  render() {
    return (
          <Card className={"text-white "+ this.props.color}>
            <CardBlock className="card-body pb-0">
              
              <p>{this.props.header}</p>
            </CardBlock>
            <div className="px-3" style={{height:'70px'}}>
            <h1 className="mb-0">{this.props.text}
            { this.showButton( this.props.show_button, this.props.callback ) }
              </h1>
            </div>
          </Card>
    )
  }







}

export default Easy_Large_Button;
