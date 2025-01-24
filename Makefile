DOCKER_COMPOSE = docker compose

deploy:	vscode gitP
	$(DOCKER_COMPOSE) up -d
gitP:
	git pull

vscode:
	code .
