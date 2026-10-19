// Contact details used across the navbar, footer, CTA and contact page.
export const site = {
  email: "mamdouh.mohammed919@gmail.com",
  phones: [
    { display: "01552455177", href: "tel:+201552455177" },
    { display: "01060168136", href: "tel:+201060168136" },
  ],
  // WhatsApp uses the international format without "+" or leading zero.
  whatsapp: "https://wa.me/201552455177",
  mapEmbed: "https://www.google.com/maps?ll=25,15&z=2&output=embed",
} as const;

// Client logos for the "trusted by" ticker. Files live in public/clients.
export const clients = [
  { name: "Baher Alnajjar Orthodontist", logo: "/clients/baher-alnajjar.jpg" },
  { name: "Azam Dental Clinic", logo: "/clients/azam-dental-clinic.jpg" },
  { name: "ProLab", logo: "/clients/prolab.jpg" },
  { name: "Al-Zeyad Contracting", logo: "/clients/al-zeyad.jpg" },
  { name: "Arab Clinic", logo: "/clients/arab-clinic.jpg" },
  { name: "Lobna Abdelwahed Fashion Academy", logo: "/clients/lobna-abdelwahed.jpg" },
  { name: "Bar Mousa", logo: "/clients/bar-mousa.jpg" },
  { name: "Pizza Bebo", logo: "/clients/pizza-bebo.jpg" },
  { name: "Baladi", logo: "/clients/baladi.jpg" },
  { name: "Asad Elhak Security", logo: "/clients/asad-elhak.jpg" },
  { name: "3ala El Sare3", logo: "/clients/3ala-el-sare3.jpg" },
  { name: "Shawaya", logo: "/clients/shawaya.jpg" },
] as const;
