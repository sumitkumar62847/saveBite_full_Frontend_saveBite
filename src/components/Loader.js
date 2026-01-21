import React from 'react';

function Loader({ searchByAi }) {
  // Keyframes for the spinner animation
  const spinTransition = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem', // gap-4
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // bg-white/60
        zIndex: 50,
      }}
    >
      {/* Injecting keyframes for the spin animation */}
      <style>{spinTransition}</style>

      {searchByAi && (
        <h1
          style={{
            fontSize: '1.5rem', // text-2xl
            lineHeight: '2rem',
            color: '#4ade80', // text-green-400
          }}
        >
          We Search By Ai Please Wait
        </h1>
      )}

      <div
        style={{
          width: '3rem', // w-12
          height: '3rem', // h-12
          borderWidth: '4px', // border-4
          borderStyle: 'solid',
          borderColor: '#22c55e', // border-green-500
          borderTopColor: 'transparent', // border-t-transparent
          borderRadius: '9999px', // rounded-full
          animation: 'spin 1s linear infinite', // animate-spin
        }}
      ></div>
    </div>
  );
}

export default Loader;