import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Image, Code, File } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = {
    'text/*': ['.txt', '.md'],
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    'text/plain': ['.py', '.js', '.ts', '.jsx', '.tsx', '.html', '.css', '.java', '.cpp', '.c'],
  },
  maxSize = 10 * 1024 * 1024, // 10MB
  disabled = false,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
    disabled,
  });

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension || '')) {
      return Image;
    }
    if (['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'html', 'css'].includes(extension || '')) {
      return Code;
    }
    if (['txt', 'md', 'pdf', 'doc', 'docx'].includes(extension || '')) {
      return FileText;
    }
    return File;
  };

  return (
    <motion.div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
        ${isDragActive && !isDragReject ? 'border-blue-400 bg-blue-50' : ''}
        ${isDragReject ? 'border-red-400 bg-red-50' : ''}
        ${!isDragActive && !isDragReject ? 'border-gray-300 hover:border-gray-400' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <input {...getInputProps()} />
      
      <div className="space-y-4">
        <div className="flex justify-center">
          <Upload className={`h-12 w-12 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
        </div>
        
        <div>
          <p className="text-lg font-medium text-gray-900">
            {isDragActive ? 'Drop your file here' : 'Upload your assignment'}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Drag and drop or click to select a file
          </p>
        </div>
        
        <div className="text-xs text-gray-500">
          <p>Supported formats: PDF, Word, Text, Images, Code files</p>
          <p>Maximum file size: 10MB</p>
        </div>
        
        {/* Supported file types */}
        <div className="flex justify-center space-x-4 pt-4">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <FileText className="h-4 w-4" />
            <span>Documents</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Image className="h-4 w-4" />
            <span>Images</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Code className="h-4 w-4" />
            <span>Code</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FileUpload;