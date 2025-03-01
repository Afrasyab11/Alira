"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
// import { Upload, } from "lucide-react"
import { FaUpload } from "react-icons/fa";
export const UploadedFile = () => {
    const [recentFiles, setRecentFiles] = useState([])
  
    const onDrop = (acceptedFiles) => {
      // Add new files to the recent files list
      setRecentFiles((prev) => [...acceptedFiles, ...prev])
      // Switch to the recent tab to show the uploaded files
    }
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
      })
    return (
      <>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed border-[#E2E6EA] rounded-lg sm:min-h-[300px] md:min-h-[320px] lg:min-h-[390px]  flex flex-col items-center justify-center p-6 cursor-pointer transition-colors ${
            isDragActive ? "border-[#E2E6EA] bg-zinc-800/50" : ""
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center text-center">
           
            <p className="text-zinc-400 mb-2">
              Click to browse or
              <br />
              drag and drop your files
            </p>
          </div>
        </div>
      </>
    );
  };
  