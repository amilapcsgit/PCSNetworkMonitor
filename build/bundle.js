// index.tsx
import React4 from "react";
import ReactDOM from "react-dom/client";

// App.tsx
import { useState as useState2, useEffect, useCallback } from "react";

// components/icons/RefreshIcon.tsx
import { jsx } from "react/jsx-runtime";
var RefreshIcon = (props) => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-11.664 0l3.181-3.183a8.25 8.25 0 00-11.664 0l3.181 3.183z"
      }
    )
  }
);

// components/Header.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var Header = ({ onRefresh, lastUpdated, isLoading }) => {
  return /* @__PURE__ */ jsxs("header", { className: "flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 pb-8 border-b border-gray-800/50", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
        /* @__PURE__ */ jsx2("div", { className: "w-1 h-8 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full" }),
        /* @__PURE__ */ jsx2("h1", { className: "text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent tracking-tight", children: "Network Monitor" })
      ] }),
      /* @__PURE__ */ jsx2("p", { className: "text-gray-400 mt-2 text-sm md:text-base", children: "Real-time visualization of your PC's network connections" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-right hidden sm:block", children: [
        /* @__PURE__ */ jsx2("div", { className: "text-xs text-gray-500 uppercase tracking-wider", children: "Status" }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-300 font-semibold mt-1 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx2("span", { className: `w-2 h-2 rounded-full ${isLoading ? "bg-yellow-500 animate-pulse" : "bg-green-500"}` }),
          isLoading ? "Scanning..." : lastUpdated ? `${lastUpdated.toLocaleTimeString()}` : "Initializing..."
        ] })
      ] }),
      /* @__PURE__ */ jsx2(
        "button",
        {
          onClick: onRefresh,
          disabled: isLoading,
          className: "flex items-center justify-center p-2.5 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 hover:from-cyan-600 hover:to-cyan-700 text-gray-200 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/20",
          "aria-label": "Refresh connections",
          children: /* @__PURE__ */ jsx2(RefreshIcon, { className: `w-5 h-5 ${isLoading ? "animate-spin-slow" : ""}` })
        }
      )
    ] })
  ] });
};
var Header_default = Header;

// components/ConnectionTable.tsx
import { useState, useMemo } from "react";

// components/icons/ChipIcon.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var ChipIcon = (props) => /* @__PURE__ */ jsx3(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    ...props,
    children: /* @__PURE__ */ jsx3(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V8.25a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 8.25v7.5a2.25 2.25 0 002.25 2.25z"
      }
    )
  }
);

