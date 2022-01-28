import {
  SecondaryCard,
  Typography,
  VerticalFlex,
} from '@avalabs/react-components';
import { useWalletContext } from '@src/contexts/WalletProvider';
import { Fragment } from 'react';

import {
  isTransactionERC20,
  isTransactionNormal,
} from '@avalabs/wallet-react-components';
import Scrollbars from 'react-custom-scrollbars-2';
import { NoTransactions } from './components/NoTransactions';
import { isSameDay, endOfYesterday, endOfToday, format } from 'date-fns';
import { TransactionERC20 } from './components/History/TransactionERC20';
import { TransactionNormal } from './components/History/TransactionNormal';

export function WalletRecentTxs() {
  const { recentTxHistory } = useWalletContext();

  const yesterday = endOfYesterday();
  const today = endOfToday();

  const getDayString = (date: Date) => {
    const isToday = isSameDay(today, date);
    const isYesterday = isSameDay(yesterday, date);
    return isToday
      ? 'Today'
      : isYesterday
      ? 'Yesterday'
      : format(date, 'MMMM do');
  };

  if (recentTxHistory.length === 0) {
    return <NoTransactions />;
  }

  return (
    <Scrollbars style={{ flexGrow: 1, maxHeight: 'unset', height: '100%' }}>
      <VerticalFlex padding="0 16px">
        {recentTxHistory.map((tx, index) => {
          const isNewDay =
            index === 0 ||
            !isSameDay(tx.timestamp, recentTxHistory[index - 1].timestamp);
          return (
            <Fragment key={index}>
              {isNewDay && (
                <Typography
                  size={14}
                  height="17px"
                  weight={600}
                  margin="8px 0 16px"
                >
                  {getDayString(tx.timestamp)}
                </Typography>
              )}
              <SecondaryCard
                key={tx.hash}
                padding={'8px 8px'}
                margin={'0 0 8px 0'}
              >
                {isTransactionERC20(tx) && <TransactionERC20 item={tx} />}
                {isTransactionNormal(tx) && <TransactionNormal item={tx} />}
              </SecondaryCard>
            </Fragment>
          );
        })}
      </VerticalFlex>
    </Scrollbars>
  );
}
