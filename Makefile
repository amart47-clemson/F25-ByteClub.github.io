SHELL := /bin/bash
NODE := node
NPM := npm

.PHONY: help install build preview dev clean

help:
	@echo "Targets:"
	@echo "  make install   - install exact dependencies"
	@echo "  make build     - production build to dist/"
	@echo "  make preview   - serve dist/ on http://localhost:4173"
	@echo "  make dev       - run dev server (hot reload)"
	@echo "  make clean     - remove node_modules and dist"

install:
	@$(NPM) ci || $(NPM) install

build:
	@$(NPM) run build

preview:
	@$(NPM) run preview

dev:
	@$(NPM) run dev

clean:
	rm -rf node_modules dist