// This file houses the instance classes for UserInstance and CompanyInstance

import {
  BasicCompany,
  BasicEvent,
  Json,
  BasicSubmission,
  Gender,
  BasicUser,
} from "./basicTypes";
import { CompanyServer, UserServer, EventServer } from "./fetcher";

export class CompanyInstance {
  private _access_code: string;
  private _email: string;
  private _id: number;
  private _name: string;
  private _first_name: string;
  private _last_name: string;
  private _verified: boolean;
  private _last_login: Date;

  // DO NOT EVER USE THIS CONSTRUCTOR
  constructor(company: BasicCompany) {
    for (const key in company) {
      this[`_${key}`] = company[key];
    }
  }

  // Accessors to the private members
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
  get verified() {
    return this._verified;
  }
  get lastLogin() {
    return this._last_login;
  }

  /**
   * Returns list of events the company has created, null if failed request
   * @param companyId
   * @returns
   */
  public async getEvents(): Promise<BasicEvent[] | null> {
    const [res, json] = await CompanyServer.put("events", { id: this.id });
    if (res.status !== 200) return null;
    return json as BasicEvent[];
  }

  /**
   * Get an event that this company created by the event's id
   * @param event_id
   * @returns
   */
  public async getEvent(event_id: number): Promise<BasicEvent | null> {
    const [res, json] = await CompanyServer.put("events", {
      id: this.id,
      event_id,
    });
    if (res.status !== 200) return null;
    return json as BasicEvent;
  }

  /**
   * Delete an event that this company created, pass in either the event_id or the BasicEvent object entirely
   * @param event
   * @returns
   */
  public async deleteEvent(event: number | BasicEvent) {
    if (typeof event === "number") {
      const [res, json] = await CompanyServer.delete("events", {
        id: this.id,
        event_id: event,
      });
      if (res.status !== 200) return null;
      return json as BasicEvent;
    }

    const [res, json] = await CompanyServer.delete("events", {
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
    prize_list?: string[];
    report_url?: string;
    required_skills?: string[];
    payment_status?: number;
  }): Promise<BasicEvent | null> {
    const [res, json] = await CompanyServer.post("events", {
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
    const [res, json] = await CompanyServer.post("events", {
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
    const [res, json] = await CompanyServer.put("submissions", {
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
    const [res, json] = await CompanyServer.delete("submissions", {
      id: this.id,
      submission_id: submissionId,
    });
    if (res.status !== 200) return null;
    return json as BasicSubmission;
  }

  /**
   * Update the company data, all fields are optional, fill in whatever should be updated. If you update the password be careful
   * @param data
   * @returns
   */
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
    const [res, json] = await CompanyServer.post("companies", {
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
    this._verified = company.verified;
    this._last_login = company.last_login;
    return this;
  }
}

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
  private _verified: boolean;
  private _last_login: Date;

  // DO NOT EVER USE THIS CONSTRUCTOR
  constructor(user: BasicUser) {
    for (const key in user) {
      this[`_${key}`] = user[key];
    }
  }

  // Accessors to the private members
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
  get verified() {
    return this._verified;
  }
  get lastLogin() {
    return this._last_login;
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
    const [res, json] = await UserServer.put("events", {
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
    const [res, json] = await UserServer.put("submissions", { id: this.id });
    if (res.status !== 200) return null;
    return json as BasicSubmission[];
  }

  /**
   * Get all events this user has submitted to
   * @returns
   */
  public async getSubmittedEvents(): Promise<BasicEvent[] | null> {
    const [res, json] = await EventServer.put("get-submissions", {
      id: this.id,
    });
    if (res.status !== 200) return null;
    return json as BasicEvent[];
  }
  /**
   * Get all events this user has submitted to
   * @returns
   */
  public async getSubmissionEvents(): Promise<BasicEvent[] | null> {
    const [res, json] = await EventServer.put("get-submissions", {
      id: this.id,
    });
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
    const [res, json] = await UserServer.post("submissions", {
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
    const [res, json] = await UserServer.post("submissions", {
      id: this.id,
      ...data,
    });
    if (res.status !== 200) return null;
    return json as BasicSubmission;
  }

  /**
   * Update the user data, all fields are optional, fill in whatever should be updated. If you update the password be careful
   * @param data
   * @returns
   */
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
    const [res, json] = await UserServer.post("users", {
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
    this._gender = user.gender;
    this._country_of_citizenship = user.country_of_citizenship;
    this._location = user.location;
    this._skills = user.skills;
    this._num_events = user.num_events;
    this._verified = user.verified;
    this._last_login = user.last_login;
    return this;
  }
}
