import { useState } from "react";
import Header from "./header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function HelpModal({ onClose }) {
  const [issue, setIssue] = useState("");
  const [message, setMessage] = useState("");
  
  // States for interactive styles
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  const navigate = useNavigate();

  return (
    <div style={{ width: '100%', backgroundColor: 'white' }}>
      <Header />
      
      <div 
        style={{ 
          display: 'flex', 
          width: '100%', 
          margin: '1rem', 
          height: '60vh', 
          alignItems: 'center', 
          justifyContent: 'center', 
          paddingLeft: '1rem', 
          paddingRight: '1rem' 
        }}
      >
        <div 
          style={{ 
            width: '60%', 
            height: '100%', 
            borderRadius: '1rem', // rounded-2xl
            backgroundColor: 'white', 
            padding: '1.5rem', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' // shadow-2xl
          }}
        >
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '1rem' 
            }}
          >
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
              Help & Support
            </h2>
          </div>

          <div 
            style={{ 
              marginBottom: '1rem', 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', 
              gap: '0.75rem' 
            }}
          >
            {[
              "Order Issue",
              "Payment Issue",
              "Address Problem",
              "App Bug",
            ].map((item) => {
              const isActive = issue === item;
              return (
                <button
                  key={item}
                  onClick={() => setIssue(item)}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    borderRadius: '0.5rem',
                    border: `1px solid ${isActive ? '#22c55e' : '#e5e7eb'}`,
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    backgroundColor: isActive ? '#f0fdf4' : (hoveredItem === item ? '#f9fafb' : 'white'),
                    color: isActive ? '#16a34a' : '#374151',
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {issue && (
            <>
              <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
                Selected: <span style={{ fontWeight: 500 }}>{issue}</span>
              </p>
              <textarea
                rows="4"
                placeholder="Describe your issue..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setIsTextareaFocused(true)}
                onBlur={() => setIsTextareaFocused(false)}
                style={{
                  width: '100%',
                  borderRadius: '0.5rem',
                  border: `1px solid ${isTextareaFocused ? '#22c55e' : '#e5e7eb'}`,
                  padding: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
              <button
                onMouseEnter={() => setIsSubmitHovered(true)}
                onMouseLeave={() => setIsSubmitHovered(false)}
                style={{
                  marginTop: '1rem',
                  width: '100%',
                  borderRadius: '0.75rem',
                  backgroundColor: isSubmitHovered ? '#16a34a' : '#22c55e',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  fontWeight: 600,
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onClick={() => navigate('/')}
              >
                Submit Request
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}