import { useEffect } from "react";

const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);
  return (
    <>
      <div className="h-full w-[500px] p-3 bg-purple-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 mb-5
">
        <div className="modalContainer">
          <div className="title text-2xl font-bold">Share with : </div>
          <div className="body py-3">
            <input
              type="text"
              className="address text-black w-full pl-2 rounded-lg"
              placeholder="Enter Address"
            ></input>
          </div>
          {/* <form id="myForm">
            <select id="selectNumber">
              <option className="address text-black font-black">People With Access</option>
            </select>
          </form> */}
          <div className="footer flex gap-5 w-full justify-end pr-3">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
              className="border rounded-lg py-1 px-2"
            >
              Cancel
            </button>
            <button 
            className="border rounded-lg py-1 px-3"
            onClick={() => sharing()}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;