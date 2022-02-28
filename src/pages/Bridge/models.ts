import { Big } from '@avalabs/avalanche-wallet-sdk';
import { Asset } from '@avalabs/bridge-sdk';

export interface AssetBalance {
  symbol: string;
  asset: Asset;
  balance: Big | undefined;
}
