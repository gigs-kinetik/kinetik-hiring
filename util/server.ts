import { lockfilePatchPromise } from "next/dist/build/swc";
import { getAccessCode, getDeviceId, setAccessCode } from "./device";
import { useRouter, redirect, RedirectType, useParams } from "next/navigation";

// for dev
// const PORT = 8080;
// const SERVER_URL = `http://localhost:${PORT}`;

// for prod
const SERVER_URL = `https://kinetikgigs.azurewebsites.net`;

export type Json = {
  [key: string]:
    | boolean
    | string
    | number
    | Json
    | (boolean | string | number | Json)[];
};

export type Gender = "male" | "female" | "other" | "undefined";

type Table = "companies" | "users" | "events";
type Operation =
  | "register"
  | "login"
  | "machine-access"
  | "events"
  | "submissions"
  | "signout"
  | "companies"
  | "users"
  | "get"
  | "get-submissions"
  | "verify"
  | "reset-password";

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

const [cinter, uinter, einter] = [
  intermediate("companies"),
  intermediate("users"),
  intermediate("events"),
];

class BasicCompany {
  access_code: string;
  email: string;
  id: number;
  name: string;
  first_name: string;
  last_name: string;
}

export class CompanyInstance {
  private _access_code: string;
  private _email: string;
  private _id: number;
  private _name: string;
  private _first_name: string;
  private _last_name: string;

  constructor(company: BasicCompany) {
    this._access_code = company.access_code;
    this._email = company.email;
    this._id = company.id;
    this._name = company.name;
    this._first_name = company.first_name;
    this._last_name = company.last_name;
  }

  get accessCode() {
    return this._access_code;
  }
  get email() {
    return this._email;
  }
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get firstName() {
    return this._first_name;
  }
  get lastName() {
    return this._last_name;
  }

  /**
   * Returns list of events the company has created, null if failed request
   * @param companyId
   * @returns
   */
  public async getEvents(): Promise<BasicEvent[] | null> {
    const [res, json] = await cinter.put("events", { id: this.id });
    if (res.status !== 200) return null;
    return json as BasicEvent[];
  }

  public async getEvent(event_id: number): Promise<BasicEvent | null> {
    const [res, json] = await cinter.put("events", { id: this.id, event_id });
    if (res.status !== 200) return null;
    return json as BasicEvent;
  }

  public async deleteEvent(event: number | BasicEvent) {
    if (typeof event === "number") {
      const [res, json] = await cinter.delete("events", {
        id: this.id,
        event_id: event,
      });
      if (res.status !== 200) return null;
      return json as BasicEvent;
    }

    const [res, json] = await cinter.delete("events", {
      id: this.id,
      event_id: event.event_id,
    });
    if (res.status !== 200) return null;
    return json as BasicEvent;
  }

  /**
   * Adds an event to a company, returns the event added, null on request fail
   * @param companyId
   * @param param1
   * @returns
   */
  public async addEvent({
    event_name,
    start_time,
    end_time,
    short_description,
    long_description,
    prize,
    prize_list,
    report_url,
    required_skills,
    payment_status,
  }: {
    event_name: string;
    start_time?: Date;
    end_time?: Date;
    short_description: string;
    long_description: string;
    prize: number;
    prize_list?: number[];
    report_url?: string;
    required_skills?: string[];
    payment_status?: number;
  }): Promise<BasicEvent | null> {
    const [res, json] = await cinter.post("events", {
      id: this.id,
      event_name,
      ...(start_time && { start_time: start_time.toUTCString() }),
      ...(end_time && { end_time: end_time.toUTCString() }),
      ...(required_skills && { required_skills: required_skills }),
      ...(prize_list && { prize_list: prize_list }),
      ...(report_url && { report_url: report_url }),
      ...(payment_status && { payment_status: payment_status }),
      short_description,
      long_description,
      prize,
    });
    if (res.status !== 200) return null;
    return json as BasicEvent;
  }

  /**
   * Update an existing event and return the event after updating, null on request fail
   * @param companyId
   * @param options
   * @returns
   */
  public async updateEvent(options: {
    event_id: number;
    event_name?: string;
    start_time?: Date;
    end_time?: Date;
    short_description?: string;
    long_description?: string;
    prize?: number;
    prize_list?: number[];
    report_url?: string;
    required_skills?: string[];
    payment_status: number;
  }): Promise<BasicEvent | null> {
    let data: Json = {};
    for (const option in options)
      if (options[option]) data[option] = options[option];
    const [res, json] = await cinter.post("events", {
      id: this.id,
      ...data,
    });
    if (res.status !== 200) return null;
    return json as BasicEvent;
  }

