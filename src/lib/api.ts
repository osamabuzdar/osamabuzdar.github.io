import { API_BASE_URL } from "@/lib/constants";
import {
  fallbackFaqs,
  fallbackPricing,
  fallbackProjects,
  fallbackServices,
  fallbackTeam,
  fallbackTestimonials
} from "@/lib/fallback-data";
import {
  arrayFrom,
  boolFrom,
  pickArray,
  pickString,
  slugify,
  stripHtml,
  textFrom
} from "@/lib/utils";
import type { ApiRecord, FaqItem, PricingPlan, SiteEntity, TeamMember } from "@/types/site";

type ApiResponse = ApiRecord | ApiRecord[];

// TODO(api): Keep the fallback records in sync until the public API is fully stable.
// The site listens to the live API by default and falls back only when a request fails.
const ENABLE_LIVE_API = process.env.NEXT_PUBLIC_ENABLE_LIVE_API !== "false";

function asRecords(payload: unknown): ApiRecord[] {
  if (Array.isArray(payload)) return payload.filter(isRecord);
  if (!isRecord(payload)) return [];
  const data = payload.data;
  if (Array.isArray(data)) return data.filter(isRecord);
  if (isRecord(data)) return [data];
  return [payload];
}

function isRecord(value: unknown): value is ApiRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

async function fetchApi(endpoint: string): Promise<ApiResponse> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  let response: Response;

  try {
    response = await fetch(url, { cache: "force-cache" });
  } catch (error) {
    throw new Error(`Unable to fetch required build-time API data from ${url}: ${String(error)}`);
  }

  if (!response.ok) {
    throw new Error(`API request failed for ${url}: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<ApiResponse>;
}

export async function getServices() {
  return fetchList("/services", fallbackServices, normalizeEntity);
}

export async function getProjects() {
  return fetchList("/projects", fallbackProjects, normalizeEntity);
}

export async function getTeam() {
  return fetchList("/team", fallbackTeam, normalizeTeamMember);
}

export async function getPricingPlans() {
  return fetchList("/pricing-plans", fallbackPricing, normalizePricingPlan);
}

export async function getTestimonials() {
  return fetchList("/client-reviews", fallbackTestimonials, normalizeEntity);
}

export async function getFaqs() {
  const publicFaqs = await fetchList("/faqs/public", [], normalizeFaq);
  if (publicFaqs.length > 0) return publicFaqs;
  return fetchList("/faqs", fallbackFaqs, normalizeFaq);
}

export async function getService(id: string) {
  return fetchOne(`/services/${id}`, id, fallbackServices, normalizeEntity);
}

export async function getProject(id: string) {
  return fetchOne(`/projects/${id}`, id, fallbackProjects, normalizeEntity);
}

export async function getTeamMember(id: string) {
  return fetchOne(`/team/${id}`, id, fallbackTeam, normalizeTeamMember);
}

async function fetchList<T>(
  endpoint: string,
  fallback: T[],
  normalize: (record: ApiRecord) => T
) {
  if (!ENABLE_LIVE_API) return fallback;

  try {
    const records = asRecords(await fetchApi(endpoint));
    const items = records.map(normalize);
    return items.length > 0 ? items : fallback;
  } catch (error) {
    console.warn(`Using fallback data for ${endpoint}: ${String(error)}`);
    return fallback;
  }
}

async function fetchOne<T extends { id: string; slug?: string }>(
  endpoint: string,
  id: string,
  fallback: T[],
  normalize: (record: ApiRecord) => T
) {
  if (ENABLE_LIVE_API) {
    try {
      return normalize(await fetchApi(endpoint) as ApiRecord);
    } catch (error) {
      console.warn(`Using fallback data for ${endpoint}: ${String(error)}`);
    }
  }

  const fallbackItem = fallback.find((item) => item.id === id || item.slug === id);
  if (!fallbackItem) throw new Error(`Fallback item not found: ${id}`);
  return fallbackItem;
}

function normalizeEntity(record: ApiRecord): SiteEntity {
  const nested = isRecord(record.data) ? record.data : record;
  const title = pickString(nested, [
    "title",
    "name",
    "Service",
    "PName",
    "MemberName",
    "serviceName",
    "projectName",
    "planName",
    "CName",
    "heading"
  ], "Bulk Bytes");
  const id = pickString(nested, ["_id", "id", "slug"], slugify(title));
  const description = stripHtml(
    pickString(nested, [
      "description",
      "Description",
      "PDescription",
      "shortDescription",
      "serviceDescription",
      "projectDescription",
      "CDescription",
      "content"
    ], "Digital solutions designed and delivered by Bulk Bytes.")
  );
  const image = pickString(nested, [
    "image",
    "mainImage",
    "logoImage",
    "PImage",
    "MemberImage",
    "thumbnail",
    "featuredImage",
    "projectImage",
    "serviceImage",
    "CImage"
  ]);

  return {
    id,
    slug: pickString(nested, ["slug"], slugify(`${title}-${id}`)),
    title,
    description,
    image: image || undefined,
    category: pickString(nested, ["category", "type", "serviceCategory", "PType", "MemberCoreSkill"]) || undefined,
    tags: pickArray(nested, ["tags", "keywords"]),
    raw: nested
  };
}

function normalizePricingPlan(record: ApiRecord): PricingPlan {
  const title = pickString(record, ["planName", "title", "name"], "Pricing Plan");
  const billingCycle = pickString(record, ["billingCycle"]);
  return {
    id: pickString(record, ["_id", "id", "slug"], slugify(title)),
    title,
    price: pickString(record, ["price"], "Custom"),
    billingCycle: billingCycle || undefined,
    billingNote: pickString(record, ["billingNote", "description"], "Flexible engagement"),
    badge: pickString(record, ["planBadge", "badge"]) || undefined,
    buttonText: pickString(record, ["buttonText"]) || undefined,
    platformLimit: pickString(record, ["platformLimit"]) || undefined,
    features: arrayFrom(record.features).map((item) => textFrom(item)).filter(Boolean),
    highlighted: boolFrom(record.isPopular),
    raw: record
  };
}

function normalizeFaq(record: ApiRecord): FaqItem {
  const question = pickString(record, ["question", "Question", "title"], "Question");
  return {
    id: pickString(record, ["_id", "id"], slugify(question)),
    question,
    answer: stripHtml(pickString(record, ["answer", "Answer", "description"], "")),
    category: pickString(record, ["category", "Category", "type"]) || undefined
  };
}

function normalizeTeamMember(record: ApiRecord): TeamMember {
  const base = normalizeEntity(record);
  return {
    ...base,
    role: pickString(record, ["designation", "role", "CDesignation", "MemberDesignation", "MemberCoreSkill"]) || undefined,
    email: pickString(record, ["email", "Email"]) || undefined,
    phone: pickString(record, ["phone", "phoneNumber", "PhoneNumber"]) || undefined
  };
}
