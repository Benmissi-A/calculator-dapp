import React from "react";
import Dapp from "./Dapp";
import { useContract } from "web3-hooks";
import { calcAddress, calcAbi } from "./contracts/Calc";

 export const CalcContext = React.createContext(null);

function App() {
  const calc = useContract(calcAddress, calcAbi);
  return (
    <CalcContext.Provider value={calc}>
      <h1>Hello Calculator</h1>
       <Dapp />
    </CalcContext.Provider>
   );
}

export default App;
