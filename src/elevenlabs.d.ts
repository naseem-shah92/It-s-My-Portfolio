import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        "agent-id": string;
      };
    }
  }
}

/** The ElevenLabs widget custom element, with its conversation control methods. */
export interface ElevenLabsConvaiElement extends HTMLElement {
  startConversation: () => void;
  endConversation: () => void;
}