  /**
   * Get all submissions for an event, null on request fail
   * @param companyId
   * @returns
   */
  public async getSubmissions(
    eventId: number
  ): Promise<BasicSubmission[] | null> {
    const [res, json] = await cinter.put("submissions", {
      id: this.id,
      event_id: eventId,
    });
    if (res.status !== 200) return null;
    return json as BasicSubmission[];
  }

  /**
   * Delete a submission given the submission id, return the deleted submission, null on request fail
   * @param companyId
   * @param submissionId
   * @returns
   */
  public async deleteSubmission(
    submissionId: number
  ): Promise<BasicSubmission | null> {
    const [res, json] = await cinter.delete("submissions", {
      id: this.id,
      submission_id: submissionId,
    });
    if (res.status !== 200) return null;
    return json as BasicSubmission;
  }

  public async update(data: {
    email?: string;
    company_name?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    verified?: boolean;
  }): Promise<CompanyInstance | null> {
    const obj = {};
    for (const key in data) if (data[key]) obj[key] = data[key];
    const [res, json] = await cinter.post("companies", {
      id: this.id,
      ...obj,
    });

    if (res.status !== 200) return null;

    const company = json as BasicCompany;
    this._access_code = company.access_code;
    this._email = company.email;
    this._id = company.id;
    this._name = company.name;
    this._first_name = company.first_name;
    this._last_name = company.last_name;
    return this;
  }
}

type BasicUser = {
  access_code: string;
  email: string;
  first_name: string;
  last_name: string;
  id: number;
  age: number;
  gender: Gender;
  country_of_citizenship: string;
  location: string;
  skills: string[];
  num_events: number;
};

export class UserInstance {
  private _access_code: string;
  private _email: string;
  private _first_name: string;
  private _last_name: string;
  private _id: number;
  private _age: number;
  private _gender: Gender;
  private _country_of_citizenship: string;
  private _location: string;
  private _skills: string[];
  private _num_events: number;

  constructor(user: BasicUser) {
    this._access_code = user.access_code;
    this._email = user.email;
    this._first_name = user.first_name;
    this._last_name = user.last_name;
    this._id = user.id;
    this._age = user.age;
    this._gender = user.gender;
    this._country_of_citizenship = user.country_of_citizenship;
    this._location = user.location;
    this._skills = user.skills;
    this._num_events = user.num_events;
  }

  get accessCode() {
    return this._access_code;
  }
  get email() {
    return this._email;
  }
  get id() {
    return this._id;
  }
  get firstName() {
    return this._first_name;
  }
  get lastName() {
    return this._last_name;
  }
  get age() {
    return this._age;
  }
  get gender() {
    return this._gender;
  }
  get countryOfCitizenship() {
    return this._country_of_citizenship;
  }
  get location() {
    return this._location;
  }
  get skills() {
    return this._skills;
  }
  get numEvents() {
    return this._num_events;
  }

  /**
   * Query events based on a set of search parameters, null on request fail
   * @param userId
   * @param options
   * @returns
   */
  public async queryEvents(options: {
    event_name?: string;
    general_search?: string;
    start_time?: Date;
    end_time?: Date;
    short_description?: string;
    long_description?: string;
    prize_lower?: number;
    prize_upper?: number;
    submissions_lower?: number;
    submissions_upper?: number;
  }): Promise<BasicEvent[] | null> {
    let data: Json = {};
    for (const option in options)
      if (options[option]) data[option] = options[option];
    const [res, json] = await uinter.post("events", {
      id: this.id,
      ...data,
    });
    if (res.status !== 200) return null;
    return json as BasicEvent[];
  }

  /**
   * Get submissions a user made, null on request fail
   * @param userId
   * @returns
   */
  public async getSubmissions(): Promise<BasicSubmission[] | null> {
    const [res, json] = await uinter.put("submissions", { id: this.id });
    if (res.status !== 200) return null;
    return json as BasicSubmission[];
  }

