import { AvoidanceDiagram, CognitiveDiagram, WavesDiagram } from "./diagrams";

export function SectionVisual({ number, subsection }: { number: number; subsection?: string }) {
  switch (subsection ?? String(number)) {
    case "3.1":
      return <WavesDiagram />;
    case "4":
      return <CognitiveDiagram />;
    case "5":
      return (
        <figure className="learning-demo">
          <h4>الحلقة المفرغة للتجنب</h4>
          <p className="demo-instruction">الموقف: يُطلب من شخص تقديم عرض.</p>
          <AvoidanceDiagram />
        </figure>
      );
    default:
      return null;
  }
}
