import axios from "axios";

const TRIPADVISOR_API_KEY = process.env.TRIPADVISOR_API_KEY;
const BASE_URL = "https://api.content.tripadvisor.com/api/v1";

interface Address {
  street1: string;
  street2?: string;
  city: string;
  state?: string;
  country: string;
  portalcode: string;
  address: string;
}

interface Place {
  location_id: string;
  name: string;
  address_obj: Address;
}

interface ImageDetail {
  height: number;
  width: number;
  url: string;
}

interface Photo {
  id: number;
  is_blessed: boolean;
  caption: string;
  published_date: string;
  images: {
    thumbnail: ImageDetail;
    small: ImageDetail;
    medium: ImageDetail;
    large: ImageDetail;
    original: ImageDetail;
  };
  album: string;
  source: {
    name: string;
    localized_name: string;
  };
  user: {
    username: string;
  };
}

export async function searchPlace(query: string, category: string) {
  try {
    const response = await axios.get(`${BASE_URL}/location/search`, {
      params: {
        key: TRIPADVISOR_API_KEY,
        searchQuery: query,
        category: category,
        radius: "1000",
        radiusUnit: "km",
        language: "en",
      },
      headers: {
        Accept: "application/json",
      },
    });

    const place: Place = response.data.data[0];
    if (place) return place;
    return null;
  } catch (error) {
    console.error("Failed to fetch places: ", error);
    return null;
  }
}

export async function getPlacePhoto(
  location_id: string
): Promise<Photo | null> {
  try {
    const response = await axios.get(
      `${BASE_URL}/location/${location_id}/photos`,
      {
        params: {
          key: TRIPADVISOR_API_KEY,
          source: "Traveler,Expert",
        },
        headers: {
          Accept: "application/json",
        },
      }
    );
    const photo = response.data.data[0];
    return photo || null;
  } catch (error) {
    console.error("Failed to fetch place photo: ", error);
    return null;
  }
}

export async function getLocationDetails(location_id: string) {
  try {
    const response = await axios.get(
      `${BASE_URL}/location/${location_id}/details`,
      {
        params: {
          key: TRIPADVISOR_API_KEY,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );
    const web_url = response.data.web_url;

    return web_url || null;
  } catch (error) {
    console.error("Failed to fetch location details: ", error);
    return null;
  }
}

export async function getPhotoTravelAdvisor(query: string, category: string) {
  const place = await searchPlace(query, category);
  if (place) {
    const photo = await getPlacePhoto(place.location_id);
    if (photo) {
      return photo.images.original?.url;
    }
  }
  return null;
}

export async function getPlaceDetails(query: string, category: string) {
  const place = await searchPlace(query, category);
  if (place) {
    const details = await getLocationDetails(place.location_id);
    return details;
  }
  return null;
}