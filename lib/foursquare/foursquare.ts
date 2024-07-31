import axios from "axios";

const FOURSQUARE_API_KEY = process.env.FOURSQUARE_API_KEY;
const BASE_URL = "https://api.foursquare.com/v3";

interface FoursquarePhoto {
  id: string;
  createdAt: string;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
}

export async function searchPlace(query: string) {
  try {
    const response = await axios.get(`${BASE_URL}/places/search`, {
      params: {
        query,
        limit: "1",
        radius: "10000",
      },
      headers: {
        Accept: "application/json",
        Authorization: FOURSQUARE_API_KEY,
      },
    });

    const place = response.data.results[0];
    if (place) return place;
    return null;
  } catch (error) {
    console.error("Failed to fetch places: ", error);
    return null;
  }
}

export async function getPlacePhoto(
  fsq_id: string
): Promise<FoursquarePhoto | null> {
  try {
    const response = await axios.get(`${BASE_URL}/places/${fsq_id}/photos`, {
      params: {
        clasification: "outdoor, indoor",
        sort: "POPULAR",
      },
      headers: {
        Accept: "application/json",
        Authorization: FOURSQUARE_API_KEY,
      },
    });
    const photo = response.data[0];
    return photo || null;
  } catch (error) {
    console.error("Failed to fetch place photo: ", error);
    return null;
  }
}

export async function getPhotoForPlace(
  query: string,
) {
  const place = await searchPlace(query);
  if (place) {
    const photo = await getPlacePhoto(place.fsq_id);
    if (photo) {
      return {
        name: place.name,
        photo: `${photo.prefix}original${photo.suffix}`,
      };
    }
  }
  return null;
}
