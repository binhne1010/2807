"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type MemoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  /** Extra class for per-stage theming. */
  tone?: string;
  children: ReactNode;
};

/**
 * One modal at a time (spec §22). Closes on Escape and on backdrop press, restores
 * focus to whatever opened it, and keeps Tab inside the dialog while open.
 */
export function MemoryModal({ isOpen, onClose, eyebrow, title, tone = "", children }: MemoryModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus() ?? panel?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], video, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      restoreFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`memory-modal-root ${tone}`.trim()}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.12 : 0.42 }}
        >
          <button type="button" className="memory-modal-scrim" onClick={onClose} aria-label="Đóng ký ức" />
          <motion.div
            ref={panelRef}
            className="memory-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.965 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: reduceMotion ? 0.14 : 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            <button type="button" className="memory-modal-close" onClick={onClose} aria-label="Đóng" data-autofocus>
              <X size={18} weight="bold" />
            </button>
            {eyebrow && <p className="scene-eyebrow">{eyebrow}</p>}
            <h2 className="memory-modal-title">{title}</h2>
            <div className="memory-modal-body">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
