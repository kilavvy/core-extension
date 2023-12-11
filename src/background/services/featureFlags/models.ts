export enum FeatureGates {
  EVERYTHING = 'everything',
  EVENTS = 'events',
  SWAP = 'swap-feature',
  BRIDGE = 'bridge-feature',
  BRIDGE_ETH = 'bridge-feature-eth',
  BRIDGE_BTC = 'bridge-feature-btc',
  SEND = 'send-feature',
  SENDTRANSACTION_CHAIN_ID_SUPPORT = 'sendtransaction-chain-id-support-feature',
  BUY = 'buy',
  BUY_MOONPAY = 'buy-feature-moonpay',
  BUY_COINBASE = 'buy-feature-coinbase',
  KEYSTONE = 'keystone',
  NFT_MARKETPLACE = 'nft-marketplace',
  BOTTOM_NAVIGATION = 'bottom-navigation',
  DEFI = 'defi-feature',
  IMPORT_WALLET_CONNECT = 'import-wallet-connect',
  IMPORT_FIREBLOCKS = 'import-fireblocks',
  SEEDLESS_ONBOARDING = 'seedless-onboarding',
  SEEDLESS_ONBOARDING_GOOGLE = 'seedless-onboarding-google',
  SEEDLESS_ONBOARDING_APPLE = 'seedless-onboarding-apple',
  SEEDLESS_MFA_PASSKEY = 'seedless-mfa-passkey',
  SEEDLESS_MFA_AUTHENTICATOR = 'seedless-mfa-authenticator',
  SEEDLESS_MFA_YUBIKEY = 'seedless-mfa-yubikey',
  SEEDLESS_SIGNING = 'seedless-signing',
}

// Posthog API does not return disabled flags on their `/decide` api endpoint
// Define disabled state values for the flags
export const DISABLED_FLAG_VALUES: FeatureFlags = {
  [FeatureGates.EVERYTHING]: false,
  [FeatureGates.EVENTS]: false,
  [FeatureGates.SWAP]: false,
  [FeatureGates.BRIDGE]: false,
  [FeatureGates.BRIDGE_ETH]: false,
  [FeatureGates.BRIDGE_BTC]: false,
  [FeatureGates.SEND]: false,
  [FeatureGates.SENDTRANSACTION_CHAIN_ID_SUPPORT]: false,
  [FeatureGates.BUY]: false,
  [FeatureGates.BUY_MOONPAY]: false,
  [FeatureGates.BUY_COINBASE]: false,
  [FeatureGates.KEYSTONE]: false,
  [FeatureGates.NFT_MARKETPLACE]: false,
  [FeatureGates.BOTTOM_NAVIGATION]: false,
  [FeatureGates.DEFI]: false,
  [FeatureGates.IMPORT_WALLET_CONNECT]: false,
  [FeatureGates.IMPORT_FIREBLOCKS]: false,
  [FeatureGates.SEEDLESS_ONBOARDING]: false,
  [FeatureGates.SEEDLESS_ONBOARDING_GOOGLE]: false,
  [FeatureGates.SEEDLESS_ONBOARDING_APPLE]: false,
  [FeatureGates.SEEDLESS_MFA_PASSKEY]: false,
  [FeatureGates.SEEDLESS_MFA_AUTHENTICATOR]: false,
  [FeatureGates.SEEDLESS_MFA_YUBIKEY]: false,
  [FeatureGates.SEEDLESS_SIGNING]: false,
};

// Default flags are used when posthog is not available
export const DEFAULT_FLAGS: FeatureFlags = {
  [FeatureGates.EVERYTHING]: true,
  [FeatureGates.EVENTS]: true,
  [FeatureGates.SWAP]: true,
  [FeatureGates.BRIDGE]: true,
  [FeatureGates.BRIDGE_ETH]: true,
  [FeatureGates.BRIDGE_BTC]: true,
  [FeatureGates.SEND]: true,
  [FeatureGates.SENDTRANSACTION_CHAIN_ID_SUPPORT]: true,
  [FeatureGates.BUY]: true,
  [FeatureGates.BUY_MOONPAY]: true,
  [FeatureGates.BUY_COINBASE]: true,
  [FeatureGates.KEYSTONE]: true,
  [FeatureGates.NFT_MARKETPLACE]: true,
  [FeatureGates.BOTTOM_NAVIGATION]: true,
  [FeatureGates.DEFI]: true,
  [FeatureGates.IMPORT_WALLET_CONNECT]: true,
  [FeatureGates.IMPORT_FIREBLOCKS]: true,
  [FeatureGates.SEEDLESS_ONBOARDING]: true,
  [FeatureGates.SEEDLESS_ONBOARDING_GOOGLE]: true,
  [FeatureGates.SEEDLESS_ONBOARDING_APPLE]: true,
  [FeatureGates.SEEDLESS_MFA_PASSKEY]: true,
  [FeatureGates.SEEDLESS_MFA_AUTHENTICATOR]: true,
  [FeatureGates.SEEDLESS_MFA_YUBIKEY]: true,
  [FeatureGates.SEEDLESS_SIGNING]: true,
};

export enum FeatureFlagEvents {
  FEATURE_FLAG_UPDATED = 'FeatureFlagEvents: FEATURE_FLAG_UPDATED',
}

export type FeatureFlags = Record<FeatureGates, boolean>;

export const FEATURE_FLAGS_OVERRIDES_KEY = '__feature-flag-overrides__';
