.PHONY: all build-deps lint test try tag build release 

all: build

test: lint
	@echo "still need testing"

try: lint
	web-ext run -s formsave -a .

tag: lint
	test -z "$(git status --porcelain)"
	test -n "$TAG" || { echo -n 'tag: '; read TAG }
	sed -i 's/"version": "[^"]*"/"version": "'"$TAG"'"/' formsave/manifest.json
	git commit -am "Update version for release $TAG"
	git tag "$TAG"

build: lint
	test -z "$(git status --porcelain)"
	web-ext build -s formsave -a .

release: tag build
	web-ext sign -s formsave -a .
