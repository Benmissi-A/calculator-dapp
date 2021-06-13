import Calc from "./Calc";

function Dapp() {
  return (
    <>
      <main className="container min-vh-100">
        <div className="container calculator p-5">
          <Calc />
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
