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
      <div className="w-[400px] backdrop-blur-sm bg-[#ffffff33] p-5 rounded-xl mb-3 absolute left-0 top-10">
        <div className="modalContainer flex flex-col gap-3">
          <div className="font-bold">Share With :</div>
          <div className="text-gray-500">
            <input
              type="text"
              className="w-full p-1 pl-3 rounded-lg"
              placeholder="Enter Address"
            ></input>
          </div>
          {/* <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form> */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
              className="font-bold absolute right-5 top-2"
            >
              X
            </button>
            <button className="text-white text-sm p-2  bg-purple-500 rounded-lg hover:cursor-pointer hover:scale-105 text-center" onClick={() => sharing()}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
