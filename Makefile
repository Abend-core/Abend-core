DOCKER_COMPOSE = docker compose
ENV = Prod

deploy:	vscode gitP
	docker compose up -d
gitP:
	git pull

vscode:
	code .
