export type SelectorTypes = {
  user: {
    user: User | null;
  };
};

export type User = {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name?: string | null;
  date_of_birth?: string;
  zipcode?: string;
  linkedin_url?: string;
  engagement_score?: string;
  classification?: string;
  phone?: string;
  image_url?: string;
  image_url_full?: string;
  currently_employeed_here?: boolean;
};
