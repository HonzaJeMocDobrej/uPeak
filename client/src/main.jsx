import React from 'react'
import ReactDOM from 'react-dom/client'
import Path from './Path'
import AuthProvider from 'react-auth-kit'
import createStore from 'react-auth-kit/createStore'

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider
      store={store}
    >
      <Path />
    </AuthProvider>
  </React.StrictMode>,
)
