import React, { useEffect, useRef, useState } from "react";
import lottery from "./lottery.js";
import web3 from "./web3.js";
const App = () => {
  const [managerAddr, setManagerAddr] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const userValue = useRef(0);
  const [transactionStatus, setTransactionStatus] = useState("");
  const [pickwinnerStatus, setPickwinnerStatus] = useState("");
  useEffect(() => {
    const fetchManager = async () => {
      const managerData = await lottery.methods.manager().call();
      const playersData = await lottery.methods.getPlayers().call();
      const contractBal = await web3.eth.getBalance(lottery.options.address);
      setManagerAddr(managerData);
      setPlayers(playersData);
      setBalance(contractBal);
    };
    fetchManager();
  }, [managerAddr, players, balance]);
  const HandleForm = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setTransactionStatus("Waiting on Transaction Status!!");
    const result = await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(userValue.current.value, "ether"),
    });
    console.log(result);
    setTransactionStatus("You Have Entered the Lottery!!");
  };
  const HandlePickWinner = async () => {
    const accounts = await web3.eth.getAccounts();
    setPickwinnerStatus("Winner is Being Pick, Plz Wait");
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    setPickwinnerStatus(
      "Winner has been picked, Check your MetaMask Acc Balance."
    );
  };
  return (
    <div className="m-4 p-4 my-4 py-4">
      <h2 className="text-center my-4">Lottery Contract</h2>
      <p>
        This Contract is Mananged by {managerAddr}. There are currently{" "}
        {players.length} people entered competing to win amount of{" "}
        {web3.utils.fromWei(balance, "ether")} ether!{" "}
      </p>
      <hr />
      <form onSubmit={HandleForm}>
        <h4>Participate in the lottery!</h4>
        <div>
          <label className="mr-2">Amount of ether to enter</label>
          <input ref={userValue} />
        </div>
        <button className="bg-blue-500 mr-2 p-2 text-bold px-5">Enter</button>
        <hr />
        <h2>{transactionStatus}</h2>
      </form>
      <div>
        <h1>Time to PickWinner!</h1>
        <button
          className="bg-blue-500 mr-2 p-2 text-bold px-5"
          onClick={HandlePickWinner}
        >
          Select Winner!
        </button>
        <h2>{pickwinnerStatus}</h2>
      </div>
    </div>
  );
};

export default App;
