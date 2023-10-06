set -x

# you'll need https://github.com/Schniz/fnm

fnm exec --using=v20 node ./index.js
fnm exec --using=v18 node ./index.js
fnm exec --using=v16 node ./index.js
fnm exec --using=v14 node ./index.js
fnm exec --using=v12 node ./index.js

exit 0