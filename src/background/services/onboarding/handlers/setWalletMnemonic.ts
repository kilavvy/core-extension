import { ExtensionConnectionMessage } from '@src/background/connections/models';
import { OnboardingPhase } from '../models';
import { onboardingCurrentPhase, onboardingMnemonic } from '../onboardingFlows';

export async function setWalletMnemonic(request: ExtensionConnectionMessage) {
  const params = request.params;

  if (!params) {
    return {
      ...request,
      error: new Error('params missing from request'),
    };
  }

  const mnemonic = params.pop();

  if (!mnemonic) {
    return {
      ...request,
      error: new Error('mnemonic missing for request'),
    };
  }

  onboardingMnemonic.next(mnemonic);
  onboardingCurrentPhase.next(OnboardingPhase.PASSWORD);
  return {
    ...request,
    result: true,
  };
}
