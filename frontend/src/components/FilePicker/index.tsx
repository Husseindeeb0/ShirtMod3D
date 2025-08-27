import CustomButton from "../CustomButton";
import React from "react";

interface FilePickerProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  readFile: (type: "logo" | "full") => void;
}

const FilePicker: React.FC<FilePickerProps> = ({ file, setFile, readFile }) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile =
              e.target.files && e.target.files[0] ? e.target.files[0] : null;
            setFile(selectedFile);
          }}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>
        <p className="mt-2 text-gray-500 text-xs truncate">
          {file ? file.name : "No file selected"}
        </p>
      </div>
      <div className="flex gap-2 mt-4">
        <CustomButton
          type="outline"
          title="Logo"
          handleClick={() => readFile("logo")}
          customStyles="text-xs font-bold"
        />
        <CustomButton
          type="filled"
          title="Full"
          handleClick={() => readFile("full")}
          customStyles="text-xs"
        />
      </div>
    </div>
  );
};

export default FilePicker;
