// src/hooks/useHomePageData.js
import { useEffect, useState } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

const API_KEY = "bltef575fdb3004f596";
const DELIVERY_TOKEN = "csbebb59f0d0f8604e9a314b07";
const ENVIRONMENT = "dev";
const CONTENT_TYPE = "home_page";

export function useHomePageData() {
  const [data, setData] = useState(null);

  const entryUidFromPreview = new URLSearchParams(window.location.search).get("entry_uid");
  const ENTRY_UID = entryUidFromPreview || "blt459c4ff62e5fc124";

  const fetchContent = async () => {
    try {
      const response = await fetch(
        `https://cdn.contentstack.io/v3/content_types/${CONTENT_TYPE}/entries/${ENTRY_UID}?environment=${ENVIRONMENT}`,
        {
          headers: {
            api_key: API_KEY,
            access_token: DELIVERY_TOKEN,
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setData(result.entry);
      } else {
        console.error("Failed to fetch entry:", await response.text());
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchContent();

    // Live preview auto-refresh
    ContentstackLivePreview.onEntryChange(() => {
      console.log("Live Preview update detected");
      fetchContent();
    });
  }, []);

  return data;
}
