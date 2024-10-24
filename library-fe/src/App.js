// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login'; // Đảm bảo đường dẫn đúng
import Dashboard from './Component/Dashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Component/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;