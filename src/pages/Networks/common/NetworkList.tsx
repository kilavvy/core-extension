import {
  HorizontalFlex,
  TextButton,
  Typography,
  StarIcon,
  InfoIcon,
  StarOutlineIcon,
  GlobeIcon,
  CustomToast,
  toast,
} from '@avalabs/react-components';
import { useNetworkContext } from '@src/contexts/NetworkProvider';
import { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useTheme } from 'styled-components';
import { NetworkListItem } from './NetworkListItem';
import {
  AnimatedGlobeIconContainer,
  AnimatedNetworkLogo,
  NetworkLogoContainer,
} from './NetworkLogo';
import { OuterContainer } from './OuterContainer';
import { ChainId, Network } from '@avalabs/chains-sdk';
import { useHistory } from 'react-router-dom';
import { Scrollbars } from '@src/components/common/scrollbars/Scrollbars';
import { NetworkLogo } from '@src/components/common/NetworkLogo';

interface NetworkListProps {
  networkList: Network[];
}

export function NetworkList({ networkList }: NetworkListProps) {
  const {
    network,
    setNetwork,
    removeFavoriteNetwork,
    isFavoriteNetwork,
    addFavoriteNetwork,
  } = useNetworkContext();
  const theme = useTheme();
  const history = useHistory();
  const [favoritedItem, setFavoritedItem] = useState<number | null>(null);

  if (!networkList.length) {
    return null;
  }
  return (
    <Scrollbars style={{ flexGrow: 1, maxHeight: 'unset', height: '100%' }}>
      <TransitionGroup>
        {networkList.map((networkItem, index) => {
          const isFavorite = isFavoriteNetwork(networkItem.chainId);
          return (
            <CSSTransition
              key={networkItem.chainId}
              timeout={500}
              classNames="item"
            >
              <OuterContainer>
                <NetworkListItem
                  onClick={() => {
                    setNetwork(networkItem);
                    toast.custom(
                      <CustomToast label="Active Network has changed!" />
                    );
                  }}
                  isActive={networkItem.chainId === network?.chainId}
                >
                  <HorizontalFlex align="center">
                    <NetworkLogoContainer>
                      {favoritedItem === index && (
                        <CSSTransition
                          key={networkItem.chainId}
                          timeout={500}
                          classNames="item"
                          appear
                          in
                        >
                          {networkItem.logoUri ? (
                            <AnimatedNetworkLogo
                              src={networkItem.logoUri}
                              position={index + 1}
                              isFavorited={index === favoritedItem}
                            />
                          ) : (
                            <AnimatedGlobeIconContainer
                              position={index + 1}
                              isFavorited={index === favoritedItem}
                            >
                              {' '}
                              <GlobeIcon
                                width="100%"
                                height="100%"
                                color={theme.colors.text1}
                              />
                            </AnimatedGlobeIconContainer>
                          )}
                        </CSSTransition>
                      )}
                      <NetworkLogo
                        src={networkItem.logoUri}
                        width="32px"
                        height="32px"
                        position="absolute"
                        padding="8px"
                      />
                    </NetworkLogoContainer>
                    <Typography margin="0 0 0 16px" weight={600} size={16}>
                      {networkItem.chainName}
                    </Typography>
                  </HorizontalFlex>
                  <HorizontalFlex
                    align="center"
                    justify={
                      networkItem.chainId !== ChainId.AVALANCHE_MAINNET_ID
                        ? 'space-between'
                        : 'flex-end'
                    }
                    width="64px"
                  >
                    {networkItem.chainId !== ChainId.AVALANCHE_MAINNET_ID && (
                      <TextButton
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isFavorite) {
                            setFavoritedItem(index);
                            addFavoriteNetwork(networkItem.chainId);
                            return;
                          }
                          removeFavoriteNetwork(networkItem.chainId);
                          setFavoritedItem(null);
                        }}
                      >
                        {isFavorite ? (
                          <StarIcon color={theme.colors.text1} width="20px" />
                        ) : (
                          <StarOutlineIcon
                            color={theme.colors.text1}
                            width="20px"
                          />
                        )}
                      </TextButton>
                    )}
                    <TextButton
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push(
                          `/networks/details/${networkItem.chainId}`
                        );
                      }}
                    >
                      <InfoIcon color={theme.colors.text1} width="20px" />
                    </TextButton>
                  </HorizontalFlex>
                </NetworkListItem>
              </OuterContainer>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </Scrollbars>
  );
}
