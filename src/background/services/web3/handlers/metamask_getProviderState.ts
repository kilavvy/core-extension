import { DAppProviderRequest } from '@src/background/connections/dAppConnection/models';
import { ConnectionRequestHandler } from '@src/background/connections/models';
import { firstValueFrom } from 'rxjs';
import { network$ } from '../../network/network';
import { permissions$ } from '../../permissions/permissions';
import { domainHasAccountsPermissions } from '../../permissions/utils/domainHasAccountPermissions';
import { getAccountsFromWallet } from '../../wallet/utils/getAccountsFromWallet';
import { wallet$ } from '../../wallet/wallet';

export async function initDappState(data) {
  const walletResult = await firstValueFrom(wallet$);
  const permissions = await firstValueFrom(permissions$);
  const network = await firstValueFrom(network$);

  if (
    !walletResult ||
    !domainHasAccountsPermissions(data.domain, permissions)
  ) {
    return {
      ...data,
      result: {
        isUnlocked: false,
        networkVersion: network.config.networkID.toString(),
        accounts: [],
        chainId: network.chainId,
      },
    };
  }

  return {
    ...data,
    result: {
      isUnlocked: true,
      chainId: network.chainId,
      networkVersion: network.config.networkID.toString(),
      accounts: getAccountsFromWallet(walletResult),
    },
  };
}

export const InitDappStateRequest: [
  DAppProviderRequest,
  ConnectionRequestHandler
] = [DAppProviderRequest.INIT_DAPP_STATE, initDappState];
