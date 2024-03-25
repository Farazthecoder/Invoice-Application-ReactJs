
import './App.css'
import InvoiceApplication from './InvoiceApplication';
import {createContext,useState} from "react"

const myContext = createContext()

function App() {
  
  const [currency,setCurrency] = useState("INR")
  const [tax,setTax] = useState("18%")


  return (
    <>
    <myContext.Provider value={{currency:currency,tax:tax}}>
      <InvoiceApplication/>
     </myContext.Provider>
    </>
  )
}

export default App 

export {myContext} 
