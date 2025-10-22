export interface MediaAsset {
  id: number;
  url: string;
  mime: string;
  width?: number;
  height?: number;
  alt?: string | null;
  caption?: string | null;
  provider?: string | null;
  previewUrl?: string | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
}

export interface Testimonial {
  id: number;
  author: string;
  text: string;
  role?: string | null;
}

export interface EventSummary {
  id: number;
  title: string;
  slug: string;
  location: string;
  eventDate?: string | null;
  cover: MediaAsset | null;
  category?: Category;
}

export interface EventDetail extends EventSummary {
  description: string;
  client?: string | null;
  gallery: MediaAsset[];
  videos: MediaAsset[];
  testimonials: Testimonial[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}
