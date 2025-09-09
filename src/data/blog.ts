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
  },
  {
    slug: "windows-11-troubleshooting-johannesburg-complete-guide",
    title: "Windows 11 Troubleshooting in Johannesburg: A Complete Guide",
    description:
      "Step-by-step fixes for slow performance, update loops, driver issues, and startup errors on Windows 11 PCs in Johannesburg.",
    date: "2025-01-18",
    tags: ["Windows 11", "Troubleshooting", "Johannesburg", "Remote Support", "Drivers"],
    content:
      "Windows 11 is reliable, but everyday issues stack up: updates that won’t finish, printers vanishing, audio breaking after a patch, or a laptop that crawls after years of use. This guide covers what to try in order before booking help.\n\n" +
      "1) Performance and startup: Use Task Manager > Startup to disable heavyweight apps. Run Storage Sense, remove trialware, and check disk health (Windows PowerShell: Get-PhysicalDisk). If the drive is HDD, consider an SSD—nothing beats hardware for speed.\n\n" +
      "2) Windows Update failures: Run Settings > Windows Update > Troubleshooters. Clear the SoftwareDistribution cache, restart Windows Update services, then retry. If it still loops, in-place repair install with the Media Creation Tool preserves files and apps.\n\n" +
      "3) Drivers and devices: Prefer OEM drivers for audio, graphics, and Wi‑Fi. Use Device Manager to roll back when a fresh update breaks something. For printers, reinstall using ‘Add a printer by TCP/IP’ with a reserved IP.\n\n" +
      "4) Network glitches: Reset the network stack (netsh winsock reset). Check router channel congestion with a Wi‑Fi scanner and move to cleaner channels—common in dense complexes around Edenvale and Bedfordview.\n\n" +
      "5) Crashes and blue screens: Note the error code, then check Reliability Monitor for a timeline. Remove over-aggressive antivirus conflicts. Memory Diagnostics can uncover failing RAM.\n\n" +
      "When to call for help: If the device boots inconsistently, storage reports bad sectors, or you rely on the PC for work, remote assistance saves time. On-site is best for hardware tests, SSD upgrades, and complex printer setups."
  },
  {
    slug: "malware-removal-lombardy-east-prevent-reinfect",
    title: "Malware Removal in Lombardy East: Clean, Harden, and Prevent Re‑Infection",
    description:
      "A practical playbook to remove malware safely and keep Windows secure for families and home offices in Lombardy East.",
    date: "2025-01-20",
    tags: ["Security", "Malware", "Lombardy East", "Remote Support", "Windows"],
    content:
      "Malware today hides inside browser extensions, cracked installers, and fake support popups. Cleaning is only half the job; hardening stops repeat infections.\n\n" +
      "Phase 1—Stabilize: Disconnect suspicious USBs, stop unknown startup apps, and end malicious browsers with Task Manager. If files are critical, avoid ‘cleanup’ tools that delete without asking.\n\n" +
      "Phase 2—Identify: Review installed programs, browser extensions, and scheduled tasks. Run a reputable antimalware scan and quarantine results. Reset compromised browsers to defaults.\n\n" +
      "Phase 3—Harden: Update Windows and drivers, enable SmartScreen, uninstall Java/Flash relics, and turn on Controlled Folder Access for ransomware resistance. Use standard (non-admin) accounts for daily use.\n\n" +
      "Phase 4—Recover trust: Change passwords after cleanup, starting with email, banking, and Microsoft accounts. Enable MFA. Review recent sign‑ins for unusual locations.\n\n" +
      "For families and SMEs: Teach ‘install from official stores only’ and avoid free ‘optimizer’ apps. If pop‑ups claim infection and demand calls, close the browser and ask for help. Remote sessions remove most malware within an hour."
  },
  {
    slug: "backup-strategy-3-2-1-south-africa-home-small-business",
    title: "Backup Strategy 3‑2‑1 for South African Homes and Small Businesses",
    description:
      "How to protect photos, invoices, and work files with a reliable 3‑2‑1 backup plan that survives theft, failure, and mistakes.",
    date: "2025-01-22",
    tags: ["Backup", "Security", "Johannesburg", "Home Office", "Small Business"],
    content:
      "The only real backup is the one you can restore. The 3‑2‑1 rule keeps data safe: 3 copies, 2 different media, 1 off‑site. Here’s a practical setup that works in Johannesburg.\n\n" +
      "Local copy: Keep files on the device you use daily and enable File History or Time Machine equivalents.\n\n" +
      "Secondary copy: Use an external SSD or NAS. Automate backups weekly and verify restores quarterly—don’t assume.\n\n" +
      "Off‑site copy: Cloud sync (OneDrive/Google Drive) or a rotating external drive stored elsewhere. Encrypt sensitive archives.\n\n" +
      "Testing restores: Pick random files monthly, delete the local copy, and restore from backup to prove the process.\n\n" +
      "Common pitfalls: Backing up the wrong folders, leaving external drives plugged in (ransomware risk), or running out of cloud quota quietly. Remote support can validate your setup and create a simple checklist for the household or team."
  },
  {
    slug: "microsoft-365-email-setup-small-business-jhb",
    title: "Microsoft 365 Email Setup for Small Businesses in Johannesburg",
    description:
      "Clean migrations, SPF/DKIM, and device setup—how to get dependable email without spam headaches.",
    date: "2025-01-24",
    tags: ["Microsoft 365", "Email", "Johannesburg", "DNS", "Small Business"],
    content:
      "Email delivers invoices, approvals, and sales—so it has to be boringly reliable. This guide walks through a lean Microsoft 365 setup for small teams.\n\n" +
      "Domain and DNS: Verify domain ownership, add MX, SPF, DKIM, and DMARC records. Start DMARC in monitoring mode (p=none) and move to quarantine once stable.\n\n" +
      "Mailbox planning: Create named mailboxes (info@, accounts@) and shared mailboxes where appropriate. Avoid catch‑all addresses—they attract spam.\n\n" +
      "Device setup: Use modern authentication on Windows, macOS, iOS, and Android. Prefer Outlook mobile over legacy IMAP.\n\n" +
      "Migration tips: Export PSTs, import with the wizard, and leave legacy accounts active for a week with forwarding to catch stragglers.\n\n" +
      "Spam control: Tune anti‑spam policies and educate users—never ‘unsubscribe’ from suspicious mail, report it."
  },
  {
    slug: "data-recovery-when-to-stop-and-call",
    title: "Data Recovery: When to Stop DIY and Call for Help",
    description:
      "Recognize the danger signs and protect your data during recovery attempts on failing drives.",
    date: "2025-01-26",
    tags: ["Data Recovery", "Storage", "SSD", "HDD", "Johannesburg"],
    content:
      "When files vanish or the disk clicks, every action matters. Uninformed attempts can make recovery impossible.\n\n" +
      "Stop immediately if you hear clicking, scraping, or the drive keeps disconnecting. Do not run surface scans on failing hardware—they stress the disk.\n\n" +
      "For SSDs, sudden disappearance may be controller failure. Power‑cycle and attempt read‑only imaging.\n\n" +
      "Safest workflow: 1) Create a full sector‑by‑sector image to a healthy drive, 2) Work on the image only, 3) Recover files from the image.\n\n" +
      "Backups change the story: If you keep a 3‑2‑1 setup, recovery is usually a restore, not a rescue."
  },
  {
    slug: "home-network-security-checklist-edenvale-bedfordview",
    title: "Home Network Security Checklist for Edenvale and Bedfordview",
    description:
      "Simple steps that dramatically improve home Wi‑Fi security without buying new hardware.",
    date: "2025-01-28",
    tags: ["Security", "Wi‑Fi", "Edenvale", "Bedfordview", "Home"],
    content:
      "Most homes run on default router settings for years. A few hour’s work hardens the network and reduces random drop‑offs.\n\n" +
      "1) Change admin passwords and disable remote router admin.\n\n" +
      "2) Use WPA2/WPA3 with a strong passphrase and hide WPS.\n\n" +
      "3) Create a separate guest network and block access to LAN devices.\n\n" +
      "4) Reserve IPs for printers and key devices to avoid chaos after reboots.\n\n" +
      "5) Update router firmware and disable unused services (UPnP on older routers).\n\n" +
      "6) Consider a mesh system for larger homes in Bedfordview hills where signal drops through brick walls."
  },
  {
    slug: "printer-troubleshooting-definitive-checklist",
    title: "The Definitive Printer Troubleshooting Checklist",
    description:
      "From ‘offline’ errors to driver conflicts—follow this tree before you replace the printer.",
    date: "2025-01-30",
    tags: ["Printers", "Troubleshooting", "Wi‑Fi", "Windows", "Home Office"],
    content:
      "Printers fail for predictable reasons: driver mismatch, network changes, or power‑saving modes. Work through these steps.\n\n" +
      "Networked printers: Assign a reserved IP, reinstall using TCP/IP, and disable deep sleep that loses Wi‑Fi.\n\n" +
      "USB printers: Use vendor drivers, not Windows class drivers, for scanning features. Avoid cheap USB hubs.\n\n" +
      "Spooler resets: Clear stuck jobs (services.msc > Print Spooler > Restart).\n\n" +
      "If it still misbehaves after a clean reinstall with a fixed IP, the hardware may be at end‑of‑life—especially with worn rollers on high‑page‑count inkjets."
  },
  {
    slug: "onsite-callout-fees-when-remote-isnt-enough",
    title: "On‑Site Callout Fees Explained: When Remote Support Isn’t Enough",
    description:
      "Understand when an in‑person visit is the fastest fix and how callout pricing works in Lombardy East and surrounds.",
    date: "2025-02-01",
    tags: ["Callout", "On‑Site", "Lombardy East", "Johannesburg", "Pricing"],
    content:
      "Remote support resolves most issues, but hardware faults and complex setups need hands‑on work.\n\n" +
      "Typical on‑site scenarios: SSD and RAM installation, Wi‑Fi dead zones requiring mesh placement, broken screens and keyboards, and network cabling checks.\n\n" +
      "Pricing clarity: A transparent callout covers travel and first diagnostics; parts and labour are quoted before work continues. If remote prep shortens the visit, you save.\n\n" +
      "Booking tip: Share photos of ports, router locations, and error messages ahead of time to ensure the right parts and shortest time on site."
  }
];
