import {
  HorizontalFlex,
  PlusIcon,
  VerticalFlex,
} from '@avalabs/react-components';
import { AddLiquidityDisplayData } from '@src/contracts/contractParsers/models';
import { Fragment } from 'react';
import { useTheme } from 'styled-components';
import { AddressPaths } from './components/AddressPaths';
import { SuccessFailTxInfo } from './components/SuccessFailTxInfo';
import { TokenCard } from './components/TokenCard';
import { TransactionHeader } from './components/TransactionHeader';
import { TransactionTabs } from './components/TransactionTabs';
import { TransactionProgressState } from './models';

export function AddLiquidityTx({
  poolTokens,
  toAddress,
  fromAddress,
  txParams,
  gasPrice,
  gasLimit,
  onCustomFeeSet,
  transactionState,
  hash,
  error,
  selectedGasFee,
}: AddLiquidityDisplayData) {
  const theme = useTheme();

  const plusIcon = (
    <HorizontalFlex width={'100%'} justify={'center'} margin="8px 0">
      <PlusIcon color={theme.colors.icon1} height="16px" />
    </HorizontalFlex>
  );

  return (
    <VerticalFlex width={'100%'}>
      <TransactionHeader
        title="Adding Liquidity to Pool"
        transactionState={transactionState}
      />

      <VerticalFlex>
        {/* Account */}
        <AddressPaths toAddress={toAddress} fromAddress={fromAddress} />

        {/* Tokens */}
        {poolTokens.map((token, index) => (
          <Fragment key={token.symbol}>
            <TokenCard
              token={token}
              margin={`${!index && '16px 0 0 0'}`}
              displayValue={token.amountDepositedDisplayValue}
              amount={token.amountUSDValue}
            />
            {!index && plusIcon}
          </Fragment>
        ))}

        {/* Tabs */}
        {transactionState === TransactionProgressState.NOT_APPROVED ? (
          <TransactionTabs
            byteStr={txParams?.data}
            gasPrice={gasPrice}
            limit={gasLimit?.toString()}
            onCustomFeeSet={onCustomFeeSet}
            selectedGasFee={selectedGasFee}
          />
        ) : (
          <SuccessFailTxInfo
            hash={hash}
            gasPrice={gasPrice}
            gasLimit={gasLimit?.toString() ?? ''}
            error={error}
          />
        )}
      </VerticalFlex>
    </VerticalFlex>
  );
}
