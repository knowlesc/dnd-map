import { createContext, useContext, useEffect, useState } from "react";
import { mapConfig } from "../config/mapConfig";
import { MapContext } from "./MapContext";

type ImageMetadata = {
  imageUrl: string;
  sizeX: number;
  sizeY: number;
};

type ImageContextValue = ImageMetadata & {
  loading: boolean;
};

export const ImageContext = createContext<ImageContextValue>(
  {} as ImageContextValue
);

export const ImageProvider: React.FC = ({ children }) => {
  const [metadata, setMetadata] = useState<ImageMetadata | null>();
  const [loading, setLoading] = useState(true);
  const { mapName } = useContext(MapContext);

  useEffect(() => {
    const loadImage = async (url: string) => {
      setLoading(true);
      const response = await fetch(url);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const sizeX = img.width;
        const sizeY = img.height;
        img.src = "";
        img.onload = null;
        setMetadata({
          imageUrl,
          sizeX,
          sizeY,
        });
        setLoading(false);
      };
    };

    const config = mapConfig.find((m) => mapName === m.mapName);
    if (!config) throw new Error("Map not found");

    loadImage(config.imageUrl);
  }, [mapName, setMetadata, setLoading]);

  if (!mapName || !metadata) return null;

  return (
    <ImageContext.Provider value={{ ...metadata, loading }}>
      {children}
    </ImageContext.Provider>
  );
};
