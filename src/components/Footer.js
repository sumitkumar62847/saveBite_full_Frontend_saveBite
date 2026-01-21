import React, { useState, useEffect } from "react";

// Helper component to handle hover states for links
const FooterLink = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        color: isHovered ? "#ffffff" : "#d1d5db",
        cursor: "pointer",
        transition: "color 0.2s ease",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
      }}
    >
      {children}
    </li>
  );
};

function Footer() {
  const [width, setWidth] = useState(window.innerWidth);

  // Update width on resize to handle sm: and md: breakpoints
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSm = width >= 640;
  const isMd = width >= 768;

  const gridStyle = {
    display: "grid",
    gap: "2rem",
    gridTemplateColumns: isMd 
      ? "repeat(4, minmax(0, 1fr))" 
      : isSm 
        ? "repeat(2, minmax(0, 1fr))" 
        : "repeat(1, minmax(0, 1fr))",
  };

  const bottomFlexStyle = {
    display: "flex",
    flexDirection: isSm ? "row" : "column",
    alignItems: "center",
    justifyContent: isSm ? "space-between" : "center",
    gap: "0.5rem",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  };

  return (
    <footer style={{ width: "100%", backgroundColor: "#283A2C", color: "#d1d5db" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        
        <div style={gridStyle}>
          {/* Brand Section */}
          <div>
            <h2 style={{ fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: "600", color: "#ffffff", margin: 0 }}>
              SaveBite
            </h2>
            <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", lineHeight: "1.25rem", color: "#9ca3af" }}>
              SaveBite helps reduce food waste by connecting people with surplus
              food at affordable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ marginBottom: "0.5rem", fontSize: "0.875rem", lineHeight: "1.25rem", fontWeight: "600", color: "#ffffff" }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <FooterLink>Home</FooterLink>
              <FooterLink>Browse Food</FooterLink>
              <FooterLink>Add Food</FooterLink>
              <FooterLink>Help & Support</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 style={{ marginBottom: "0.5rem", fontSize: "0.875rem", lineHeight: "1.25rem", fontWeight: "600", color: "#ffffff" }}>
              Support
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <FooterLink>Terms & Conditions</FooterLink>
              <FooterLink>Privacy Policy</FooterLink>
              <FooterLink>Refund Policy</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ marginBottom: "0.5rem", fontSize: "0.875rem", lineHeight: "1.25rem", fontWeight: "600", color: "#ffffff" }}>
              Contact Us
            </h3>
            <p style={{ fontSize: "0.875rem", lineHeight: "1.25rem", color: "#9ca3af", margin: 0 }}>
              sumitsp877@gmail.com
            </p>
            <p style={{ fontSize: "0.875rem", lineHeight: "1.25rem", color: "#9ca3af", marginTop: "0.25rem", margin: "0.25rem 0 0 0" }}>
              📍 India
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ marginTop: "2rem", marginBottom: "2rem", height: "1px", width: "100%", backgroundColor: "rgba(75, 85, 99, 0.4)" }}></div>

        {/* Bottom */}
        <div style={bottomFlexStyle}>
          <p style={{ color: "#9ca3af", margin: 0 }}>
            © 2025 SaveBite. All rights reserved.
          </p>

          <p style={{ color: "#6b7280", margin: 0 }}>
            Made by Sumit Kumar for reduce food waste
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;