  public async getSubmissionEvents(): Promise<BasicEvent[] | null> {
    const [res, json] = await einter.put("get-submissions", { id: this.id });
    if (res.status !== 200) return null;
    return json as BasicEvent[];
  }

  /**
   * Create a submission for an event, null on request fail
   * @param userId
   * @param options
   * @returns
   */
  public async createSubmission(options: {
    event_id: number;
    project_name: string;
    project_description: string;
    project_link: string;
    project_video_link?: string;
    resume_link?: string;
    additional_links?: string[];
  }): Promise<BasicSubmission | null> {
    let data: Json = {};
    for (const option in options)
      if (options[option]) data[option] = options[option];
    const [res, json] = await uinter.post("events", {
      id: this.id,
      ...data,
    });
    if (res.status !== 200) return null;
    return json as BasicSubmission;
  }

  /**
   * Update a submission, null on request fail
   * @param userId
   * @param options
   * @returns
   */
  public async updateSubmission(options: {
    submission_id: number;
    project_name?: string;
    project_description?: string;
    project_link?: string;
    project_video_link?: string;
    resume_link?: string;
    additional_links?: string;
  }): Promise<BasicSubmission | null> {
    let data = {};
    for (const option in options)
      if (options[option]) data[option] = options[option];
    const [res, json] = await uinter.post("submissions", {
      id: this.id,
      ...data,
    });
    if (res.status !== 200) return null;
    return json as BasicSubmission;
  }

  public async update(data: {
    email?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    verified?: boolean;
    age?: number;
    gender?: Gender;
    country_of_citizenship?: string;
    location?: string;
    skills?: string[];
    num_events?: number;
  }): Promise<UserInstance | null> {
    const obj = {};
    for (const key in data) if (data[key]) obj[key] = data[key];
    const [res, json] = await uinter.post("users", {
      id: this.id,
      ...obj,
    });

    if (res.status !== 200) return null;

    const user = json as BasicUser;
    this._access_code = user.access_code;
    this._email = user.email;
    this._id = user.id;
    this._first_name = user.first_name;
    this._last_name = user.last_name;
    return this;
  }
}

export type BasicEvent = {
  company_id: 11;
  created_at: Date;
  start_time: Date;
  end_time: Date | null;
  event_id: number;
  event_name: string;
  short_description: string;
  long_description: string;
  payment_status: 0 | 1 | 2 | 3 | 4; // 0 = none, 1 = pending, 2 = init, 3 = pending, 4 = final
  prize: number;
  submissions: number;
  prize_list: number[];
  required_skills: string[];
  report_url: string;
};

export type BasicSubmission = {
  additional_links: { [key: string]: string } | null;
  event_id: number;
  project_description: string;
  project_link: string;
  project_name: string;
  project_video_link: string | null;
  resume_link: string | null;
  submission_id: number;
  submission_time: Date;
  user_id: number;
};

export class Company {
  /**
   * Create a new company, returns the company on success, null otherwise
   * @param name
   * @param email
   * @param password
   * @returns
   */
  public static async register(
    name: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ): Promise<CompanyInstance | null> {
    localStorage.clear();
    const [res, json] = await cinter.post("register", {
      name,
      first_name,
      last_name,
      email,
      password,
    });
    if (res.status !== 200) return null;
    return new CompanyInstance(json);
  }

  public static async getById(
    companyId: number
  ): Promise<CompanyInstance | null> {
    const [res, json] = await cinter.put("companies", { id: companyId });
    if (res.status !== 200) return null;
    return new CompanyInstance(json);
  }

  /**
   * Never call, only for use on authentication pages
   * @param email
   * @param password
   * @returns
   */
  public static async login(
    email: string,
    password: string
  ): Promise<CompanyInstance | null> {
    localStorage.clear();
    const [res, json] = await cinter.put("login", { email, password });
    if (res.status !== 200) return null;
    return new CompanyInstance(json);
  }

  /**
   * Never call unless under special circumstances. For any normal use case, use the get() function to include
   * redirects to the login page if the tokens have expired
   * @returns
   */
  private static async accessCompany(): Promise<CompanyInstance | null> {
    const [res, json] = await cinter.put("login", {});
    if (res.status !== 200) return null;
    return new CompanyInstance(json);
  }

