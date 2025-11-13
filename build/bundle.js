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

// components/icons/GlobeIcon.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var GlobeIcon = (props) => /* @__PURE__ */ jsx4(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    ...props,
    children: /* @__PURE__ */ jsx4(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.953 11.953 0 0112 13.5c-2.998 0-5.74-1.1-7.843-2.918"
      }
    )
  }
);

// components/ConnectionTable.tsx
import { jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs2("section", { "aria-labelledby": "active-connections-title", children: [
    /* @__PURE__ */ jsxs2("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-3 mb-2", children: [
        /* @__PURE__ */ jsx5("div", { className: "w-1 h-6 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full" }),
        /* @__PURE__ */ jsx5("h2", { id: "active-connections-title", className: "text-2xl font-bold text-gray-100", children: "Active Connections" }),
        /* @__PURE__ */ jsxs2("span", { className: "ml-auto text-sm font-semibold text-cyan-400", children: [
          connections.length,
          " connections"
        ] })
      ] }),
      /* @__PURE__ */ jsx5("p", { className: "text-sm text-gray-400", children: "Grouped by process with their remote connections" })
    ] }),
    /* @__PURE__ */ jsx5("div", { className: "space-y-3", children: isLoading && processes.length === 0 ? [...Array(5)].map((_, i) => /* @__PURE__ */ jsx5(SkeletonProcess, {}, i)) : !isLoading && processes.length === 0 ? /* @__PURE__ */ jsx5("div", { className: "bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-12 text-center border border-gray-700/50", children: /* @__PURE__ */ jsxs2("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsx5(ChipIcon, { className: "w-12 h-12 mb-4 text-gray-600" }),
      /* @__PURE__ */ jsx5("span", { className: "font-semibold text-gray-300 text-lg", children: "No active external connections" }),
      /* @__PURE__ */ jsx5("span", { className: "text-sm text-gray-500 mt-2", children: "Listening for network activity..." })
    ] }) }) : processes.map(([processName, { processId, connections: processConnections }]) => /* @__PURE__ */ jsxs2(
      "div",
      {
        className: "bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700/50 overflow-hidden shadow-lg hover:shadow-xl transition-shadow",
        children: [
          /* @__PURE__ */ jsxs2(
            "button",
            {
              onClick: () => toggleProcess(processName),
              className: "w-full flex items-center justify-between p-4 hover:bg-gray-700/30 transition-colors text-left",
              children: [
                /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx5("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/30 to-cyan-600/30 flex items-center justify-center flex-shrink-0 border border-cyan-500/30", children: /* @__PURE__ */ jsx5(ChipIcon, { className: "w-5 h-5 text-cyan-400" }) }),
                  /* @__PURE__ */ jsxs2("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsx5("div", { className: "font-semibold text-gray-100 text-base", children: processName }),
                    /* @__PURE__ */ jsxs2("div", { className: "text-xs text-gray-500 mt-1", children: [
                      "PID: ",
                      processId,
                      " \u2022 ",
                      processConnections.length,
                      " connection",
                      processConnections.length !== 1 ? "s" : ""
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-2 ml-4", children: [
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
            return /* @__PURE__ */ jsxs2(
              "div",
              {
                className: `flex flex-col md:flex-row md:items-center justify-between gap-2 p-3 rounded-lg border transition-colors ${isMatched ? "bg-cyan-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/10" : "bg-gray-800/50 border-gray-700/30 hover:bg-gray-800/80"}`,
                children: [
                  /* @__PURE__ */ jsxs2("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsx5("div", { className: "flex items-center gap-2 mb-1", children: /* @__PURE__ */ jsxs2("span", { className: "text-xs px-2 py-1 rounded bg-gray-700/50 text-gray-300 font-mono", children: [
                      conn.remoteAddress,
                      ":",
                      conn.remotePort
                    ] }) }),
                    /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-2 text-xs text-gray-500", children: [
                      /* @__PURE__ */ jsx5("div", { className: "w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30", children: /* @__PURE__ */ jsx5(GlobeIcon, { className: "w-2.5 h-2.5 text-blue-400" }) }),
                      /* @__PURE__ */ jsx5("span", { children: conn.country }),
                      conn.region && /* @__PURE__ */ jsxs2("span", { children: [
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
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs3("section", { "aria-labelledby": "traffic-chart-title", children: [
    /* @__PURE__ */ jsxs3("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-3 mb-2", children: [
        /* @__PURE__ */ jsx6("div", { className: "w-1 h-6 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" }),
        /* @__PURE__ */ jsx6("h2", { id: "traffic-chart-title", className: "text-2xl font-bold text-gray-100", children: "Connections by Country" }),
        /* @__PURE__ */ jsxs3("span", { className: "ml-auto text-sm font-semibold text-blue-400", children: [
          data.length,
          " countries"
        ] })
      ] }),
      /* @__PURE__ */ jsx6("p", { className: "text-sm text-gray-400", children: "Distribution of network connections by geographic location" })
    ] }),
    /* @__PURE__ */ jsx6("div", { className: "bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-4 md:p-8 border border-gray-700/50", children: /* @__PURE__ */ jsx6("div", { className: "w-full h-[350px]", children: isLoading && data.length === 0 ? /* @__PURE__ */ jsx6("div", { className: "w-full h-full bg-gradient-to-br from-gray-700/50 to-gray-600/30 rounded-lg animate-pulse" }) : data.length === 0 ? /* @__PURE__ */ jsxs3("div", { className: "w-full h-full flex flex-col justify-center items-center text-gray-500", children: [
      /* @__PURE__ */ jsx6("div", { className: "w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3 border border-blue-500/30", children: /* @__PURE__ */ jsx6(GlobeIcon, { className: "w-6 h-6 text-blue-400" }) }),
      /* @__PURE__ */ jsx6("span", { className: "font-semibold text-gray-300", children: "No data to visualize" }),
      /* @__PURE__ */ jsx6("span", { className: "text-xs mt-1", children: "Waiting for connections..." })
    ] }) : /* @__PURE__ */ jsx6(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs3(BarChart, { data, margin: { top: 10, right: 20, left: -5, bottom: 10 }, onClick: (state) => {
      if (state && state.activeTooltipIndex !== void 0) {
        handleBarClick(data[state.activeTooltipIndex]);
      }
    }, children: [
      /* @__PURE__ */ jsx6(CartesianGrid, { strokeDasharray: "3 3", stroke: "#444444", opacity: 0.3 }),
      /* @__PURE__ */ jsx6(XAxis, { dataKey: "country", stroke: "#888888", tick: { fontSize: 12, fill: "#a0a0a0" } }),
      /* @__PURE__ */ jsx6(YAxis, { stroke: "#888888", tick: { fontSize: 12, fill: "#a0a0a0" }, allowDecimals: false }),
      /* @__PURE__ */ jsx6(
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
              return /* @__PURE__ */ jsxs3("div", { className: "bg-gray-900 border border-cyan-400 rounded-lg p-2 text-xs text-white", children: [
                /* @__PURE__ */ jsx6("p", { className: "font-semibold text-cyan-300", children: payload[0].payload.country }),
                /* @__PURE__ */ jsxs3("p", { className: "text-gray-300", children: [
                  payload[0].value,
                  " connections"
                ] }),
                /* @__PURE__ */ jsx6("p", { className: "text-gray-500 text-xs mt-1", children: "Click to filter" })
              ] });
            }
            return null;
          }
        }
      ),
      /* @__PURE__ */ jsx6(
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
            return /* @__PURE__ */ jsx6(
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
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx7("div", { className: "min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-gray-200 font-sans", children: /* @__PURE__ */ jsxs4("div", { className: "container mx-auto p-4 md:p-8 max-w-screen-2xl", children: [
    /* @__PURE__ */ jsx7(
      Header_default,
      {
        onRefresh: manualRefresh,
        lastUpdated,
        isLoading
      }
    ),
    /* @__PURE__ */ jsxs4("main", { className: "mt-10 space-y-6", children: [
      error && /* @__PURE__ */ jsxs4("div", { className: "bg-gradient-to-r from-red-950 to-red-900 border border-red-700 text-red-100 px-6 py-4 rounded-xl relative shadow-lg backdrop-blur-sm", role: "alert", children: [
        /* @__PURE__ */ jsx7("strong", { className: "font-bold block mb-1", children: "\u26A0\uFE0F Error" }),
        /* @__PURE__ */ jsx7("span", { className: "block text-sm", children: error })
      ] }),
      /* @__PURE__ */ jsxs4("div", { className: "flex gap-3 flex-wrap items-center", children: [
        selectedCountry && /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-2 px-3 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg", children: [
          /* @__PURE__ */ jsxs4("span", { className: "text-sm text-cyan-300 font-semibold", children: [
            "Filtering: ",
            selectedCountry
          ] }),
          /* @__PURE__ */ jsx7(
            "button",
            {
              onClick: () => setSelectedCountry(null),
              className: "text-cyan-400 hover:text-cyan-300 font-bold text-sm",
              children: "\u2715"
            }
          )
        ] }),
        /* @__PURE__ */ jsx7(
          "button",
          {
            onClick: handleExportData,
            className: "px-4 py-2 rounded-lg bg-green-600/20 hover:bg-green-600/40 border border-green-600/50 text-green-400 hover:text-green-300 text-sm font-semibold transition-colors",
            title: "Export current data to CSV",
            children: "\u{1F4E5} Export CSV"
          }
        ),
        /* @__PURE__ */ jsx7(
          "button",
          {
            onClick: handleCopyData,
            className: "px-4 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 border border-blue-600/50 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors",
            title: "Copy data to clipboard",
            children: "\u{1F4CB} Copy"
          }
        ),
        /* @__PURE__ */ jsx7(
          "button",
          {
            onClick: () => setSelectedCountry(null),
            className: "px-4 py-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/50 text-gray-300 hover:text-gray-200 text-sm font-semibold transition-colors",
            title: "Clear filters",
            children: "\u{1F504} Clear Filters"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs4("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-max lg:auto-rows-max", children: [
        /* @__PURE__ */ jsx7("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsx7(
          ConnectionTable_default,
          {
            connections: filteredConnections,
            isLoading,
            selectedCountry
          }
        ) }),
        /* @__PURE__ */ jsx7("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsx7(
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
    /* @__PURE__ */ jsxs4("footer", { className: "text-center mt-16 text-gray-500 text-xs tracking-wide", children: [
      /* @__PURE__ */ jsx7("p", { className: "mb-2", children: "Network Monitor \u2022 Real-time Analysis" }),
      /* @__PURE__ */ jsxs4("p", { children: [
        "Auto-refresh: ",
        /* @__PURE__ */ jsxs4("span", { className: "text-cyan-400 font-semibold", children: [
          REFRESH_INTERVAL_MS / 1e3,
          "s"
        ] })
      ] })
    ] })
  ] }) });
};
var App_default = App;

// index.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
var rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
var root = ReactDOM.createRoot(rootElement);
root.render(
  /* @__PURE__ */ jsx8(React4.StrictMode, { children: /* @__PURE__ */ jsx8(App_default, {}) })
);
//# sourceMappingURL=bundle.js.map
