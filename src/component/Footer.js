import React from "react";
import "./Footer.css"; // Importamos los estilos

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Poke EVs. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
