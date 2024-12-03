// This file holds the basic types used in the server typescript wrapper.
// For the most part, none of these are relevant to the user of this wrapper, since they are internally managed.
// However, any type beginning with 'Basic' other than BasicUser and BasicCompany will be useful since they are used to
// hold states that aren't user or company instances.

/**
 * JSON intermediary type that only allows primitives as to bypass the 'any' type
 */
export type Json = {
    [key: string]:
        | boolean
        | string
        | number
        | Json
        | (boolean | string | number | Json)[];
};

// Genders allowed in supabase (this is paired with the gender enum in supabase must change both for effect)
export type Gender = "male" | "female" | "other" | "undefined";

// List of allowed tables to request endpoints on
export type Table = "companies" | "users" | "events";

// List of allowed operations that can act as endpoints
export type Operation =
    | "register"
    | "login"
    | "machine-access"
    | "events"
    | "submissions"
    | "signout"
    | "companies"
    | "users"
    | "get" // EVENTS TABLE ONLY
    | "get-submissions" // EVENTS TABLE ONLY
    | "verify"
    | "reset-password";

/**
 * Company data (DO NOT EVER USE THIS : FOR INTERNAL USE ONLY)
 */
export class BasicCompany {
    access_code: string;
    id: number;
    email: string;
    name: string;
    first_name: string;
    last_name: string;
    verified: boolean;
    last_login: Date;
}

/**
 * User data (DO NOT EVER USE THIS : FOR INTERNAL USE ONLY)
 */
export type BasicUser = {
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
    verified: boolean;
    last_login: Date;
};

/**
 * Event data (you can use this)
 */
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
    prize_list: string[];
    required_skills: string[];
    report_url: string;
};

/**
 * Submission data (you can use this)
 */
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