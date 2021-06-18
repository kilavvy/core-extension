import { makeAutoObservable, autorun, observable, configure } from 'mobx';
import { persistStore } from '@src/utils/mobx';
import { UnapprovedTransaction, txParams } from './types';
import { JsonRpcRequest } from 'json-rpc-engine';

class TransactionStore {
  addrX: string = '';
  unapprovedTxs: UnapprovedTransaction[] = [];

  constructor() {
    makeAutoObservable(this);
    persistStore(this, ['unapprovedTxs'], 'TransactionStore');
  }

  getUnnapprovedTxById(id: string | number | void) {
    const match = this.unapprovedTxs.find((x) => {
      return x.id === id;
    });
    return match;
  }

  removeUnapprovedTransaction(id: string | number) {
    const removedArray: UnapprovedTransaction[] = this.unapprovedTxs.filter(
      (x) => x.id !== id
    );
    this.unapprovedTxs = removedArray;
    return;
  }

  async saveUnapprovedTx(data: JsonRpcRequest<any>, from: string) {
    const { params } = data;
    let { to, value, gas, gasPrice }: txParams = params;
    const now = new Date().getTime();

    let sampleTx = {
      id: data.id,
      time: now,
      status: 'string',
      metamaskNetworkId: '1',
      chainId: '0xa869',
      txParams: {
        from: from,
        to: to,
        value: value,
        gas: gas,
        gasPrice: gasPrice,
      },
      type: 'standard',
      transactionCategory: 'transfer',
    };

    this.unapprovedTxs.push(sampleTx);
    return;
  }
}

export default TransactionStore;
