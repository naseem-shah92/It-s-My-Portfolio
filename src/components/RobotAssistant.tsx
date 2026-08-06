import { useEffect, useRef, useState } from "react";
import { Conversation } from "@elevenlabs/client";

const AGENT_ID = "agent_0101kysyngbxff8bwpgcn2qsbgn3";
const SPLINE_SRC =
  "https://my.spline.design/genkubgreetingrobot-UZMjaKyX2BsIeuYB8qSI0Qnu/";

// How far the pointer may move between down/up and still count as a
// "click" rather than a drag.
const CLICK_MOVE_THRESHOLD = 6;

interface Point {
  x: number;
  y: number;
}

/**
 * A draggable floating robot (Spline embed) that appears on every page.
 * Users can drag it anywhere on screen; a plain click/tap (no drag)
 * starts or ends a conversation with Aaban's ElevenLabs voice agent.
 * Also listens for a custom "start-voice-agent" event from other components.
 */
export default function RobotAssistant() {
  const size =
    typeof window !== "undefined" && window.innerWidth < 640 ? 90 : 120;

  const [pos, setPos] = useState<Point>(() => ({
    x: typeof window !== "undefined" ? window.innerWidth - size - 28 : 0,
    y: typeof window !== "undefined" ? window.innerHeight - size - 28 : 0,
  }));
  const [dragging, setDragging] = useState(false);
  const [active, setActive] = useState(false);

  const dragOrigin = useRef<Point>({ x: 0, y: 0 });
  const pointerOrigin = useRef<Point>({ x: 0, y: 0 });
  const movedRef = useRef(0);
  const conversationRef = useRef<Awaited<
    ReturnType<typeof Conversation.startSession>
  > | null>(null);

  const clampPosition = (x: number, y: number): Point => {
    const maxX = window.innerWidth - size - 8;
    const maxY = window.innerHeight - size - 8;
    return {
      x: Math.min(Math.max(x, 8), Math.max(maxX, 8)),
      y: Math.min(Math.max(y, 8), Math.max(maxY, 8)),
    };
  };

  const startConversation = async () => {
    if (active || conversationRef.current) return;

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const conversation = await Conversation.startSession({
        agentId: AGENT_ID,
        onConnect: () => {
          setActive(true);
        },
        onDisconnect: () => {
          setActive(false);
          conversationRef.current = null;
        },
        onError: (err) => {
          console.error("[RobotAssistant] ElevenLabs error:", err);
          setActive(false);
          conversationRef.current = null;
        },
      });

      conversationRef.current = conversation;
    } catch (err) {
      console.error("[RobotAssistant] Failed to start conversation:", err);
      setActive(false);
      conversationRef.current = null;
    }
  };

  const endConversation = async () => {
    try {
      await conversationRef.current?.endSession();
    } catch (err) {
      console.error("[RobotAssistant] Error ending session:", err);
    }
    conversationRef.current = null;
    setActive(false);
  };

  const toggleConversation = () => {
    if (active || conversationRef.current) {
      endConversation();
    } else {
      startConversation();
    }
  };

  // Listen for external "start-voice-agent" event (triggered by Let's Talk button)
  useEffect(() => {
    const handler = () => startConversation();
    window.addEventListener("start-voice-agent", handler);
    return () => window.removeEventListener("start-voice-agent", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragOrigin.current = { x: pos.x, y: pos.y };
    pointerOrigin.current = { x: e.clientX, y: e.clientY };
    movedRef.current = 0;
    setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const dx = e.clientX - pointerOrigin.current.x;
    const dy = e.clientY - pointerOrigin.current.y;
    movedRef.current = Math.max(movedRef.current, Math.hypot(dx, dy));
    setPos(clampPosition(dragOrigin.current.x + dx, dragOrigin.current.y + dy));
  };

  const handlePointerUp = () => {
    setDragging(false);
    if (movedRef.current < CLICK_MOVE_THRESHOLD) {
      toggleConversation();
    }
  };

  // Keep the robot within bounds if the window is resized.
  useEffect(() => {
    const onResize = () => setPos((p) => clampPosition(p.x, p.y));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup session on unmount
  useEffect(() => {
    return () => {
      if (conversationRef.current) {
        conversationRef.current.endSession().catch(() => {});
      }
    };
  }, []);

  return (
    <div
      className={`robot-assistant${dragging ? " dragging" : ""}${active ? " active" : ""}`}
      style={{ left: pos.x, top: pos.y }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      tabIndex={-1}
      aria-label="Talk to Aaban's AI voice agent"
      title={active ? "Listening… tap to end" : "Tap to talk"}
    >
      <div className="robot-assistant-ring" />
      <div className="robot-assistant-frame">
        <iframe
          src={SPLINE_SRC}
          frameBorder={0}
          title="AI voice agent"
          allow="autoplay; fullscreen; xr-spatial-tracking; clipboard-write"
        />
      </div>
    </div>
  );
}
