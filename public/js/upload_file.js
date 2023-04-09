const cloudName = "da9i6wrgu"; // replace with your own cloud name
const uploadPreset = "cm_upload"; // replace with your own upload preset

//   https://cloudinary.com/documentation/upload_widget_reference

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      document
        .getElementById("image")
        .setAttribute("value", result.info.secure_url);
      document
        .getElementById("upload_widget")
        .innerHTML = "Re-Upload";
      document
        .getElementById("uploaded")
        .innerHTML = "Your file has been Uploaded";
    }
  }
);

function myFunction() {
  const imagetag = document.getElementById("image");
  let msg="";  
        
  if(!imagetag.value) { // or checked
    msg += "Please upload the image";
    alert(msg);
  }

}

document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);

