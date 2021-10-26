import React, { useState, useEffect } from 'react';
import {
  Input,
  VerticalFlex,
  ComponentSize,
  Typography,
  PrimaryButton,
  HorizontalFlex,
} from '@avalabs/react-components';
import { SettingsPageProps } from '../models';
import { SettingsHeader } from '../SettingsHeader';
import { useWalletContext } from '@src/contexts/WalletProvider';

function verifyPasswordsMatch(pass1?: string, pass2?: string) {
  return !!(pass1 === pass2);
}

const PASSWORD_ERROR = 'Passwords do not match';
const SERVER_SUCCESS = 'Your password has been changed succesfully.';
const SERVER_ERROR = 'Something went wrong.';

export function ChangePassword({ goBack, navigateTo }: SettingsPageProps) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [serverResponse, setServerResponse] = useState('');
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    setServerError('');
  }, [oldPassword, newPassword, confirmPassword]);

  const { changeWalletPassword } = useWalletContext();

  const fieldsFilled = oldPassword && newPassword && confirmPassword;

  let error;
  if (fieldsFilled && !verifyPasswordsMatch(newPassword, confirmPassword)) {
    error = PASSWORD_ERROR;
  }

  const canSubmit = !error && fieldsFilled;

  const resetInputFields = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleChangePassword = () => {
    changeWalletPassword(newPassword, oldPassword)
      .then((res) => {
        resetInputFields();
        setServerResponse(res ? SERVER_SUCCESS : SERVER_ERROR);
      })
      .catch((err) => {
        setServerError(err);
      });
  };

  return (
    <VerticalFlex width="375px" padding="12px 0">
      <SettingsHeader
        goBack={goBack}
        navigateTo={navigateTo}
        title={'Change Password'}
      />
      {!serverResponse && (
        <>
          <VerticalFlex align="center" padding="12px 0">
            <HorizontalFlex height="100px">
              <Input
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                value={oldPassword}
                placeholder="old password"
                type="password"
                error={!!serverError}
                errorMessage={serverError}
              />
            </HorizontalFlex>
            <HorizontalFlex height="100px">
              <Input
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                value={newPassword}
                placeholder="new password"
                type="password"
                error={!!error}
              />
            </HorizontalFlex>
            <HorizontalFlex height="100px">
              <Input
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
                placeholder="confirm password"
                type="password"
                error={!!error}
                errorMessage={error}
              />
            </HorizontalFlex>
          </VerticalFlex>
          <VerticalFlex align="center">
            <PrimaryButton
              size={ComponentSize.LARGE}
              onClick={handleChangePassword}
              margin="0 0 24px"
              disabled={!canSubmit}
            >
              <Typography size={14} color="inherit">
                Change Password
              </Typography>
            </PrimaryButton>
          </VerticalFlex>
        </>
      )}
      {serverResponse && (
        <VerticalFlex width="100%" align="center" padding="24px">
          <Typography height="24px">{serverResponse}</Typography>
        </VerticalFlex>
      )}
    </VerticalFlex>
  );
}