// utils/flagSvgs.ts
var flagSvgs = {
  US: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7410 3900"><rect width="7410" height="3900" fill="#012169"/><path d="M0,450 h7410 M0,900 h7410 M0,1350 h7410 M0,1800 h7410 M0,2250 h7410 M0,2700 h7410 M0,3150 h7410 M0,3600 h7410" stroke="#fff" stroke-width="300"/><rect width="2964" height="2025" fill="#012169"/><path d="M0,0 L2964,2025 M2964,0 L0,2025" stroke="#fff" stroke-width="135"/><path d="M1482,0 v2025 M0,1012.5 h2964" stroke="#c8102e" stroke-width="90"/></svg>',
  IT: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="1" height="2" fill="#009246"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#c8102e"/></svg>',
  IE: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="1" height="2" fill="#169b62"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#ff9900"/></svg>',
  FR: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="1" height="2" fill="#002395"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#ED2939"/></svg>',
  GB: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30"><rect width="60" height="30" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M30,0 v30 M0,15 h60" stroke="#c8102e" stroke-width="4"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#c8102e" stroke-width="3" stroke-dasharray="4,2"/></svg>',
  DE: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3"><rect width="5" height="1" fill="#000"/><rect y="1" width="5" height="1" fill="#c8102e"/><rect y="2" width="5" height="1" fill="#FFD700"/></svg>',
  ES: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="3" height="2" fill="#c60b1e"/><rect y="0.5" width="3" height="1" fill="#ffc400"/></svg>',
  NL: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="3" height="0.667" fill="#ae1c28"/><rect y="0.667" width="3" height="0.667" fill="#fff"/><rect y="1.333" width="3" height="0.667" fill="#21468b"/></svg>',
  BE: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="3" height="0.667" fill="#000"/><rect y="0.667" width="3" height="0.667" fill="#FFD700"/><rect y="1.333" width="3" height="0.667" fill="#ff0000"/></svg>',
  SE: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3"><rect width="5" height="3" fill="#006AA7"/><rect x="1.2" width="0.6" height="3" fill="#FFD700"/><rect y="1.2" width="5" height="0.6" fill="#FFD700"/></svg>',
  NO: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 15"><rect width="22" height="15" fill="#BA0C2F"/><rect x="6" y="0" width="4" height="15" fill="#00205B"/><rect x="0" y="5.5" width="22" height="3" fill="#00205B"/><rect x="6.33" y="0" width="3.33" height="15" fill="#fff"/><rect x="0" y="6.15" width="22" height="1.7" fill="#fff"/></svg>',
  DK: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 22"><rect width="36" height="22" fill="#C8102E"/><rect x="7" width="6" height="22" fill="#fff"/><rect y="8" width="36" height="6" fill="#fff"/></svg>',
  FI: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 22"><rect width="36" height="22" fill="#fff"/><rect x="8" width="6" height="22" fill="#003580"/><rect y="8" width="36" height="6" fill="#003580"/></svg>',
  PL: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 5"><rect width="8" height="2.5" fill="#fff"/><rect y="2.5" width="8" height="2.5" fill="#E4003B"/></svg>',
  RU: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="3" height="0.667" fill="#fff"/><rect y="0.667" width="3" height="0.667" fill="#0039a6"/><rect y="1.333" width="3" height="0.667" fill="#c60c30"/></svg>',
  CN: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect width="900" height="600" fill="#de2910"/><polygon points="150,100 180,190 270,190 195,250 220,335 150,275 80,335 105,250 30,190 120,190" fill="#ffde00"/><polygon points="300,50 315,95 360,95 328,130 342,175 300,140 258,175 272,130 240,95 285,95" fill="#ffde00"/><polygon points="300,130 315,175 360,175 328,210 342,255 300,220 258,255 272,210 240,175 285,175" fill="#ffde00"/><polygon points="300,210 315,255 360,255 328,290 342,335 300,300 258,335 272,290 240,255 285,255" fill="#ffde00"/><polygon points="380,80 395,125 440,125 408,160 422,205 380,170 338,205 352,160 320,125 365,125" fill="#ffde00"/><polygon points="380,160 395,205 440,205 408,240 422,285 380,250 338,285 352,240 320,205 365,205" fill="#ffde00"/></svg>',
  JP: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="3" height="2" fill="#bc002d"/><circle cx="1.5" cy="1" r="0.6" fill="#ff0000"/></svg>',
  IN: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="3" height="0.667" fill="#FF9933"/><rect y="0.667" width="3" height="0.667" fill="#fff"/><rect y="1.333" width="3" height="0.667" fill="#138808"/><circle cx="1.5" cy="1" r="0.16" fill="#000080"/></svg>',
  AU: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30"><rect width="60" height="30" fill="#00008B"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M30,0 v30 M0,15 h60" stroke="#FF0000" stroke-width="4"/><circle cx="12" cy="8" r="3" fill="#FFD700"/><polygon points="20,12 22,14 24,12 23,14 25,15 23,15 22,17 21,15 19,15 21,14" fill="#FFD700"/></svg>',
  CA: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 5"><rect width="3" height="5" fill="#FF0000"/><rect x="3" width="3" height="5" fill="#fff"/><rect x="6" width="3" height="5" fill="#FF0000"/><polygon points="4.5,1.5 4.8,2.2 5.5,2.2 5,2.7 5.3,3.4 4.5,2.9 3.7,3.4 4,2.7 3.5,2.2 4.2,2.2" fill="#FF0000"/></svg>',
  MX: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="1" height="2" fill="#006341"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#C60C30"/><circle cx="1.5" cy="1" r="0.25" fill="#ff0"/></svg>',
  BR: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 10"><rect width="14" height="10" fill="#009c3b"/><polygon points="7,2 12,5 7,8 2,5" fill="#fff" opacity="0.9"/><circle cx="7" cy="5" r="2" fill="#002776"/><ellipse cx="7" cy="5" rx="1.5" ry="0.8" fill="#fff"/></svg>',
  ZA: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect width="900" height="600" fill="#000"/><polygon points="0,300 900,0 900,250 0,550" fill="#fff"/><polygon points="0,350 900,100 900,300 0,550" fill="#007FFF"/><rect x="0" y="250" width="900" height="100" fill="#FFD700"/><polygon points="0,300 300,300 0,400" fill="#FF0000"/><polygon points="300,300 600,300 300,400" fill="#FFF"/><polygon points="600,300 900,300 600,400" fill="#008000"/></svg>',
  CH: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="#FF0000"/><rect x="0.2" y="0.35" width="0.6" height="0.3" fill="#fff"/><rect x="0.35" y="0.2" width="0.3" height="0.6" fill="#fff"/></svg>',
  AT: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect width="900" height="600" fill="#ED2939"/><rect y="200" width="900" height="200" fill="#fff"/></svg>',
  CZ: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="3" height="1" fill="#fff"/><rect y="1" width="3" height="1" fill="#D00"/><polygon points="0,0 0.6,1 0,2" fill="#11457E"/></svg>',
  GR: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 27"><rect width="36" height="3" fill="#0D5EAF"/><rect y="3" width="36" height="3" fill="#fff"/><rect y="6" width="36" height="3" fill="#0D5EAF"/><rect y="9" width="36" height="3" fill="#fff"/><rect y="12" width="36" height="3" fill="#0D5EAF"/><rect y="15" width="36" height="3" fill="#fff"/><rect y="18" width="36" height="3" fill="#0D5EAF"/><rect y="21" width="36" height="3" fill="#fff"/><rect y="24" width="36" height="3" fill="#0D5EAF"/><rect width="10" height="10" fill="#0D5EAF"/><path d="M2,2 L4,2 L4,4 L2,4 M2,5 L4,5 L4,7 L2,7" stroke="#fff" stroke-width="0.5"/></svg>',
  PT: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="1" height="2" fill="#006600"/><rect x="1" width="2" height="2" fill="#ff0000"/><circle cx="1.5" cy="1" r="0.3" fill="#ffff00"/><polygon points="1.3,0.8 1.4,0.9 1.5,0.8 1.4,1" fill="#000"/></svg>',
  NZ: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30"><rect width="60" height="30" fill="#00008B"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M30,0 v30 M0,15 h60" stroke="#c8102e" stroke-width="4"/></svg>',
  SG: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"><rect width="640" height="480" fill="#FF0000"/><rect width="640" height="240" fill="#fff"/><circle cx="170" cy="120" r="60" fill="#fff"/><polygon points="170,90 172,96 178,96 173,100 175,107 170,103 165,107 167,100 162,96 168,96" fill="#FF0000"/><polygon points="170,150 172,156 178,156 173,160 175,167 170,163 165,167 167,160 162,156 168,156" fill="#FF0000"/><polygon points="140,120 142,126 148,126 143,130 145,137 140,133 135,137 137,130 132,126 138,126" fill="#FF0000"/><polygon points="200,120 202,126 208,126 203,130 205,137 200,133 195,137 197,130 192,126 198,126" fill="#FF0000"/></svg>',
  HK: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect width="900" height="600" fill="#DE2910"/><circle cx="250" cy="200" r="120" fill="#fff" opacity="0.9"/><polygon points="250,90 265,130 305,130 275,160 290,200 250,170 210,200 225,160 195,130 235,130" fill="#DE2910"/><polygon points="250,140 260,165 285,165 265,180 275,205 250,190 225,205 235,180 215,165 240,165" fill="#DE2910"/><polygon points="250,180 258,200 280,200 263,212 271,232 250,220 229,232 237,212 220,200 242,200" fill="#DE2910"/><polygon points="250,215 256,230 275,230 260,240 266,255 250,245 234,255 240,240 225,230 244,230" fill="#DE2910"/></svg>',
  KR: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600"><rect width="900" height="600" fill="#fff"/><circle cx="450" cy="300" r="180" fill="#000"/><path d="M450,200 Q490,250 490,300 Q490,350 450,400 Q410,350 410,300 Q410,250 450,200" fill="#C60C30"/><circle cx="450" cy="300" r="50" fill="#000" opacity="0.5"/></svg>',
  TH: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6"><rect width="3" height="2" fill="#CE3B1F"/><rect y="2" width="3" height="2" fill="#F4F5F8"/><rect y="4" width="3" height="2" fill="#0D47A1"/><rect x="3" width="3" height="2" fill="#0D47A1"/><rect x="3" y="2" width="3" height="2" fill="#F4F5F8"/><rect x="3" y="4" width="3" height="2" fill="#CE3B1F"/><rect x="6" width="3" height="2" fill="#F4F5F8"/><rect x="6" y="2" width="3" height="2" fill="#0D47A1"/><rect x="6" y="4" width="3" height="2" fill="#CE3B1F"/></svg>',
  VN: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="3" height="2" fill="#CE1126"/><polygon points="1.5,0.4 1.65,0.9 2.2,0.9 1.8,1.25 1.95,1.8 1.5,1.45 1.05,1.8 1.2,1.25 0.8,0.9 1.35,0.9" fill="#FFD700"/></svg>',
  TR: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="3" height="2" fill="#E30A17"/><circle cx="0.75" cy="1" r="0.35" fill="#fff"/><polygon points="1.15,0.7 1.25,0.85 1.4,0.85 1.28,0.95 1.35,1.1 1.2,1 1.08,1.1 1.15,0.95" fill="#E30A17"/></svg>',
  SA: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="3" height="2" fill="#165D31"/><path d="M0.5,0.5 Q0.7,0.6 0.9,0.5 Q1.1,0.4 1.3,0.5" stroke="#fff" stroke-width="0.1" fill="none"/><path d="M0.5,1 Q0.7,1.1 0.9,1 Q1.1,0.9 1.3,1" stroke="#fff" stroke-width="0.1" fill="none"/><path d="M0.5,1.5 Q0.7,1.6 0.9,1.5 Q1.1,1.4 1.3,1.5" stroke="#fff" stroke-width="0.1" fill="none"/><polygon points="1.6,0.6 1.75,0.8 1.95,0.75 1.8,0.9 1.85,1.1 1.65,1 1.45,1.1 1.5,0.9 1.35,0.75 1.55,0.8" fill="#fff"/></svg>',
  IL: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="3" height="0.4" fill="#0038B8"/><rect y="1.6" width="3" height="0.4" fill="#0038B8"/><polygon points="1.5,0.5 1.6,0.7 1.8,0.7 1.65,0.85 1.75,1.05 1.5,0.9 1.25,1.05 1.35,0.85 1.2,0.7 1.4,0.7" fill="#0038B8"/><polygon points="1.2,0.75 1.3,0.95 1.5,0.9 1.35,1.05 1.45,1.25 1.2,1.1 0.95,1.25 1.05,1.05 0.9,0.9 1.1,0.95" fill="#0038B8"/></svg>',
  AE: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="3" height="0.667" fill="#00732F"/><rect y="0.667" width="3" height="0.667" fill="#fff"/><rect y="1.333" width="3" height="0.667" fill="#000"/><rect width="0.5" height="2" fill="#CE1126"/></svg>'
};

