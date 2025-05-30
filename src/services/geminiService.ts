
interface InsectData {
  commonName: string;
  scientificName: string;
  order: string;
  habitat: string;
  diet: string;
  lifeCycle: string;
  geographicRange: string;
  wingspanSize: string;
  ecologicalRole: string;
  description: string;
}

export const identifyInsect = async (imageBase64: string, apiKey: string): Promise<InsectData> => {
  // For demo purposes, we'll return mock data since we can't actually call Gemini API without backend
  // In a real implementation, this would make an API call to a backend service that uses Gemini API
  
  console.log('Analyzing image with Gemini API...');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock response based on common insects
  const mockResponses: InsectData[] = [
    {
      commonName: "Monarch Butterfly",
      scientificName: "Danaus plexippus",
      order: "Lepidoptera",
      habitat: "Fields, meadows, gardens, parks",
      diet: "Nectar (adults), milkweed (larvae)",
      lifeCycle: "Complete metamorphosis (egg, larva, pupa, adult)",
      geographicRange: "North and South America, Australia, New Zealand",
      wingspanSize: "8.9-10.2 cm wingspan",
      ecologicalRole: "Pollinator, indicator species for ecosystem health",
      description: "The Monarch butterfly is one of the most recognizable butterflies in North America, famous for its incredible migration journey spanning thousands of miles. These orange and black beauties are not just stunning to look at - they're also important pollinators and serve as indicators of environmental health."
    },
    {
      commonName: "Honeybee",
      scientificName: "Apis mellifera",
      order: "Hymenoptera",
      habitat: "Gardens, meadows, orchards, agricultural areas",
      diet: "Nectar and pollen",
      lifeCycle: "Complete metamorphosis (egg, larva, pupa, adult)",
      geographicRange: "Worldwide (originally Europe, Africa, Middle East)",
      wingspanSize: "2.5-3.2 cm body length",
      ecologicalRole: "Primary pollinator, honey production, ecosystem keystone species",
      description: "Honeybees are arguably the most important pollinators on Earth, responsible for pollinating about one-third of the food we eat. These social insects live in highly organized colonies and play a crucial role in maintaining biodiversity and food security."
    },
    {
      commonName: "Ladybug",
      scientificName: "Coccinella septempunctata",
      order: "Coleoptera",
      habitat: "Gardens, agricultural fields, forests, meadows",
      diet: "Aphids, scale insects, mites (carnivorous)",
      lifeCycle: "Complete metamorphosis (egg, larva, pupa, adult)",
      geographicRange: "Europe, North America, Asia",
      wingspanSize: "5-8 mm body length",
      ecologicalRole: "Natural pest control, predator of agricultural pests",
      description: "Ladybugs are beloved beneficial insects that serve as natural pest controllers in gardens and agricultural systems. A single ladybug can consume up to 5,000 aphids in its lifetime, making them invaluable allies for farmers and gardeners."
    }
  ];
  
  // Return a random mock response
  const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
  
  return randomResponse;
};
