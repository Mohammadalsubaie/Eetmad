include .env 2>/dev/null || true

.PHONY: env dev up down logs ps clean

env:
	@[ -f .env ] || (cp env.example .env && echo "Created .env from env.example")

dev: env
	docker compose up --build

up: env
	docker compose up -d --build

down:
	docker compose down

logs:
	docker compose logs -f --tail=100

ps:
	docker compose ps

clean:
	docker compose down -v
	rm -rf backend/node_modules


