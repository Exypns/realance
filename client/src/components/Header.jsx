import React from "react";

function Header() {
  const headerStyle = {
    width: "100%",
    backgroundColor: "#427D9D",
    color: "#fff", // Warna teks
    padding: "18px 20px 0px 0px", // Padding untuk memberikan ruang di dalam header
    height: "60px",
  };

  const navStyle = {
    listStyle: "none",
    display: "flex",
    justifyContent: "space-around",
    padding: 0,
  };

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
  };

  return (
    <header style={headerStyle}>
      <nav>
        <ul style={navStyle}>
          <li>
            <a href="/" style={linkStyle}>
              Beranda
            </a>
          </li>
          <li>
            <a href="/tentang" style={linkStyle}>
              Tentang Kami
            </a>
          </li>
          <li>
            <a href="/layanan" style={linkStyle}>
              Layanan
            </a>
          </li>
          <li>
            <a href="/kontak" style={linkStyle}>
              Kontak
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
