/* Import package components */
import React, { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

/* CSS Styles */

const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#eeeeee';
  }

//Container box (grey)
  const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #a8a8a8;
  color: white;
  outline: none;
  transition: border .24s ease-in-out;
`;

//image preview thumbInner
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
//image preview css
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

//image preview thumb outer
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };

//image preview thumb container
  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };

//padding for the text 
  const padding = {
    padding: "80px"
  }

  function Upload({userFile, setUploadFile}) {
    const [myFiles, setMyFiles] = useState([])
    const onDrop = useCallback(acceptedFiles => {
      setMyFiles([...myFiles, ...acceptedFiles])  
    })
  
  
    const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      onDrop: acceptedFiles => {
        setMyFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));      
      }
    })
  
    //remove file function
    const removeFile = file => () => {
      const newFiles = [...myFiles]
      newFiles.splice(newFiles.indexOf(file), 1)
      setMyFiles(newFiles)
    }

    //display image preview function
    const thumbs = myFiles.map(file => (
      <div style={thumb} key={file.name}>
        <input type="hidden" value={setUploadFile(myFiles)}></input>
        <div style={thumbInner}>
         <CloseIcon onClick={removeFile(file)} />
          <img
            src={file.preview}
            style={img}
          />
        </div>
      </div>
      
    ));
    return (
      <div style={{ width:'90vw'}}>
          <Container>
              <section className="container">
              <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p style={padding}>Drag 'n' drop some files here, or click to select files</p>
              </div>
              <aside style={thumbsContainer}>
                  {thumbs}
              </aside>
              </section>
          </Container>
      </div>
  
    )
  }
  
  export default Upload