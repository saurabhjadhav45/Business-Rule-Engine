import store from '@store';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import AppRoutes from '.';

describe('AppRoutes testing', () => {
  it('invalid path should redirect to 404', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    );
  });
});
