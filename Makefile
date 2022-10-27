install:
	npm ci

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js

lint:
	npx eslint .

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npm test --coverageProvider=v8 -- --coverage 

json:
	gendiff __fixtures__/file1.json __fixtures__/file2.json 

yaml: 
	gendiff __fixtures__/file1.yaml __fixtures__/file2.yml

asciinema:
	asciinema rec