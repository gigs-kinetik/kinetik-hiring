// This file abstracts out the API calling mechanism. Nothing in here should be used to access server resources from
// outside this wrapper. If you are editing this file or calling anything from this file without the explicit purpose
// of adding functionality to the wrapper, you are doing something wrong.

import { Json, Operation, Table } from "./basicTypes";
import { SERVER_URL } from "./config";
import { getDeviceId, getAccessCode, setAccessCode } from "./device";

/**
 * The most basic calling function, creates fetch request with auto populated json body with device ids and access codes
 * @param method
 * @param table
 * @param operation
 * @param data
 * @returns
 */
async function call(
  method: string,
  table: Table,
  operation: Operation,
  data: Json
): Promise<[Response, any]> {
  data["machine_id"] = getDeviceId();
  const code = getAccessCode();
  if (code) data["access_code"] = code;

  let response = await fetch(`${SERVER_URL}/${table}/${operation}`, {
    method: method,
    body: JSON.stringify(data),
  });

  let json: any = {};
  try {
    json = await response.json();
    if (json.access_code) setAccessCode(json.access_code);
  } catch (e) {}
  return [response, json];
}

/**
 * Typing out the route for each call without intellisense was a pain, so this is the first layer of abstraction to allow
 * for intellisense
 * @param table
 * @returns
 */
function intermediate(table: Table) {
  return {
    put: async (operation: Operation, data: Json): Promise<[Response, any]> =>
      await call("PUT", table, operation, data),
    post: async (operation: Operation, data: Json): Promise<[Response, any]> =>
      await call("POST", table, operation, data),
    delete: async (
      operation: Operation,
      data: Json
    ): Promise<[Response, any]> => await call("DELETE", table, operation, data),
  };
}

/**
 * Specializations of the abstraction above, intellisense for methods and such is complete with this
 * This is the abstraction layer used in the functionlity in the server.ts file
 */
export const [CompanyServer, UserServer, EventServer, ChatServer] = [
  intermediate("companies"),
  intermediate("users"),
  intermediate("events"),
  intermediate("chat"),
];
