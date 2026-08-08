---
title: Who’s JSON and why is he now controlling my website?
date: 2026-08-08
standfirst: I had a dilemma. I needed to revive theinteractivedesigner.co.uk, a domain I have owned for the last 20 years. So what do you do? Build a WordPress site and upload 25 years of work, or try something different?
image: /images/uploads/IMG_0140.png
imageAlt: The interactive designer – the future of my posts
link: https://theinteractivedesigner.co.uk
linkLabel: The interactive designer
linkedin: true
draft: false
---

I had a dilemma. I needed to revive theinteractivedesigner.co.uk, a domain I have owned for the last 20 years. So what do you do? Build a WordPress site and upload 25 years of work, or try something different?

Honestly, I was bored of the ritual. Pay for yet another Digital Ocean droplet, spin up a database, install WordPress, then lose a day uploading content nobody will ever look at. And with WP there is always something to update: PHP, Apache, WordPress itself, the plugins. Everyone does this and it feels dated. Besides, there is always Behance for portfolios.

This time I had a second need. I wanted somewhere to post my musings on what’s going on each week. I considered Medium and LinkedIn, but I don’t know about you, I am tired of someone else owning my writing and putting a login in front of it. It doesn’t vibe with the internet I grew up with in 1998. There had to be another way.

So I wrote a list:

• A static site I can actually update, with no database

• Cheap or free hosting

• Little to no maintenance

• Able to push posts out to LinkedIn, Medium and the rest

• Each post needs a title, body, feature image and links

• Fast enough to keep Google happy with Lighthouse 

After a bit of research (thanks Claude) we landed on it. The site is built with Astro, so every article compiles to a plain HTML page. Content lives as flat files in a GitHub repo. The CMS is Sveltia, which is the clever bit: it has no server at all, it simply commits my edits straight to that repo. Which means every change I have ever made is version history. Twenty years of work with a full audit trail.

Then the party trick. When I publish, I tick one box and the post drops into a hidden RSS feed. Make watches that feed and publishes it to LinkedIn for me, image and all. This post got here without me logging into anything.

It all sits on Cloudflare. Total cost: £0. No hosting bill, no database, no patching PHP or Apache at midnight. The only thing I pay for is the domain.

AI keeps proving that if you can imagine it, it probably exists. What AI still can’t do is have the original thought. That’s where we come in: we have the idea, AI does the plumbing.

Anyone else gone database-free, or is everyone still patching WordPress?

theinteractivedesigner.co.uk
