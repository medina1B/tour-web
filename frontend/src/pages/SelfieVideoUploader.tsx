import React, { useRef, useState } from "react";
import axios from "axios";

const RecordSelfieVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  // Start the camera and begin recordi
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  // Stop recording and stop the video stream
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Upload the recorded video
  const uploadVideo = async () => {
    if (recordedChunks.length > 0) {
      const videoBlob = new Blob(recordedChunks, { type: "video/webm" });
      const formData = new FormData();
      formData.append("selfieVideo", videoBlob);

      try {
        const response = await axios.post(
          "http://localhost:7000/upload-video",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Video uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    } else {
      console.error("No video recorded to upload.");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Record and Upload Selfie Video</h2>
      <div className="w-full max-w-md mb-4">
        <video
          ref={videoRef}
          className="w-full rounded border border-gray-300"
        ></video>
      </div>
      <div className="flex space-x-4 mb-4">
        {isRecording ? (
          <button
            type="button"
            onClick={stopRecording}
            className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-400"
          >
            Stop Recording
          </button>
        ) : (
          <button
            type="button"
            onClick={startRecording}
            className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-400"
          >
            Start Recording
          </button>
        )}
      </div>
      {recordedChunks.length > 0 && (
        <button
          type="button"
          onClick={uploadVideo}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400"
        >
          Upload Selfie Video
        </button>
      )}
    </div>
  );
};

export default RecordSelfieVideo;
