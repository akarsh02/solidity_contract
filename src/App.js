import { Web3ReactProvider } from "@web3-react/core";
import "./App.css";
import { ethers } from "ethers";
import Wallet from "./wallet";
function App() {
  const getLibrary = (provider) => {
    return new ethers.providers.Web3Provider(provider);
  };
  return (
    <div className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <Wallet />
      </Web3ReactProvider>
    </div>
  );
}

export default App;
