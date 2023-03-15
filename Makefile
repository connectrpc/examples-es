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
	   vue
# All project directories that use yarn
YARN_PROJS = react/yarn-pnp \
			 react/yarn-unplugged
# All project directories that use pnpm
PNPM_PROJS = remix

.PHONY: update
update:: updatenode ## Update all projects
	
.PHONY: test
test:: testnode ## Test all projects

define updatenpmfunc
.PHONY: update$(notdir $(1))
update$(notdir $(1)):
	@echo $(1) ---------- ;\
	npm --prefix $(1) i -D $(CONNECT_WEB) $(PROTOC_GEN_CONNECT_ES) $(PROTOBUF) $(PROTOC_GEN_ES) $(BUF) ;\
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
	yarn --cwd $(1) add $(CONNECT_WEB) $(PROTOC_GEN_CONNECT_ES) $(PROTOBUF) $(PROTOC_GEN_ES) $(BUF) ;\
	yarn --cwd $(1) buf:generate || exit 1 ;\

update:: update$(notdir $(1))
endef

define testyarnfunc
.PHONY: test$(notdir $(1))
test$(notdir $(1)):
	@echo $(1) ---------- ;\
	yarn --cwd $(1) install || exit 1 ;\
	yarn --cwd $(1) build || exit 1 ;\
	yarn --cwd $(1) buf:generate || exit 1 ;\
	yarn --cwd $(1) test || exit 1 ;\

test:: test$(notdir $(1))
endef

define updatepnpmfunc
.PHONY: update$(notdir $(1))
update$(notdir $(1)):
	@echo $(1) ---------- ;\
	pnpm --prefix $(1) i -D $(CONNECT_WEB) $(PROTOC_GEN_CONNECT_ES) $(PROTOBUF) $(PROTOC_GEN_ES) $(BUF) ;\
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

.PHONY: updatenode
updatenode: 
	npm --prefix node.js i $(CONNECT_NODE) $(CONNECT_WEB) $(CONNECT) $(PROTOC_GEN_CONNECT_ES) $(PROTOBUF) $(PROTOC_GEN_ES) $(BUF) ;\
	npm --prefix node.js/vanilla i $(CONNECT_NODE) ;\
	npm --prefix node.js/fastify i $(CONNECT_NODE) $(CONNECT_FASTIFY) ;\
	npm --prefix node.js/express i $(CONNECT_NODE) $(CONNECT_EXPRESS) ;\
	npm --prefix node.js run buf:generate || exit 1 ;\

.PHONY: testnode
testnode:
	npm --prefix node.js install || exit 1 ;\
	npm --prefix node.js/fastify install || exit 1 ;\
	npm --prefix node.js/vanilla install || exit 1 ;\
	npm --prefix node.js run build || exit 1 ;\
	npm --prefix node.js run buf:generate || exit 1 ;\
	npm --prefix node.js run test || exit 1 ;\
