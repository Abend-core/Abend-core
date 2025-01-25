ENV = dev

run: vscode gitPull up
reset: down up

up:
	docker compose -f docker-compose.$(ENV).yml up -d

gitPull:
	git pull

vscode:
	code .

down:
	docker compose -f docker-compose.$(ENV).yml down

 
