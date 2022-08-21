import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { App } from 'components/App';
import Loader from 'components/common/Loader';
import './index.css';
import { auth } from './constants';

import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/es/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
        <GoogleOAuthProvider clientId={ auth.googleClientId }>
          <Suspense fallback={ <Loader /> }>
              <Provider store={store}>
                <PersistGate loading={ <Loader /> } persistor={ persistor }>
                  <App />
                </PersistGate>
              </Provider>
          </Suspense>
        </GoogleOAuthProvider>
    </BrowserRouter>
);
