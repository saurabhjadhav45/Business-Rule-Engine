import React, {useState} from 'react';
import {RadiantBackground} from '@assets/svg/radiant-bg';
import {LogoWhiteIcon} from '@assets/svg/logo-white';
import {ChevronLeftIcon} from '@assets/svg/chevron-left';
import {EyeOpen} from '@shared/icons/EyeOpen';
import {EyeClose} from '@shared/icons/EyeClose';
import Button from '@submodules/Button/Button';
import InputField from '@submodules/InputField/InputField';
import './index.scss';
import {EyeIcon} from '@assets/svg/eye-icon';

const NewPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
  };

  return (
    <>
      <div className='new-password-bg'>
        <RadiantBackground />
      </div>
      <div className='new-password-wrapper'>
        <div className='new-password-left'>
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
        <div className='new-password-right'>
          <h2 className='form-header'>
            <div className='back-button'>
              <ChevronLeftIcon />
            </div>
            New Password
          </h2>
          <div className='new-password-form-container'>
            <form className='new-password-form' onSubmit={handleSubmit}>
              <InputField
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='New Password'
                type={showPassword ? 'text' : 'password'}
                isRequired
                passwordEyeOpenIcon={<EyeIcon />}
                passwordEyeCloseIcon={<EyeClose />}
                onEyeClick={() => setShowPassword((v) => !v)}
                name='password'
              />
              <InputField
                id='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='Confirm Password'
                type={showConfirmPassword ? 'text' : 'password'}
                isRequired
                passwordEyeOpenIcon={<EyeIcon />}
                passwordEyeCloseIcon={<EyeClose />}
                onEyeClick={() => setShowConfirmPassword((v) => !v)}
                name='confirmPassword'
              />
              <Button className='new-password-btn' type='submit'>
                Update
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
