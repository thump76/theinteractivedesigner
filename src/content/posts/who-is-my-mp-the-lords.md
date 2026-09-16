---
title: Who is my MP? and The Lords
date: 2026-09-16
standfirst: "Fifteen years after Dod's Parliamentary Communications, I went back to Westminster's data and built the two apps I wished had existed: one to find your MP, one to find peers by their specialisms."
image: /images/uploads/TheLords-linkedin.png
imageAlt: Who is my MP? & The House of Lords
link: https://apps.apple.com/us/app/who-is-my-mp/id6801525476
linkLabel: Who is my MP?
linkedin: true
draft: false
---

Who is my MP? It is one of the most searched questions about UK politics, and the answer has always been sitting in Parliament's own open data. This year I built two free iOS apps on top of it: Who Is My MP?, which finds your MP by postcode, and The Lords, which helps you find members of the House of Lords by their specialist interests.

Here is why I built them, what they do, and what I learnt from Parliament's public APIs.

## Why build a UK Parliament app now?

Fifteen years ago I was Lead designer at Dod's Parliamentary Communications. It was a departure from what I was used to, which was mainly ecommerce and advertising. Instead of optimising CTR and conversion, the material was MPs, peers, select committees and the machinery of Westminster. It was about data and providing it in an easy to understand format.

This year I went back to that world on my own terms. Everything Parliament publishes about the House of Commons and the House of Lords (votes, speeches, written questions, registered interests, committee memberships) is available free of charge through Hansard and the Parliament data services. The data has been there for years. What is thin on the ground is a well designed way in for ordinary people.

## Not a gotcha app

The easy version of an MP app is a gotcha. Expenses, attendance leagues, who turned up least. I did not want to build that.

I wanted to show what MPs actually do, presented without editorial framing. That meant being honest about the limits of the data too. An MP with a low number of sitting days might also be a practising doctor, and the raw number tells you nothing about that on its own. So the apps present the parliamentary record and let people read it in context, rather than ranking anyone.

Neutral and non-partisan, with no spin. 

## How do I find out who my MP is?

Enter your postcode into Who Is My MP? and the app finds your MP and constituency.

From there you get a full MP profile built entirely from Parliament's own data:

- how your MP has voted in the House of Commons
- what they have said in debates, straight from Hansard
- the written questions they have tabled
- their registered interests
- the select committees they sit on
- the roles they hold and their election results

Everything links back to the source on parliament.uk, so you can read in more detail.

It is written in SwiftUI with no third party packages, and it talks directly to the Parliament Members, Votes, Hansard and Written Questions APIs, with postcodes.io handling the postcode lookup.

Download Who Is My MP? on the App Store: https://apps.apple.com/gb/app/id6801525476 Find out more at whoismymp.uk https://whoismymp.uk

## Is there an app for the House of Lords?

While I was at it, I built a second app, and it needed a very different approach.

Nobody has "their" peer. The House of Lords is not organised by geography, so a postcode is no use. What members of the House of Lords do have is deep specialist knowledge: medicine, transport, the law, the arts, defence, the Windrush generation, palliative care.

So The Lords is browse-first. Instead of a search box and a blank screen, you start from topics and professions. Searching "end of life care" or "railways" maps onto the categories Parliament uses behind the scenes, so you find peers with a registered interest or professional background in that area, along with their voting record in the House of Lords and their register of interests.

It is the app you open when you think "who in the Lords actually knows about this?"

Download The Lords on the App Store: https://apps.apple.com/gb/app/the-lords/id6801590675 Find out more at thelords.app https://thelords.app

## What the UK Parliament APIs taught me

The data is excellent and the documentation is patchy, which is a familiar combination. A few things I learnt the hard way:

- The Commons votes API silently caps results at 25 per request, so pagination is not optional.
- Constituency names need normalising before search (ampersands, "and", punctuation) or you get nothing back.
- In rural areas a postcode can sit a long way from where someone is standing, so location lookups need a widening fallback rather than a single request.
- Hansard search and Hansard overview endpoints use different parameter conventions for the same fields.

None of this is a complaint. It is exactly the kind of thing that only surfaces when you build something real.

## Try them

Both apps are free and live on the App Store now.

Who Is My MP? :  find your MP by postcode: https://whoismymp.uk 

The Lords : find peers by interest: https://thelords.app

If you work in politics, journalism, policy or civic tech, I would like to hear what you make of them, and what you would want a UK Parliament app to do next.
