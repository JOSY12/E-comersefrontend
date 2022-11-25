import React, { useState } from "react";
import { uploadFile } from "../../configFirebase";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [linkFirebase, setLinkFirebase] = useState(null);
  console.log(linkFirebase);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        console.log(`la extencion es "image`);
        const result = await uploadFile(file);
        setLinkFirebase(result);
        alert("Uploaded Image");
        document.getElementById("fileimg").value = "";
        setFile(null);
      } else {
        alert("La extension del archivo debe ser jpg o png");
        document.getElementById("fileimg").value = "";
        setFile(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <div className="m-5">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/png,image/jpeg"
            type="file"
            id="fileimg"
            className="file-input file-input-bordered w-full max-w-xs"
          />
          <button disabled={file === null ? true : false} className="btn ml-5">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
