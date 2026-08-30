"use client";

import type { PresentationProduct } from "@/data/presentationContent";
import IsometricPlatformStack from "@/components/sections/diagrams/IsometricPlatformStack";
import PlatformArchitectureImage from "@/components/sections/diagrams/PlatformArchitectureImage";
import KyberHciClusterDiagram from "@/components/sections/diagrams/KyberHciClusterDiagram";
import MarsloqObservabilityDiagram from "@/components/sections/diagrams/MarsloqObservabilityDiagram";

const CAPTIONS: Record<string, string> = {
  "kyber-hci": "Hyper-converged stack",
  marsloq: "Observability stack",
};

export default function PlatformArchitectureDiagram({ product }: { product: PresentationProduct }) {
  if (product.id === "kyber-hci") {
    return <KyberHciClusterDiagram />;
  }

  if (product.id === "marsloq") {
    return <MarsloqObservabilityDiagram />;
  }

  if (product.architectureDiagram) {
    return (
      <PlatformArchitectureImage
        src={product.architectureDiagram}
        alt={product.architectureDiagramAlt ?? `${product.name} architecture`}
      />
    );
  }

  return (
    <IsometricPlatformStack
      productId={product.id}
      caption={CAPTIONS[product.id] ?? "Platform stack"}
      layers={product.stackLayers}
      features={product.features}
    />
  );
}
