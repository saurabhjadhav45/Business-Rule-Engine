import Toast, {ToastProps} from '@submodules/ToastNotification/Toast';

/** Close Icon Component */
import {CloseIcon} from '../../icons';
import './index.scss';

/** note: toast and alert can be interchangeably used */
interface AlertProps extends ToastProps {
  toastType?:
    | ToastProps['typeofToast']
    | 'default'
    | 'gst-success' /** combining two extra gst hero specific alert type */;
}

function Alert(props: Omit<AlertProps, 'typeofToast'>) {
  const {
    closeFn,
    toastType,
    content,
    id,
    heading,
    isCloseVisible,
    position,
    showIcon,
    variant,
    dataTestId,
  } = props;

  /** Switch like statement, which handles the color of the close icon based on the type of the alert */
  const iconColor = {
    success: '#0f8e25',
    warning: '#926200',
    info: '#002662',
    danger: '#e12626',
    default: '#262626',
    'gst-success': '#ffffff ',
  };

  /** This functions directs to the module's Toast compoent's types */
  const libraryAlerts = () => {
    if (toastType !== 'default' && toastType !== 'gst-success') {
      return toastType;
    }
    return undefined;
  };

  /** This functions directs to the additional alert types for the GST Hero which are not part of the underlying Toast component */
  const gstSpecificAlerts = () => {
    if (toastType === 'default' || toastType === 'gst-success') {
      return toastType;
    }
    return undefined;
  };

  return (
    <div className='alert-wrapper' data-testid='alert-wrapper'>
      <div className={gstSpecificAlerts()}>
        <Toast
          typeofToast={libraryAlerts()}
          content={content}
          id={id}
          dataTestId={dataTestId}
          heading={heading}
          isCloseVisible={isCloseVisible}
          position={position}
          showIcon={showIcon}
          variant={variant}
          closeFn={closeFn}
          closeIcon={
            <CloseIcon fill={iconColor[toastType as keyof typeof toastType]} />
          }
        />
      </div>
    </div>
  );
}

export default Alert;
