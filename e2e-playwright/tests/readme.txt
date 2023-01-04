To run the end to end playwright tests, you need to run the following commands:
- docker-compose rm -sf #Important, as the database needs to be fresh for the tests to work
- docker-compose run --entrypoint=npx e2e-playwright playwright test

There is one more test in the path /drill-and-practice/tests