# 🌤 WeatherApp Backend API

[![Frontend Repository](https://img.shields.io/badge/frontend-repo-blue.svg)](https://github.com/katozaaaa/weatherApp)
[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://katozaaaa.github.io/weatherApp/)

API server for weather application that caches requests to third-party services and provides unified data interface.

**Base URL**: `https://weatherapp.lookatmypets.ru/api/`

## 🛠 Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-20.11.1-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-404D59?logo=express)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white)

## 🌍 API Endpoints

### 1. IP Information
`GET /api/ip`
- Returns client IP address information
- Used for automatic location detection

### 2. Location Service
`GET /api/location`
- Parameters:
  - `ip` - Get coordinates by IP address (uses [ipapi.co](https://ipapi.co/))
  - `name` - Get coordinates by location name (uses [GeoNames](https://www.geonames.org/))

**Examples**:
```bash
# By IP
curl "https://weatherapp.lookatmypets.ru/api/location?ip=178.66.158.198"

# By location name
curl "https://weatherapp.lookatmypets.ru/api/location?name=Paris"
```

### 3. Weather Data
`GET /api/weather`
- Parameters:
  - lat - Latitude (required)
  - lon - Longitude (required)
- Returns current weather and forecast (uses [OpenWeatherMap](https://openweathermap.org/))

**Example**:
```bash
curl "https://weatherapp.lookatmypets.ru/api/weather?lat=59.9417&lon=30.3096"
```

## 🚀 Installation
**Prerequisites**
- Node.js v20.11.1
- Docker (optional)

### 1. Clone repository
```bash
git clone https://github.com/katozaaaa/weatherAppProxy.git
cd weatherAppProxy
```
### 2. Configure environment
Add the following variables to the .env file:

```env
LOCATION_BY_LOCATION_NAME_API_USERNAME=your_geonames_username
WEATHER_API_KEY=your_openweathermap_key
```
### 3. Install dependencies
```bash
npm install
```

## 🛠 Available Commands

| Command           | Description                     |
|-------------------|---------------------------------|
| `npm run start`   | Start production server         |
| `npm run lint`    | Run ESLint                      |
| `npm run lint:fix`| Auto-fix linting errors         |

## 🐳 Docker Launching
### Build image
```bash
docker build --network=host -t weather-app .
```
### Run container
```bash
docker run -p 3000:3000 --name weather-app weather-app 
```
