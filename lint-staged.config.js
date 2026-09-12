export default {
  '**/*.{js,mjs}': ['eslint --fix', 'prettier --write'],
  '**/*.{json,scss,css,md}': ['prettier --write'],
  '**/*.{tf,tfvars}': ['terraform fmt'],
};
