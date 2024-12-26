"use client";

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function UploadForm() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append('file', file));

    await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Access-Control-Allow-Origin': '*'
      },
    });
    setFiles([]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className='flex flex-col gap-4 items-center justify-center'>
      <div {...getRootProps()} className="border-2 border-dashed p-4 cursor-pointer">
        <Input name='images' {...getInputProps()} accept='image/*' multiple/>
        <p>Drag and drop files here, or click to select files</p>
      </div>
      <ul>
        {files.map((file: File, idx: number) => (
          <li key={idx}>{file.name}</li>
        ))}
        
      </ul>
      
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        
        <Button disabled={files.length === 0} onClick={handleUpload}>
            Upload
        </Button>

        <Button variant="secondary" onClick={() => setFiles([])}>
            Reset
        </Button>
      </div>
    </div>
  );
}
