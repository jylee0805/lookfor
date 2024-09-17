import { useState } from "react";
interface Label {
  name: string;
}
const useGoogleVisionAPI = () => {
  const [labels, setLabels] = useState("");
  const [error, setError] = useState("");
  const handleAnalyzeImage = async (imageUrl: string) => {
    const apiKey = "AIzaSyAi4nS5Hhy7zfL_hwGg68brN-T8FOeRlrU"; // 請替換為你的 API 金鑰
    const endpoint = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

    const requestBody = {
      requests: [
        {
          image: {
            source: {
              imageUri: imageUrl,
            },
          },
          features: [
            {
              maxResults: 50,
              type: "OBJECT_LOCALIZATION",
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const labels = data.responses[0].localizedObjectAnnotations;

      if (labels) {
        setLabels(labels.map((label: Label) => label.name).toString());
      } else {
        setLabels("noObject");
      }
    } catch (err) {
      setError("Failed to analyze image");
      console.error(err);
    }
  };
  return { labels, error, handleAnalyzeImage };
};
export default useGoogleVisionAPI;
