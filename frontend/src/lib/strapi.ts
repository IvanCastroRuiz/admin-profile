import qs from 'qs';
import type { Category, EventDetail, EventSummary, MediaAsset, Testimonial } from '@/types/content';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

interface StrapiFile {
  id: number;
  url: string;
  mime: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  provider_metadata?: {
    public_id?: string;
  } | null;
}

interface StrapiCategory {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string | null;
  };
}

interface StrapiEvent {
  id: number;
  attributes: {
    title: string;
    slug: string;
    location: string;
    eventDate?: string | null;
    description?: string;
    client?: string | null;
    heroVideo?: string | null;
    seo?: {
      metaTitle?: string;
      metaDescription?: string;
    };
    category?: {
      data: StrapiCategory | null;
    };
    cover?: {
      data: { id: number; attributes: StrapiFile } | null;
    };
    gallery?: {
      data: { id: number; attributes: StrapiFile }[];
    };
    videos?: {
      data: { id: number; attributes: StrapiFile }[];
    };
    testimonials?: {
      data: {
        id: number;
        attributes: {
          author: string;
          text: string;
          role?: string | null;
        };
      }[];
    };
  };
}

interface StrapiResponse<T> {
  data: T;
}

function ensureAbsoluteUrl(url?: string | null): string | null {
  if (!url) {
    return null;
  }
  if (url.startsWith('http')) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
}

function mapMedia(file?: StrapiFile | null): MediaAsset | null {
  if (!file) {
    return null;
  }

  const url = ensureAbsoluteUrl(file.url);
  if (!url) {
    return null;
  }

  return {
    id: file.id,
    url,
    mime: file.mime,
    width: file.width,
    height: file.height,
    alt: file.alternativeText ?? undefined,
    caption: file.caption ?? undefined,
    provider: file.provider_metadata?.public_id ? 'cloudinary' : undefined
  };
}

function mapCategory(entity?: StrapiCategory | null): Category | undefined {
  if (!entity) {
    return undefined;
  }

  return {
    id: entity.id,
    name: entity.attributes.name,
    slug: entity.attributes.slug,
    description: entity.attributes.description
  };
}

function mapTestimonial(entity: { id: number; attributes: { author: string; text: string; role?: string | null } }): Testimonial {
  return {
    id: entity.id,
    author: entity.attributes.author,
    text: entity.attributes.text,
    role: entity.attributes.role
  };
}

function mapEventSummary(event: StrapiEvent): EventSummary {
  return {
    id: event.id,
    title: event.attributes.title,
    slug: event.attributes.slug,
    location: event.attributes.location,
    eventDate: event.attributes.eventDate,
    cover: mapMedia(event.attributes.cover?.data?.attributes ?? null),
    category: mapCategory(event.attributes.category?.data ?? null)
  };
}

function mapEventDetail(event: StrapiEvent): EventDetail {
  const gallery =
    event.attributes.gallery?.data
      ?.map((item) => mapMedia(item.attributes))
      .filter((asset): asset is MediaAsset => Boolean(asset)) ?? [];

  const videos =
    event.attributes.videos?.data
      ?.map((item) => mapMedia(item.attributes))
      .filter((asset): asset is MediaAsset => Boolean(asset)) ?? [];

  const testimonials =
    event.attributes.testimonials?.data?.map((item) => mapTestimonial(item)).filter(Boolean) ?? [];

  return {
    ...mapEventSummary(event),
    description: event.attributes.description ?? '',
    client: event.attributes.client,
    gallery,
    videos,
    testimonials,
    seo: event.attributes.seo
  };
}

async function strapiFetch<T>(path: string, query?: Record<string, unknown>): Promise<T> {
  const queryString = query ? `?${qs.stringify(query, { encode: false })}` : '';
  const res = await fetch(`${STRAPI_URL}/api${path}${queryString}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as StrapiResponse<T>;
  return data.data;
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await strapiFetch<StrapiCategory[]>(
    '/categories',
    {
      sort: ['name:asc']
    }
  );
  return response.map((item) => mapCategory(item)!).filter(Boolean) as Category[];
}

export async function fetchEvents(params?: { categorySlug?: string }): Promise<EventSummary[]> {
  const filters = params?.categorySlug
    ? {
        category: {
          slug: {
            $eq: params.categorySlug
          }
        }
      }
    : undefined;

  const events = await strapiFetch<StrapiEvent[]>(
    '/events',
    {
      populate: {
        cover: {
          fields: ['url', 'mime', 'width', 'height', 'alternativeText']
        },
        category: {
          fields: ['name', 'slug']
        }
      },
      filters,
      sort: ['eventDate:desc']
    }
  );

  return events.map((event) => mapEventSummary(event));
}

export async function fetchFeaturedEvents(limit = 6): Promise<EventSummary[]> {
  const events = await fetchEvents();
  return events.slice(0, limit);
}

export async function fetchEventBySlug(slug: string): Promise<EventDetail | null> {
  const events = await strapiFetch<StrapiEvent[]>(
    '/events',
    {
      populate: {
        cover: {
          fields: ['url', 'mime', 'width', 'height', 'alternativeText']
        },
        gallery: {
          fields: ['url', 'mime', 'width', 'height', 'alternativeText', 'caption']
        },
        videos: {
          fields: ['url', 'mime', 'width', 'height', 'alternativeText']
        },
        testimonials: {
          fields: ['author', 'text', 'role']
        },
        category: {
          fields: ['name', 'slug']
        }
      },
      filters: {
        slug: {
          $eq: slug
        }
      }
    }
  );

  if (!events.length) {
    return null;
  }

  return mapEventDetail(events[0]);
}

export function buildCloudinaryUrl(url: string, transformations = 'f_auto,q_auto'): string {
  if (!url.includes('cloudinary.com')) {
    return url;
  }

  const [base, rest] = url.split('/upload/');
  if (!rest) {
    return url;
  }
  return `${base}/upload/${transformations}/${rest}`;
}
