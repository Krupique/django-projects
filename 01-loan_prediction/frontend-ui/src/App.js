import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css';
import UploadForm from './FileUpload';
import Home from './Home';
import Navigator from './NavigationbBar';

function App() {
  return (
    <Router>
    <div className="App">
      <Navigator />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/batchProcessing' element={<UploadForm />}></Route>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
