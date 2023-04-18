import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import bgdrive from "./Components/bgdrive.jpeg";
import Display from "./Components/Display";
import FileUpload from "./Components/FileUpload";
import Modal from "./Components/Modal";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0xcF900FBA1657930F87387455D6BFcabC0c58826b";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <>
      <div
        className="max-h-full min-h-screen w-screen bg-cover bg-fixed overflow-y-hidden"
        style={{ backgroundImage: `url(${bgdrive})` }}
      >
        <div className="relative text-white">
          <div className="relative  flex flex-col  items-center">
            <h1 className="font-beb text-5xl font-extrabold py-10">
              GDRIVE 3.0
            </h1>
            <p className="py-5">
              <span className=" font-extrabold">Account: </span>{" "}
              <span className="text-gray-200 text-sm md:text-md lg:text-base">
                {account ? account : "Not connected"}
              </span>
            </p>
            {!modalOpen && (
        <button className="absolute left-5 top-5 text-violet-500 text-sm py-3 px-6 bg-white rounded-lg hover:cursor-pointer hover:scale-105 text-center " onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
            {modalOpen && (
              <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
            )}
            <FileUpload
              account={account}
              provider={provider}
              contract={contract}
            ></FileUpload>

            <Display contract={contract} account={account}></Display>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
