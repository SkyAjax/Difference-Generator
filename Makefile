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

stylish:
	gendiff -f stylish __fixtures__/file1.json __fixtures__/file2.json 

plain: 
	gendiff -f plain __fixtures__/file1.yaml __fixtures__/file2.yml

json: 
	gendiff -f json __fixtures__/file1.yaml __fixtures__/file2.yml

asciinema:
	asciinema rec