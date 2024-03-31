import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, SetExpression] = useState("");
  const et = expression.trim();

  const isOperator = (symbol: string) => {
    return /[*/+-]/.test(symbol);
  };
  const buttonPress = (symbol : string) =>  {
    console.log(symbol)
      if (symbol === "clear") {
        setAnswer("0");
        SetExpression("");
      } else if (symbol === "negative") {
        if (answer === "") return;
        setAnswer(
          answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer);
      } else if (symbol === "percentage") {
        if (answer === "") return;
        setAnswer((parseFloat(answer)/100).toString());
      } else if (isOperator(symbol)){
        SetExpression(et + " " + symbol + " ");
      } else if (symbol === "=") {
        calculate();
      } else if (symbol === "0") {
        if (expression.charAt(0) !== "0") {
          SetExpression(expression + symbol);
        }
      } else if (symbol === ".") {
      const lastNumber = expression.split(/[-+*/]/g).pop();
        if (lastNumber?.includes(".")) return;
        SetExpression(expression + symbol )
      } else {
        if (expression.charAt(0) === "0") {
          SetExpression(expression.slice(1) + symbol);
        } else {
          SetExpression(expression + symbol);
        }
      }
  }

  const calculate = () => {
    if (isOperator(et.charAt(et.length - 1))) return;

    const parts  = et.split(" ");
    const newParts = [];

    for (let i =  parts.length - 1; i >= 0; i--) {
      if (["*","/","+"].includes(parts[i]) && isOperator(parts[i-1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k =  i -1;
        while (isOperator(parts[k])) {
            k--;
            j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression  = newParts.join(" ");
    if(isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string);
    }
  };
  return (
    <>
        <div className='container'>
          <h1>Javascript Calculator</h1>
          <div id="calculator">
            <div id="display" style={{textAlign: 'right'}}></div>
            <div id="answer"></div>
            <div id="expression"></div>
            <button id = "clear"onClick = {() => buttonPress("clear")}className="light-gray"></button>
            <button id = "negative"onClick = {() => buttonPress("negative")}className="light-gray"></button>
            <button id = "percentage"onClick = {() => buttonPress("percentage")}className="yellow"></button>
            <button id = "divide"onClick = {() => buttonPress("divide")}className="dark-gray"></button>
            <button id = "seven"onClick = {() => buttonPress("seven")}className="dark-gray"></button>
            <button id = "eight"onClick = {() => buttonPress("eight")}className="dark-gray"></button>
            <button id = "nine"onClick = {() => buttonPress("nine")}className="dark-gray"></button>
            <button id = "multiply"onClick = {() => buttonPress("multiply")}className="yellow-"></button>
            <button id = "four"onClick = {() => buttonPress("four")}className="dark-gray"></button>
            <button id = "five"onClick = {() => buttonPress("five")}className="dark-gray"></button>
            <button id = "six"onClick = {() => buttonPress("six")}className="dark-gray"></button>
            <button id = "subtract"onClick = {() => buttonPress("subtract")}className="yellow"></button>
            <button id = "one"onClick = {() => buttonPress("one")}className="dark-gray"></button>
            <button id = "two"onClick = {() => buttonPress("two")}className="dark-gray"></button>
            <button id = "three"onClick = {() => buttonPress("three")}className="dark-gray"></button>
            <button id = "add"onClick = {() => buttonPress("add")}className="yellow"></button>
            <button id = "zero"onClick = {() => buttonPress("zero")}className="dark-gray"></button>
            <button id = "decimal"onClick = {() => buttonPress("decimal")}className="dark-gray"></button>
            <button id = "equals"onClick = {() => buttonPress("equals")}className="yellow"></button>
          </div>
        </div>
    </>
  )
}

export default App
