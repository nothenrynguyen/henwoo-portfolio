"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import profile from "@/data/profile.json";

export default function PhotoGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const photo = selected === null ? null : profile.gallery[selected];

  useEffect(() => {
    if (selected === null || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousScroll = { top: window.scrollY, left: window.scrollX };
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      previousFocus?.focus({ preventScroll: true });
      window.scrollTo({ ...previousScroll, behavior: "instant" });
    };
  }, [selected]);

  return <>
    <section className="photo-gallery" aria-label="Photos of Henry and friends">{profile.gallery.map((item, index) => <button className="gallery-photo" key={item.src} type="button" onClick={() => setSelected(index)} aria-haspopup="dialog" aria-label={`View photo: ${item.alt}`}><Image src={item.src} alt={item.alt} width={600} height={800} sizes="(max-width: 640px) 46vw, 270px" style={{ objectPosition: item.position }} /></button>)}</section>
    <dialog ref={dialogRef} className="portfolio-dialog photo-dialog" aria-label={photo?.alt ?? "Photo viewer"} onCancel={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) setSelected(null); }}>
      <div className="photo-dialog-panel"><button ref={closeRef} type="button" className="dialog-close photo-close" onClick={() => setSelected(null)} aria-label="Close photo">×</button>{photo && <Image key={photo.src} loading="eager" unoptimized className="photo-dialog-image" style={{ objectPosition: photo.position }} src={photo.src} alt={photo.alt} width={1200} height={1600} sizes="(max-width: 640px) 90vw, 560px" />}</div>
    </dialog>
  </>;
}
