import engine, { JsonRpcRequest } from './jsonRpcEngine';
import { openExtensionNewWindow } from '@src/utils/extensionUtils';
import { store } from '@src/store/store';
import storageListener from '../utils/storage';
import { formatAndLog, LoggerColors } from '../utils/logging';

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
  'net_version',
]);
const { addrC } = store.walletStore;

const web3CustomHandlers = {
  async eth_sendTransaction(data: JsonRpcRequest<any>) {},

  async eth_getBalance(data: JsonRpcRequest<any>) {
    const { balanceC } = store.walletStore;
    return { ...data, result: balanceC };
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

    const result = await storageListener
      .map(() => store.transactionStore.getUnnaprovedMsgById(data.id)?.result)
      .filter((result) => !!result)
      .promisify();

    return result;
  },

  async eth_sign(data: JsonRpcRequest<any>) {
    await store.transactionStore.saveUnapprovedMsg(data, addrC, 'eth_sign');
    openExtensionNewWindow(`sign?id=${data.id}`);
  },
  /**
   * This is called when the user requests to connect the via dapp. We need
   * to popup the permissions window, get permissions for the given domain
   * and then respond accordingly.
   *
   * @param data the rpc request
   * @returns
   */
  async eth_requestAccounts(data: JsonRpcRequest<any>) {
    return {
      ...data,
      result: store.walletStore.accounts,
    };
  },
  /**
   * This is called right away by dapps to see if its already connected
   *
   * @param data the rpc request
   * @returns an array of accounts the dapp has permissions for
   */
  async eth_accounts(data: JsonRpcRequest<any>) {
    return {
      ...data,
      result: store.walletStore.accounts,
    };
  },
};

export default {
  getHandlerForKey(data: JsonRpcRequest<any>) {
    const customHandler =
      web3CustomHandlers[data.method] &&
      ((data) => {
        return web3CustomHandlers[data.method](data).then((result) => {
          formatAndLog('Wallet Controller: (web 3 custom response)', result, {
            color: LoggerColors.success,
          });
          return result;
        });
      });

    return customHandler
      ? () => customHandler(data)
      : unauthenticatedRoutes.has(data.method) &&
          (() =>
            engine.handle(data).then((result) => {
              formatAndLog(
                'Wallet Controller: (web 3 response)',
                { ...data, result },
                {
                  color: LoggerColors.success,
                }
              );
              return result;
            }));
  },
};
