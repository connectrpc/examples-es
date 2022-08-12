Things to note
- [] Default hash function doesn't support BigInt, we're using stable-hash as an alternative.
- [x] Better define provider and query file structure. Split out code that requires react-query as an import
- [x] Consider and alternative that provides config directly instead of wraping react-query
- [] Is there any benefit to automatically invalidating queries after mutation? Without being able to connect APIs with a relationship this might actually be a moot point. 
- [] Updating cached state feels clunky. This api needs some work.
- [] Since we are now storing class objects in the cache in order to preserve advanced protobuf functionality, we'll need some examples of a persister