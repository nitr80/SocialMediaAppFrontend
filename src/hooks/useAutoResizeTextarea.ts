import { useRef } from "react";
import type { ChangeEvent } from "react";

export const useAutoResizeTextarea = (setText: (text: string) => void) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);

    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";

    const lineHeight = 20;
    const maxHeight = lineHeight * 3;

    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  };

  return { textareaRef, handleChange };
};
