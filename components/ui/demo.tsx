import { LayeredText } from "@/components/ui/layered-text";
import { GridVignetteBackground } from "@/components/ui/vignette-grid-background";

export default function DemoOne() {
  return (
    <div className="relative z-0 bg-transparent flex items-center justify-center w-full py-8">
      <GridVignetteBackground className="opacity-80 absolute" x={50} y={50} intensity={100} horizontalVignetteSize={80} verticalVignetteSize={80} />
      <LayeredText />
    </div>
  )
}