  /**
   * Returns list of events the company has created, null if failed request
   * @param companyId
   * @returns
   */
  public static async getEvents(
    companyId: number
  ): Promise<BasicEvent[] | null> {
    const [res, json] = await cinter.put("events", { id: companyId });
    if (res.status !== 200) return null;
    return json as BasicEvent[];
  }

  /**
   * Adds an event to a company, returns the event added, null on request fail
   * @param companyId
   * @param param1
   * @returns
   */
  public static async addEvent(
    companyId: number,
    {
      event_name,
      start_time,
      end_time,
      short_description,
      long_description,
      prize,
    }: {
      event_name: string;
      start_time?: Date;
      end_time?: Date;
      short_description: string;
      long_description: string;
      prize: number;
    }
  ): Promise<BasicEvent | null> {
    const [res, json] = await cinter.post("events", {
      id: companyId,
      event_name,
      ...(start_time && { start_time: start_time.toUTCString() }),
      ...(end_time && { end_time: end_time.toUTCString() }),
      short_description,
      long_description,
      prize,
    });
    if (res.status !== 200) return null;
    return json as BasicEvent;
  }

  /**
   * Update an existing event and return the event after updating, null on request fail
   * @param companyId
   * @param options
   * @returns
   */
  public static async updateEvent(
    companyId: number,
    options: {
      event_id: number;
      event_name?: string;
      start_time?: Date;
      end_time?: Date;
      short_description?: string;
      long_description?: string;
      prize?: number;
    }
  ): Promise<BasicEvent | null> {
    let data: Json = {};
    for (const option in options)
      if (options[option]) data[option] = options[option];
    const [res, json] = await cinter.post("events", {
      id: companyId,
      ...data,
    });
    if (res.status !== 200) return null;
    return json as BasicEvent;
  }

  /**
   * Get all submissions for an event, null on request fail
   * @param companyId
   * @returns
   */
  public static async getSubmissions(
    companyId: number,
    eventId: number
  ): Promise<BasicSubmission[] | null> {
    const [res, json] = await cinter.put("submissions", {
      id: companyId,
      event_id: eventId,
    });
    if (res.status !== 200) return null;
    return json as BasicSubmission[];
  }

  /**
   * Delete a submission given the submission id, return the deleted submission, null on request fail
   * @param companyId
   * @param submissionId
   * @returns
   */
  public static async deleteSubmission(
    companyId: number,
    submissionId: number
  ): Promise<BasicSubmission | null> {
    const [res, json] = await cinter.delete("submissions", {
      id: companyId,
      submission_id: submissionId,
    });
    if (res.status !== 200) return null;
    return json as BasicSubmission;
  }

  /**
   * Signs out of this device, true for success and false for fail
   * @returns
   */
  public static async signoutFromDevice() {
    return (await cinter.put("signout", {}))[0].status === 200;
  }

  /**
   * DO NOT CALL THIS FUNCTION!!!!!
   * @returns
   */
  public static async get(): Promise<CompanyInstance | null> {
    return await this.accessCompany();
  }

  public static async verify(
    companyId: number,
    emailAddr: string
  ): Promise<boolean> {
    return (
      (await cinter.put("verify", { id: companyId, email: emailAddr }))[0]
        .status === 200
    );
  }

  public static async resetPassword(
    companyId: number,
    emailAddr: string
  ): Promise<boolean> {
    return (
      (
        await cinter.put("reset-password", { id: companyId, email: emailAddr })
      )[0].status === 200
    );
  }
}

export class User {
  /**
   * Create new user, null on request fail
   * @param first_name
   * @param last_name
   * @param email
   * @param password
   * @returns
   */
  public static async register(
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ): Promise<UserInstance | null> {
    localStorage.clear();
    const [res, json] = await uinter.post("register", {
      first_name,
      last_name,
      email,
      password,
    });
    if (res.status !== 200) return null;
    return new UserInstance(json);
  }

  /**
   * Login, never call outside of authentication components, null on request fail
   * @param email
   * @param password
   * @returns
   */
  public static async login(
    email: string,
    password: string
  ): Promise<UserInstance | null> {
    localStorage.clear();
    const [res, json] = await uinter.put("login", { email, password });
    if (res.status !== 200) return null;
    return new UserInstance(json);
  }

