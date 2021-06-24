import engine, { JsonRpcRequest } from './jsonRpcEngine';
import { openExtensionNewWindow } from '@src/utils/extensionUtils';
import { browser } from 'webextension-polyfill-ts';
import { store } from '@src/store/store';
import { observe } from 'mobx';
/**
 * These are requests that are simply passthrough to the backend, they dont require
 * authentication or any special handling. We should be supporting all or most of
 *
 * @link https://eth.wiki/json-rpc/API#json-rpc-methods
 *
 * This list is currently a subset of the metamaks list and needs to be groomed, just
 * including this for now so we have something substantial
 */
const unauthenticatedRoutes = new Set([
  'eth_getAssetBalance',
  'eth_blockNumber',
  'eth_call',
  'eth_chainId',
  'eth_coinbase',
  'eth_decrypt',
  'eth_estimateGas',
  'eth_gasPrice',
  // 'eth_getBalance',
  'eth_getBlockByHash',
  'eth_getBlockByNumber',
  'eth_getBlockTransactionCountByHash',
  'eth_getBlockTransactionCountByNumber',
  'eth_getCode',
  'eth_getEncryptionPublicKey',
  'eth_getFilterChanges',
  'eth_getFilterLogs',
  'eth_getLogs',
  'eth_getProof',
  'eth_getStorageAt',
  'eth_getTransactionByBlockHashAndIndex',
  'eth_getTransactionByBlockNumberAndIndex',
  'eth_getTransactionByHash',
  'eth_getTransactionCount',
  'eth_getTransactionReceipt',
  'eth_getUncleByBlockHashAndIndex',
  'eth_getUncleByBlockNumberAndIndex',
  'eth_getUncleCountByBlockHash',
  'eth_getUncleCountByBlockNumber',
  'eth_getWork',
  'eth_hashrate',
  'eth_mining',
  'eth_newBlockFilter',
  'eth_newFilter',
  'eth_newPendingTransactionFilter',
  'eth_protocolVersion',
  'eth_sendRawTransaction',
  'eth_sign',
  'eth_signTypedData',
  'eth_signTypedData_v1',
  'eth_signTypedData_v3',
  'eth_signTypedData_v4',
  'eth_submitHashrate',
  'eth_submitWork',
  'eth_syncing',
  'eth_signTransaction',
  'eth_uninstallFilter',
]);
const { addrC } = store.walletStore;

const web3CustomHandlers = {
  async eth_sendTransaction(data: JsonRpcRequest<any>) {},

  async open(data: JsonRpcRequest<any>) {
    return openExtensionNewWindow();
  },

  async eth_getBalance(data: JsonRpcRequest<any>) {
    const { balanceC } = store.walletStore;
    return { ...data, result: balanceC };
  },
  async test(data: JsonRpcRequest<any>) {
    await store.transactionStore.saveUnapprovedTx(data, addrC);

    openExtensionNewWindow(`send/confirm?id=${data.id}`);
  },

  async eth_signTypedData_v4(data: JsonRpcRequest<any>) {
    await store.transactionStore.saveUnapprovedMsg(
      data,
      addrC,
      'signTypedData_v4'
    );
    openExtensionNewWindow(`sign?id=${data.id}`);
  },

  async personal_sign(data: JsonRpcRequest<any>) {
    await store.transactionStore.saveUnapprovedMsg(
      data,
      addrC,
      'personal_sign'
    );
    openExtensionNewWindow(`sign?id=${data.id}`);

    // user signs
    // event happens

    console.log('made it here line 103');

    // const result =
    //   await store.transactionStore.messageFinalizedEvent.promisify();
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        const msg = store.transactionStore.getUnnaprovedMsgById(data.id);
        console.log('msg', msg);

        msg && resolve(msg.result);
      }, 10000);
    });

    // return result;
    // const { result } = signedMsg;
    // return result;
    // promise.resolve()
  },

  async eth_sign(data: JsonRpcRequest<any>) {
    await store.transactionStore.saveUnapprovedMsg(data, addrC, 'eth_sign');
    openExtensionNewWindow(`sign?id=${data.id}`);
  },
};

export default {
  getHandlerForKey(data: JsonRpcRequest<any>) {
    const customHandler = web3CustomHandlers[data.method];

    return customHandler
      ? () => customHandler(data)
      : unauthenticatedRoutes.has(data.method) && (() => engine.handle(data));
  },
};
