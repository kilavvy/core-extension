import { AccountType } from '@src/background/services/accounts/models';
import { WalletType } from '@src/background/services/wallet/models';
import { useAccountsContext } from '@src/contexts/AccountsProvider';
import { useWalletContext } from '@src/contexts/WalletProvider';

const useIsUsingSeedlessAccount = () => {
  const { walletDetails } = useWalletContext();
  const {
    accounts: { active: activeAccount },
  } = useAccountsContext();

  return (
    walletDetails?.type === WalletType.SEEDLESS &&
    activeAccount?.type === AccountType.PRIMARY
  );
};

export default useIsUsingSeedlessAccount;
