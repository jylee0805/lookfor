type Label = {
  name: string;
};
const handleAnalyzeImage = async (imageUrl: string) => {
  const apiKey = import.meta.env.VITE_GOOGLE_CLOUD_API_KEY;
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

  const labelsRes = data.responses[0].localizedObjectAnnotations;

  if (labelsRes) {
    const labels = labelsRes.map((label: Label) => label.name).toString();
    if (labels.includes("Person") && labels.includes("Clothing") && labels.includes("Pants")) {
      return false;
    }
    return true;
  } else {
    return true;
  }
};

export default handleAnalyzeImage;
