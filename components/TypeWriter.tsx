"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "I build amazing tech and systems.",
  "I secure critical infrastructure at Zero Point Intel.",
  "Come take a look at my portfolio.",
];

/**
 * TypeWriter — cycles through phrases with a type/delete effect and a
 * blinking terminal cursor. Uses a timeout (async), so it plays nice with
 * React's lint rules.
 */
export default function TypeWriter() {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIdx % PHRASES.length];
    const done = text === current;
    const delay = deleting ? 32 : done ? 2000 : 60;

    const t = setTimeout(() => {
      if (!deleting && !done) {
        setText(current.slice(0, text.length + 1));
      } else if (!deleting && done) {
        setDeleting(true);
      } else if (deleting && text !== "") {
        setText(text.slice(0, text.length - 1));
      } else {
        setDeleting(false);
        setPhraseIdx((i) => i + 1);
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, phraseIdx]);

  return (
    <span>
      {text}
      <span className="tw-cursor" aria-hidden="true">
        ▍
      </span>
    </span>
  );
}
