fileMode: ##@Configuration Sets git fileMode to false
	@echo "Configuring git fileMode to false"
	git config core.fileMode false

files: ##@Copy files and set permissions
	sudo cp .env.example .env
	sudo cp docker-compose.example.yml docker-compose.yml
	sudo chmod 777 -R *

install: ##Install dependencies
	@echo "Installing dependencies"
	docker-compose up -d
	docker exec -it node-customers-api bash -c "npm install"

up: ##Up containers
	docker-compose up -d

start: ##Start server
	docker exec -it node-customers-api bash -c "npm start"
	
