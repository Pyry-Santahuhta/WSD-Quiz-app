import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";

import { getLoggedin } from "../tools/tools.js";

Deno.test("Tool function returns logged in status", () => {
  const user = {
    id: 1,
    admin: false,
  };
  const loggedin = getLoggedin(user);
  assertEquals(true, loggedin);
});
