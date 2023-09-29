set -x

#npm ci

# you'll need https://github.com/Schniz/fnm

fnm exec --using=v20 node consumer/index.js
fnm exec --using=v18 node consumer/index.js
fnm exec --using=v16 node consumer/index.js
fnm exec --using=v14 node consumer/index.js
fnm exec --using=v12 node consumer/index.js
