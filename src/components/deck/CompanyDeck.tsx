import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { site } from '@/config/site';
import { createDeckSlides } from './DeckSlides';

const slides = createDeckSlides();
export function CompanyDeck() {
 const [current,setCurrent]=useState(0);
 const [scale,setScale]=useState(1);
 const [stacked,setStacked]=useState(false);
 const stage=useRef<HTMLDivElement>(null);
 const touch=useRef<{x:number;y:number}|null>(null);
 const active=useRef(0);
 const go=useCallback((index:number,scroll=true)=>{
  const next=Math.max(0,Math.min(slides.length-1,index));
  setCurrent(next);
  active.current=next;
  window.history.replaceState(null,'',`#${next+1}`);
  if(scroll&&window.matchMedia('(max-width: 767px) and (orientation: portrait)').matches) document.getElementById(`deck-slide-${next+1}`)?.scrollIntoView({behavior:'auto'});
 },[]);
 useEffect(()=>{
  const readHash=()=>{const value=Number(window.location.hash.slice(1));go(Number.isInteger(value)&&value>0?value-1:0);};
  readHash();window.addEventListener('hashchange',readHash);
  return()=>window.removeEventListener('hashchange',readHash);
 },[go]);
 useEffect(()=>{
  const resize=()=>{
   setStacked(window.matchMedia('(max-width: 767px) and (orientation: portrait)').matches);
   const rect=stage.current?.getBoundingClientRect();
   if(rect) setScale(Math.min(rect.width/1920,rect.height/1080));
  };
  resize(); window.addEventListener('resize',resize);
  const observer=new ResizeObserver(resize);
  if(stage.current)observer.observe(stage.current);
  return()=>{observer.disconnect();window.removeEventListener('resize',resize);};
 },[]);
 useEffect(()=>{
  const onKey=(event:KeyboardEvent)=>{
   if(event.altKey||event.ctrlKey||event.metaKey||event.target instanceof HTMLInputElement||event.target instanceof HTMLTextAreaElement)return;
   if(event.key===' '&&(event.target instanceof HTMLButtonElement||event.target instanceof HTMLAnchorElement))return;
   let next:number|undefined;
   if(['ArrowRight','ArrowDown','PageDown',' '].includes(event.key))next=active.current+1;
   if(['ArrowLeft','ArrowUp','PageUp'].includes(event.key))next=active.current-1;
   if(event.key==='Home')next=0;
   if(event.key==='End')next=slides.length-1;
   if(next!==undefined){event.preventDefault();go(next);}
  };
  window.addEventListener('keydown',onKey);
  return()=>window.removeEventListener('keydown',onKey);
 },[current,go]);
 useEffect(()=>{
  if(!stacked)return;
  const observer=new IntersectionObserver(entries=>{
   const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
   const value=visible?.target.getAttribute('data-slide-index');
   if(value!==null&&value!==undefined)go(Number(value),false);
  },{rootMargin:'-15% 0px -45% 0px',threshold:[0,.2,.5]});
  document.querySelectorAll('.deck-page').forEach(slide=>observer.observe(slide));
  return()=>observer.disconnect();
 },[stacked,go]);
 const print=async()=>{
  const images=Array.from(document.querySelectorAll<HTMLImageElement>('.deck-page img'));
  images.forEach(image=>{image.loading='eager';});
  await Promise.all(images.map(image=>image.decode().catch(()=>undefined)));
  window.print();
 };
 return <div className="company-deck" data-theme={slides[current]?.dark?'dark':'light'}>
  <header className="deck-chrome"><Link to="/" className="deck-wordmark" aria-label={`${site.name} home`}>{site.name}</Link><div><Button variant="ghost" className="deck-print" onClick={print}><Download aria-hidden/>Download PDF</Button><Button asChild variant="ghost" size="icon" aria-label="Close deck"><Link to="/"><X aria-hidden/></Link></Button></div></header>
  <div ref={stage} className="deck-stage" style={{'--deck-scale':scale} as React.CSSProperties} onTouchStart={event=>{const point=event.touches[0];if(point)touch.current={x:point.clientX,y:point.clientY};}} onTouchEnd={event=>{const point=event.changedTouches[0];const start=touch.current;touch.current=null;if(!start||!point)return;const x=point.clientX-start.x,y=point.clientY-start.y;if(Math.abs(x)>60&&Math.abs(x)>Math.abs(y)*1.5)go(current+(x<0?1:-1));}}>
   {slides.map((slide,index)=><section key={slide.id} id={`deck-slide-${index+1}`} data-slide-index={index} data-theme={slide.dark?'dark':'light'} className={`deck-page ${slide.dark?'deck-dark':'deck-light'} ${index===current?'is-current':''}`} aria-label={`${index+1} of ${slides.length}: ${slide.title}`} aria-hidden={!stacked&&index!==current} inert={!stacked&&index!==current?true:undefined}>
    <div className="deck-page-content">{slide.content}</div><div className="deck-page-footer"><span>{site.name} / Company Deck</span><span>{String(index+1).padStart(2,'0')} / {String(slides.length).padStart(2,'0')}</span></div>
   </section>)}
  </div>
  <nav className="deck-controls" aria-label="Slide navigation"><Button variant="ghost" size="icon" aria-label="Previous slide" disabled={current===0} onClick={()=>go(current-1)}><ChevronLeft aria-hidden/></Button><div className="deck-dots">{slides.map((slide,index)=><Button key={slide.id} variant="ghost" aria-label={`Go to slide ${index+1}: ${slide.title}`} aria-current={index===current?'step':undefined} onClick={()=>go(index)} className="deck-dot"><span/></Button>)}</div><Button variant="ghost" size="icon" aria-label="Next slide" disabled={current===slides.length-1} onClick={()=>go(current+1)}><ChevronRight aria-hidden/></Button></nav>
  <p className="sr-only" aria-live="polite">Slide {current+1} of {slides.length}: {slides[current]?.title}</p>
 </div>;
}