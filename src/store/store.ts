import { createContext, useContext } from 'react';
import AssetsStore from '@src/store/assets/assetsStore';
import ThemeStore from '@src/store/theme/themeStore';
import ExtensionStore from '@src/store/extension/extensionStore';
import OnboardStore from '@src/store/onboard/onboardStore';
import NetworkStore from '@src/store/network/networkStore';
import WalletStore from '@src/store/wallet/walletStore';

export interface CombinedStores {
  asssetsStore: AssetsStore;
  themeStore: ThemeStore;
  extensionStore: ExtensionStore;
  onboardStore: OnboardStore;
  networkStore: NetworkStore;
  walletStore: WalletStore;
}

export const store: CombinedStores = {
  asssetsStore: new AssetsStore(),
  themeStore: new ThemeStore(),
  extensionStore: new ExtensionStore(),
  onboardStore: new OnboardStore(),
  networkStore: new NetworkStore(),
  walletStore: new WalletStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
