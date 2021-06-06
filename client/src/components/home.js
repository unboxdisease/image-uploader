import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import axios from 'axios';
import Input from '@material-ui/core/Input';
class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            files: []
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {

        axios.get('http://localhost:5000/')
        
        .then(files => {
          if (files.message) {
            console.log('No Files');
            this.setState({ files: [] })
          } else {
            this.setState({ files })
          }
        });
    }
    onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:5000/upload", formData, config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
            });
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] });
    }
    
    render() {
        // console.log(this.state.files.data)
        const { files } = this.state;
        return (
            <div>
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <Input type="file" name="myImage" onChange={this.onChange} />
                <Button type="submit" color="Primary">Upload</Button>
            </form>
            <table className="App-table">
            <thead>
              <tr>
                  <th>File</th>
                  <th>Uploaded</th>
                  <th>Size</th>
                  <th></th>
              </tr>
            </thead>
            {/* <tbody>
              {files.map((file, index) => {
                var d = new Date(file.uploadDate);
                return (
                  <tr key={index}>
                    <td>{file.filename}</td>
                   
                  </tr>
                )
              })}
            </tbody> */}
          </table>
          </div>
        )
    }
}

export default SignIn