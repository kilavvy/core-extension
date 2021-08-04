export interface DomainMetadata {
  method: 'metamask_sendDomainMetadata';
  params: { name: string; icon: string };
}

export interface EthCall {
  from?: string;
  to: string;
  gas?: string;
  gasPrice?: string;
  value?: string;
  data?: string;
  id: string | number | void;
}

export interface AddEthChainParams {
  blockExplorerUrls: string[];
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    decimals: number;
    symbol: string;
  };
  rpcUrls: string[];
}
