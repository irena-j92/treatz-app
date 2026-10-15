import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AccountProvider } from './account';
import './styles.css';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() { return this.state.error ? <div className="error-message"><h1>Let’s try that again.</h1><button onClick={() => location.reload()}>Reload Treatz</button></div> : this.props.children; }
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><ErrorBoundary><AccountProvider><App /></AccountProvider></ErrorBoundary></React.StrictMode>);
