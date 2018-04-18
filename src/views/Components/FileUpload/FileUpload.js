import React, {Component} from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <FormGroup row>
        <Col md="3">
          <Label htmlFor="file-input">Input dataset</Label>
        </Col>
        <Col xs="12" md="9">
          <Input type="file" id="file-input" name="file-input"/>
        </Col>
      </FormGroup>
    )
  }
}

export default FileUpload;
