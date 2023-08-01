# See https://tech.davis-hansson.com/p/make/
SHELL := bash
.DELETE_ON_ERROR:
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := all
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules
MAKEFLAGS += --no-print-directory
CONNECT := @bufbuild/connect@latest
CONNECT_WEB := @bufbuild/connect-web@latest
CONNECT_NODE := @bufbuild/connect-node@latest
CONNECT_FASTIFY := @bufbuild/connect-fastify@latest
CONNECT_EXPRESS := @bufbuild/connect-express@latest
PROTOC_GEN_CONNECT_ES := @bufbuild/protoc-gen-connect-es@latest
PROTOBUF := @bufbuild/protobuf@latest
PROTOC_GEN_ES := @bufbuild/protoc-gen-es@latest
BUF := @bufbuild/buf@latest

# All project directories that use npm
NPM_PROJS = angular \
			astro \
			express \
			fastify \
			nextjs \
			plain \
			react/cra \
			react/esbuild \
			react/parcel \
			react/rollup \
			react/vite \
			react/webpack \
			react/webpack-cjs \
			react-native \
			svelte \
			vanilla-node \
			vue

# All project directories that use yarn
YARN_PROJS = react/yarn-pnp \
			 react/yarn-unplugged
# All project directories that use pnpm
PNPM_PROJS = remix

.PHONY: update
update:: ## Update all projects

.PHONY: test
test:: ## Test all projects

define updatenpmfunc
.PHONY: update$(notdir $(1))
update$(notdir $(1)):
	@echo $(1) ---------- ;\
	npm --prefix $(1) i -D $(CONNECT) $(CONNECT_WEB) $(PROTOC_GEN_CONNECT_ES) $(PROTOBUF) $(PROTOC_GEN_ES) $(BUF) ;\
	if [ "$(1)" == "fastify" ]; then \
	   npm --prefix $(1) i -D $(CONNECT_NODE) $(CONNECT_FASTIFY) ;\
	elif [ "$(1)" == "express" ]; then \
	   npm --prefix $(1) i -D $(CONNECT_NODE) $(CONNECT_EXPRESS) ;\
	elif [ "$(1)" == "vanilla-node" ]; then \
	   npm --prefix $(1) i -D $(CONNECT_NODE) ;\
	fi ;\
	npm --prefix $(1) run buf:generate || exit 1 ;\

update:: update$(notdir $(1))
endef

define testnpmfunc
.PHONY: test$(notdir $(1))
test$(notdir $(1)):
	@echo $(1) ---------- ;\
	npm --prefix $(1) install || exit 1 ;\
	npm --prefix $(1) run build || exit 1 ;\
	npm --prefix $(1) run buf:generate || exit 1 ;\
	npm --prefix $(1) run test || exit 1 ;\

test:: test$(notdir $(1))
endef

define updateyarnfunc
.PHONY: update$(notdir $(1))
update$(notdir $(1)):
	@echo $(1) ---------- ;\
	cd $(1);\
	yarn add $(CONNECT) $(CONNECT_WEB) $(PROTOC_GEN_CONNECT_ES) $(PROTOBUF) $(PROTOC_GEN_ES) $(BUF) ;\
	yarn run buf:generate || exit 1 ;\

update:: update$(notdir $(1))
endef

define testyarnfunc
.PHONY: test$(notdir $(1))
test$(notdir $(1)):
	@echo $(1) ---------- ;\
	cd $(1);\
	yarn run build || exit 1 ;\
	yarn run buf:generate || exit 1 ;\
	yarn run test || exit 1 ;\

test:: test$(notdir $(1))
endef

define updatepnpmfunc
.PHONY: update$(notdir $(1))
update$(notdir $(1)):
	@echo $(1) ---------- ;\
	pnpm --prefix $(1) i -D $(CONNECT) $(CONNECT_WEB) $(PROTOC_GEN_CONNECT_ES) $(PROTOBUF) $(PROTOC_GEN_ES) $(BUF) ;\
	pnpm --prefix $(1) run buf:generate || exit 1 ;\

update:: update$(notdir $(1))
endef

define testpnpmfunc
.PHONY: test$(notdir $(1))
test$(notdir $(1)):
	@echo $(1) ---------- ;\
	pnpm --prefix $(1) install || exit 1 ;\
	pnpm --prefix $(1) run build || exit 1 ;\
	pnpm --prefix $(1) run buf:generate || exit 1 ;\
	pnpm --prefix $(1) run test || exit 1 ;\

test:: test$(notdir $(1))
endef

$(foreach npmproj,$(sort $(NPM_PROJS)),$(eval $(call updatenpmfunc,$(npmproj))))
$(foreach npmproj,$(sort $(NPM_PROJS)),$(eval $(call testnpmfunc,$(npmproj))))
$(foreach yarnproj,$(sort $(YARN_PROJS)),$(eval $(call updateyarnfunc,$(yarnproj))))
$(foreach yarnproj,$(sort $(YARN_PROJS)),$(eval $(call testyarnfunc,$(yarnproj))))
$(foreach pnpmproj,$(sort $(PNPM_PROJS)),$(eval $(call updatepnpmfunc,$(pnpmproj))))
$(foreach pnpmproj,$(sort $(PNPM_PROJS)),$(eval $(call testpnpmfunc,$(pnpmproj))))

.PHONY: all
all: test
