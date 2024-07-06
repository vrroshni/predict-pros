"use client";


import { UploadCloud } from "lucide-react";
import OpenAI from "openai";
import React, { useEffect, useState } from "react";

interface VideoUploadProps {
  uploadedFile: File | null;
  setUploadedFile: (value: File | null) => void;
}



export  const VideoUpload=({ uploadedFile, setUploadedFile }: VideoUploadProps)=> {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setUploadedFile(file);
      setVideoUrl(URL.createObjectURL(file));

    } else {
      setUploadedFile(null);
      setVideoUrl(null);
      alert('Please select a valid video file.');
    }
  };

 



  useEffect(() => {
    setUploadedFile(null)
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      
        <label
          htmlFor="video-upload"
          className="flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="text-center">


            {uploadedFile ?
              <div className="mt-4 flex flex-col items-center ">
                Video uploaded:  <p className="text-blue-500 text-xs underline"> {uploadedFile.name}</p>
                <p className="text-sm hover:underline text-gray-600 mt-4 ">Choose another video </p>
              </div> :
              <div className="border p-2 rounded-md max-w-min mx-auto">
                <UploadCloud size={20} />
              </div>
            }


            {!uploadedFile && <> <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Click to upload video</span>
            </p>
              <p className="text-xs text-gray-500">
                Files should be under 10 MB
              </p>
            </>}
          </div>

          <input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
  
   
        {uploadedFile && videoUrl &&  (
        <div className="mt-4 flex flex-col items-center gap-2 text-sm">
          {/* Video uploaded:  <p className="text-blue-500 text-xs underline"> {uploadedFile.name}</p> */}
          <video width="320" height="240" controls className="mt-2">
            <source src={videoUrl} type={uploadedFile.type} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}