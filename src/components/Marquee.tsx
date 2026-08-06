const TRACK_TEXT = (
  <span>
    WEB DEVELOPMENT <em>—</em> UI / UX DESIGN <em>—</em> FULL STACK <em>—</em> FREELANCE <em>—</em>
  </span>
);

export default function Marquee() {
  return (
    <div className="marquee-strip reveal-on-scroll">
      <div className="marquee-track">
        {TRACK_TEXT}
        {TRACK_TEXT}
      </div>
    </div>
  );
}
