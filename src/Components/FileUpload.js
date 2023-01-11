import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");


  //uploads to pinata and saves the hash in the smart contract
  const handleSubmit = async (e) => {
    e.preventDefault(); //so that the page doesnt reload
    if (file) {
      try {
        const formData = new FormData(); //creating a new object of form data
        formData.append("file", file); //appending the files with key "file" and values file to the object formData

        const resFile = await axios({ //code for uploading the file to pinata
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `
            227563abeb8fd7e92ea8`,
            pinata_secret_api_key: `
            08505f77c805fce6437535d44c0f52dead21cc76ffbfebef1709950d2e613092`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`; //method to get the hashno stored in pinata
        //const signer = contract.connect(provider.getSigner());
        const signer = contract.connect(provider.getSigner()); //since we need to add the hash to our smart contract we need to use signer to write to the smart contract
        signer.add(account, ImgHash); //using signer we are calling the smart contract function 
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Successfully Image Uploaded");
    setFileName("No image selected"); //once its done we reset the file values for new files to be uploaded
    setFile(null);
  };
  const retrieveFile = (e) => { //we will capture the event
    const data = e.target.files[0]; //files array of files object
    //thus all the info related to the file will be stored in data
    console.log(data);
    const reader = new window.FileReader();//helps to read the file
    reader.readAsArrayBuffer(data);//reading the file through data
    reader.onloadend = () => {//helps to determine if the whole file is read or not
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input //when out files are choosen out onchange event will run i.e retrieveFile
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};
export default FileUpload;