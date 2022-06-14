import {
  ExtensionConnectionMessage,
  ExtensionConnectionMessageResponse,
  ExtensionRequestHandler,
} from '@src/background/connections/models';
import { ExtensionRequest } from '@src/background/connections/extensionConnection/models';
import {
  Assets,
  AssetType,
  Blockchain,
  EthereumConfigAsset,
  fetchTokenBalances,
} from '@avalabs/bridge-sdk';
import { NetworkService } from '../../network/NetworkService';
import { injectable } from 'tsyringe';
import Big from 'big.js';
import { ChainId } from '@avalabs/chains-sdk';
import { TokenPricesService } from '../../balances/TokenPricesService';
import { SettingsService } from '../../settings/SettingsService';

@injectable()
export class BridgeGetEthereumBalancesHandler
  implements ExtensionRequestHandler
{
  methods = [ExtensionRequest.BRIDGE_GET_ETH_BALANCES];

  constructor(
    private networkService: NetworkService,
    private settingsService: SettingsService,
    private tokenPricesService: TokenPricesService
  ) {}

  handle = async (
    request: ExtensionConnectionMessage
  ): Promise<ExtensionConnectionMessageResponse> => {
    const [assets, account, deprecated] = (request.params || []) as [
      assets: Assets,
      account: string,
      deprecated: boolean
    ];
    const provider = await this.networkService.getEthereumProvider();
    const ethereumBalancesBySymbol = await fetchTokenBalances(
      assets,
      Blockchain.ETHEREUM,
      provider,
      account,
      deprecated
    );
    const networks = await this.networkService.activeNetworks.promisify();
    const tokens =
      networks[ChainId.AVALANCHE_MAINNET_ID]?.tokens ||
      networks[ChainId.AVALANCHE_TESTNET_ID]?.tokens ||
      [];
    const logosBySymbol = tokens?.reduce((acc, token) => {
      acc[token.symbol] = token.logoUri;
      return acc;
    }, {});

    const erc20Assets = Object.values(assets).filter(
      (a): a is EthereumConfigAsset => a.assetType === AssetType.ERC20
    );
    const addresses = erc20Assets.map((a) => ({
      address: a.nativeContractAddress,
    }));
    const { currency } = await this.settingsService.getSettings();
    const nativeTokenPrice = await this.tokenPricesService.getPriceByCoinId(
      'ethereum',
      currency
    );
    const tokenPrices = await this.tokenPricesService.getTokenPricesByAddresses(
      addresses,
      'ethereum',
      'ethereum'
    );

    const balances: {
      [symbol: string]:
        | { balance: Big; logoUri?: string; price?: number }
        | undefined;
    } = {};

    for (const symbol in assets) {
      const asset = assets[symbol];
      const price =
        asset.assetType === AssetType.NATIVE
          ? nativeTokenPrice
          : asset.assetType === AssetType.ERC20
          ? tokenPrices[asset.nativeContractAddress]
          : undefined;

      balances[symbol] = {
        balance: ethereumBalancesBySymbol?.[symbol],
        logoUri: logosBySymbol[symbol],
        price,
      };
    }

    return {
      ...request,
      result: balances,
    };
  };
}
