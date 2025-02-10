import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";


const FirstStep = ({ idInstance, setIdInstance, apiTokenInstance, setApiTokenInstance, proceedToNextStep }) => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        color: '#075e54',
        marginBottom: '20px'
      }}>
        Enter WhatsApp API Credentials
      </h2>
    
      {/* idInstance Input */}
      <input
        type="text"
        placeholder="idInstance"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          border: '1px solid #ccc',
          borderRadius: '20px',
          outline: 'none',
          boxSizing: 'border-box',
          fontSize: '16px'
        }}
      />
    
      {/* apiTokenInstance Input */}
      <input
        type="text"
        placeholder="apiTokenInstance"
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          border: '1px solid #ccc',
          borderRadius: '20px',
          outline: 'none',
          boxSizing: 'border-box',
          fontSize: '16px'
        }}
      />
    
      {/* Next Button */}
      <button 
        onClick={proceedToNextStep}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#128C7E',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        Next
      </button>
    </div>
    
  );
};

export default FirstStep;
