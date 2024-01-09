import Link from "next/link";
import React from "react";

function Footer() {
  //   const socialLinks = [
  //     {
  //       name: "Instagram",
  //       icon: <FiInstagram />,
  //       link: "#",
  //     },
  //     {
  //       name: "Facebook",
  //       icon: <FiFacebook />,
  //       link: "#",
  //     },
  //     {
  //       name: "LinkedIn",
  //       icon: <FiLinkedIn />,
  //       link: "#",
  //     },
  //   ];
  const address = `Jl. Hang Lekiu KM. 2 Teluk Mata Ikan, 
    Desa/Kelurahan Sambau, Kec. Nongsa, 
    Kota Batam, Provinsi Kepulauan Riau, 
    Kode Pos: 29465`;

  const mapImageUrl = "/map.png";

  const socialMediaIcons = [
    {
      name: "Instagram",
      iconUrl: "/FiInstagram.png", // Ganti dengan URL gambar ikon Instagram
      link: "#",
    },
    {
      name: "Facebook",
      iconUrl: "/FiFacebook.png", // Ganti dengan URL gambar ikon Facebook
      link: "#",
    },
    {
      name: "LinkedIn",
      iconUrl: "/FiLinkedIn.png", // Ganti dengan URL gambar ikon LinkedIn
      link: "#",
    },
    // Tambahkan ikon sosial media lainnya jika diperlukan
  ];

  const data = [
    // {
    //   headerName: "Categories",
    //   links: [
    //     ...categories.map(({ name }) => ({
    //       name,
    //       link: `/search?category=${name}`,
    //     })),
    //   ],
    // },
    {
      headerName: "Layanan Pengaduan",
      links: [
        {
          name: address,
          link: "#",
        },
      ],
    },
    {
      headerName: "Perusahaan",
      links: [
        { name: "Careers", link: "#" },
        { name: "Our Teams", link: "#" },
        { name: "Hire Blog", link: "#" },
        { name: "Inside Realance", link: "#" },
        { name: "Tech Blog", link: "#" },
        { name: "Careers", link: "#" },
        { name: "Perjanjian Pengguna", link: "#" },
        { name: "Kebijakan Privasi", link: "#" },
        { name: "Syarat dan Ketentuan Layanan", link: "#" },
      ],
    },
    {
      headerName: "Bussiness Solution",
      links: [
        { name: "For Employer", link: "#" },
        { name: "HR Tips", link: "#" },
        { name: "Glints Platform", link: "#" },
        { name: "Recruitments", link: "#" },
        { name: "Talent Management", link: "#" },
      ],
    },
    {
      headerName: "Hubungi Kami",
      links: [{ name: "", link: "#" }],
    },
  ];
  return (
    <footer
      className=" w-full mx-auto px-20 py-16 h-max border-t border-gray-200 bg-[#427D9D]"
      style={{ paddingLeft: "120px" }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-18">
        {data.map(({ headerName, links }) => {
          if (headerName === "Layanan Pengaduan") {
            return (
              <div key={headerName} style={{ marginRight: "20px" }}>
                <h3 className="font-bold text-white mb-4">{headerName}</h3>
                <div className="text-white break-words">
                  <p>{address}</p>
                  <img src={mapImageUrl} alt="Peta Lokasi" className="mt-4" />
                </div>
              </div>
            );
          } else if (headerName !== "Hubungi Kami") {
            return (
              <div
                key={headerName}
                className=""
                style={{ paddingLeft: "100px" }}
              >
                <h3 className="font-bold text-white mb-4">{headerName}</h3>
                <ul className="flex flex-col gap-2">
                  {links.map(({ name, link }) => (
                    <li key={name} className="text-white break-words">
                      <Link href={link}>{name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          } else if (headerName === "Hubungi Kami") {
            return (
              <div
                key={headerName}
                className="px-0"
                style={{ paddingLeft: "80px" }}
              >
                <h3 className="font-bold text-white mb-4">{headerName}</h3>
                <div className="flex gap-8">
                  {socialMediaIcons.map(({ iconUrl, link }, index) => (
                    <Link href={link} key={index}>
                      <img
                        src={iconUrl}
                        alt={`Social Media Icon ${index + 1}`}
                        style={{ width: "26px", height: "26px" }}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            );
          }
        })}
      </div>
    </footer>
  );
}

export default Footer;
