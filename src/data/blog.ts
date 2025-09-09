export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date
  tags: string[];
  content: string; // long-form
};

export const posts: BlogPost[] = [
  {
    slug: "remote-support-lombardy-east-complete-guide",
    title: "Remote Support in Lombardy East: The Complete Guide for Home and Small Business",
    description:
      "Everything you need to know about secure remote support in Lombardy East, Johannesburg — what it is, how it works, pricing, and when on-site callouts make sense.",
    date: "2025-01-10",
    tags: ["Remote Support", "Lombardy East", "Johannesburg", "IT Support", "Security"],
    content:
      "Remote support lets you get professional help without waiting for a technician to drive to you. In Lombardy East and nearby suburbs, this is the fastest and most affordable way to solve most software and configuration problems.\n\n" +
      "What is remote support? It’s a secure way for an IT technician to connect to your computer over the internet with your permission, so they can see the screen, diagnose issues, and apply fixes. You stay in full control and can end the session at any time.\n\n" +
      "Benefits for Lombardy East residents:\n" +
      "• Faster resolutions — most issues are solved within a single session.\n" +
      "• Lower costs — you avoid callout fees when no hardware work is required.\n" +
      "• Flexible hours — remote work can happen after-hours where appropriate.\n\n" +
      "Common problems solved remotely:\n" +
      "• Slow PC and performance tuning,\n" +
      "• Windows errors and updates failing,\n" +
      "• Printer and Wi‑Fi setup,\n" +
      "• Email and Microsoft 365 configuration,\n" +
      "• Software installation and licensing,\n" +
      "• Malware cleanup and security hardening.\n\n" +
      "When is an on-site visit better? If your laptop needs a new SSD, RAM upgrade, keyboard or screen replacement, or if the internet drops due to cabling issues, it’s more efficient to book an on-site callout. For Lombardy East and surrounds, a transparent callout fee applies, with parts and labour quoted upfront.\n\n" +
      "How to prepare for a session:\n" +
      "1) Ensure a stable internet connection,\n" +
      "2) Keep your charger connected for laptops,\n" +
      "3) Have admin passwords handy,\n" +
      "4) Back up critical files if possible.\n\n" +
      "Security and privacy: Remote sessions are one-time and initiated only with your consent. You can see every action performed, pause at any point, and disconnect immediately when done. No ongoing access remains after the session.\n\n" +
      "Lombardy East coverage: Service extends to Edenvale, Bedfordview, Greenstone, Kempton Park and parts of Benoni. If you’re nearby and unsure, just ask — remote support works from anywhere in South Africa." ,
  },
  {
    slug: "laptop-ssd-upgrade-johannesburg-speed-boost",
    title: "SSD Upgrades in Johannesburg: Make Your Laptop 5x Faster",
    description:
      "Why replacing an old hard drive with an SSD is the best value upgrade for laptops and desktops in Johannesburg.",
    date: "2025-01-12",
    tags: ["SSD", "Upgrades", "Performance", "Johannesburg", "Hardware"],
    content:
      "If your laptop takes minutes to start or freezes when you open apps, the bottleneck is almost always the hard drive. Solid State Drives (SSDs) replace mechanical drives with flash storage, delivering instant speed-ups with no noise and lower power use.\n\n" +
      "What improves with an SSD? Boot times, app launches, file copies, updates, and overall responsiveness. Even a 6–8 year old device can feel new again when paired with a clean Windows install and 8 GB RAM.\n\n" +
      "Best practice for upgrades:\n" +
      "• Back up data first,\n" +
      "• Clean Windows installation for a fresh start,\n" +
      "• Reinstall essential apps only,\n" +
      "• Enable TRIM and latest firmware.\n\n" +
      "What size to choose? 500 GB suits most users; creators or gamers may need 1 TB. Business users in Lombardy East often pair SSD upgrades with email cleanups and performance tuning for a dramatic productivity boost.\n\n" +
      "On-site vs. drop-off: On-site works when data is already backed up. Otherwise, a pickup/drop-off service can be arranged with clear timelines and quotes."
  },
  {
    slug: "wifi-printer-setup-lombardy-east-home-office",
    title: "Wi‑Fi and Printer Setup in Lombardy East: A Home Office Checklist",
    description:
      "A practical checklist to stabilize Wi‑Fi and get printers working reliably in your home or small office.",
    date: "2025-01-15",
    tags: ["Wi‑Fi", "Printers", "Home Office", "Lombardy East", "Networking"],
    content:
      "Reliable connectivity is the backbone of remote support and day‑to‑day work. In Lombardy East homes and small offices, most Wi‑Fi and printing problems come down to placement, interference, and outdated drivers.\n\n" +
      "Checklist:\n" +
      "• Place the router centrally and off the floor,\n" +
      "• Use 5 GHz for speed and 2.4 GHz for range,\n" +
      "• Update router firmware and printer drivers,\n" +
      "• Reserve IP addresses for printers,\n" +
      "• Avoid double‑NAT by bridging ISP routers when adding mesh systems,\n" +
      "• Secure with WPA2/WPA3 and strong passwords.\n\n" +
      "If your printer disappears after reboot, it’s often a DHCP issue. Static or reserved IPs keep things stable. For multi‑user homes, shared printer queues and cloud print options reduce friction.\n\n" +
      "When to get help: If throughput drops randomly or Zoom calls stutter, a quick remote session can measure signal, channel congestion, and driver issues — often fixed in under an hour."
  }
];
