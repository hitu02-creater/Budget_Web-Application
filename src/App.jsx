import './App.css'
import Balances from './Commponents/Balances'
import Header from './Commponents/Header'

function App() {

  return (
    <>
      <Header/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Balances/>
      </div>
    </>
  )
}

export default App
