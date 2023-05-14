import { useState, useEffect } from 'react';
import Web3 from 'web3';
import ABI from "../abis/ABI.json"
import { useUserInfoState } from './UserInfoContext';

const useContract = () => {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const userState=useUserInfoState()
    useEffect(() => {
        const initWeb3 = async () => {
            if (window.BinanceChain) {
                try {
                    await window.BinanceChain.enable();
                    const web3 = new Web3(window.BinanceChain);
                    setWeb3(web3);
                    const accounts = await web3.eth.getAccounts();
                    setAccounts(accounts);
                    const instance = new web3.eth.Contract(ABI, process.env.REACT_APP_CONTRACT_ADDRESS);
                    setContract(instance);
                } catch (error) {
                    console.error(error);
                }
            } else {
                alert('Please install Binance Smart Chain wallet');
            }
        };
        initWeb3();
    }, []);

    const login = async () => {
        const coin = (await web3.eth.getBalance(accounts[0]) / Math.pow(10, 18)).toFixed(4);
        const options = {
            fromBlock: 29784161,
            toBlock: 29784161+50000,
            address: contract.options.address,
        };
        //이벤트 확인 후, 유저 존재 여부 확인-> 유저가 존재하면 가입 안함.
        try {
            // 이벤트 확인 후, 유저 존재 여부 확인 -> 유저가 존재하면 가입 안함.
            const events = await contract.getPastEvents('UserRegistered', options);
            if (!!events.find((data) => data.address === accounts[0])) {
                await contract.methods.register().send({ from: accounts[0] }).on("error", console.log);
                return { address: accounts[0], coin: coin };
            } else {
                return { address: accounts[0], coin: coin };
            }
        } catch (error) {
            console.error(error);
        }
    }

    const reservationContract=async(id,ownerAddress,deposit)=>{
        const value = web3.utils.toWei((deposit).toString(), 'ether');
        await contract.methods.createReservation(id,ownerAddress,value).send({ from: accounts[0] ,value:value}).on("error", console.log);
    }

    return { web3, accounts, contract, login ,reservationContract};
};

export default useContract;