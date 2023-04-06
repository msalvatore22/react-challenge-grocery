import './App.css';
import { useState } from 'react';

const Shopper = (props) => {
  const {items} = props
  return (
    <div className="shopper">{items}</div>
  )
}


function App() {
  const [groceryLine, setGroceryLine] = useState([
    [],
    [10, 2],
    [4, 12],
    [],
    [8, 9, 2],
    [4]
  ])

  const [checkoutValue, setCheckoutValue] = useState(0)

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
      {groceryLine.map((que, idx) => {
        return (
          <div className="grocery-line">
            {que.map((items, i) => {
              return <Shopper items={items} />
            })}
          </div>
        )
      })}
      </div>
      
    </div>
  );
}

export default App;
