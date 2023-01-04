const { test, expect } = require("@playwright/test");

test("Main page has title and headings.", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Quizbro!");
  await expect(page.locator("h1")).toHaveText(
    "Quizbro",
  );
});

test("Login page is accessible", async ({ page }) => {
  const response = await page.goto("/auth/login");
  await expect(page.locator("h1")).toHaveText(
    "Login",
  );
});

test("Registeration page is accessible", async ({ page }) => {
  const response = await page.goto("/auth/register");
  await expect(page.locator("h1")).toHaveText(
    "Register",
  );
});

test("Can create an account and login.", async ({ page }) => {
  await page.goto("/auth/register");
  await page.locator("input[type=email]").type("test@email.com");
  await page.locator("input[type=password]").type("12345678");
  await page.locator("input[type=submit]").click();
  await page.goto("/auth/login");
  await page.locator("input[type=email]").type("test@email.com");
  await page.locator("input[type=password]").type("12345678");
  await page.locator("input[type=submit]").click();
  await expect(page.locator("h1")).toHaveText(
    "Quiz Topics",
  );
});

test("Can delete a topic.", async ({ page }) => {
  await page.goto("/auth/login");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();

  await page.locator("input[type=text]").type("Test topic");
  await page.locator("id=delete").click();
  await page.goto("/topics/1");
  await expect(page.locator("h1")).toHaveText(
    "No such topic",
  );
});

test("Topics page shows that there are no topics", async ({ page }) => {
  await page.goto("/auth/login");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await expect(page.locator("p")).toHaveText(
    "No topics yet",
  );
});

test("Logout works", async ({ page }) => {
  await page.goto("/auth/login");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await page.locator("id=logout").click();
  await page.goto("/quiz");

  await expect(page.locator("h1")).toHaveText(
    "Login",
  );
});

test("Can create a topic.", async ({ page }) => {
  await page.goto("/auth/login");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();

  await page.locator("input[type=text]").type("Test topic");
  await page.locator("id=add").click();
  await page.goto("/topics/2");
  await expect(page.locator("h1")).toHaveText(
    "Test topic",
  );
});

test("Can create a question and it shows up in the quiz.", async ({ page }) => {
  await page.goto("/auth/login");
  await page.locator("input[type=email]").type("admin@admin.com");
  await page.locator("input[type=password]").type("123456");
  await page.locator("input[type=submit]").click();
  await page.goto("/topics/2");

  await page.locator("input[type=text]").type("Test question");
  await page.locator("id=add").click();
  await page.goto("/quiz/2");
  await expect(page.locator("h1")).toHaveText(
    "Test question",
  );
});
