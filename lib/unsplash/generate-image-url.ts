import axios from "axios";

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

interface PixabayPhoto {
  url: string;
  photographer: string;
}

export async function getLocationImagesPixabay(
  location: string,
  limit: number = 5
): Promise<PixabayPhoto[]> {
  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: PIXABAY_API_KEY,
        q: location,
        per_image: limit,
        image_type: "photo",
      },
    });

    if (response.data && response.data.hits) {
      return response.data.hits.map((photo: any) => ({
        url: photo.webformatURL,
        photographer: photo.user,
      }));
    }

    return [];
  } catch (error) {
    console.error("Error fetching Unsplash photos:", error);
    return [];
  }
}
