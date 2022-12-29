# See https://tech.davis-hansson.com/p/make/
SHELL := bash
.DELETE_ON_ERROR:
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := all
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules
MAKEFLAGS += --no-print-directory
# All project directories that use npm
NPM_PROJS = angular \
	   nextjs \
	   plain \
	   react/cra \
	   react/parcel \
	   react/rollup \
	   react/vite \
	   react/webpack \
	   react-native \
	   svelte \
	   vue
# All project directories that use yarn
YARN_PROJS = react/yarn3 \
			 react/yarn3-unplugged
# All project directories that use pnpm
PNPM_PROJS = remix

.PHONY: all
all: test

.PHONY: test
test:
	@for dirname in $(NPM_PROJS) ; do \
		npm --prefix $${dirname} run test || exit 1 ;\
	done
	@for dirname in $(YARN_PROJS) ; do \
		yarn --cwd $${dirname} test || exit 1 ;\
	done
	@for dirname in $(PNPM_PROJS) ; do \
		pnpm --prefix $${dirname} run test || exit 1 ;\
	done	

.PHONY: build
build:
	@for dirname in $(NPM_PROJS) ; do \
		npm --prefix $${dirname} run build; \
	done
	@for dirname in $(YARN_PROJS) ; do \
		cd $${dirname}; \
		yarn --cwd $${dirname} build; \
	done
	@for dirname in $(PNPM_PROJS) ; do \
		pnpm --prefix $${dirname} run build; \
	done	
