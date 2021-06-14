const DonationModal = ({ openModal, handleModal }) => {
  if(openModal){
    return (
      <>
        <div className="modal container">
          <h1>Hello Modal</h1>
          <p>hhhhhhhhh</p>
          <button onClick={handleModal}>close</button>
        </div>
      </>
    );
  }else return null
};
export default DonationModal