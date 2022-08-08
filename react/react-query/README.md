Things to note
- [] Default hash function doesn't support BigInt, we're using stable-hash as an alternative
- [] Better define provider and query file structure
- [] Consider and alternative that provides config directly instead of wraping react-query
- [] Is there any benefit to automatically invalidating queries after mutation? Without being able to connect APIs with a relationship this might actually be a moot point. 
- [] Updating cached state feels clunky. This api needs some work.