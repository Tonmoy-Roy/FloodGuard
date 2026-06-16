const now = Math.floor(Date.now() / 1000);
const h = 3600;

const MOCK_FORECAST = [
    {
        dt: 1718553600,
        main: { temp: 28.5, humidity: 89 },
        weather: [{ description: "moderate rain", icon: "10d" }],
        wind: { speed: 13.5 },
        rain: { "3h": 12.3 }
    },
    {
        dt: 1718564400,
        main: { temp: 28.2, humidity: 91 },
        weather: [{ description: "moderate rain", icon: "10n" }],
        wind: { speed: 12.8 },
        rain: { "3h": 9.8 }
    },
    {
        dt: 1718575200,
        main: { temp: 27.1, humidity: 93 },
        weather: [{ description: "light rain", icon: "10n" }],
        wind: { speed: 11.5 },
        rain: { "3h": 6.5 }
    },
    {
        dt: 1718586000,
        main: { temp: 28.8, humidity: 87 },
        weather: [{ description: "moderate rain", icon: "10d" }],
        wind: { speed: 10.2 },
        rain: { "3h": 8.1 }
    },
    {
        dt: 1718596800,
        main: { temp: 30.4, humidity: 83 },
        weather: [{ description: "light rain", icon: "10d" }],
        wind: { speed: 9.8 },
        rain: { "3h": 4.2 }
    },
    {
        dt: 1718607600,
        main: { temp: 29.6, humidity: 86 },
        weather: [{ description: "moderate rain", icon: "10d" }],
        wind: { speed: 12.1 },
        rain: { "3h": 7.4 }
    },
    {
        dt: 1718618400,
        main: { temp: 27.9, humidity: 90 },
        weather: [{ description: "light rain", icon: "10n" }],
        wind: { speed: 8.5 },
        rain: { "3h": 3.8 }
    },
    {
        dt: 1718629200,
        main: { temp: 28.3, humidity: 88 },
        weather: [{ description: "moderate rain", icon: "10d" }],
        wind: { speed: 10.9 },
        rain: { "3h": 5.6 }
    },
    {
        dt: 1718640000,
        main: { temp: 27.5, humidity: 92 },
        weather: [{ description: "light rain", icon: "10n" }],
        wind: { speed: 7.2 },
        rain: { "3h": 2.9 }
    },
    {
        dt: 1718650800,
        main: { temp: 29.1, humidity: 85 },
        weather: [{ description: "moderate rain", icon: "10d" }],
        wind: { speed: 11.3 },
        rain: { "3h": 6.7 }
    }
];
export default MOCK_FORECAST;