import { ExtensionRequest } from '@src/background/connections/extensionConnection/models';
import { ExtensionRequestHandler } from '@src/background/connections/models';
import { injectable } from 'tsyringe';
import { AccountsService } from '../../accounts/AccountsService';
import { NetworkService } from '../../network/NetworkService';
import { NftTokenWithBalance } from '../models';
import { NFTBalancesService } from '../nft/NFTBalancesService';

type HandlerType = ExtensionRequestHandler<
  ExtensionRequest.NFT_BALANCES_GET,
  NftTokenWithBalance[]
>;

@injectable()
export class GetNftBalancesHandler implements HandlerType {
  method = ExtensionRequest.NFT_BALANCES_GET as const;

  constructor(
    private nftBalancesService: NFTBalancesService,
    private networkService: NetworkService,
    private accountsService: AccountsService
  ) {}

  handle: HandlerType['handle'] = async (request) => {
    const currentNetwork = this.networkService.activeNetwork;
    if (!currentNetwork) {
      return {
        ...request,
        error: 'No network found',
      };
    }
    if (!this.accountsService.activeAccount?.addressC) {
      return {
        ...request,
        error: 'Account not found',
      };
    }

    try {
      return {
        ...request,
        result: await this.nftBalancesService.getNftBalances(
          this.accountsService.activeAccount.addressC, // using evm address directly since btc will never support nfts
          currentNetwork
        ),
      };
    } catch (e) {
      console.error(e);
      return {
        ...request,
        error: (e as any).toString(),
      };
    }
  };
}
