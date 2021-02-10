import { React, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import connectWeb3 from '../connectWeb3';

function Stock(){

    const [symbol,setSymbol] = useState('');
    const [message, setMessage ] = useState('');
    const [messageGet, setMessageGet] = useState('');
    const key = 'B85EUS4JGYXN64X5';
    const setStockData = () => {
        fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol='+symbol+'&apikey='+key).then(res => res.json()).then((data) => {
                console.log(data);
                const price  = data['Global Quote']['05. price'];
                const volume = data['Global Quote']['06. volume'];
                connectWeb3.setStock(symbol,price,volume).then((result) => {
                    if(result){
                        setMessage('Stock Saved SuccessFully');
                    }
                }).catch((err) => {
                    console.log(err);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getPriceData = () => {
        connectWeb3.getStockPrice(symbol).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }
    const getVolumeData = () => {
        connectWeb3.getStockVolume(symbol).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }
    const handleSymbol = (e) => {
        setSymbol(e.target.value);
    };
    return(
        <div className="container-fluid">
            <h1 className="mt-5">Stocks Oracle</h1>
            <div className="container">   
                <div className="card-deck mb-3 text-center">
                    <div className="card mb-4 box-shadow">
                        <div className="card-header">
                            <h4>Add Stock</h4>
                        </div>
                        <div className="card-body">
                            <input type='text' name='symbol' onChange={handleSymbol} />
                            <button className="btn btn-primary" onClick={setStockData}>Save Stock in Blockchain</button>
                            
                            <p>{ message }</p>
                        </div>
                    </div>
                </div>
                <div className="card-deck mb-3 text-center">
                    <div className="card mb-4 box-shadow">
                        <div className="card-header">
                            <h4>Get Stock</h4>
                        </div>
                        <div className="card-body">
                            <input type='text' name='symbol' onChange={handleSymbol} />
                            <button className="btn btn-primary" onClick={getPriceData}>Get Price</button>
                            <button className="btn btn-primary" onClick={getVolumeData}>Get Volume</button>
                            <p>{ messageGet }</p>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    );
}

export default Stock;