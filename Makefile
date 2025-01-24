DOCKER_COMPOSE = docker compose
ENV = dev

run: vscode gitP deploy

deploy:
	docker compose -f docker-compose.$(ENV).yml up -d

gitP:
	git pull

vscode:
	code .