  /**
   * Never call unless under special circumstances. For any normal use case, use the get() function to include
   * redirects to the login page if the tokens have expired
   * @returns
   */
  private static async accessUser(): Promise<UserInstance | null> {
    const [res, json] = await uinter.put("login", {});
    if (res.status !== 200) return null;
    return new UserInstance(json);
  }

  /**
   * Query events based on a set of search parameters, null on request fail
   * @param userId
   * @param options
   * @returns
   */
  public static async queryEvents(
    userId: number,
    options: {
      event_name?: string;
      general_search?: string;
      start_time?: Date;
      end_time?: Date;
      short_description?: string;
      long_description?: string;
      prize_lower?: number;
      prize_upper?: number;
      submissions_lower?: number;
      submissions_upper?: number;
    }
  ): Promise<BasicEvent[] | null> {
    let data: Json = {};
    for (const option in options)
      if (options[option]) data[option] = options[option];
    const [res, json] = await uinter.post("events", {
      id: userId,
      ...data,
    });
    if (res.status !== 200) return null;
    return json as BasicEvent[];
  }

  /**
   * Get submissions a user made, null on request fail
   * @param userId
   * @returns
   */
  public static async getSubmissions(
    userId: number
  ): Promise<BasicSubmission[] | null> {
    const [res, json] = await uinter.put("submissions", { id: userId });
    if (res.status !== 200) return null;
    return json as BasicSubmission[];
  }

  /**
   * Create a submission for an event, null on request fail
   * @param userId
   * @param options
   * @returns
   */
  public static async createSubmission(
    userId: number,
    eventId: number,
    options: {
      project_name: string;
      project_description: string;
      project_link: string;
      project_video_link?: string;
      resume_link?: string;
      additional_links?: string;
    }
  ): Promise<BasicSubmission | null> {
    let data: Json = {};
    for (const option in options)
      if (options[option]) data[option] = options[option];
    const [res, json] = await uinter.post("events", {
      id: userId,
      ...data,
      event_id: eventId,
    });
    if (res.status !== 200) return null;
    return json as BasicSubmission;
  }

  /**
   * Update a submission, null on request fail
   * @param userId
   * @param options
   * @returns
   */
  public static async updateSubmission(
    userId: number,
    submissionId: number,
    options: {
      project_name?: string;
      project_description?: string;
      project_link?: string;
      project_video_link?: string;
      resume_link?: string;
      additional_links?: string;
      age?: number;
      gender?: Gender;
      country_of_citizenship?: string;
      location?: string;
      skills?: string[];
    }
  ): Promise<BasicSubmission | null> {
    let data = {};
    for (const option in options)
      if (options[option]) data[option] = options[option];
    const [res, json] = await uinter.post("submissions", {
      id: userId,
      ...data,
      submission_id: submissionId,
    });
    if (res.status !== 200) return null;
    return json as BasicSubmission;
  }

  /**
   * Sign out of current device, true on success, false on fail
   * @returns
   */
  public static async signOutOfDevice(): Promise<boolean> {
    const [res, json] = await uinter.put("signout", {});
    return res.status === 200;
  }

  /**
   * DO NOT CALL THIS FUNCTION!!!
   * @returns
   */
  public static async get(): Promise<UserInstance | null> {
    // const router = useRouter();
    // if (!(await this.accessUser()))
    //     router.push('/companies/login')
    return await this.accessUser();
  }

  public static async verify(
    userId: number,
    emailAddr: string
  ): Promise<boolean> {
    return (
      (await uinter.put("verify", { id: userId, email: emailAddr }))[0]
        .status === 200
    );
  }

  public static async resetPassword(
    userId: number,
    emailAddr: string
  ): Promise<boolean> {
    return (
      (await uinter.put("reset-password", { id: userId, email: emailAddr }))[0]
        .status === 200
    );
  }
}

/**
 * Gets the current instance (either user or company, use instanceof or something to check the type)
 */
export async function get(): Promise<CompanyInstance | UserInstance | null> {
  const result: CompanyInstance = await Company.get();
  if (result) return result;
  return await User.get();
}

export async function signout(): Promise<boolean> {
  return Company.signoutFromDevice() || User.signOutOfDevice();
}

export async function getEvent(eventId: number): Promise<BasicEvent> {
  const [res, json] = await einter.put("get", { event_id: eventId });
  if (res.status !== 200) return null;
  return json as BasicEvent;
}
