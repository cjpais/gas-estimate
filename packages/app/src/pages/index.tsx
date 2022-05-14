import { BigNumber } from "ethers";
import { formatEther, parseUnits } from "ethers/lib/utils";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Plot from "../components/plot";

// TODO store in localStorage? add ur fav gas prices
export const gasPrices = [0, 25, 50, 75, 100, 125, 150, 175, 200];

export const getCost = (numGas: string, gasPrice: string) => {
  return formatEther(
    parseUnits(numGas || "0", "gwei").mul(BigNumber.from(gasPrice || "0"))
  );
};

const HomePage: NextPage = () => {
  const [gasPrice, setGasPrice] = useState("50");
  const [numGas, setNumGas] = useState("4000000");
  const numEther = getCost(numGas, gasPrice) + " ETH";

  return (
    <>
      <Head>
        <title>Gas Estimate</title>
      </Head>

      {/* <div className="flex items-center justify-center h-screen space-x-10"> */}
      <div className="flex items-center justify-center space-x-10">
        <input
          className="border border-gray-500 p-2"
          value={numGas}
          type="number"
          min="0"
          onChange={(e) => setNumGas(e.target.value)}
        />
        gas
        <h2>*</h2>
        <input
          className="border border-gray-500 p-2"
          value={gasPrice}
          type="number"
          min="0"
          onChange={(e) => setGasPrice(e.target.value)}
        />
        gwei
        <h2>=</h2>
        <h1>{numEther}</h1>
      </div>
      <div>
        <table className="table-fixed">
          <thead>
            <tr>
              <th>Gas Price</th>
              <th>Cost</th>
            </tr>
          </thead>
          {gasPrices.map((price) => (
            <tbody>
              <tr>
                <td>{price} gwei</td>
                <td>{getCost(numGas, price.toString()) + " ETH"}</td>
              </tr>
            </tbody>
          ))}
        </table>
        <Plot numGas={numGas} />
      </div>
    </>
  );
};

export default HomePage;
