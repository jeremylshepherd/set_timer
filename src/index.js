import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Components/Main';

import './styles.css';

function App() {
  return <Main />;
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
