import { ChainId, Network, NetworkVMType } from '@avalabs/chains-sdk';

export function isPchainNetwork(network?: Network) {
  if (!network) {
    return false;
  }
  return network.vmName === NetworkVMType.PVM;
}

export function isPchainNetworkId(chainId: number) {
  return (
    ChainId.AVALANCHE_XP === chainId || ChainId.AVALANCHE_TEST_XP === chainId
  );
}
