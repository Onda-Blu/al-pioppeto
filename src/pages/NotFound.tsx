import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div style={{ minHeight: '100vh', background: '#18181B', fontFamily: 'Inter, Archivo, sans-serif', color: '#F3F3F3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '2rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.02)', boxShadow: '0 2px 24px 0 #ac1f32' }}>
  <h1 style={{ marginBottom: '1rem', fontSize: '3rem', fontWeight: 700, color: '#AC1F32', letterSpacing: '0.05em', fontFamily: 'Archivo, Inter, sans-serif' }}>404</h1>
        <p style={{ marginBottom: '1rem', fontSize: '1.25rem', color: '#F3F3F3', opacity: 0.8 }}>Oops! Page not found</p>
        <a href="/" style={{ color: '#AC1F32', textDecoration: 'underline', fontWeight: 500, fontFamily: 'Inter, Archivo, sans-serif', fontSize: '1rem' }}>
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
