import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import { useStore } from '@src/store/store';

const NightSVG = () => {
  return (
    <svg
      width="79"
      height="121"
      viewBox="0 0 79 121"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M75.7151 104.384C64.2059 93.3908 57.0187 77.8672 57.0187 60.6434C57.0187 60.5946 57.0187 60.5487 57.0187 60.5C57.0187 60.4513 57.0187 60.4054 57.0187 60.3566C57.0187 43.1328 64.2059 27.6092 75.7151 16.616C75.7122 16.616 75.7094 16.616 75.7094 16.616C76.7215 15.4605 80.3621 10.933 78.4548 5.98405C78.4463 5.96398 78.4406 5.94104 78.432 5.92097C78.1469 5.19841 77.7221 4.57908 77.2204 4.04863C75.3616 2.07879 72.4622 1.32756 71.7779 1.17273C67.9748 0.407156 64.0405 0 60.0121 0C26.8672 0 0 27.0214 0 60.3566C0 60.4054 0.00285093 60.4513 0.00285093 60.5C0.00285093 60.5487 0 60.5946 0 60.6434C0 93.9786 26.8672 121 60.0121 121C64.0405 121 67.9748 120.593 71.7779 119.83C72.4593 119.675 75.3616 118.924 77.2204 116.954C77.7221 116.424 78.1469 115.802 78.432 115.082C78.4406 115.062 78.4463 115.039 78.4548 115.019C80.365 110.067 76.7215 105.542 75.7094 104.387C75.7094 104.384 75.7151 104.384 75.7151 104.384ZM62.9458 109.442C61.9707 109.502 60.9929 109.531 60.0121 109.531C33.2333 109.531 11.4408 87.639 11.4037 60.715C11.4037 60.652 11.4066 60.5946 11.4066 60.5344V60.5V60.4656C11.4066 60.4054 11.4066 60.3452 11.4037 60.285C11.4408 33.361 33.2333 11.4692 60.0121 11.4692C60.9929 11.4692 61.9707 11.4979 62.9458 11.5581C63.285 11.5782 63.6243 11.6011 63.9635 11.6298L63.2622 12.6161L57.3237 20.9485C55.2169 24.1742 53.3666 27.5748 51.7843 31.136C47.6904 40.3572 45.6149 50.1892 45.6149 60.3566V60.4971V60.5V60.5029V60.6434C45.6149 70.8108 47.6904 80.6428 51.7843 89.864C53.3666 93.4281 55.2169 96.8287 57.3237 100.052L63.2622 108.384L63.9635 109.367C63.6243 109.399 63.285 109.422 62.9458 109.442Z"
        fill="#EEEEF0"
      />
    </svg>
  );
};

const DaySVG = () => {
  return (
    <svg
      width="121"
      height="121"
      viewBox="0 0 121 121"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.1663 54.4648H6.03563C2.70166 54.4648 0 57.1665 0 60.5005C0 63.8344 2.70166 66.5361 6.03563 66.5361H28.1663C31.5002 66.5361 34.2019 63.8344 34.2019 60.5005C34.2019 57.1665 31.5002 54.4648 28.1663 54.4648Z"
        fill="#27043C"
      />
      <path
        d="M114.963 54.4648H92.8325C89.4985 54.4648 86.7969 57.1665 86.7969 60.5005C86.7969 63.8344 89.4985 66.5361 92.8325 66.5361H114.963C118.297 66.5361 120.999 63.8344 120.999 60.5005C120.999 57.1665 118.297 54.4648 114.963 54.4648Z"
        fill="#27043C"
      />
      <path
        d="M54.4648 92.8325V114.963C54.4648 118.297 57.1665 120.999 60.5005 120.999C63.8344 120.999 66.5361 118.297 66.5361 114.963V92.8325C66.5361 89.4985 63.8344 86.7969 60.5005 86.7969C57.1665 86.7969 54.4648 89.4985 54.4648 92.8325Z"
        fill="#27043C"
      />
      <path
        d="M54.4648 6.03563V28.1663C54.4648 31.5002 57.1665 34.2019 60.5005 34.2019C63.8344 34.2019 66.5361 31.5002 66.5361 28.1663V6.03563C66.5361 2.70166 63.8344 0 60.5005 0C57.1665 0 54.4648 2.70166 54.4648 6.03563Z"
        fill="#27043C"
      />
      <path
        d="M87.7168 96.2529L94.744 103.28C97.1008 105.637 100.923 105.637 103.28 103.28C105.637 100.923 105.637 97.1008 103.28 94.744L96.2529 87.7168C93.8961 85.36 90.0736 85.36 87.7168 87.7168C85.36 90.0736 85.36 93.8961 87.7168 96.2529Z"
        fill="#27043C"
      />
      <path
        d="M17.7207 26.2568L24.7479 33.284C27.1047 35.6408 30.9272 35.6408 33.284 33.284C35.6408 30.9272 35.6408 27.1047 33.284 24.7479L26.2568 17.7207C23.9 15.3639 20.0775 15.3639 17.7207 17.7207C15.3639 20.0803 15.3639 23.9 17.7207 26.2568Z"
        fill="#27043C"
      />
      <path
        d="M96.2529 33.284L103.28 26.2568C105.637 23.9 105.637 20.0775 103.28 17.7207C100.923 15.3639 97.1008 15.3639 94.744 17.7207L87.7168 24.7479C85.36 27.1047 85.36 30.9272 87.7168 33.284C90.0736 35.6408 93.8961 35.6408 96.2529 33.284Z"
        fill="#27043C"
      />
      <path
        d="M26.2568 103.28L33.284 96.2529C35.6408 93.8961 35.6408 90.0736 33.284 87.7168C30.9272 85.36 27.1047 85.36 24.7479 87.7168L17.7207 94.744C15.3639 97.1008 15.3639 100.923 17.7207 103.28C20.0803 105.637 23.9 105.637 26.2568 103.28Z"
        fill="#27043C"
      />
      <path
        d="M60.6463 79.613C49.9489 79.613 41.2461 70.9102 41.2461 60.2127C41.2461 49.5153 49.9489 40.8125 60.6463 40.8125C71.3438 40.8125 80.0466 49.5153 80.0466 60.2127C80.0466 70.9102 71.3438 79.613 60.6463 79.613ZM60.6463 50.8719C55.4959 50.8719 51.3055 55.0623 51.3055 60.2127C51.3055 65.3631 55.4959 69.5536 60.6463 69.5536C65.7967 69.5536 69.9872 65.3631 69.9872 60.2127C69.9872 55.0623 65.7967 50.8719 60.6463 50.8719Z"
        fill="#27043C"
      />
    </svg>
  );
};
export interface ToggleDarkModeProps {}

export const ToggleDarkMode = observer((props: ToggleDarkModeProps) => {
  const { themeStore } = useStore();

  return (
    <Button
      onClick={() => {
        themeStore.toggleDarkMode();
      }}
    >
      {themeStore.isDarkMode ? <NightSVG /> : <DaySVG />}
    </Button>
  );
});

export const Button = styled.div`
  svg {
    max-height: 1rem;
    max-width: 1rem;
  }
`;
