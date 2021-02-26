import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';

import localConfig from '../config/local-dev';
import prodConfig from '../config/prod';

import authToken from '../requests/get-token';

const USERS_URL = process.env.NODE_ENV === 'production'
  ? prodConfig.users_url
  : localConfig.users_url;

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.buildPreview = this.buildPreview.bind(this);
    this.state = {
      error: null,
      fileName: '',
      imageURI: null,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    // alert(`Selected file - ${this.fileInput.current.files[0].name}`)
    const bodyFormData = new FormData();
    bodyFormData.append('file', this.fileInput.current.files[0]);
    axios({
      method: 'post',
      url: USERS_URL,
      data: bodyFormData,
      headers: authToken(),
    }).then(() => {
      this.setState({
        error: null,
      });
      window.location.reload();
    }).catch((error) => {
      this.setState({
        error: error.response.data.message,
      });
    });
  }

  buildPreview() {
    let imgFrame = null;
    if (this.state.imageURI !== null) {
      imgFrame = (
        <div>
          <img className="thumbnail" src={this.state.imageURI} />
        </div>
      );
    }
    return imgFrame;
  }

  handleChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      const filename = e.target.files[0].name;
      const reader = new FileReader();
      reader.onload = function (ev) {
        this.setState({
          fileName: filename,
          imageURI: ev.target.result,
        });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  handleClick(event) {
    event.preventDefault();
    axios({
      url: USERS_URL,
      method: 'delete',
      headers: authToken(),
    }).then(() => {
      this.setState({
        error: null,
      });
      window.location.reload();
    }).catch((error) => {
      this.setState({
        error: error.response.data.message,
      });
    });
  }

  render() {
    const frame = this.buildPreview();
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <label className="submit-image">
            Select Image
            <input
              style={{ display: 'none' }}
              type="file"
              accept=".jpg, .jpeg, .png, .gif"
              ref={this.fileInput}
              required
              onChange={(e) => this.handleChange(e)}
            />
          </label>
        </Form.Group>
        <Form.Group>
          { frame }
          { this.state.fileName.length > 0
            && (
            <div>
              { this.state.fileName }
            </div>
            )}
        </Form.Group>
        <Form.Group>
          <Button variant="primary" type="submit">
            <FontAwesomeIcon icon={faUpload} />
            {' '}
            Upload
          </Button>
        </Form.Group>
        { this.props.hasOwnPic
          && (
          <Form.Group>
            <Button variant="danger" onClick={(e) => this.handleClick(e)}>
              <FontAwesomeIcon icon={faTrash} />
              {' '}
              Delete Current Avatar
            </Button>
          </Form.Group>
          )}
        { this.state.error !== null
          && <div>{this.state.error}</div>}
      </Form>
    );
  }
}

export default FileInput;
