import Helmet from '@common/components/utils/Helmet';
import {ILoginApiProps} from '@common/interfaces';
import STORAGE from '@core/helpers/storage-helpers/constants';
import StorageHelper from '@core/helpers/storage-helpers/storage.helper';
import {alertActions} from '@core/store/alertReducer';
import {loginApi} from '@pages/auth/api';
import {EyeClose} from '@shared/icons';
import {RootState, dispatch} from '@store';
import Button from '@submodules/Button/Button';
import InputField from '@submodules/InputField/InputField';
import {AxiosResponse} from 'axios';
import {Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as yup from 'yup';
import {useSelector} from 'react-redux';

import {authActions} from '../../store/reducer';
import {RadiantBackground} from '@assets/svg/radiant-bg';
import {LogoWhiteIcon} from '@assets/svg/logo-white';
import './index.scss';
import {EyeIcon} from '@assets/svg/eye-icon';
import Link from '@submodules/Link/Link';
import Modal from '@submodules/Modal/Modal';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email address.')
    .required('Please enter email address.'),
  password: yup
    .string()
    .min(8, 'Password should be minimum length of 8 characters.')
    .max(15, 'Password should be maximum length of 15 characters.')
    .required('Please enter password.'),
});

interface ForgotPasswordModalProps {
  onClose: () => void;
  onReset: (email: string) => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  onClose,
  onReset,
}) => {
  return (
    <div className='forgot-password-modal'>
      <div className='custom-modal-header'>
        <h2>Forgot Password?</h2>
        <button className='close-btn' onClick={onClose}>
          ×
        </button>
      </div>

      <Formik
        initialValues={{email: ''}}
        validationSchema={yup.object({
          email: yup
            .string()
            .email('Please enter valid email address.')
            .required('Please enter email address.'),
        })}
        onSubmit={(values, {setSubmitting}) => {
          onReset(values.email);
          setSubmitting(false);
          onClose();
        }}>
        {({
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          errors,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit} className='forgot-password-form'>
            <InputField
              id='forgot-email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Email Address'
              type='email'
              name='email'
              isRequired
              errorMessage={errors.email}
            />

            <div className='modal-buttons'>
              <button type='button' className='cancel-btn' onClick={onClose}>
                Cancel
              </button>
              <button
                type='submit'
                className='reset-btn'
                disabled={isSubmitting}>
                Reset
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

function Login() {
  const [disabledSignInBtn, setDisabledSignInBtn] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const navigate = useNavigate();

  const {alert} = useSelector((state: RootState) => state);

  useEffect(() => {
    setDisabledSignInBtn(false);
  }, [alert]);

  const handleLoginSubmit = async (values: ILoginApiProps) => {
    setDisabledSignInBtn(true);
    await loginApi(values).then((res: AxiosResponse) => {
      const {
        usrSessionToken,
        usrEmail,
        createdDate,
        hasAnygstinRegistered,
        multiUserType,
        usrFirstName,
        usrLastName,
        usrMobile,
        usrId,
        uuid,
        signUpAs,
      } = res.data;
      if (signUpAs === 'BO') {
        dispatch(authActions.setAccessToken(usrSessionToken));
        dispatch(
          authActions.login({
            usrFirstName,
            usrLastName,
            usrEmail,
            usrMobile,
            usrId,
            uuid,
            hasAnygstinRegistered,
            multiUserType,
            createdDate,
          })
        );
        StorageHelper.setItem(STORAGE.SESSION_TOKEN, usrSessionToken);
        StorageHelper.setItem(STORAGE.USER_ID, usrId);
        navigate('/dashboard');
      } else {
        dispatch(
          alertActions.setAlertMsg({
            code: '500',
            message: 'Invalid user',
            alertType: 'danger',
          })
        );
      }
    });
  };
  return (
    <>
      <Helmet title='Login' />
      <div className='background-image'>
        <RadiantBackground />
      </div>

      <div className='page-wrapper'>
        <div className='left-section'>
          <div className='logo-block'>
            <LogoWhiteIcon />
            <p className='bank-name'>Small Finance Bank</p>
          </div>

          <div className='intro-text'>
            <h2 className='headline'>
              We are transforming the future of Banking Technology, Data
              Security & AI-driven Innovation.
            </h2>
            <p className='description'>
              Empowering financial institutions through advanced
              technology—enabling them to scale securely and efficiently in a
              digital-first world as a trusted technology partner.
            </p>
            <p className='description'>
              We deliver intelligent banking solutions that drive operational
              excellence, ensure compliance, and support strategic
              growth—fostering secure, long-term partnerships built on
              reliability and innovation.
            </p>
          </div>
        </div>

        <div className='right-section'>
          <h2 className='form-header'>Sign In</h2>

          <div className='form-container'>
            <div className='signin-container'>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={loginSchema}
                onSubmit={(values) => {
                  handleLoginSubmit(values);
                }}>
                {({handleSubmit, values, handleChange, handleBlur, errors}) => (
                  <Form onSubmit={handleSubmit} className='signin-form'>
                    <InputField
                      id='email'
                      value={values.email}
                      onChange={handleChange}
                      placeholder='Enter Email'
                      type='email'
                      isRequired
                      onBlur={(e) => values.email && handleBlur(e)}
                      name='email'
                      errorMessage={
                        errors.email ? (errors.email as string) : ''
                      }
                    />
                    <p className='input-error'>{errors.email}</p>
                    <InputField
                      id='password'
                      value={values.password}
                      onChange={handleChange}
                      placeholder='Enter Password'
                      type='password'
                      isRequired
                      onBlur={(e) => values.password && handleBlur(e)}
                      passwordEyeOpenIcon={<EyeIcon />}
                      passwordEyeCloseIcon={<EyeClose />}
                      name='password'
                      errorMessage={
                        errors.password ? (errors.password as string) : ''
                      }
                    />
                    <p className='input-error'>{errors.password}</p>
                    <Link
                      href='javascript:void(0)'
                      className='forgot-password'
                      onClick={() => setShowForgotPasswordModal(true)}>
                      Forgot Password?
                    </Link>
                    <Button
                      type='submit'
                      dataTestId='submitBtn'
                      disabled={disabledSignInBtn}
                      className='signin-button'>
                      Sign In
                    </Button>
                    <p className='agreement-text'>
                      By clicking Sign In, You agree to our{' '}
                      <Link href='#'>License Agreement</Link>
                    </p>
                  </Form>
                )}
              </Formik>

              <Modal
                isOpen={showForgotPasswordModal}
                content={
                  <ForgotPasswordModal
                    onClose={() => setShowForgotPasswordModal(false)}
                    onReset={(email: string) => {
                      console.log('Reset password for:', email);
                    }}
                  />
                }
                isCloseIconVisible
                onClose={() => setShowForgotPasswordModal(false)}
                onOutSideClickClose={() => setShowForgotPasswordModal(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
