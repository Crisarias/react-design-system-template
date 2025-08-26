provider=$1

# Updating style.provider.scss
cat /dev/null > ./src/scss/providers/style.provider.scss
echo "@import \"$provider/index.scss\";" >> ./src/scss/providers/style.provider.scss
cat /dev/null > ./src/scss/providers/style.provider.default.scss
echo "@import \"$provider/_customize.default.lightTheme.scss\";" >> ./src/scss/providers/style.provider.default.scss
echo "@import \"$provider/_customize.default.darkTheme.scss\";" >> ./src/scss/providers/style.provider.default.scss

