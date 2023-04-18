import { useState } from "react";
import "./Display.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      console.log("got data!")
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="new"
              className="h-[400px] w-[300px] rounded-xl"
            ></img>
          </a>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };
  return (
    <>
      
      <div className="w-[400px] flex items-center gap-2">
      <input
        type="text"
        placeholder="Enter Address"
        className="address  p-2 pl-3 my-4 rounded-lg w-[300px] text-black"
      ></input>
      <button className="bg-violet-500 h-10 px-3 rounded-xl" onClick={getdata}>
        Get Data
      </button>
      </div>
      <div className="flex flex-col md:flex-row   lg:flex-row flex-wrap  justify-center gap-3 ">{data}</div>
    </>
  );
};
export default Display;