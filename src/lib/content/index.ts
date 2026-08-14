/**
 * Single source of truth for every string and number on the page.
 *
 * Claims policy: this site publishes no win rate, no equity curve, and no
 * testimonials, because none of those can be substantiated from the source
 * material. It competes on specificity instead — the trading rules are unusual
 * and concrete, and concrete beats superlative. Any performance figure that
 * appears is labelled as a target, never as a result.
 *
 * Split by section. Import from "@/lib/content" — never from the leaf modules
 * directly, so the layout here can change without touching components.
 */

export * from "./site";
export * from "./hero";
export * from "./signal";
export * from "./why-gold";
export * from "./method";
export * from "./pricing";
export * from "./risk";
export * from "./managed";
export * from "./faq";
export * from "./legal";
