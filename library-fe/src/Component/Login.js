import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Đăng nhập với:', { username, password });
        // Chuyển hướng đến trang Dashboard
        navigate('/dashboard'); // Sử dụng navigate để chuyển hướng
    };

    return (
        <div style={styles.container}>
            <h2>Đăng Nhập</h2>
            <form onSubmit={handleLogin} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label>Tên đăng nhập:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        style={styles.input} 
                        required 
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label>Mật khẩu:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        style={styles.input} 
                        required 
                    />
                </div>
                <button type="submit" style={styles.button}>Đăng Nhập</button>
                <div style={styles.registerContainer}>
                    <span>Bạn chưa có tài khoản? </span>
                    <button style={styles.registerButton}>Đăng Ký</button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        padding: '20px',
    },
    form: {
        background: '#fff',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '300px', // Thêm chiều rộng cho form
    },
    inputGroup: {
        marginBottom: '15px',
    },
    input: {
        padding: '10px',
        width: '90%',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
    },
    registerContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
    },
    registerButton: {
        padding: '10px 15px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '5px',
    },
};

export default Login;