# Local Development Setup

## 1) Environment variables

Copy `env.example` to `.env`:

```
cp env.example .env
```

## 2) Start the stack

Using Make (recommended):

```
make up
```

Or directly:

```
docker compose up -d --build
```

Services:

-   Postgres 15 on $POSTGRES_PORT
-   Redis 7 on $REDIS_PORT
-   Backend on $BACKEND_PORT
-   Nginx on $NGINX_PORT

## 3) Verify

-   Health: http://localhost:$NGINX_PORT/health
-   API via proxy: http://localhost:$NGINX_PORT/api/health

## 4) Stop / Clean

```
make down   # stop
make clean  # stop + remove volumes
```

Hot reload is enabled for the backend via nodemon.
