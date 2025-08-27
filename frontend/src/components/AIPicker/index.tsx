import React from "react";
import CustomButton from "../CustomButton";

interface AIPickerProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  generatingImg: boolean;
  handleSubmit: (type: "logo" | "full") => Promise<void>;
}

const AIPicker: React.FC<AIPickerProps> = ({
  prompt,
  setPrompt,
  generatingImg,
  handleSubmit,
}) => {
  return (
    <div className="aipicker-container">
      <textarea
        value={prompt}
        rows={5}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe design..."
        className="aipicker-textarea"
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton
            type="outline"
            title="Asking Ai..."
            customStyles="text-xs"
          />
        ) : (
          <>
            <CustomButton
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit("logo")}
              customStyles="text-xs"
            />
            <CustomButton
              type="filled"
              title="AI Full"
              handleClick={() => handleSubmit("full")}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AIPicker;
