"use client";

import { useState, useEffect } from "react";
import MOCK_FORECAST from "../constants/FORECAST";
import {
  Droplets,
  Wind,
  Thermometer,
  CloudRain,
  Eye,
  Gauge,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  Clock,
} from "lucide-react";

// ── MOCK DATA (replace with real API once key is ready) ─────────────────────
const MOCK_CURRENT = {
  main:       { temp: 31, feels_like: 36, temp_min: 28, temp_max: 33, humidity: 88, pressure: 1005 },
  weather:    [{ description: "heavy intensity rain", icon: "10d" }],
  wind:       { speed: 6.2, deg: 190 },
  visibility: 4000,
  rain:       { "1h": 7.4 },
  sys:        { sunrise: 1720228200, sunset: 1720276200 },
};


// ── HELPERS ──────────────────────────────────────────────────────────────────
function floodRiskLevel(rainMm, humidity, windSpeed) {
  const score = (rainMm > 10 ? 3 : rainMm > 5 ? 2 : rainMm > 1 ? 1 : 0)
              + (humidity > 85 ? 2 : humidity > 70 ? 1 : 0)
              + (windSpeed > 10 ? 1 : 0);
  if (score >= 5) return { label: "Critical", color: "text-red-500",   bg: "bg-red-500/10",   border: "border-red-500/30",   bar: "bg-red-500",   pct: 95 };
  if (score >= 3) return { label: "High",     color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30", bar: "bg-orange-500", pct: 65 };
  if (score >= 1) return { label: "Moderate", color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/30", bar: "bg-yellow-400", pct: 35 };
  return           { label: "Low",      color: "text-green-500",  bg: "bg-green-500/10",  border: "border-green-500/30",  bar: "bg-green-500",  pct: 10 };
}

function formatTime(unixTs) {
  return new Date(unixTs * 1000).toLocaleTimeString("en-BD", {
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

function formatDay(unixTs) {
  return new Date(unixTs * 1000).toLocaleDateString("en-BD", {
    weekday: "short", month: "short", day: "numeric",
  });
}

// ── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, unit, sub, accent = "blue", warning }) {
  const accents = {
    blue:   "text-blue-400 bg-blue-400/10",
    cyan:   "text-cyan-400 bg-cyan-400/10",
    amber:  "text-amber-400 bg-amber-400/10",
    green:  "text-green-400 bg-green-400/10",
    purple: "text-purple-400 bg-purple-400/10",
    rose:   "text-rose-400 bg-rose-400/10",
  };
  return (
    <div className="flex flex-col gap-3 p-4 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="flex items-center justify-between">
        <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${accents[accent]}`}>
          <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
        </span>
        {warning && (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full">
            <AlertTriangle className="w-3 h-3" /> High
          </span>
        )}
      </div>
      <div>
        <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-bold text-white tabular-nums">
          {value}<span className="text-sm font-normal text-gray-400 ml-1">{unit}</span>
        </p>
        {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ── FORECAST CARD ────────────────────────────────────────────────────────────
function ForecastCard({ item, isFirst }) {
  const rain = item.rain?.["3h"] ?? 0;
  const risk = floodRiskLevel(rain, item.main.humidity, item.wind.speed);
  return (
    <div className={`flex flex-col items-center gap-2 px-4 py-3 rounded-2xl border transition-colors min-w-[88px] ${
      isFirst
        ? "bg-blue-500/10 border-blue-500/30"
        : "bg-gray-900 border-gray-800 hover:border-gray-700"
    }`}>
      <p className="text-[11px] text-gray-400 font-medium">{formatDay(item.dt)}</p>
      <p className="text-[10px] text-gray-500">{formatTime(item.dt)}</p>
      <img
        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
        alt={item.weather[0].description}
        className="w-10 h-10"
      />
      <p className="text-sm font-bold text-white">{Math.round(item.main.temp)}°C</p>
      <div className="flex items-center gap-1">
        <Droplets className="w-3 h-3 text-blue-400" />
        <span className="text-[11px] text-blue-400 font-medium">{rain.toFixed(1)}mm</span>
      </div>
      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${risk.bg} ${risk.color}`}>
        {risk.label}
      </span>
    </div>
  );
}

// ── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function WeatherPage() {
  const [current,     setCurrent]     = useState(MOCK_CURRENT);
  const [forecast,    setForecast]    = useState(MOCK_FORECAST);
  const [loading,     setLoading]     = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  function loadData() {
    setLoading(true);
    setTimeout(() => {
      setCurrent(MOCK_CURRENT);
      setForecast(MOCK_FORECAST);
      setLastUpdated(new Date());
      setLoading(false);
    }, 600);
  }

  useEffect(() => { setLastUpdated(new Date()); }, []);

  // ── derived ──
  const rain1h  = current?.rain?.["1h"] ?? 0;
  const risk    = current ? floodRiskLevel(rain1h, current.main.humidity, current.wind.speed) : null;

  // ── LOADING ──
  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
      <p className="text-gray-400 text-sm">Fetching Feni weather data…</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-8">

        {/* ── HEADER ── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold text-green-400 uppercase tracking-widest">Live</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Feni Weather</h1>
            <p className="text-gray-400 text-sm mt-1">Real-time flood risk monitoring · Feni, Bangladesh</p>
          </div>
          <button
            onClick={loadData}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-sm font-medium text-gray-300 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* ── HERO: current conditions ── */}
        <div className={`relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl border ${risk.border} ${risk.bg} overflow-hidden`}>
          {/* big temp */}
          <div className="flex items-center gap-5">
            <img
              src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
              alt={current.weather[0].description}
              className="w-20 h-20 drop-shadow-lg"
            />
            <div>
              <p className="text-6xl font-black tabular-nums">{Math.round(current.main.temp)}°</p>
              <p className="text-gray-400 capitalize mt-1">{current.weather[0].description}</p>
              <p className="text-gray-500 text-sm mt-0.5">
                Feels like {Math.round(current.main.feels_like)}°C
              </p>
            </div>
          </div>

          {/* divider */}
          <div className="hidden md:block w-px bg-gray-700/50 self-stretch" />

          {/* flood risk panel */}
          <div className="flex flex-col justify-center gap-3 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Flood Risk Index</p>
              <span className={`text-sm font-bold px-3 py-1 rounded-full border ${risk.border} ${risk.color} bg-transparent`}>
                {risk.label}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-gray-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${risk.bar}`}
                style={{ width: `${risk.pct}%` }}
              />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-blue-400" />
                Rain: {rain1h.toFixed(1)} mm/hr
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-500" />
                {lastUpdated?.toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>
        </div>

        {/* ── STAT GRID ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <StatCard
            icon={Thermometer}
            label="Feels Like"
            value={Math.round(current.main.feels_like)}
            unit="°C"
            sub={`Min ${Math.round(current.main.temp_min)}° · Max ${Math.round(current.main.temp_max)}°`}
            accent="rose"
          />
          <StatCard
            icon={Droplets}
            label="Humidity"
            value={current.main.humidity}
            unit="%"
            sub="Relative humidity"
            accent="blue"
            warning={current.main.humidity > 85}
          />
          <StatCard
            icon={CloudRain}
            label="Rainfall (1h)"
            value={rain1h.toFixed(1)}
            unit="mm"
            sub="Last hour accumulation"
            accent="cyan"
            warning={rain1h > 5}
          />
          <StatCard
            icon={Wind}
            label="Wind Speed"
            value={current.wind.speed.toFixed(1)}
            unit="m/s"
            sub={`Direction: ${current.wind.deg}°`}
            accent="green"
          />
          <StatCard
            icon={Gauge}
            label="Pressure"
            value={current.main.pressure}
            unit="hPa"
            sub="Atmospheric pressure"
            accent="purple"
          />
          <StatCard
            icon={Eye}
            label="Visibility"
            value={(current.visibility / 1000).toFixed(1)}
            unit="km"
            sub="Ground level visibility"
            accent="amber"
          />
        </div>

        {/* ── SUNRISE / SUNSET ── */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Sunrise", ts: current.sys.sunrise, emoji: "🌅" },
            { label: "Sunset",  ts: current.sys.sunset,  emoji: "🌇" },
          ].map(({ label, ts, emoji }) => (
            <div key={label} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-900 border border-gray-800">
              <span className="text-3xl">{emoji}</span>
              <div>
                <p className="text-[11px] text-gray-500 uppercase tracking-wider font-medium">{label}</p>
                <p className="text-lg font-bold text-white">{formatTime(ts)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── 24H FORECAST ── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">24-Hour Forecast</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
            {forecast.map((item, i) => (
              <ForecastCard key={item.dt} item={item} isFirst={i === 0} />
            ))}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <p className="text-center text-xs text-gray-600">
          Data from OpenWeatherMap · Updates every refresh · Flood risk is indicative only
        </p>

      </div>
    </div>
  );
}