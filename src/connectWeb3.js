import Web3 from 'web3';
import Stock from './components/stocks';

import { STOCK_ORACLE_ADDRESS } from './quotecontract';
import { abi as STOCK_ORACLE_ABI } from './stockContract/build/contracts/stocks.json';
let web3;
let stockQuote;

(async () => {
    web3 = new Web3("http://127.0.0.1:8545/");
    stockQuote = new web3.eth.Contract(STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS);
})();

const connectWeb3 = {
    async setStock(symbol, price, volume) {
        const accounts = await web3.eth.getAccounts();
        return await stockQuote.methods.setStock(web3.utils.fromAscii(symbol), parseInt(price), parseInt(volume)).send({ from: accounts[0] });
    },

    async getStockPrice(symbol){
        return await stockQuote.methods.getStockPrice(web3.utils.fromAscii(symbol)).call();
    },

    async getStockVolume(symbol){
        return await stockQuote.methods.getStockVolume(web3.utils.fromAscii(symbol)).call();
    }

}

export default connectWeb3;