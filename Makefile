.PHONY: build-deps lint test build 

all: build

build-deps:
	@which standard >/dev/null
	@which web-ext >/dev/null

lint: build-deps
	standard --global browser
	web-ext lint -s formsave

test: lint

build: test

release: build

