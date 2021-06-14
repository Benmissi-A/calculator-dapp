import { useContext, useEffect, useState } from "react";
import { CalcContext } from "./App";

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const operators = ["%", "/", "*", "-", "+"];

const Calc = () => {
  const calculator = useContext(CalcContext);
  const [calcScreen, setCalcScreen] = useState(0);
  const [nb, setNb] = useState(0);
  const [number, setNumber] = useState(["0", "0"]);
  const [result, setResult] = useState(0);
  const [error, setError] = useState("error");
  const [operator, setOperator] = useState("operator");
  const [isReady, setIsReady] = useState(false);

  const handleClickAddToNumber = (e) => {
    let num = "";
    nb === 0
      ? (num = [
          [e.target.value, number[1]],
          [number[0] + e.target.value, number[1]],
        ])
      : (num = [
          [number[0], e.target.value],
          [number[0], number[1] + e.target.value],
        ]);
    if (!isReady) {
      setNumber(num[0]);
      setIsReady(true);
    } else {
      setNumber(num[1]);
    }
  };

  const handleClickOperator = (e) => {
    setNb(1);
    setIsReady(false);
    setOperator(e.target.value);
  };

  const handleClickResolve = async () => {
    console.log("resolve");
    setNb(0);
    let res;
    switch (operator) {
      case "+":
        try {
          res = await calculator.add(Number(number[0]), Number(number[1]));
          setResult(res.toString());
        } catch (e) {
          setError("ERROR");
        }
        break;
      case "-":
        try {
          res = await calculator.sub(Number(number[0]), Number(number[1]));
          setResult(res.toString());
        } catch (e) {
          setError("ERROR");
        }
        break;
      case "*":
        try {
          res = await calculator.mul(Number(number[0]), Number(number[1]));
          setResult(res.toString());
        } catch (e) {
          setError("ERROR");
        }
        break;
      case "/":
        try {
          res = await calculator.div(Number(number[0]), Number(number[1]));
          setResult(res.toString());
        } catch (e) {
          setError("DIV BY 0");
        }
        break;
      case "%":
        try {
          res = await calculator.mod(Number(number[0]), Number(number[1]));
          setResult(res.toString());
        } catch (e) {
          setError("DIV BY 0");
        }
        break;
      default:
        setError("ERROR");
        break;
    }
    setIsReady(false);
  };
  const handleClickReset = () => {
    console.log("reset");
    setNb(0);
    setNumber([0, 0]);
    setIsReady(false);
    setCalcScreen(0);
  };

  
  useEffect(() => {
    setCalcScreen(error);
  }, [error]);
  
  useEffect(() => {
    setCalcScreen(number[nb]);
  }, [number,nb]);

  useEffect(() => {
    setCalcScreen(operator);
  }, [operator]);
  
  useEffect(() => {
    setCalcScreen(result);
  }, [result]);

  
  return (
    <>
      <h1 className="text-center">Calculator</h1>
      <div className="text-center ">
        <label htmlFor="screen"></label>
        <input
          className="text-end"
          id="screen"
          type="text"
          value={calcScreen}
          readOnly
        ></input>
      </div>

      <br />
      <div className="row">
        <div className="col-9 row">
          {numbers.map((el) => (
            <div className="col-4 py-2" key={el}>
              <button
                id={el}
                className="nbButton w-100"
                value={el}
                onClick={handleClickAddToNumber}
              >
                {el}
              </button>
            </div>
          ))}
          <div className="col-12 py-2 ">
            <button
              id="reset"
              className="actionButton"
              onClick={handleClickReset}
            >
              reset
            </button>
            <button
              id="resolve"
              className="actionButton  float-end"
              onClick={handleClickResolve}
            >
              =
            </button>
          </div>
        </div>
        <div className="col-3">
          {operators.map((el) => (
            <div className="py-2" key={el}>
              <button
                id={el}
                className="opButton w-100"
               
                value={el}
                onClick={handleClickOperator}
              >
                {el}
              </button>
            </div>
          ))}
        </div>
      </div>

      <style jsx="true">
        {`
          .nbButton {
            box-shadow: inset 0px 1px 0px 0px #97c4fe;
            background: linear-gradient(to bottom, #3d94f6 5%, #1e62d0 100%);
            background-color: #3d94f6;
            border-radius: 6px;
            border: 1px solid #337fed;
            display: inline-block;
            cursor: pointer;
            color: #ffffff;
            font-family: Arial;
            font-size: 15px;
            font-weight: bold;
            padding: 6px 24px;
            text-decoration: none;
            text-shadow: 0px 1px 0px #1570cd;
          }
          .nbButton:hover {
            background: linear-gradient(to bottom, #1e62d0 5%, #3d94f6 100%);
            background-color: #1e62d0;
          }
          .nbButton:active {
            position: relative;
            top: 1px;
          }
          .opButton {
            box-shadow: inset 0px 1px 0px 0px #f5978e;
            background: linear-gradient(to bottom, #f24537 5%, #c62d1f 100%);
            background-color: #f24537;
            border-radius: 6px;
            border: 1px solid #d02718;
            display: inline-block;
            cursor: pointer;
            color: #ffffff;
            font-family: Arial;
            font-size: 15px;
            font-weight: bold;
            padding: 6px 24px;
            text-decoration: none;
            text-shadow: 0px 1px 0px #810e05;
          }
          .opButton:hover {
            background: linear-gradient(to bottom, #c62d1f 5%, #f24537 100%);
            background-color: #c62d1f;
          }
          .opButton:active {
            position: relative;
            top: 1px;
          }

          .actionButton {
            box-shadow: inset 0px 1px 0px 0px #e184f3;
            background: linear-gradient(to bottom, #c123de 5%, #a20dbd 100%);
            background-color: #c123de;
            border-radius: 6px;
            border: 1px solid #a511c0;
            display: inline-block;
            cursor: pointer;
            color: #ffffff;
            font-family: Arial;
            font-size: 15px;
            font-weight: bold;
            padding: 6px 24px;
            text-decoration: none;
            text-shadow: 0px 1px 0px #9b14b3;
          }
          .actionButton:hover {
            background: linear-gradient(to bottom, #a20dbd 5%, #c123de 100%);
            background-color: #a20dbd;
          }
          .actionButton:active {
            position: relative;
            top: 1px;
          }
        `}
      </style>
    </>
  );
};

export default Calc;
