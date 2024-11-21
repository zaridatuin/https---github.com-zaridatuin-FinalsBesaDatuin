import './App.css';
import { BrowserRouter } from 'react-router-dom'
import NavigationBar from './nav/NavigationBar'
import NavRoutes from './nav/NavRoutes'
import {UserProvider} from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
          <NavigationBar />
          <NavRoutes />
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
