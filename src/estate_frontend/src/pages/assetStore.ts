// assetStore.ts
export const assetStore: Array<{
  assetName: string;
  assetType: string;
  estimatedValue: string;
  description: string;
  isAssigned: boolean;
}> = [];

// Add this function to retrieve assets
export const getAssets = () => assetStore;
