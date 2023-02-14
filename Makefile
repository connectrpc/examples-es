# See https://tech.davis-hansson.com/p/make/
SHELL := bash
.DELETE_ON_ERROR:
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := all
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules
MAKEFLAGS += --no-print-directory
CONNECT_WEB := @bufbuild/connect-web@latest
PROTOC_GEN_CONNECT_WEB := @bufbuild/protoc-gen-connect-web@latest
PROTOBUF := @bufbuild/protobuf@latest
PROTOC_GEN_ES := @bufbuild/protoc-gen-es@latest

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
	   vue \
	   astro

# All project directories that use yarn
YARN_PROJS = react/yarn3 \
			 react/yarn3-unplugged
# All project directories that use pnpm
PNPM_PROJS = remix

.PHONY: update
update:: ## Update all projects

define updatenpmfunc
.PHONY: update$(notdir $(1))
update$(notdir $(1)):
	@echo $(1) ---------- ;\
	npm --prefix $(1) i -D $(CONNECT_WEB) $(PROTOC_GEN_CONNECT_WEB) $(PROTOBUF) $(PROTOC_GEN_ES) ;\
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
	yarn --cwd $(1) add $(CONNECT_WEB) $(PROTOC_GEN_CONNECT_WEB) $(PROTOBUF) $(PROTOC_GEN_ES) ;\
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
	pnpm --prefix $(1) i -D $(CONNECT_WEB) $(PROTOC_GEN_CONNECT_WEB) $(PROTOBUF) $(PROTOC_GEN_ES) ;\
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
