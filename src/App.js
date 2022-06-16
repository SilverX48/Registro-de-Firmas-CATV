import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

import SignPage from './vistas/SignPage';
import ScannerPage from './vistas/ScannerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ScannerPage />}/>
        <Route path='/firmar' element={<SignPage />}/>
      </Routes>
    </Router>
  );
}

export default App;