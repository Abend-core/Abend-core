DOCKER_COMPOSE = docker compose
ENV = prod

deploy:	vscode gitP
	docker compose up -d
gitP:
	git pull

vscode:
	code .
