# Equities Trade Blotter

A full-stack equities trade blotter built to demonstrate front-office tooling development. Designed around real trading desk requirements — instrument entry, side, quantity, price, trader attribution, and timestamped trade history.


**Live demo:** [app.yumaya.live](https://app.yumaya.live)

---

## Stack

| Layer | Technology |
|---|---|
| Backend API | Java 21, Spring Boot, Spring Data JPA |
| Database | PostgreSQL 16 |
| Frontend | React |
| Containerisation | Docker, Docker Compose |
| Cloud | AWS EC2 (t2.micro), Nginx reverse proxy |
| SSL | Let's Encrypt (via Certbot) |
| Frontend hosting | Vercel |

---

## Architecture

```
Browser (React / Vercel)
        │
        │ HTTPS
        ▼
Nginx (blotter.yumaya.live:443)
        │
        │ HTTP
        ▼
Spring Boot API (:8080)
        │
        │ JDBC
        ▼
PostgreSQL (:5432)
```

Both Spring Boot and PostgreSQL run as Docker containers on a single AWS EC2 instance, managed via Docker Compose.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/trades` | Submit a new trade |
| GET | `/api/trades` | Get all trades |
| GET | `/api/trades/trader/{trader}` | Get trades by trader |
| GET | `/api/trades/instrument/{instrument}` | Get trades by instrument |

### Example Request

```bash
curl -X POST https://blotter.yumaya.live/api/trades \
  -H "Content-Type: application/json" \
  -d '{
    "instrument": "6758.T",
    "side": "BUY",
    "quantity": 1000,
    "price": 3473.00,
    "trader": "glt"
  }'
```

### Example Response

```json
{
  "id": 1,
  "instrument": "6758.T",
  "side": "BUY",
  "quantity": 1000,
  "price": 3473.00,
  "trader": "glt",
  "timestamp": "2026-03-03T01:17:03.485075"
}
```

---

## Running Locally

### Prerequisites
- Java 21
- Maven 3.9+
- Docker + Docker Compose

### Start the full stack

```bash
git clone https://github.com/glt-builds/trade-blotter.git
cd trade-blotter
./mvnw clean package -DskipTests
docker compose up --build
```

API available at `http://localhost:8080/api/trades`

### Start the frontend

```bash
cd frontend
npm install
npm start
```

Frontend available at `http://localhost:3000`

---

## Project Background

Built as a practical demonstration of full-stack Java development applied to an equities trading context. The instrument codes, trade structure, and workflow are modelled on real front-office blotter requirements.

TSE tickers used in testing: `7203.T` (Toyota), `6758.T` (Sony)