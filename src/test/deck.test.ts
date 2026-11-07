import { describe, expect, it } from 'vitest';
import { deckWork, deckPrimaryWork, deckMoreWork, deckStarter } from '@/content/deck';
import { plans } from '@/content/plans';

describe('company deck content rules',()=>{
 it('excludes all unlinked and incomplete projects',()=>{
  expect(deckWork.length).toBeGreaterThan(0);
  expect(deckWork.every(project=>Boolean(project.liveUrl)&&!project.todo&&project.image.ready)).toBe(true);
 });
 it('never includes the staff registration tool',()=>{
  expect(deckWork.some(project=>project.slug==='western-cars-staff-registration')).toBe(false);
 });
 it('keeps Bloom explicitly a Demo',()=>{
  expect(deckPrimaryWork.find(project=>project.slug==='bloom-studio')?.type).toBe('Demo');
 });
 it('keeps additional featured work in the more-work group',()=>{
  expect(deckMoreWork.map(project=>project.slug)).toEqual(['gm-taxis-lewes','western-cars-content-hub']);
 });
 it('reads Starter pricing and timeline from the original plan',()=>{
  expect(deckStarter).toBe(plans.find(plan=>plan.id==='starter'));
  expect(deckStarter?.timeline).toBe('Live in 1 to 2 weeks');
 });
});