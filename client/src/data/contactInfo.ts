const contactInfo = {
  email: {
    title: "Email",
    subtitle: "Feel free to reach out",
    value: "koroshillary12@gmail.com",
    icon: "📧"
  },
  phone: {
    title: "Phone",
    subtitle: "Call or WhatsApp",
    value: "+254719588603",
    icon: "📞"
  },
  location: {
    title: "Location",
    subtitle: "Based in",
    value: "Nairobi, Kenya",
    icon: "📍"
  },
  social: {
    title: "Socials",
    subtitle: "Connect with me",
    value: "",
    icon: "💬",
    links: [
      {
        url: "https://github.com/HillaryKoros",
        label: "GitHub",
        icon: "💻"
      },
      {
        url: "https://www.linkedin.com/in/hillarykoros",
        label: "LinkedIn",
        icon: "💼"
      },
      {
        url: "https://x.com/Hill_Koros",
        label: "X (Twitter)",
        icon: "🐦"
      }
    ]
  },
  calendly: {
    title: "Schedule a Call",
    subtitle: "Book a video call with me",
    value: "",
    icon: "📅",
    url: "https://calendly.com/koroshillary12/30min"
  },
  support: {
    title: "Support my work",
    subtitle: "If you'd like to contribute",
    value: "",
    icon: "☕",
    links: [
      {
        url: "https://buymeacoffee.com/hillarykoros",
        label: "Buy Me A Coffee",
        icon: "☕"
      },
      {
        url: "https://github.com/sponsors/HillaryKoros",
        label: "GitHub Sponsors",
        icon: "💖"
      }
    ]
  }
};

// Contact action buttons configuration
const contactActions = [
  {
    id: 'email',
    label: 'Send Email',
    type: 'button' as const,
    color: 'primary',
    getUrl: () => `https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo.email.value}`,
    svgPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    type: 'link' as const,
    color: 'green',
    getUrl: () => `https://wa.me/${contactInfo.phone.value.replace('+', '')}`,
    svgPath: 'M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z',
    fill: true
  },
  {
    id: 'call',
    label: 'Call',
    type: 'button' as const,
    color: 'blue',
    getUrl: () => `https://wa.me/${contactInfo.phone.value.replace('+', '')}`,
    svgPath: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
  },
  {
    id: 'schedule',
    label: 'Schedule Meeting',
    type: 'calendly' as const,
    color: 'orange',
    getUrl: () => contactInfo.calendly.url,
    svgPath: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
  }
];

export { contactInfo, contactActions };
