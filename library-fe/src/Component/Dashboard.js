// Dashboard.js
import React from 'react';

const Dashboard = () => {
    return (
        <div style={dashboardStyles.container}>
            <h2>Quản Lý Thủ Thư và Nhân Viên</h2>
            {/* Nội dung trang quản lý có thể thêm vào đây */}
        </div>
    );
};

const dashboardStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        padding: '20px',
    },
};

export default Dashboard;