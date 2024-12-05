// This file houses the static Company and User classes

import {
  BasicEvent,
  Json,
  BasicSubmission,
  Gender,
  BasicCompany,
} from "./basicTypes";
import { CompanyServer, UserServer, ChatServer } from "./fetcher";
import { CompanyInstance, UserInstance } from "./instance";

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
    const [res, json] = await CompanyServer.post("register", {
      name,
      first_name,
      last_name,
      email,
      password,
    });
    if (res.status !== 200) return null;
    return new CompanyInstance(json);
  }

  /**
   * Get the CompanyInstance given the company id. Useful to limit memory copy overhead
   * @param companyId
   * @returns
   */
  public static async getById(
    companyId: number
  ): Promise<CompanyInstance | null> {
    const [res, json] = await CompanyServer.put("companies", { id: companyId });
    if (res.status !== 200) return null;
    return new CompanyInstance(json);
  }

  /**
   * Get the CompanyInstance given the company id by bulk if you have a lot of ids to query. Useful to limit memory copy overhead
   * @param ids
   * @returns
   */
  public static async bulkGetById(
    ids: number[]
  ): Promise<CompanyInstance[] | null> {
    const [res, json] = await CompanyServer.put("companies", {
      id: ids,
      array: true,
    });
    if (res.status !== 200) return null;
    return json.map((elem: BasicCompany) => new CompanyInstance(elem));
  }

  /**
   * DO NOT UNDER ANY CIRCUMSTANCES CALL THIS FUNCTION. It has already been called exactly where it should be. It should not be called again!
   * @param email
   * @param password
   * @returns
   */
  public static async login(
    email: string,
    password: string
  ): Promise<CompanyInstance | null> {
    localStorage.clear();
    const [res, json] = await CompanyServer.put("login", { email, password });
    if (res.status !== 200) return null;
    return new CompanyInstance(json);
  }

  /**
   * Never call unless under special circumstances. For any normal use case, use the get() function to include
   * redirects to the login page if the tokens have expired
   * @returns
   */
  private static async accessCompany(): Promise<CompanyInstance | null> {
    const [res, json] = await CompanyServer.put("login", {});
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
    const [res, json] = await CompanyServer.put("events", { id: companyId });
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
    const [res, json] = await CompanyServer.post("events", {
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
    const [res, json] = await CompanyServer.post("events", {
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
    const [res, json] = await CompanyServer.put("submissions", {
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
    const [res, json] = await CompanyServer.delete("submissions", {
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
    return (await CompanyServer.put("signout", {}))[0].status === 200;
  }

  /**
   * DO NOT CALL THIS FUNCTION!!!!! Use the global get function from the globals.ts file
   * @returns
   */
  public static async get(): Promise<CompanyInstance | null> {
    return await this.accessCompany();
  }

  /**
   * Send verification email
   * @param companyId
   * @param emailAddr
   * @returns
   */
  public static async verify(
    companyId: number,
    emailAddr: string
  ): Promise<boolean> {
    return (
      (
        await CompanyServer.put("verify", { id: companyId, email: emailAddr })
      )[0].status === 200
    );
  }

  /**
   * Send reset password email
   * @param emailAddr
   * @returns
   */
  public static async resetPassword(emailAddr: string): Promise<boolean> {
    return (
      (await CompanyServer.put("reset-password", { email: emailAddr }))[0]
        .status === 200
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
    const [res, json] = await UserServer.post("register", {
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
    const [res, json] = await UserServer.put("login", { email, password });
    if (res.status !== 200) return null;
    return new UserInstance(json);
  }

  /**
   * Never call unless under special circumstances. For any normal use case, use the get() function to include
   * redirects to the login page if the tokens have expired
   * @returns
   */
  private static async accessUser(): Promise<UserInstance | null> {
    const [res, json] = await UserServer.put("login", {});
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
    const [res, json] = await UserServer.post("events", {
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
    const [res, json] = await UserServer.put("submissions", { id: userId });
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
    const [res, json] = await UserServer.post("events", {
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
    const [res, json] = await UserServer.post("submissions", {
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
    const [res, json] = await UserServer.put("signout", {});
    return res.status === 200;
  }

  /**
   * DO NOT CALL THIS FUNCTION!!! Use the global get function from the globals.ts file
   * @returns
   */
  public static async get(): Promise<UserInstance | null> {
    return await this.accessUser();
  }

  /**
   * Send verification email
   * @param userId
   * @param emailAddr
   * @returns
   */
  public static async verify(
    userId: number,
    emailAddr: string
  ): Promise<boolean> {
    return (
      (await UserServer.put("verify", { id: userId, email: emailAddr }))[0]
        .status === 200
    );
  }

  /**
   * Send reset password email
   * @param emailAddr
   * @returns
   */
  public static async resetPassword(emailAddr: string): Promise<boolean> {
    return (
      (await UserServer.put("reset-password", { email: emailAddr }))[0]
        .status === 200
    );
  }
}

export class Chat {
  /**
   * Send a message to the chat endpoint and get a response
   * @param conversationHistory
   * @param userInput
   * @returns
   */
  public static async sendMessage(
    conversationHistory: { role: string; content: string }[],
    userInput: string
  ): Promise<{ assistant_response: string; filled_json: string } | null> {
    const [res, json] = await ChatServer.post("conversation", {
      conversation_history: conversationHistory,
      user_input: userInput,
    });
    if (res.status !== 200) return null;
    return json;
  }
}