// components/CountryFlagSVG.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var countryNames = {
  US: "United States",
  GB: "United Kingdom",
  FR: "France",
  DE: "Germany",
  IT: "Italy",
  ES: "Spain",
  NL: "Netherlands",
  BE: "Belgium",
  SE: "Sweden",
  NO: "Norway",
  DK: "Denmark",
  FI: "Finland",
  PL: "Poland",
  RU: "Russia",
  CN: "China",
  JP: "Japan",
  IN: "India",
  AU: "Australia",
  CA: "Canada",
  MX: "Mexico",
  BR: "Brazil",
  ZA: "South Africa",
  IE: "Ireland",
  CH: "Switzerland",
  AT: "Austria",
  CZ: "Czech Republic",
  GR: "Greece",
  PT: "Portugal",
  NZ: "New Zealand",
  SG: "Singapore",
  HK: "Hong Kong",
  KR: "South Korea",
  TH: "Thailand",
  VN: "Vietnam",
  TR: "Turkey",
  SA: "Saudi Arabia",
  IL: "Israel",
  AE: "United Arab Emirates"
};
var flagEmojis = {
  AD: "\u{1F1E6}\u{1F1E9}",
  AE: "\u{1F1E6}\u{1F1EA}",
  AF: "\u{1F1E6}\u{1F1EB}",
  AG: "\u{1F1E6}\u{1F1EC}",
  AI: "\u{1F1E6}\u{1F1EE}",
  AL: "\u{1F1E6}\u{1F1F1}",
  AM: "\u{1F1E6}\u{1F1F2}",
  AO: "\u{1F1E6}\u{1F1F4}",
  AQ: "\u{1F1E6}\u{1F1F6}",
  AR: "\u{1F1E6}\u{1F1F7}",
  AS: "\u{1F1E6}\u{1F1F8}",
  AT: "\u{1F1E6}\u{1F1F9}",
  AU: "\u{1F1E6}\u{1F1FA}",
  AW: "\u{1F1E6}\u{1F1FC}",
  AX: "\u{1F1E6}\u{1F1FD}",
  AZ: "\u{1F1E6}\u{1F1FF}",
  BA: "\u{1F1E7}\u{1F1E6}",
  BB: "\u{1F1E7}\u{1F1E7}",
  BD: "\u{1F1E7}\u{1F1E9}",
  BE: "\u{1F1E7}\u{1F1EA}",
  BF: "\u{1F1E7}\u{1F1EB}",
  BG: "\u{1F1E7}\u{1F1EC}",
  BH: "\u{1F1E7}\u{1F1ED}",
  BI: "\u{1F1E7}\u{1F1EE}",
  BJ: "\u{1F1E7}\u{1F1EF}",
  BL: "\u{1F1E7}\u{1F1F1}",
  BM: "\u{1F1E7}\u{1F1F2}",
  BN: "\u{1F1E7}\u{1F1F3}",
  BO: "\u{1F1E7}\u{1F1F4}",
  BQ: "\u{1F1E7}\u{1F1F6}",
  BR: "\u{1F1E7}\u{1F1F7}",
  BS: "\u{1F1E7}\u{1F1F8}",
  BT: "\u{1F1E7}\u{1F1F9}",
  BV: "\u{1F1E7}\u{1F1FB}",
  BW: "\u{1F1E7}\u{1F1FC}",
  BY: "\u{1F1E7}\u{1F1FE}",
  BZ: "\u{1F1E7}\u{1F1FF}",
  CA: "\u{1F1E8}\u{1F1E6}",
  CC: "\u{1F1E8}\u{1F1E8}",
  CD: "\u{1F1E8}\u{1F1E9}",
  CF: "\u{1F1E8}\u{1F1EB}",
  CG: "\u{1F1E8}\u{1F1EC}",
  CH: "\u{1F1E8}\u{1F1ED}",
  CI: "\u{1F1E8}\u{1F1EE}",
  CK: "\u{1F1E8}\u{1F1F0}",
  CL: "\u{1F1E8}\u{1F1F1}",
  CM: "\u{1F1E8}\u{1F1F2}",
  CN: "\u{1F1E8}\u{1F1F3}",
  CO: "\u{1F1E8}\u{1F1F4}",
  CR: "\u{1F1E8}\u{1F1F7}",
  CU: "\u{1F1E8}\u{1F1FA}",
  CV: "\u{1F1E8}\u{1F1FB}",
  CW: "\u{1F1E8}\u{1F1FC}",
  CX: "\u{1F1E8}\u{1F1FD}",
  CY: "\u{1F1E8}\u{1F1FE}",
  CZ: "\u{1F1E8}\u{1F1FF}",
  DE: "\u{1F1E9}\u{1F1EA}",
  DJ: "\u{1F1E9}\u{1F1EF}",
  DK: "\u{1F1E9}\u{1F1F0}",
  DM: "\u{1F1E9}\u{1F1F2}",
  DO: "\u{1F1E9}\u{1F1F4}",
  DZ: "\u{1F1E9}\u{1F1FF}",
  EC: "\u{1F1EA}\u{1F1E8}",
  EE: "\u{1F1EA}\u{1F1EA}",
  EG: "\u{1F1EA}\u{1F1EC}",
  EH: "\u{1F1EA}\u{1F1ED}",
  ER: "\u{1F1EA}\u{1F1F7}",
  ES: "\u{1F1EA}\u{1F1F8}",
  ET: "\u{1F1EA}\u{1F1F9}",
  FI: "\u{1F1EB}\u{1F1EE}",
  FJ: "\u{1F1EB}\u{1F1EF}",
  FK: "\u{1F1EB}\u{1F1F0}",
  FM: "\u{1F1EB}\u{1F1F2}",
  FO: "\u{1F1EB}\u{1F1F4}",
  FR: "\u{1F1EB}\u{1F1F7}",
  GA: "\u{1F1EC}\u{1F1E6}",
  GB: "\u{1F1EC}\u{1F1E7}",
  GD: "\u{1F1EC}\u{1F1E9}",
  GE: "\u{1F1EC}\u{1F1EA}",
  GF: "\u{1F1EC}\u{1F1EB}",
  GG: "\u{1F1EC}\u{1F1EC}",
  GH: "\u{1F1EC}\u{1F1ED}",
  GI: "\u{1F1EC}\u{1F1EE}",
  GL: "\u{1F1EC}\u{1F1F1}",
  GM: "\u{1F1EC}\u{1F1F2}",
  GN: "\u{1F1EC}\u{1F1F3}",
  GP: "\u{1F1EC}\u{1F1F5}",
  GQ: "\u{1F1EC}\u{1F1F6}",
  GR: "\u{1F1EC}\u{1F1F7}",
  GS: "\u{1F1EC}\u{1F1F8}",
  GT: "\u{1F1EC}\u{1F1F9}",
  GU: "\u{1F1EC}\u{1F1FA}",
  GW: "\u{1F1EC}\u{1F1FC}",
  GY: "\u{1F1EC}\u{1F1FE}",
  HK: "\u{1F1ED}\u{1F1F0}",
  HM: "\u{1F1ED}\u{1F1F2}",
  HN: "\u{1F1ED}\u{1F1F3}",
  HR: "\u{1F1ED}\u{1F1F7}",
  HT: "\u{1F1ED}\u{1F1F9}",
  HU: "\u{1F1ED}\u{1F1FA}",
  ID: "\u{1F1EE}\u{1F1E9}",
  IE: "\u{1F1EE}\u{1F1EA}",
  IL: "\u{1F1EE}\u{1F1F1}",
  IM: "\u{1F1EE}\u{1F1F2}",
  IN: "\u{1F1EE}\u{1F1F3}",
  IO: "\u{1F1EE}\u{1F1F4}",
  IQ: "\u{1F1EE}\u{1F1F6}",
  IR: "\u{1F1EE}\u{1F1F7}",
  IS: "\u{1F1EE}\u{1F1F8}",
  IT: "\u{1F1EE}\u{1F1F9}",
  JE: "\u{1F1EF}\u{1F1EA}",
  JM: "\u{1F1EF}\u{1F1F2}",
  JO: "\u{1F1EF}\u{1F1F4}",
  JP: "\u{1F1EF}\u{1F1F5}",
  KE: "\u{1F1F0}\u{1F1EA}",
  KG: "\u{1F1F0}\u{1F1EC}",
  KH: "\u{1F1F0}\u{1F1ED}",
  KI: "\u{1F1F0}\u{1F1EE}",
  KM: "\u{1F1F0}\u{1F1F2}",
  KN: "\u{1F1F0}\u{1F1F3}",
  KP: "\u{1F1F0}\u{1F1F5}",
  KR: "\u{1F1F0}\u{1F1F7}",
  KW: "\u{1F1F0}\u{1F1FC}",
  KY: "\u{1F1F0}\u{1F1FE}",
  KZ: "\u{1F1F0}\u{1F1FF}",
  LA: "\u{1F1F1}\u{1F1E6}",
  LB: "\u{1F1F1}\u{1F1E7}",
  LC: "\u{1F1F1}\u{1F1E8}",
  LI: "\u{1F1F1}\u{1F1EE}",
  LK: "\u{1F1F1}\u{1F1F0}",
  LR: "\u{1F1F1}\u{1F1F7}",
  LS: "\u{1F1F1}\u{1F1F8}",
  LT: "\u{1F1F1}\u{1F1F9}",
  LU: "\u{1F1F1}\u{1F1FA}",
  LV: "\u{1F1F1}\u{1F1FB}",
  LY: "\u{1F1F1}\u{1F1FE}",
  MA: "\u{1F1F2}\u{1F1E6}",
  MC: "\u{1F1F2}\u{1F1E8}",
  MD: "\u{1F1F2}\u{1F1E9}",
  ME: "\u{1F1F2}\u{1F1EA}",
  MF: "\u{1F1F2}\u{1F1EB}",
  MG: "\u{1F1F2}\u{1F1EC}",
  MH: "\u{1F1F2}\u{1F1ED}",
  MK: "\u{1F1F2}\u{1F1F0}",
  ML: "\u{1F1F2}\u{1F1F1}",
  MM: "\u{1F1F2}\u{1F1F2}",
  MN: "\u{1F1F2}\u{1F1F3}",
  MO: "\u{1F1F2}\u{1F1F4}",
  MP: "\u{1F1F2}\u{1F1F5}",
  MQ: "\u{1F1F2}\u{1F1F6}",
  MR: "\u{1F1F2}\u{1F1F7}",
  MS: "\u{1F1F2}\u{1F1F8}",
  MT: "\u{1F1F2}\u{1F1F9}",
  MU: "\u{1F1F2}\u{1F1FA}",
  MV: "\u{1F1F2}\u{1F1FB}",
  MW: "\u{1F1F2}\u{1F1FC}",
  MX: "\u{1F1F2}\u{1F1FD}",
  MY: "\u{1F1F2}\u{1F1FE}",
  MZ: "\u{1F1F2}\u{1F1FF}",
  NA: "\u{1F1F3}\u{1F1E6}",
  NC: "\u{1F1F3}\u{1F1E8}",
  NE: "\u{1F1F3}\u{1F1EA}",
  NF: "\u{1F1F3}\u{1F1EB}",
  NG: "\u{1F1F3}\u{1F1EC}",
  NI: "\u{1F1F3}\u{1F1EE}",
  NL: "\u{1F1F3}\u{1F1F1}",
  NO: "\u{1F1F3}\u{1F1F4}",
  NP: "\u{1F1F3}\u{1F1F5}",
  NR: "\u{1F1F3}\u{1F1F7}",
  NU: "\u{1F1F3}\u{1F1FA}",
  NZ: "\u{1F1F3}\u{1F1FF}",
  OM: "\u{1F1F4}\u{1F1F2}",
  PA: "\u{1F1F5}\u{1F1E6}",
  PE: "\u{1F1F5}\u{1F1EA}",
  PF: "\u{1F1F5}\u{1F1EB}",
  PG: "\u{1F1F5}\u{1F1EC}",
  PH: "\u{1F1F5}\u{1F1ED}",
  PK: "\u{1F1F5}\u{1F1F0}",
  PL: "\u{1F1F5}\u{1F1F1}",
  PM: "\u{1F1F5}\u{1F1F2}",
  PN: "\u{1F1F5}\u{1F1F3}",
  PR: "\u{1F1F5}\u{1F1F7}",
  PS: "\u{1F1F5}\u{1F1F8}",
  PT: "\u{1F1F5}\u{1F1F9}",
  PW: "\u{1F1F5}\u{1F1FC}",
  PY: "\u{1F1F5}\u{1F1FE}",
  QA: "\u{1F1F6}\u{1F1E6}",
  RE: "\u{1F1F7}\u{1F1EA}",
  RO: "\u{1F1F7}\u{1F1F4}",
  RS: "\u{1F1F7}\u{1F1F8}",
  RU: "\u{1F1F7}\u{1F1FA}",
  RW: "\u{1F1F7}\u{1F1FC}",
  SA: "\u{1F1F8}\u{1F1E6}",
  SB: "\u{1F1F8}\u{1F1E7}",
  SC: "\u{1F1F8}\u{1F1E8}",
  SD: "\u{1F1F8}\u{1F1E9}",
  SE: "\u{1F1F8}\u{1F1EA}",
  SG: "\u{1F1F8}\u{1F1EC}",
  SH: "\u{1F1F8}\u{1F1ED}",
  SI: "\u{1F1F8}\u{1F1EE}",
  SJ: "\u{1F1F8}\u{1F1EF}",
  SK: "\u{1F1F8}\u{1F1F0}",
  SL: "\u{1F1F8}\u{1F1F1}",
  SM: "\u{1F1F8}\u{1F1F2}",
  SN: "\u{1F1F8}\u{1F1F3}",
  SO: "\u{1F1F8}\u{1F1F4}",
  SR: "\u{1F1F8}\u{1F1F7}",
  SS: "\u{1F1F8}\u{1F1F8}",
  ST: "\u{1F1F8}\u{1F1F9}",
  SV: "\u{1F1F8}\u{1F1FB}",
  SX: "\u{1F1F8}\u{1F1FD}",
  SY: "\u{1F1F8}\u{1F1FE}",
  SZ: "\u{1F1F8}\u{1F1FF}",
  TC: "\u{1F1F9}\u{1F1E8}",
  TD: "\u{1F1F9}\u{1F1E9}",
  TF: "\u{1F1F9}\u{1F1EB}",
  TG: "\u{1F1F9}\u{1F1EC}",
  TH: "\u{1F1F9}\u{1F1ED}",
  TJ: "\u{1F1F9}\u{1F1EF}",
  TK: "\u{1F1F9}\u{1F1F0}",
  TL: "\u{1F1F9}\u{1F1F1}",
  TM: "\u{1F1F9}\u{1F1F2}",
  TN: "\u{1F1F9}\u{1F1F3}",
  TO: "\u{1F1F9}\u{1F1F4}",
  TR: "\u{1F1F9}\u{1F1F7}",
  TT: "\u{1F1F9}\u{1F1F9}",
  TV: "\u{1F1F9}\u{1F1FB}",
  TW: "\u{1F1F9}\u{1F1FC}",
  TZ: "\u{1F1F9}\u{1F1FF}",
  UA: "\u{1F1FA}\u{1F1E6}",
  UG: "\u{1F1FA}\u{1F1EC}",
  UM: "\u{1F1FA}\u{1F1F2}",
  US: "\u{1F1FA}\u{1F1F8}",
  UY: "\u{1F1FA}\u{1F1FE}",
  UZ: "\u{1F1FA}\u{1F1FF}",
  VA: "\u{1F1FB}\u{1F1E6}",
  VC: "\u{1F1FB}\u{1F1E8}",
  VE: "\u{1F1FB}\u{1F1EA}",
  VG: "\u{1F1FB}\u{1F1EC}",
  VI: "\u{1F1FB}\u{1F1EE}",
  VN: "\u{1F1FB}\u{1F1F3}",
  VU: "\u{1F1FB}\u{1F1FA}",
  WF: "\u{1F1FC}\u{1F1EB}",
  WS: "\u{1F1FC}\u{1F1F8}",
  YE: "\u{1F1FE}\u{1F1EA}",
  YT: "\u{1F1FE}\u{1F1F9}",
  ZA: "\u{1F1FF}\u{1F1E6}",
  ZM: "\u{1F1FF}\u{1F1F2}",
  ZW: "\u{1F1FF}\u{1F1FC}"
};
var CountryFlagSVG = ({ countryCode, className = "", size = "md" }) => {
  const code = countryCode?.toUpperCase() || "";
  const svgContent = flagSvgs[code];
  const emoji = flagEmojis[code] || "\u{1F310}";
  const sizeClass = size === "sm" ? "h-3 w-4" : size === "lg" ? "h-6 w-8" : "h-4 w-5";
  if (svgContent) {
    return /* @__PURE__ */ jsx4(
      "svg",
      {
        className: `${sizeClass} ${className} inline-block`,
        dangerouslySetInnerHTML: { __html: svgContent }
      }
    );
  }
  return /* @__PURE__ */ jsx4("span", { className: `${className} leading-none`, children: emoji });
};
var getCountryName = (countryCode) => {
  const code = countryCode?.toUpperCase() || "";
  return countryNames[code] || code || "Unknown";
};
var CountryBadge = ({
  countryCode,
  showName = true,
  className = "",
  size = "md"
}) => {
  const name = getCountryName(countryCode);
  const sizeClass = size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base";
  return /* @__PURE__ */ jsxs2("span", { className: `flex items-center gap-1 ${sizeClass} ${className}`, children: [
    /* @__PURE__ */ jsx4(CountryFlagSVG, { countryCode, size }),
    showName && /* @__PURE__ */ jsx4("span", { children: name })
  ] });
};

