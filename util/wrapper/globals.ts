// This file houses useful global functions (i.e. a get function that abstracts out the notion of User and Company instances)

import { BasicEvent } from "./basicTypes";
import { EventServer } from "./fetcher";
import { CompanyInstance, UserInstance } from "./instance";
import { Company, User } from "./static";

/**
 * Gets the current instance (either user or company, use instanceof or something to check the type)
 * IMPORTANT: If this function returns null, forward to the /login path
 * @returns
 */
export async function getInstance(): Promise<CompanyInstance | UserInstance | null> {
    const [a, b] = await Promise.all([Company.get(), User.get()]);
    return a ?? b;
}

/**
 * Signout of device and delete machine entry in sql table
 * @returns
 */
export async function signout(): Promise<boolean> {
    return Company.signoutFromDevice() || User.signOutOfDevice();
}

/**
 * Helper function to get an event by its ID. Useful to pass in event id as url parameter this way rather than copy the whole object
 * via JSON -> string conversion
 * @param eventId
 * @returns
 */
export async function getEvent(eventId: number): Promise<BasicEvent> {
    const [res, json] = await EventServer.put("get", { event_id: eventId });
    if (res.status !== 200) return null;
    return json as BasicEvent;
}
