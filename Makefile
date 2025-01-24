DOCKER_COMPOSE = docker compose
ENV = dev

run: vscode gitPull up

up:
	docker compose -f docker-compose.$(ENV).yml up -d

gitPull:
	git pull

vscode:
	code .

down:
	docker compose -f docker-compose.$(ENV).yml down
