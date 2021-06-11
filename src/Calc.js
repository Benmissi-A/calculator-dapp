import { useContext, useEffect, useState } from "react";
import { CalcContext } from "./App";

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operators = ["+", "-", "*", "/", "%"];

const Calc = () => {
  const calculator = useContext(CalcContext);
  const [calcScreen, setCalcScreen] = useState(0);
  const [nb, setNb] = useState(0);
  const [number, setNumber] = useState(["0", "0"]);
  const [result, setResult] = useState(0);
  const [error, setError] = useState("error");
  const [operator, setOperator] = useState("");
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
  useEffect(() => {
    setCalcScreen(result);
  }, [result]);
  useEffect(() => {
    setCalcScreen(error);
  }, [error]);
  useEffect(() => {
    setCalcScreen(operator);
  }, [operator]);
  useEffect(() => {
    setCalcScreen(number[nb]);
  }, [number, nb]);

  const handleClickOperator = (e) => {
    console.log(e.target.value);
    setOperator(e.target.value);
    setNb(1);
    setIsReady(false);
  };

  const handleClickResolve = async () => {
    console.log("resolve");
    setNb(0);
    let res;
    switch (operator) {
      case "+":
        try {
          res = await calculator.add(Number(number[0]), Number(number[1]));
          setResult(res.toString())
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
  };
  const handleClickReset = () => {
    console.log("reset");
    setNb(0);
    setNumber([0, 0]);
    setIsReady(false);
    setCalcScreen(0);
  };

  return (
    <>
      <h1>Calculator</h1>
      <label htmlFor="screen">screen</label>
      <input id="screen" type="text" value={calcScreen} readOnly></input>
      <br />
      {numbers.map((el) => (
        <button onClick={handleClickAddToNumber} key={el} value={el}>
          {el}
        </button>
      ))}
      {operators.map((el) => (
        <button
          onClick={handleClickAddToNumber}
          key={el}
          value={el}
          onClick={handleClickOperator}
        >
          {el}
        </button>
      ))}
      <button onClick={handleClickResolve}>=</button>
      <button onClick={handleClickReset}>reset</button>
    </>
  );
};

export default Calc;