// components/ConnectionTable.tsx
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var SkeletonProcess = () => /* @__PURE__ */ jsx5("div", { className: "animate-pulse border border-gray-700/50 rounded-lg p-4 mb-3", children: /* @__PURE__ */ jsx5("div", { className: "h-4 bg-gray-700 rounded w-1/4" }) });
var ConnectionTable = ({ connections, isLoading, selectedCountry }) => {
  const [expandedProcesses, setExpandedProcesses] = useState(/* @__PURE__ */ new Set());
  const groupedConnections = useMemo(() => {
    const grouped = {};
    connections.forEach((conn) => {
      if (!grouped[conn.processName]) {
        grouped[conn.processName] = {
          processId: conn.processId,
          connections: []
        };
      }
      grouped[conn.processName].connections.push(conn);
    });
    return grouped;
  }, [connections]);
  const processes = useMemo(
    () => Object.entries(groupedConnections).sort((a, b) => b[1].connections.length - a[1].connections.length),
    [groupedConnections]
  );
  const toggleProcess = (processName) => {
    const newExpanded = new Set(expandedProcesses);
    if (newExpanded.has(processName)) {
      newExpanded.delete(processName);
    } else {
      newExpanded.add(processName);
    }
    setExpandedProcesses(newExpanded);
  };
  return /* @__PURE__ */ jsxs3("section", { "aria-labelledby": "active-connections-title", children: [
    /* @__PURE__ */ jsxs3("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-3 mb-2", children: [
        /* @__PURE__ */ jsx5("div", { className: "w-1 h-6 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full" }),
        /* @__PURE__ */ jsx5("h2", { id: "active-connections-title", className: "text-2xl font-bold text-gray-100", children: "Active Connections" }),
        /* @__PURE__ */ jsxs3("span", { className: "ml-auto text-sm font-semibold text-cyan-400", children: [
          connections.length,
          " connections"
        ] })
      ] }),
      /* @__PURE__ */ jsx5("p", { className: "text-sm text-gray-400", children: "Grouped by process with their remote connections" })
    ] }),
    /* @__PURE__ */ jsx5("div", { className: "space-y-3", children: isLoading && processes.length === 0 ? [...Array(5)].map((_, i) => /* @__PURE__ */ jsx5(SkeletonProcess, {}, i)) : !isLoading && processes.length === 0 ? /* @__PURE__ */ jsx5("div", { className: "bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-12 text-center border border-gray-700/50", children: /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx5(ChipIcon, { className: "w-12 h-12 mb-4 text-gray-600" }),
      /* @__PURE__ */ jsx5("span", { className: "font-semibold text-gray-300 text-lg", children: "No active external connections" }),
      /* @__PURE__ */ jsx5("span", { className: "text-sm text-gray-500 mt-2", children: "Listening for network activity..." })
    ] }) }) : processes.map(([processName, { processId, connections: processConnections }]) => /* @__PURE__ */ jsxs3(
      "div",
      {
        className: "bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700/50 overflow-hidden shadow-lg hover:shadow-xl transition-shadow",
        children: [
          /* @__PURE__ */ jsxs3(
            "button",
            {
              onClick: () => toggleProcess(processName),
              className: "w-full flex items-center justify-between p-4 hover:bg-gray-700/30 transition-colors text-left",
              children: [
                /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx5("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/30 to-cyan-600/30 flex items-center justify-center flex-shrink-0 border border-cyan-500/30", children: /* @__PURE__ */ jsx5(ChipIcon, { className: "w-5 h-5 text-cyan-400" }) }),
                  /* @__PURE__ */ jsxs3("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsx5("div", { className: "font-semibold text-gray-100 text-base", children: processName }),
                    /* @__PURE__ */ jsxs3("div", { className: "text-xs text-gray-500 mt-1", children: [
                      "PID: ",
                      processId,
                      " \u2022 ",
                      processConnections.length,
                      " connection",
                      processConnections.length !== 1 ? "s" : ""
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2 ml-4", children: [
                  /* @__PURE__ */ jsx5("span", { className: "px-2.5 py-1 inline-flex text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30", children: processConnections.length }),
                  /* @__PURE__ */ jsx5(
                    "svg",
                    {
                      className: `w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${expandedProcesses.has(processName) ? "rotate-180" : ""}`,
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx5("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 14l-7 7m0 0l-7-7m7 7V3" })
                    }
                  )
                ] })
              ]
            }
          ),
          expandedProcesses.has(processName) && /* @__PURE__ */ jsx5("div", { className: "border-t border-gray-700/50 bg-gray-900/50", children: /* @__PURE__ */ jsx5("div", { className: "px-4 py-3 space-y-2", children: processConnections.map((conn, idx) => {
            const isMatched = selectedCountry && conn.country === selectedCountry;
            return /* @__PURE__ */ jsxs3(
              "div",
              {
                className: `flex flex-col md:flex-row md:items-center justify-between gap-2 p-3 rounded-lg border transition-colors ${isMatched ? "bg-cyan-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/10" : "bg-gray-800/50 border-gray-700/30 hover:bg-gray-800/80"}`,
                children: [
                  /* @__PURE__ */ jsxs3("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsx5("div", { className: "flex items-center gap-2 mb-1", children: /* @__PURE__ */ jsxs3("span", { className: "text-xs px-2 py-1 rounded bg-gray-700/50 text-gray-300 font-mono", children: [
                      conn.remoteAddress,
                      ":",
                      conn.remotePort
                    ] }) }),
                    /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2 text-xs text-gray-500", children: [
                      /* @__PURE__ */ jsx5(
                        CountryBadge,
                        {
                          countryCode: conn.country,
                          showName: true,
                          size: "sm",
                          className: "text-gray-400"
                        }
                      ),
                      conn.region && /* @__PURE__ */ jsxs3("span", { className: "text-gray-600", children: [
                        "\u2022 ",
                        conn.region
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx5("div", { className: "hidden md:flex items-center text-xs text-gray-400 whitespace-nowrap", children: /* @__PURE__ */ jsx5("span", { className: "px-2 py-1 rounded bg-gray-700/30 text-gray-300", children: conn.remotePort }) })
                ]
              },
              `${processName}-${idx}`
            );
          }) }) })
        ]
      },
      processName
    )) })
  ] });
};
var ConnectionTable_default = ConnectionTable;

