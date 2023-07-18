
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Home from './Home'
import Test from './Test'
import MintNFT from './MintNFT';



function App() {
  // const { setDefaultChain } = useWeb3Modal()
  // setDefaultChain(sepolia)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={null}>
          <Route index element={<Home />} />
          <Route path='/test' element={<Test />} />
          <Route path='/NFT' element={<MintNFT />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}
export default App
