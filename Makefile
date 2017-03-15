.PHONY: build-deps lint test build 

all: build

build-deps:
	@which eslint >/dev/null
	@which web-ext >/dev/null

lint: build-deps
	eslint --global browser .
	web-ext lint -s formsave

test: lint

build: test

release: build

