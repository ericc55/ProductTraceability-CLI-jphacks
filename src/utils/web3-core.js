import Web3 from 'web3/dist/web3.min';
import { updateWeb3 } from '../blockchain';

let web3Default;
let web3Chain;

const getWeb3 = async () => {
  // window.ethereum.autoRefreshOnNetworkChange = false;
  // if (typeof window.ethereum !== 'undefined') {
  //   // myConsole.log('using window.ethereum');
  //   // web3Default = new Web3(window.ethereum);
  web3Chain = new Web3(
    new Web3.providers.HttpProvider(process.env.VUE_APP_CHAIN),
  );
  // } else {
  //   throw new Error('No wallet installed');
  // }
  updateWeb3(web3Chain);
  return {
    web3Default,
    web3Chain,
  };
};

export default {
  install: (app) => {
    getWeb3();
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$web3 = getWeb3;
  },
  getWeb3,
};