// components/TrafficChart.tsx
import { useMemo as useMemo2 } from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";

// components/icons/GlobeIcon.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var GlobeIcon = (props) => /* @__PURE__ */ jsx6(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    ...props,
    children: /* @__PURE__ */ jsx6(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.953 11.953 0 0112 13.5c-2.998 0-5.74-1.1-7.843-2.918"
      }
    )
  }
);

// components/TrafficChart.tsx
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
var CustomXAxisTick = ({ x, y, payload }) => {
  const countryCode = payload?.value || "";
  const countryName = getCountryName(countryCode);
  return /* @__PURE__ */ jsx7("g", { transform: `translate(${x},${y})`, children: /* @__PURE__ */ jsx7("foreignObject", { x: -30, y: 0, width: 60, height: 40, children: /* @__PURE__ */ jsxs4("div", { style: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    fontSize: "11px"
  }, children: [
    /* @__PURE__ */ jsx7("div", { style: { fontSize: "16px", lineHeight: "1" }, children: /* @__PURE__ */ jsx7(CountryFlagSVG, { countryCode, size: "md" }) }),
    /* @__PURE__ */ jsx7("div", { style: { color: "#a0a0a0", fontSize: "9px", marginTop: "2px" }, children: countryCode })
  ] }) }) });
};
var TrafficChart = ({ connections, isLoading, selectedCountry, onCountrySelect }) => {
  const data = useMemo2(() => {
    if (!connections || connections.length === 0) {
      return [];
    }
    const countsByCountry = connections.reduce((acc, conn) => {
      const country = conn.country || "Unknown";
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(countsByCountry).map(([country, connections2]) => ({ country, connections: connections2, isSelected: country === selectedCountry })).sort((a, b) => b.connections - a.connections);
  }, [connections, selectedCountry]);
  const handleBarClick = (data2) => {
    if (onCountrySelect) {
      onCountrySelect(selectedCountry === data2.country ? null : data2.country);
    }
  };
  return /* @__PURE__ */ jsxs4("section", { "aria-labelledby": "traffic-chart-title", children: [
    /* @__PURE__ */ jsxs4("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-3 mb-2", children: [
        /* @__PURE__ */ jsx7("div", { className: "w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" }),
        /* @__PURE__ */ jsx7("h2", { id: "traffic-chart-title", className: "text-2xl font-bold text-gray-100", children: "Connections by Country" }),
        /* @__PURE__ */ jsxs4("span", { className: "ml-auto text-sm font-semibold text-blue-400", children: [
          data.length,
          " countries"
        ] })
      ] }),
      /* @__PURE__ */ jsx7("p", { className: "text-sm text-gray-400", children: "Distribution of network connections by geographic location" })
    ] }),
    /* @__PURE__ */ jsx7("div", { className: "bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-4 md:p-8 border border-gray-700/50", children: /* @__PURE__ */ jsx7("div", { className: "w-full h-[350px]", children: isLoading && data.length === 0 ? /* @__PURE__ */ jsx7("div", { className: "w-full h-full bg-gradient-to-br from-gray-700/50 to-gray-600/30 rounded-lg animate-pulse" }) : data.length === 0 ? /* @__PURE__ */ jsxs4("div", { className: "w-full h-full flex flex-col justify-center items-center text-gray-500", children: [
      /* @__PURE__ */ jsx7("div", { className: "w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3 border border-blue-500/30", children: /* @__PURE__ */ jsx7(GlobeIcon, { className: "w-6 h-6 text-blue-400" }) }),
      /* @__PURE__ */ jsx7("span", { className: "font-semibold text-gray-300", children: "No data to visualize" }),
      /* @__PURE__ */ jsx7("span", { className: "text-xs mt-1", children: "Waiting for connections..." })
    ] }) : /* @__PURE__ */ jsx7(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs4(BarChart, { data, margin: { top: 10, right: 20, left: -5, bottom: 10 }, onClick: (state) => {
      if (state && state.activeTooltipIndex !== void 0) {
        handleBarClick(data[state.activeTooltipIndex]);
      }
    }, children: [
      /* @__PURE__ */ jsx7(CartesianGrid, { strokeDasharray: "3 3", stroke: "#444444", opacity: 0.3 }),
      /* @__PURE__ */ jsx7(XAxis, { dataKey: "country", stroke: "#888888", tick: /* @__PURE__ */ jsx7(CustomXAxisTick, {}) }),
      /* @__PURE__ */ jsx7(YAxis, { stroke: "#888888", tick: { fontSize: 12, fill: "#a0a0a0" }, allowDecimals: false }),
      /* @__PURE__ */ jsx7(
        Tooltip,
        {
          cursor: { fill: "rgba(34, 211, 238, 0.1)" },
          contentStyle: {
            backgroundColor: "#1a1a2e",
            border: "1px solid #22d3ee",
            borderRadius: "0.75rem",
            boxShadow: "0 10px 25px rgba(34, 211, 238, 0.2)"
          },
          labelStyle: { color: "#22d3ee", fontWeight: "bold" },
          wrapperStyle: { outline: "none" },
          content: ({ active, payload }) => {
            if (active && payload && payload.length) {
              const country = payload[0].payload.country;
              const countryName = getCountryName(country);
              return /* @__PURE__ */ jsxs4("div", { className: "bg-gray-900 border border-cyan-400 rounded-lg p-3 text-xs text-white", children: [
                /* @__PURE__ */ jsxs4("p", { className: "font-semibold text-cyan-300 mb-2 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx7("span", { style: { fontSize: "16px" }, children: /* @__PURE__ */ jsx7(CountryFlagSVG, { countryCode: country }) }),
                  /* @__PURE__ */ jsx7("span", { children: countryName })
                ] }),
                /* @__PURE__ */ jsxs4("p", { className: "text-gray-300", children: [
                  payload[0].value,
                  " connections"
                ] }),
                /* @__PURE__ */ jsx7("p", { className: "text-gray-500 text-xs mt-2", children: "Click to filter" })
              ] });
            }
            return null;
          }
        }
      ),
      /* @__PURE__ */ jsx7(
        Bar,
        {
          dataKey: "connections",
          fill: "#22d3ee",
          radius: [8, 8, 0, 0],
          name: "Connections",
          isAnimationActive: true,
          onClick: (data2) => handleBarClick(data2),
          style: { cursor: "pointer" },
          shape: ({ x, y, width, height, payload }) => {
            const isSelected = payload.isSelected;
            const fillColor = isSelected ? "#06b6d4" : "#22d3ee";
            const opacity = isSelected ? 1 : 0.7;
            return /* @__PURE__ */ jsx7(
              "rect",
              {
                x,
                y,
                width,
                height,
                fill: fillColor,
                opacity,
                rx: 8,
                style: {
                  filter: isSelected ? "drop-shadow(0 0 8px rgba(34, 211, 238, 0.6))" : "none",
                  transition: "all 0.2s"
                }
              }
            );
          }
        }
      )
    ] }) }) }) })
  ] });
};
var TrafficChart_default = TrafficChart;

