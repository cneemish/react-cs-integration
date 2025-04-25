// src/utils/livePreview.js
import ContentstackLivePreview from "@contentstack/live-preview-utils";


ContentstackLivePreview.init({
    api_key: "bltef575fdb3004f596", // Your Stack API Key
    environment: "dev", // Your Environment Name
  
    live_preview: {
      enable: true,
      host: "rest-preview.contentstack.com",
      preview_token: "cs12fbe9da75b6bfcdc47888b9"
  },
  ssr : true
});

