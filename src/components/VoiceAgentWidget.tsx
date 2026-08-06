import { useEffect } from "react";

const SCRIPT_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed";
const AGENT_ID = "agent_0101kysyngbxff8bwpgcn2qsbgn3";

/** DOM id used to look this element up and call its conversation methods. */
export const VOICE_WIDGET_ID = "aaban-voice-agent-widget";

/**
 * Mounts Aaban's ElevenLabs Conversational AI voice agent globally.
 * The default floating bubble UI is hidden (see `.voice-widget-hidden`
 * in style.css) — the visible trigger is the draggable robot instead
 * (see RobotAssistant.tsx), which calls startConversation()/
 * endConversation() on this element directly.
 */
export default function VoiceAgentWidget() {
  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, []);

  return (
    <elevenlabs-convai
      id={VOICE_WIDGET_ID}
      agent-id={AGENT_ID}
      className="voice-widget-hidden"
    ></elevenlabs-convai>
  );
}
