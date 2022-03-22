import { React, useEffect, useState } from "react";
import simple_token_abi from "./Contract/simple_token_abi.json";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";

const Wallet = () => {
  const [tokenName, setTokenName] = useState("Simple Dapp");
  const [connect, setConnect] = useState("Connect Wallet");
  const { active, account, activate } = useWeb3React();
  const [cbalance, setBalacne] = useState(0);
  const [transferToken, setTransferToken] = useState();
  const [accountTo, setAccountTo] = useState();
  const contractAddress = "0xe4a50dC7CCA4C563AD0ebfed48F137A07a7989D7";
  const [max, setmax] = useState();

  const injected = new InjectedConnector({
    supportedChainIds: [1, 97, 56],
  });

  const conn = async () => {
    try {
      await activate(injected);
    } catch (e) {
      console.log(e);
    }
  };

  const handleMax = () => {
    setmax(cbalance);
  };

  const handleInput = (e) => {
    setAccountTo(e.target.value);
    if (accountTo) {
      setAccountTo("");
    }
  };

  useEffect(() => {
    if (active) {
      updateContract();
    }
  }, [active, cbalance]);

  const updateContract = async () => {
    let tempProvider = await new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = await tempProvider.getSigner();
    let instance = await new Contract(
      contractAddress,
      simple_token_abi,
      tempSigner
    );
    let balance = await instance.balanceOf(account);
    setBalacne(balance);
  };

  const transfer = async () => {
    let tempProvider = await new ethers.providers.Web3Provider(window.ethereum);
    let tempSigner = await tempProvider.getSigner();
    let instance = await new Contract(
      contractAddress,
      simple_token_abi,
      tempSigner
    );
    let trans = await instance.transfer(accountTo, 100);
    setTransferToken(trans);
  };

  return (
    <div className="text-green-700 mx-auto mt-10">
      {tokenName}
      <br />
      <div className="bg-blue-200 w-max mx-auto p-5 mt-10">
        <button className="" onClick={conn}>
          {active ? (
            <span className="text-blue-900">
              {`Connected : ${account}`}
              <br />
              {`Balance is : ${cbalance}`}
            </span>
          ) : (
            <div className="flex content-center">{connect}</div>
          )}
        </button>

        {active ? (
          <div>
            {/* just for testing  max button */}

            <div className="rounded-md shadow-sm mx-auto">
              <button onClick={handleMax}>max</button>
              <input
                onChange={handleInput}
                type="text"
                id="address"
                value={max}
                placeholder=" address"
                className="rounded-md w-80 m-5 rounded-r-md sm:text-sm text-gray-500 border-gray-700"
              />
            </div>

            <div className="bg-black w-20 mt-2 h-8 mx-auto">
              <button className="mx-auto" onClick={transfer}>
                Transfer
              </button>
            </div>
          </div>
        ) : (
          console.log("please connect the wallet")
        )}
      </div>
    </div>
  );
};
export default Wallet;
