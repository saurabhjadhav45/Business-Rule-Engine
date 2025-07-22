import {act, fireEvent, render, screen} from '@testing-library/react';

import Alert from './index';

const getIdToast = (id: string) => {
  return id;
};

describe('Test the Toast component', () => {
  it('Should render the default Alert component', async () => {
    await act(async () => {
      render(
        <Alert
          id='0'
          heading='test for success too'
          content='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, porro.'
          position='top'
          closeFn={getIdToast}
          isCloseVisible={false}
          showIcon
          toastType='default'
          variant='outlined'
        />
      );
    });
    const button = screen.queryByTestId('close-btn');
    expect(screen.getByTestId('toast-icon-container')).toBeInTheDocument();
    expect(screen.getByTestId('alert-wrapper')).toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
  });

  it('Should show the close icon button event', async () => {
    const handleClick = jest.fn();
    await act(() => {
      render(
        <Alert
          id='1'
          toastType='warning'
          content='Lorem ipsum dolor sit, amet consectetur adipisicing eplit. Nihil, porro.'
          isCloseVisible
          position='bottom-right'
          closeFn={handleClick}
          heading=''
          showIcon
          variant='filled'
        />
      );
    });
    const button = screen.getByTestId('close-btn');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledWith('1');
  });
});
