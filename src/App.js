import './App.css';
import { useState, useEffect } from 'react';

const Shopper = (props) => {
  const {items} = props
  return (
    <div className="shopper">{items}</div>
  )
}


function App() {
  const [groceryLine, setGroceryLine] = useState([
    [8],
    [10, 12],
    [14, 24, 34],
    [],
    [20, 30, 40],
    [50, 18]
  ])

  const [checkoutValue, setCheckoutValue] = useState(0)

  useEffect(() => {
    let copy = [...groceryLine]
    const d = setInterval(() => {
      copy.forEach(subArr => {
        if(subArr.length > 0){
          subArr[0] --
        }
        if(subArr[0] === 0){
          subArr.shift()
        }
      });
      setGroceryLine([...copy])
    }, 2000)
    return () => {
      clearInterval(d)
    }
  }, [])


  const handleCheckout = () => {
    let currentSum = groceryLine[0].reduce((a, b) => a + b, 0);
    let lineIndex = 0;

    for(let i = 0; i < groceryLine.length; i++){
      if(groceryLine[i].length === 0){
        lineIndex = i
        break
      }
      let sumArr = groceryLine[i].reduce((a, b) => a + b, 0)
      
      if(currentSum >= sumArr){
        currentSum = sumArr
        lineIndex = i
      }
    }
    
    let newGroceryLine = [...groceryLine]
    newGroceryLine[lineIndex].push(checkoutValue)
    setGroceryLine([...newGroceryLine])
    
  }

  return (
    <div className="App">
      <div className="checkout">
        <input
          value={checkoutValue}
          type="number"
          onChange={e => setCheckoutValue(parseInt(e.currentTarget.value) ? parseInt(e.currentTarget.value) : "")}
        ></input>
        <button onClick={() => handleCheckout()}>Checkout</button>
        <p>{checkoutValue}</p>
      </div>
      <div className="grocery-store">
      {groceryLine?.map((que, idx) => {
        return (
          <div key={idx} className="grocery-line">
            {que?.map((items, i) => {
              return <Shopper key={i} items={items} />
            })}
          </div>
        )
      })}
      </div>
      
    </div>
  );
}

export default App;
