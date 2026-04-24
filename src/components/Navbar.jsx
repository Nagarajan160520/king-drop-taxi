import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar as BSNavbar, Nav, Container, Button } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaPhone, FaInfoCircle, FaRoad, FaMoneyBill, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.navbar')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [navigate]);

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes goldShine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); opacity: 0; }
          50% { transform: translateX(0) translateY(0) rotate(45deg); opacity: 1; }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); opacity: 0; }
        }
        
        .navbar {
          animation: slideIn 0.8s ease-out;
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%) !important;
          position: relative;
          overflow: hidden;
        }
        
        .navbar::before {
          content: '';
          position: absolute;
          top: -150%;
          left: -150%;
          right: -150%;
          bottom: -150%;
          background: linear-gradient(115deg, transparent 30%, rgba(255,215,0,0.15) 35%, rgba(255,215,0,0.25) 40%, rgba(255,215,0,0.35) 45%, rgba(255,215,0,0.45) 50%, rgba(255,215,0,0.35) 55%, rgba(255,215,0,0.25) 60%, rgba(255,215,0,0.15) 65%, transparent 70%);
          transform: rotate(25deg);
          animation: goldShine 8s infinite linear;
          pointer-events: none;
        }
        
        .navbar.scrolled {
          background: linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(30,30,30,0.99) 50%, rgba(0,0,0,0.98) 100%) !important;
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        
        .navbar-brand {
          animation: float 3s ease-in-out infinite;
        }
        
        .navbar-brand:hover {
          transform: scale(1.05);
        }
        
        .nav-link-custom {
          transition: all 0.3s ease;
          color: white !important;
          font-weight: 600 !important;
          border-radius: 8px;
          margin: 0 2px;
        }
        
        .nav-link-custom:hover {
          color: #000000 !important;
          background: linear-gradient(135deg, #f66c6c, #f27a7a);
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(255,215,0,0.4);
        }
        
        .phone-number {
          transition: all 0.3s ease;
          animation: float 3s ease-in-out infinite;
          background: rgba(0,0,0,0.3);
          padding: 8px 15px;
          border-radius: 30px;
          border: 1px solid rgba(255,215,0,0.3);
        }
        
        .phone-number:hover {
          color: #000000 !important;
          background: linear-gradient(135deg, #f27a7a, #f27a7a);
          transform: scale(1.05);
        }
        
        .login-btn, .register-btn {
          transition: all 0.3s ease;
          font-weight: bold !important;
        }
        
        .login-btn:hover, .register-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255,215,0,0.3);
        }
        
        .user-link {
          transition: all 0.3s ease;
          padding: 8px 15px;
          border-radius: 30px;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,215,0,0.3);
        }
        
        .user-link:hover {
          color: black !important;
          background: linear-gradient(135deg, #f27a7a, #f27a7a);
          transform: translateY(-2px);
        }
        
        .logout-btn {
          transition: all 0.3s ease;
          font-weight: bold !important;
        }
        
        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255,215,0,0.3);
        }
        
        @media (max-width: 991px) {
          .navbar-collapse {
            background: rgba(0,0,0,0.95);
            border-radius: 20px;
            padding: 20px;
            margin-top: 15px;
          }
          .nav-link-custom {
            margin: 8px 0;
            padding: 12px 20px !important;
          }
          .phone-number, .user-link, .login-btn, .register-btn, .logout-btn {
            width: 100%;
            justify-content: center;
            margin: 5px 0;
          }
        }
      `}</style>

      <BSNavbar 
        bg="black" 
        variant="dark" 
        expand="lg" 
        className={`shadow-lg navbar ${scrolled ? 'scrolled' : ''}`} 
        sticky="top" 
        style={{ minHeight: '80px' }}
        expanded={menuOpen}
        onToggle={(open) => setMenuOpen(open)}
      >
        <Container fluid="lg">
          {/* Brand/Logo Section */}
          <BSNavbar.Brand as={Link} to="/" className="d-flex align-items-center navbar-brand">
            <img 
              src="/images/logo.png"
              alt="King Drop Taxi"
              style={{ 
                height: '60px', 
                width: 'auto', 
                borderRadius: '15px',
                marginRight: '10px'
              }} 
            />
            <span style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
              King<span style={{ color: '#ffc107' }}>Drop</span> Taxi
            </span>
          </BSNavbar.Brand>

          {/* Toggle Button */}
          <BSNavbar.Toggle 
            aria-controls="basic-navbar-nav" 
            className="border-0"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </BSNavbar.Toggle>

          <BSNavbar.Collapse id="basic-navbar-nav">
            {/* Navigation Links */}
            <Nav className="mx-auto" style={{ alignItems: 'center', gap: '5px' }}>
              <Nav.Link as={Link} to="/" className="nav-link-custom px-4 py-2" onClick={() => setMenuOpen(false)}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/tariff" className="nav-link-custom px-4 py-2" onClick={() => setMenuOpen(false)}>
                <FaMoneyBill className="me-2" size={16} /> Tariff
              </Nav.Link>
              <Nav.Link as={Link} to="/popular-routes" className="nav-link-custom px-4 py-2" onClick={() => setMenuOpen(false)}>
                <FaRoad className="me-2" size={16} /> Routes
              </Nav.Link>
              <Nav.Link as={Link} to="/customer-info" className="nav-link-custom px-4 py-2" onClick={() => setMenuOpen(false)}>
                <FaInfoCircle className="me-2" size={16} /> Customer Info
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="nav-link-custom px-4 py-2" onClick={() => setMenuOpen(false)}>
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className="nav-link-custom px-4 py-2" onClick={() => setMenuOpen(false)}>
                <FaEnvelope className="me-2" size={16} /> Contact
              </Nav.Link>
            </Nav>

            {/* Right Section - Phone and User */}
            <Nav className="align-items-center" style={{ gap: '10px' }}>
              {/* Phone Number */}
              <a 
                href="tel:+916381095854" 
                className="text-white text-decoration-none d-flex align-items-center phone-number"
                style={{ fontSize: '16px', fontWeight: 'bold' }}
                onMouseEnter={() => setShowPhoneTooltip(true)}
                onMouseLeave={() => setShowPhoneTooltip(false)}
              >
                <FaPhone className="me-2" size={16} /> 
                <span>+91 63810 95854</span>
              </a>
              
              {/* ========== LOGIN/REGISTER BUTTONS ========== */}
              {!user ? (
                <div className="d-flex" style={{ gap: '10px' }}>
                  <Button 
                    as={Link}
                    to="/login"
                    variant="outline-warning"
                    size="sm"
                    className="rounded-pill login-btn"
                    style={{ fontSize: '14px', padding: '8px 20px', fontWeight: 'bold' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Button>
                  <Button 
                    as={Link}
                    to="/register"
                    variant="warning"
                    size="sm"
                    className="rounded-pill register-btn"
                    style={{ fontSize: '14px', padding: '8px 20px', fontWeight: 'bold', color: 'black' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Button>
                </div>
              ) : (
                <div className="d-flex align-items-center" style={{ gap: '10px' }}>
                  <Nav.Link 
                    as={Link} 
                    to="/my-bookings" 
                    className="text-white d-flex align-items-center user-link"
                    style={{ fontSize: '14px', fontWeight: '600' }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaUser className="me-2" size={14} /> 
                    <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user.name}
                    </span>
                  </Nav.Link>
                  
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }} 
                    className="rounded-pill logout-btn"
                    style={{ fontSize: '14px', padding: '8px 20px', fontWeight: 'bold' }}
                  >
                    <FaSignOutAlt className="me-2" size={14} /> Logout
                  </Button>
                </div>
              )}
            </Nav>
          </BSNavbar.Collapse>
        </Container>
      </BSNavbar>
    </>
  );
};

export default Navbar;