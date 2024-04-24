import { AVALANCHE_XP_TEST_NETWORK, NetworkVMType } from '@avalabs/chains-sdk';
import { BalancesService } from './BalancesService';
import { AccountType } from '../accounts/models';
import BN from 'bn.js';
import { PrimaryNetworkAssetType } from '@avalabs/glacier-sdk';
import { NetworkTokenWithBalance, TokenType } from './models';

describe('src/background/services/balances/BalancesService.ts', () => {
  const balancesServiceEVMMock = {
    getBalances: jest.fn(),
    getServiceForProvider: jest.fn(),
  } as any;
  const balancesServiceBTCMock = {
    getBalances: jest.fn(),
    getServiceForProvider: jest.fn(),
  } as any;
  const balancesServicePVMMock = {
    getBalances: jest.fn(),
  } as any;
  const balanceServiceGlacierMock = {
    getBalances: jest.fn(),
  } as any;
  const glacierServiceMock = {
    isNetworkSupported: jest.fn(),
  } as any;

  const pchain = {
    ...AVALANCHE_XP_TEST_NETWORK,
    vmName: NetworkVMType.PVM,
  };

  const testChain = {
    chainName: 'testChain',
    chainId: 123,
    vmName: NetworkVMType.EVM,
    rpcUrl: 'testChainRpcUrl',
    networkToken: {
      name: 'testChainName',
      symbol: 'TEST',
      description: 'testChainDescription',
      decimals: 10,
      logoUri: 'testChainTokenLogoUri.com',
    },
    logoUri: 'testChainLogoUri.com',
  };

  const account = {
    id: '123',
    name: 'account name',
    addressBTC: 'addressBTC',
    addressC: 'addressC',
    addressPVM: 'addressPVM',
    index: 0,
    type: AccountType.PRIMARY,
    walletId: 'walletId',
  };

  const pchainResult: NetworkTokenWithBalance = {
    name: 'P-chain avax',
    symbol: 'AVAX',
    description: 'description',
    decimals: 9,
    logoUri: 'logoUri.com',
    type: TokenType.NATIVE,
    balance: new BN(2),
    balanceUSD: 4,
    balanceDisplayValue: '2',
    balanceUsdDisplayValue: '4',
    priceUSD: 2,
    pchainBalance: {
      available: new BN(1),
      availableUSD: 2,
      availableDisplayValue: '1',
      availableUsdDisplayValue: '2',
      utxos: {
        unlockedUnstaked: [
          {
            assetId: 'assetId',
            name: 'assetName',
            symbol: 'AVAX',
            denomination: 9,
            type: PrimaryNetworkAssetType.SECP256K1,
            amount: '1000000000',
            utxoCount: 1,
          },
        ],
        unlockedStaked: [],
        lockedPlatform: [],
        lockedStakeable: [],
        lockedStaked: [],
        pendingStaked: [],
        atomicMemoryUnlocked: [],
        atomicMemoryLocked: [],
      },
      lockedStaked: 1,
      lockedStakeable: 0,
      lockedPlatform: 0,
      atomicMemoryLocked: 0,
      atomicMemoryUnlocked: 0,
      unlockedUnstaked: 0,
      unlockedStaked: 0,
      pendingStaked: 0,
    },
  };

  const glcacierResult: Record<
    string,
    Record<string, NetworkTokenWithBalance>
  > = {
    ['networkId']: {
      ['accountAddress']: {
        name: 'asset name',
        symbol: 'TEST',
        description: 'description',
        decimals: 9,
        logoUri: 'logoUri.com',
        type: TokenType.NATIVE,
        balance: new BN(3),
        balanceUSD: 9,
        balanceDisplayValue: '3',
        balanceUsdDisplayValue: '9',
        priceUSD: 3,
      },
    },
  };

  const evmResult: Record<string, Record<string, NetworkTokenWithBalance>> = {
    ['networkId2']: {
      ['accountAddress2']: {
        name: 'asset name 2',
        symbol: 'TEST2',
        description: 'description2',
        decimals: 9,
        logoUri: 'logoUri2.com',
        type: TokenType.NATIVE,
        balance: new BN(4),
        balanceUSD: 16,
        balanceDisplayValue: '4',
        balanceUsdDisplayValue: '16',
        priceUSD: 4,
      },
    },
  };
  const btcResult: Record<string, Record<string, NetworkTokenWithBalance>> = {
    ['networkId3']: {
      ['accountAddress3']: {
        name: 'asset name 3',
        symbol: 'TEST3',
        description: 'description3',
        decimals: 9,
        logoUri: 'logoUri3.com',
        type: TokenType.NATIVE,
        balance: new BN(5),
        balanceUSD: 25,
        balanceDisplayValue: '5',
        balanceUsdDisplayValue: '25',
        priceUSD: 5,
      },
    },
  };

  let service: BalancesService;
  beforeEach(() => {
    jest.resetAllMocks();
    (balancesServiceEVMMock.getBalances as jest.Mock).mockResolvedValue(
      evmResult
    );
    (balancesServiceBTCMock.getBalances as jest.Mock).mockResolvedValue(
      btcResult
    );
    (balancesServicePVMMock.getBalances as jest.Mock).mockResolvedValue(
      pchainResult
    );
    (balanceServiceGlacierMock.getBalances as jest.Mock).mockResolvedValue(
      glcacierResult
    );
    (glacierServiceMock.isNetworkSupported as jest.Mock).mockResolvedValue(
      true
    );

    service = new BalancesService(
      balancesServiceEVMMock,
      balancesServiceBTCMock,
      balancesServicePVMMock,
      {} as any,
      balanceServiceGlacierMock,
      glacierServiceMock
    );
  });

  describe('getBalancesForNetwork', () => {
    it('should call getBalances using BalancesServicePVM when network is P-chain', async () => {
      const result = await service.getBalancesForNetwork(pchain, [account]);

      expect(result).toEqual(pchainResult);
      expect(balancesServicePVMMock.getBalances).toHaveBeenCalled();
    });

    it('should call getBalances using balanceServiceGlacier when network is supported by glacier', async () => {
      const result = await service.getBalancesForNetwork(testChain, [account]);

      expect(result).toEqual(glcacierResult);
      expect(glacierServiceMock.isNetworkSupported).toHaveBeenCalled();
      expect(balanceServiceGlacierMock.getBalances).toHaveBeenCalled();
    });

    it('should call getBalances using balancesServiceEVM when network is not supported by glacier', async () => {
      (glacierServiceMock.isNetworkSupported as jest.Mock).mockResolvedValue(
        false
      );
      (
        balancesServiceEVMMock.getServiceForProvider as jest.Mock
      ).mockReturnValue(balancesServiceEVMMock);
      const result = await service.getBalancesForNetwork(testChain, [account]);

      expect(result).toEqual(evmResult);
      expect(glacierServiceMock.isNetworkSupported).toHaveBeenCalled();
      expect(balancesServiceEVMMock.getBalances).toHaveBeenCalled();
    });
    it('should call getBalances using balancesServiceBTC when network is not supported by glacier', async () => {
      (glacierServiceMock.isNetworkSupported as jest.Mock).mockResolvedValue(
        false
      );
      (
        balancesServiceBTCMock.getServiceForProvider as jest.Mock
      ).mockReturnValue(balancesServiceBTCMock);
      const result = await service.getBalancesForNetwork(testChain, [account]);

      expect(result).toEqual(btcResult);
      expect(glacierServiceMock.isNetworkSupported).toHaveBeenCalled();
      expect(balancesServiceBTCMock.getBalances).toHaveBeenCalled();
    });
  });
});
