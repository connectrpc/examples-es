#!/usr/bin/env bash

npm --prefix angular i @bufbuild/connect-web@latest @bufbuild/protoc-gen-connect-web@latest @bufbuild/protobuf@latest @bufbuild/protoc-gen-es@latest
npm --prefix angular run buf:generate

npm --prefix nextjs i @bufbuild/connect-web@latest @bufbuild/protoc-gen-connect-web@latest @bufbuild/protobuf@latest @bufbuild/protoc-gen-es@latest
npm --prefix nextjs run buf:generate

npm --prefix plain i @bufbuild/connect-web@latest @bufbuild/protoc-gen-connect-web@latest @bufbuild/protobuf@latest @bufbuild/protoc-gen-es@latest
npm --prefix plain run buf:generate

npm --prefix react/cra i -D @bufbuild/connect-web@latest @bufbuild/protoc-gen-connect-web@latest @bufbuild/protobuf@latest @bufbuild/protoc-gen-es@latest
npm --prefix react/cra run buf:generate

npm --prefix react/parcel i @bufbuild/connect-web@latest @bufbuild/protoc-gen-connect-web@latest @bufbuild/protobuf@latest @bufbuild/protoc-gen-es@latest
npm --prefix react/parcel run buf:generate

npm --prefix react/rollup i -D @bufbuild/connect-web@latest @bufbuild/protoc-gen-connect-web@latest @bufbuild/protobuf@latest @bufbuild/protoc-gen-es@latest
npm --prefix react/rollup run buf:generate

npm --prefix react/vite i -D @bufbuild/connect-web@latest @bufbuild/protoc-gen-connect-web@latest @bufbuild/protobuf@latest @bufbuild/protoc-gen-es@latest
npm --prefix react/vite run buf:generate

npm --prefix react/webpack i -D @bufbuild/connect-web@latest @bufbuild/protoc-gen-connect-web@latest @bufbuild/protobuf@latest @bufbuild/protoc-gen-es@latest
npm --prefix react/webpack run buf:generate

yarn --cwd react/yarn3 add @bufbuild/connect-web@latest @bufbuild/protoc-gen-connect-web@latest @bufbuild/protobuf@latest @bufbuild/protoc-gen-es@latest
yarn --cwd react/yarn3 run buf:generate

npm --prefix react/yarn3-unplugged i @bufbuild/connect-web@latest @bufbuild/protoc-gen-connect-web@latest @bufbuild/protobuf@latest @bufbuild/protoc-gen-es@latest
npm --prefix react/yarn3-unplugged run buf:generate

npm --prefix react-native i -D @bufbuild/connect-web@latest @bufbuild/protoc-gen-connect-web@latest @bufbuild/protobuf@latest @bufbuild/protoc-gen-es@latest
npm --prefix react-native run buf:generate

npm --prefix remix i -D @bufbuild/connect-web@latest @bufbuild/protoc-gen-connect-web@latest @bufbuild/protobuf@latest @bufbuild/protoc-gen-es@latest
npm --prefix remix run buf:generate

npm --prefix svelte i -D @bufbuild/connect-web@latest @bufbuild/protoc-gen-connect-web@latest @bufbuild/protobuf@latest @bufbuild/protoc-gen-es@latest
npm --prefix svelte run buf:generate

npm --prefix vue i -D @bufbuild/connect-web@latest @bufbuild/protoc-gen-connect-web@latest @bufbuild/protobuf@latest @bufbuild/protoc-gen-es@latest
npm --prefix vue run buf:generate
