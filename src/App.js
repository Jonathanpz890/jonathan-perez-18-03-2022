import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './scss/main.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './pages';
import Navbar from './components/Navbar';
import useMessage from './hooks/useMessage';
import { useSelector } from 'react-redux';

const App = () => {
    const message = useMessage();
    const { darkMode } = useSelector(state => state.darkMode)
    const renderComponent = (component) => {
        return(
            <div className="Container">
                <Navbar />
                {component}
                {message}
            </div>
        )
    }
    return (
        <div className={`App${darkMode ? ' dark-mode' : ''}`}>
            <Router>
                <Routes>
                    {routes.map(route => 
                        <Route
                            exact
                            key={route.name}
                            path={route.path}
                            element={renderComponent(route.component)}
                        />
                    )}
                    <Route path='*' element={<Navigate to='/products' />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
