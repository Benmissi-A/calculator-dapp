import { useState } from "react";
import Calc from "./Calc";
import DonationModal from "./modals/DonationModal";

function Dapp() {
  const [openModal, setOenModal] = useState(false);
console.log(openModal)
  const handleModal = () => {
    setOenModal(!openModal);
  };
  return (
    <>
      <main className="container min-vh-100">
        <div className="container calculator p-5">
          <Calc />
          <button onClick={handleModal}>Donate</button>
          <DonationModal openModal={openModal} handleModal={handleModal} />
        </div>
      </main>
      <style jsx="true">
        {`
          .calculator {
            background-color: #0a1931;
            color: white;
            border-radius: 10px;
            width: 450px;
          }
        `}
      </style>
    </>
  );
}

export default Dapp;
