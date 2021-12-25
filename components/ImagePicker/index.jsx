import { API } from "helper/CONST";
import image from "next/image";
import React, { useRef } from "react";

const ImagePicker = ({
  data,
  id,
  setData,
  className,
  imageDi,
  editable = true,
}) => {
  const picRef = useRef(null);
  const handleFileChange = (e) => {
    var file = e.target.files[0];
    if (file) {
      let imageFile = URL.createObjectURL(file);
      setData(imageFile, file);
    }
  };
  return (
    <div className={className}>
      <div className="relative">
        <img
          src={
            data
              ? data.includes("blob:")
                ? data
                : `${API}/${data}`
              : "/images/no-image.png"
          }
          className={`${
            imageDi ? imageDi : "w-48 h-48"
          }  rounded-3xl object-cover`}
          alt=""
        />
        {editable && (
          <button
            className="material-icons bg-primary rounded-full p-3 shadow-lg absolute abs-center-x outline-none text-white hover:bg-secondary"
            onClick={(_) => picRef.current.click()}
            style={{ bottom: "-10%" }}
          >
            cloud_upload
          </button>
        )}
        <input
          type="file"
          className="hidden"
          ref={picRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImagePicker;
