# Backend

Go backend server for the Eetmad application.

## Development

### Prerequisites
- Go 1.21 or higher
- Docker and Docker Compose (for containerized development)

### Local Development

Run the server:
```bash
go run main.go
```

The server will start on port 3000 (or the port specified in the `PORT` environment variable).

### Docker Development

Build and run with Docker Compose:
```bash
docker-compose up backend
```

The backend service uses Air for hot reloading during development.

## API Endpoints

### Health Check
- `GET /health` - Returns server health status

## Environment Variables

- `PORT` - Server port (default: 3000)
