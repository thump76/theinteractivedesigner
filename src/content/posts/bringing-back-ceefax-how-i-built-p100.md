---
title: 'Bringing back Ceefax: how I built P100'
date: 2026-07-30
standfirst: In light of the latest by election in Clackton on the 4th of july, I have decided to help count bin face with one of his election manifestos – bring back Ceefax.
image: /images/uploads/Screenshot 2026-07-30 at 3.12.34 pm.png
imageAlt: Internet TV https://p100.uk
link: https://p100.uk
linkLabel: P100 - Ceefax reborn
linkedin: true
draft: false
---

In light of the by-election in Clacton on 13 August, I have decided to help Count Binface deliver one of his manifesto pledges: bringing back Ceefax. It is a little early, as he has not been elected yet.

This is a project I have wanted to do for years. I have fond memories of getting home from school in 1982 and prodding at the new cathode ray tube in the living room, which had somehow acquired news, weather, showbiz, quizzes, puzzles and cheap flights to Florida. Fifteen years before the web reached most homes, that was a whole world of wonder rendered in seven colours on a black background.

p100.uk is named after page 100, which was the index. Three digits, then a short wait, exactly as it was.

The font is Bedstead by Ben Harris, and it is properly free. Public domain, no attribution required. It reproduces the Mullard SAA5050, the chip that drew teletext characters on British televisions and MODE 7 on the BBC Micro, working from a 5x9 pixel matrix with the diagonals smoothed in hardware. Bedstead converts that into real outlines, so it scales rather than going blocky. Harris reckons the original bitmap is public domain in the UK anyway, since typeface copyright expires after 25 years.

Every graphic on the site is text. The block shapes are Unicode sextants, which means there are no images anywhere on it. You can select the pictures with your cursor. This pleases me more than it should.

No database and no CMS. The pages are static files. The JavaScript pulls everything else from a Cloudflare Worker that proxies the feeds, which is necessary because the BBC does not send CORS headers and a browser cannot fetch them directly. Each route caches at the edge on its own timer: five minutes for news, fifteen for weather, an hour for the TV guide. It costs nothing to run.

The first version took a morning. The bugs took considerably longer. A global User-Agent string that fixed one feed and silently broke three others. Error responses caching at the edge, so a single bad fetch could haunt the site for an hour. A fix applied globally is a bug applied globally, apparently.

There is a holidays page on 220, for the same reason I remember the flights. It works through five deal feeds until one of them answers, then filters for departures from UK airports. If fewer than five survive the filter it gives up and shows you everything, which is how you end up looking at cheap flights out of Cleveland.

Ceefax ran for 38 years and ended at 23:32 on 23 October 2012, when Northern Ireland switched off the analogue signal. Nobody replaced it.

Clacton votes on 13 August. The rest of the manifesto involves capping 99 Flakes at 99p and nationalising Adele, so I have gone for the achievable one.

p100.uk.