// App.tsx
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
var REFRESH_INTERVAL_MS = 1e4;
var App = () => {
  const [connections, setConnections] = useState2([]);
  const [isLoading, setIsLoading] = useState2(true);
  const [error, setError] = useState2(null);
  const [lastUpdated, setLastUpdated] = useState2(null);
  const [selectedCountry, setSelectedCountry] = useState2(null);
  const filteredConnections = selectedCountry ? connections.filter((conn) => conn.country === selectedCountry) : connections;
  const manualRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1e3);
  }, []);
  const handleExportData = useCallback(() => {
    const data = filteredConnections.map((conn) => ({
      process: conn.processName,
      pid: conn.processId,
      remoteAddress: conn.remoteAddress,
      remotePort: conn.remotePort,
      country: conn.country,
      region: conn.region
    }));
    const csv = [
      ["Process", "PID", "Remote Address", "Port", "Country", "Region"],
      ...data.map((d) => [d.process, d.pid, d.remoteAddress, d.remotePort, d.country, d.region])
    ].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `network-connections-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }, [filteredConnections]);
  const handleCopyData = useCallback(() => {
    const text = filteredConnections.map((conn) => `${conn.processName} (${conn.processId}) -> ${conn.remoteAddress}:${conn.remotePort} (${conn.country})`).join("\n");
    navigator.clipboard.writeText(text);
  }, [filteredConnections]);
  useEffect(() => {
    const handleConnectionUpdate = (data) => {
      const sortedData = data.sort((a, b) => a.processName.localeCompare(b.processName));
      setConnections(sortedData);
      setLastUpdated(/* @__PURE__ */ new Date());
      setError(null);
      setIsLoading(false);
    };
    const handleConnectionError = (errorMessage) => {
      console.error("Backend error:", errorMessage);
      setError(`Failed to get network data. Details: ${errorMessage}`);
      setIsLoading(false);
    };
    window.electronAPI.onConnectionUpdate(handleConnectionUpdate);
    window.electronAPI.onConnectionError(handleConnectionError);
    return () => {
      window.electronAPI.removeAllListeners();
    };
  }, []);
  return /* @__PURE__ */ jsx8("div", { className: "min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-gray-200 font-sans", children: /* @__PURE__ */ jsxs5("div", { className: "container mx-auto p-4 md:p-8 max-w-screen-2xl", children: [
    /* @__PURE__ */ jsx8(
      Header_default,
      {
        onRefresh: manualRefresh,
        lastUpdated,
        isLoading
      }
    ),
    /* @__PURE__ */ jsxs5("main", { className: "mt-10 space-y-6", children: [
      error && /* @__PURE__ */ jsxs5("div", { className: "bg-gradient-to-r from-red-950 to-red-900 border border-red-700 text-red-100 px-6 py-4 rounded-xl relative shadow-lg backdrop-blur-sm", role: "alert", children: [
        /* @__PURE__ */ jsx8("strong", { className: "font-bold block mb-1", children: "\u26A0\uFE0F Error" }),
        /* @__PURE__ */ jsx8("span", { className: "block text-sm", children: error })
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "flex gap-3 flex-wrap items-center", children: [
        selectedCountry && /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-2 px-3 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg", children: [
          /* @__PURE__ */ jsxs5("span", { className: "text-sm text-cyan-300 font-semibold flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx8("span", { children: "Filtering:" }),
            /* @__PURE__ */ jsx8(CountryBadge, { countryCode: selectedCountry, showName: true, size: "md" })
          ] }),
          /* @__PURE__ */ jsx8(
            "button",
            {
              onClick: () => setSelectedCountry(null),
              className: "text-cyan-400 hover:text-cyan-300 font-bold text-sm",
              children: "\u2715"
            }
          )
        ] }),
        /* @__PURE__ */ jsx8(
          "button",
          {
            onClick: handleExportData,
            className: "px-4 py-2 rounded-lg bg-green-600/20 hover:bg-green-600/40 border border-green-600/50 text-green-400 hover:text-green-300 text-sm font-semibold transition-colors",
            title: "Export current data to CSV",
            children: "\u{1F4E5} Export CSV"
          }
        ),
        /* @__PURE__ */ jsx8(
          "button",
          {
            onClick: handleCopyData,
            className: "px-4 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 border border-blue-600/50 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors",
            title: "Copy data to clipboard",
            children: "\u{1F4CB} Copy"
          }
        ),
        /* @__PURE__ */ jsx8(
          "button",
          {
            onClick: () => setSelectedCountry(null),
            className: "px-4 py-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/50 text-gray-300 hover:text-gray-200 text-sm font-semibold transition-colors",
            title: "Clear filters",
            children: "\u{1F504} Clear Filters"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-max lg:auto-rows-max", children: [
        /* @__PURE__ */ jsx8("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsx8(
          ConnectionTable_default,
          {
            connections: filteredConnections,
            isLoading,
            selectedCountry
          }
        ) }),
        /* @__PURE__ */ jsx8("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsx8(
          TrafficChart_default,
          {
            connections,
            isLoading,
            selectedCountry,
            onCountrySelect: setSelectedCountry
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs5("footer", { className: "text-center mt-16 text-gray-500 text-xs tracking-wide", children: [
      /* @__PURE__ */ jsx8("p", { className: "mb-2", children: "Network Monitor \u2022 Real-time Analysis" }),
      /* @__PURE__ */ jsxs5("p", { children: [
        "Auto-refresh: ",
        /* @__PURE__ */ jsxs5("span", { className: "text-cyan-400 font-semibold", children: [
          REFRESH_INTERVAL_MS / 1e3,
          "s"
        ] })
      ] })
    ] })
  ] }) });
};
var App_default = App;

// index.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
var rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
var root = ReactDOM.createRoot(rootElement);
root.render(
  /* @__PURE__ */ jsx9(React4.StrictMode, { children: /* @__PURE__ */ jsx9(App_default, {}) })
);
//# sourceMappingURL=bundle.js.map
