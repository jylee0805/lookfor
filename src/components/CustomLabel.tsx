import { OverlayView } from "@react-google-maps/api";

interface Props {
  position: google.maps.LatLngLiteral;
  text: string;
}
const CustomMarkerLabel = ({ position, text }: Props) => {
  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(width, height) => ({
        x: -(width + 14),
        y: -height - 44,
      })}
    >
      <div
        style={{
          width: "30px",
          fontWeight: "700",
          fontSize: "16px",
          textAlign: "center",
          lineHeight: "1.5",
          color: "#000",
        }}
      >
        {text}
      </div>
    </OverlayView>
  );
};

export default CustomMarkerLabel;
