import { useTranslation } from 'react-i18next';
import { Divider, Typography } from '@avalabs/k2-components';

import {
  ApprovalSection,
  ApprovalSectionBody,
  ApprovalSectionHeader,
} from '@src/components/common/approval/ApprovalSection';
import { TxDetailsRow } from '@src/components/common/approval/TxDetailsRow';

import { TruncatedIdentifier } from './TruncatedIdentifier';
import { AvaxAmount } from './AvaxAmount';
import { Avalanche } from '@avalabs/wallets-sdk';
import { isPrimarySubnet } from '@src/utils/isPrimarySubnet';

type AddPermssionlessDelegatorProps = {
  tx: Avalanche.AddPermissionlessDelegatorTx;
  avaxPrice: number;
};

export function AddPermissionlessDelegator({
  tx,
  avaxPrice,
}: AddPermssionlessDelegatorProps) {
  const { t } = useTranslation();
  const { nodeID, txFee, start, end, stake, subnetID } = tx;
  const startDate = new Date(parseInt(start) * 1000);
  const endDate = new Date(parseInt(end) * 1000);

  const isPrimaryNetwork = isPrimarySubnet(subnetID);

  return (
    <>
      <ApprovalSection sx={{ gap: 1 }}>
        <ApprovalSectionHeader label={t('Staking Details')} />
        <ApprovalSectionBody sx={{ justifyContent: 'start', py: 2.25 }}>
          <TxDetailsRow label={t('Node ID')}>
            <TruncatedIdentifier identifier={nodeID} />
          </TxDetailsRow>
          <TxDetailsRow label={t('Subnet ID')}>
            {isPrimaryNetwork ? (
              <Typography variant="caption">{t('Primary Network')}</Typography>
            ) : (
              <TruncatedIdentifier identifier={subnetID} />
            )}
          </TxDetailsRow>
          <TxDetailsRow label={t('Stake Amount')}>
            <AvaxAmount amount={stake} avaxPrice={avaxPrice} />
          </TxDetailsRow>

          <Divider sx={{ my: 1.25 }} />

          <TxDetailsRow label={t('Start Date')}>
            <Typography variant="caption">
              {startDate.toLocaleString()}
            </Typography>
          </TxDetailsRow>

          <TxDetailsRow label={t('End Date')}>
            <Typography variant="caption">
              {endDate.toLocaleString()}
            </Typography>
          </TxDetailsRow>
        </ApprovalSectionBody>
      </ApprovalSection>
      <ApprovalSection>
        <ApprovalSectionHeader label={t('Network Fee')} />
        <ApprovalSectionBody>
          <TxDetailsRow label={t('Fee Amount')}>
            <AvaxAmount amount={txFee} avaxPrice={avaxPrice} />
          </TxDetailsRow>
        </ApprovalSectionBody>
      </ApprovalSection>
    </>
  );
}
