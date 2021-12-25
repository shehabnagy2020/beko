import { API } from "helper/CONST";
import image from "next/image";
import React, { useRef } from "react";

const ImagePicker = ({
  data,
  className,
  imageDi,
  handleEditImage,
  imageLoader,
  handleRemoveImage,
  handleAddImage,
}) => {
  const picRef = useRef(null);
  const handleFileChange = (e) => {
    var file = e.target.files[0];
    if (file) {
      let imageFile = URL.createObjectURL(file);
      if (handleAddImage) handleAddImage(imageFile, file);
      else handleEditImage(imageFile, file);
    }
  };
  return (
    <div className={className}>
      <div className="relative">
        <img
          src={data ? `${API}/${data?.image}` : "/images/no-image.png"}
          className={`${
            imageDi ? imageDi : "w-48 h-48"
          }  rounded-3xl object-cover`}
          alt=""
        />
        <div
          className="flex space-x-reverse space-x-2 absolute abs-center-x"
          style={{ bottom: "-10%" }}
        >
          {/* {handleEditImage && (
            <button
              className="material-icons bg-primary rounded-full p-3 shadow-lg  outline-none text-white hover:bg-secondary"
              onClick={(_) => picRef.current.click()}
            >
              cloud_upload
            </button>
          )} */}
          {handleRemoveImage &&
            (imageLoader ? (
              <div className="w-4 h-4 rounded-full bg-red-500 text-lg animate-ping -mt-10"></div>
            ) : (
              <button
                className="material-icons bg-red-500 rounded-full p-3 shadow-lg outline-none text-white hover:bg-red-400"
                onClick={() => handleRemoveImage(data)}
              >
                delete
              </button>
            ))}
          {handleAddImage &&
            (imageLoader ? (
              <div className="w-4 h-4 rounded-full bg-green-500 text-lg animate-ping -mt-10"></div>
            ) : (
              <button
                className="material-icons bg-green-500 rounded-full p-3 shadow-lg outline-none text-white hover:bg-green-400"
                onClick={(_) => picRef.current.click()}
              >
                add
              </button>
            ))}
        </div>
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
