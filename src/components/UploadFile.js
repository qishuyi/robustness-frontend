import React from 'react';

const UploadFile = ({ onChangeFile }) => {
    const onFileUpload = (event) => {
        console.log('upload', event.target.files[0])
        onChangeFile(event.target.files[0]);
    };

    return (
        <div>
            <input type="file" id="modelFile" name="modelFile" accept=".json" onChange={onFileUpload} />
        </div>
    )
}

export default UploadFile;