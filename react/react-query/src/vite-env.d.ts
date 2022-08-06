/// <reference types="vite/client" />

declare module "stable-hash" {
    export default function stableHash(str: any): string;
}