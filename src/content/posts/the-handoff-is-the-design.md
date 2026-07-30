---
title: What's it all about Alfie?
date: 2026-07-22
standfirst: If the build doesn't match the file, the file was never finished. A design that can't survive contact with a browser is a picture of a design.
image: /images/uploads/IMG_2796.jpeg
imageAlt: QR code on a coffee bag
link: https://vendum.coffee
linkLabel: VENDUM Coffee
linkedin: false
draft: false
---

There's a particular kind of design file that looks immaculate and builds badly. Every corner aligned, every colour named, and not one decision made about what happens at 380 pixels wide.

I used to make those. They review well. Everyone nods. Then a developer opens it and starts making design decisions on your behalf, because you left a hundred of them unmade and someone has to.

## What a finished file actually contains

Not more screens. More answers.

- **What breaks first.** Every layout has an order in which it falls apart. If you haven't chosen that order, the browser will.
- **What the empty state says.** Not "no results found" — the actual sentence, written by you, in the product's voice.
- **Which type sizes exist.** Not the ones you happened to use. The set. If your file has fourteen sizes, you have no scale, you have a mood board.
- **What the focus state looks like.** Someone is going to tab through this.

None of that is glamorous and all of it gets decided by default if you skip it.

## The uncomfortable part

The reason these gaps persist is that closing them requires knowing roughly how the thing gets built. Not writing production code — just enough to know that `gap` and `margin` behave differently when a row wraps, and that your beautiful three-column grid has an opinion about what happens when there are four items.

Designers who've written CSS make fewer of these files. Not because they're better designers. Because they've been on the other end of the handoff and it was them who had to guess.
