import React, { Component } from 'react';
import { firebaseApp } from '../../firebase';
import { ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

class Fileuploader extends Component {
  // Component state to track the file upload status
  state = {
    name: '',               // Uploaded file name
    isUploading: false,     // Flag indicating whether a file is currently being uploaded
    fileURL: '',            // URL of the uploaded file (if any)
    file: null,             // The selected file for upload
    uploadProgress: 0,      // Upload progress percentage
  };

  // Handle the start of the file upload process
  handleUploadStart = () => {
    this.setState({
      isUploading: true,     // Set uploading flag to true
      uploadProgress: 0,     // Reset upload progress to 0
    });

    // Create storage and file references
    const storageRef = ref(getStorage(firebaseApp), this.props.dir);
    const fileRef = ref(storageRef, this.state.file.name);

    // Start the file upload using uploadBytesResumable
    const uploadTask = uploadBytesResumable(fileRef, this.state.file);

    // Listen to the upload state changes
    uploadTask.on('state_changed', (snapshot) => {
      // Calculate the upload progress percentage and update the state
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({ uploadProgress: Math.floor(progress) });
    });

    // Handle the completion of the upload
    uploadTask
      .then(() => getDownloadURL(fileRef))  // Get the download URL of the uploaded file
      .then((downloadURL) => {
        this.handleUploadSuccess(this.state.file.name, downloadURL);  // Call the success handler
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        this.handleUploadError();  // Call the error handler
      });
  };

  // Handle the success of the file upload
  handleUploadSuccess = (filename, fileURL) => {
    console.log(`File "${filename}" uploaded successfully`);
    this.setState({
      name: filename,         // Set the uploaded file name
      isUploading: false,     // Set uploading flag to false
      uploadProgress: 100,    // Set upload progress to 100%
      fileURL,                // Set the file URL
    });
    
  };

  // Handle any errors that occur during the file upload
  handleUploadError = () => {
    console.error('File upload failed');
    this.setState({
      isUploading: false,     // Set uploading flag to false
      uploadProgress: 0,      // Reset upload progress to 0
    });
  };

  // Handle removing the uploaded image
  uploadAgain = () => {
    this.setState({
      name: '',               // Clear uploaded file name
      fileURL: '',            // Clear file URL
      file: null,             // Clear selected file
      uploadProgress: 0,      // Reset upload progress to 0
    });
  };

  // Lifecycle method to set initial state based on props
  static getDerivedStateFromProps(props, state) {
    // If there is a default image, set initial state using props
    if (props.defaultImg) {
      return {
        name: props.defaultImgName,
        fileURL: props.defaultImg,
      };
    }
    return null;
  }

  // Render method to display the file uploader UI
  render() {
    return (
      <div>
        {!this.state.fileURL ? (
          <div>
            <div className='label_inputs'>{this.props.tag}</div>
            {/* Input for selecting a file */}
            <input
              type='file'
              onChange={(e) => this.setState({ file: e.target.files[0] })}
            />
            {/* Button to initiate the file upload */}
            <button onClick={this.handleUploadStart}>Upload</button>
            {/* Display upload progress if a file is being uploaded */}
            {this.state.isUploading && (
              <div className='progress'>
                Upload Progress: {this.state.uploadProgress}%
              </div>
            )}
          </div>
        ) : null}

        {this.state.fileURL ? (
          <div className='image_upload_container'>
            <img
              style={{
                width: '100%',
              }}
              src={this.state.fileURL}
              alt={this.state.name}
            />
            <div className='remove' onClick={this.uploadAgain}>
              Remove
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Fileuploader;
