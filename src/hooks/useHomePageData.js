// src/hooks/useHomePageData.js
import { useEffect, useState } from "react";

const API_KEY = "bltef575fdb3004f596"; // Your API key
const DELIVERY_TOKEN = "csbebb59f0d0f8604e9a314b07"; // Your delivery token
const ENVIRONMENT = "dev"; // Change if needed
const ENTRY_UID = "blt459c4ff62e5fc124"; // UID from the model
const CONTENT_TYPE = "home_page";

export function useHomePageData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      const response = await fetch(
        `https://cdn.contentstack.io/v3/content_types/home_page/entries/blt459c4ff62e5fc124?environment=dev`,
        {
          headers: {
            api_key: API_KEY,
            access_token: DELIVERY_TOKEN,
            environment: ENVIRONMENT,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setData(result.entry);
      }
    };

    fetchContent();
  }, []);

  return data;
}
