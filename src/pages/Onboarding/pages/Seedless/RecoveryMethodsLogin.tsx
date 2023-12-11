import {
  KeyIcon,
  QRCodeIcon,
  Skeleton,
  Stack,
  Typography,
  toast,
} from '@avalabs/k2-components';
import { OnboardingStepHeader } from '../../components/OnboardingStepHeader';
import { Trans, useTranslation } from 'react-i18next';
import { MethodCard } from './components/MethodCard';
import { PageNav } from '../../components/PageNav';
import { useHistory } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { FeatureGates } from '@src/background/services/featureFlags/models';
import { useFeatureFlagContext } from '@src/contexts/FeatureFlagsProvider';
import { OnboardingURLs } from '@src/background/services/onboarding/models';
import { useOnboardingContext } from '@src/contexts/OnboardingProvider';
import { TOTPModal } from './modals/TOTPModal';
import { getOidcClient } from '@src/utils/seedless/getCubeSigner';
import { FIDOModal } from './modals/FIDOModal';
import { FIDOSteps, RecoveryMethodTypes } from './models';

export function RecoveryMethodsLogin() {
  const history = useHistory();
  const { t } = useTranslation();
  const [selectedMethod, setSelectedMethod] =
    useState<RecoveryMethodTypes | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { featureFlags } = useFeatureFlagContext();
  const { oidcToken } = useOnboardingContext();
  const [configuredMfas, setConfiguredMfas] = useState<
    { type: RecoveryMethodTypes; name: string }[]
  >([]);
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!oidcToken) {
      toast.error(t('Seedless login error'));
      history.push(OnboardingURLs.ONBOARDING_HOME);
      return;
    }
  }, [history, oidcToken, t]);

  useEffect(() => {
    setIsLoading(true);
    const getMfas = async () => {
      if (!oidcToken) {
        return false;
      }
      const oidcClient = getOidcClient(oidcToken);
      const identity = await oidcClient.identityProve();
      const configuredMfa = identity.user_info?.configured_mfa;

      if (configuredMfa) {
        const mfas = configuredMfa.map((mfa) => {
          if (mfa.type === 'fido') {
            return {
              name: mfa.name,
              type: mfa.type as RecoveryMethodTypes.FIDO,
            };
          }
          if (mfa.type === 'totp') {
            return {
              name: '',
              type: mfa.type as RecoveryMethodTypes.TOTP,
            };
          }
          return {
            name: '',
            type: RecoveryMethodTypes.UNKNOWN,
          };
        });
        setConfiguredMfas(mfas);
        if (mfas.length === 1 && mfas[0]) {
          setSelectedMethod(mfas[0].type);
          setIsModalOpen(true);
        }
      }
      setIsLoading(false);
    };
    getMfas();
  }, [oidcToken]);

  const onFinish = useCallback(() => {
    history.push(OnboardingURLs.CREATE_PASSWORD);
  }, [history]);

  return (
    <>
      <Stack
        sx={{
          width: '420px',
          height: '100%',
        }}
      >
        <OnboardingStepHeader
          testId="copy-phrase"
          title={t('Verify Recovery Methods')}
        />
        <Stack
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            mb: 3,
          }}
        >
          <Typography variant="body2" sx={{ mb: 5 }}>
            <Trans i18nKey="Verify your recovery method(s) to continue." />
          </Typography>
          <Stack
            sx={{
              textAlign: 'left',
              rowGap: 1,
            }}
          >
            {isLoading && (
              <>
                <Skeleton
                  sx={{
                    width: '100%',
                    height: '80px',
                    transform: 'none',
                  }}
                />
                <Skeleton
                  sx={{
                    width: '100%',
                    height: '80px',
                    transform: 'none',
                  }}
                />
              </>
            )}
            {configuredMfas.map((mfaDevice, index) => {
              if (
                mfaDevice.type === 'totp' &&
                !featureFlags[FeatureGates.SEEDLESS_MFA_AUTHENTICATOR]
              ) {
                return null;
              }

              if (
                mfaDevice.type === 'fido' &&
                !featureFlags[FeatureGates.SEEDLESS_MFA_PASSKEY] &&
                !featureFlags[FeatureGates.SEEDLESS_MFA_YUBIKEY]
              ) {
                return null;
              }

              return (
                <MethodCard
                  key={index}
                  icon={
                    mfaDevice.type === 'totp' ? (
                      <QRCodeIcon size={24} />
                    ) : (
                      <KeyIcon size={24} />
                    )
                  }
                  title={
                    mfaDevice.name
                      ? mfaDevice.name
                      : mfaDevice.type === 'totp'
                      ? t('Authenticator')
                      : t('FIDO Device')
                  }
                  description={
                    mfaDevice.type === 'totp'
                      ? t('Verify an authenticator app as a recovery method.')
                      : t('Verify your FIDO device as a recovery method.')
                  }
                  onClick={() => {
                    setSelectedMethod(mfaDevice.type);
                    setSelectedDevice(index);
                  }}
                  isActive={
                    configuredMfas.length === 1 ??
                    selectedDevice === index ??
                    false
                  }
                />
              );
            })}
          </Stack>
        </Stack>

        <PageNav
          onBack={() => {
            history.goBack();
          }}
          onNext={() => {
            setIsModalOpen(true);
          }}
          activeStep={0}
          steps={3}
          disableNext={!selectedMethod}
        />
      </Stack>
      {isModalOpen && selectedMethod === RecoveryMethodTypes.TOTP && (
        <TOTPModal
          onFinish={() => {
            history.push(OnboardingURLs.CREATE_PASSWORD);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
      {isModalOpen && selectedMethod === RecoveryMethodTypes.FIDO && (
        <FIDOModal
          onFinish={onFinish}
          onCancel={() => setIsModalOpen(false)}
          selectedMethod={selectedMethod}
          startingStep={FIDOSteps.LOGIN}
        />
      )}
    </>
  );
}
