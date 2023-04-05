import './App.css';
import { useState } from 'react';

const Shopper = (props) => {
  const {items} = props
  console.log(props)
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
    [24]
  ])

  return (
    <div className="App">
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
  );
}

export default App;
