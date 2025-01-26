ENV = dev
option = -d

rund: vscode gitPull up
run: vscode gitPull 
	$(MAKE) up option=

reset: down up

up:
	docker compose -f docker-compose.$(ENV).yml up $(option)

gitPull:
	git pull

vscode:
	code .

down:
	docker compose -f docker-compose.$(ENV).yml down
