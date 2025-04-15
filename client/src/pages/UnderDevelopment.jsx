import React from 'react';

const UnderDevelopment = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f8f8f8',
    }}>
      <div style={{
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}>
        <h1 style={{
          fontSize: '36px',
          color: '#333',
          marginBottom: '20px',
        }}>
          Page Under Development
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#555',
          marginBottom: '20px',
        }}>
          We're working hard to bring you this page. Please check back soon!
        </p>
        <div style={{
          marginBottom: '20px',
        }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149073.png"
            alt="Under Development Icon"
            style={{
              width: '80px',
              height: '80px',
            }}
          />
        </div>
        <button 
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }} 
          onClick={() => window.location.href = '/'}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default UnderDevelopment;
