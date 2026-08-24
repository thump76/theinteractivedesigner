---
title: Replacing a Saas product with Make.com
date: 2026-08-18
standfirst: ''
image: ''
imageAlt: ''
link: https://vendum.coffee
linkLabel: Related
linkedin: false
draft: true
---

A part of running a new coffee roasting business means you sell the beans online as a one off or as a subscription. When I found this this order management and fulfilment (who shall remain nameless) did the lot and even connected to stripe for the princely sum of £25, I thought great! Now I can think about something else. 

All was well for a couple of weeks then for some reason I stopped getting orders through or processed. On contacting support via chat they announced to me then that connecting via API was no longer part of the base tier that I was on. I thought that’s just perfect, all I have to do is pay them £60 instead and I get what I had a few weeks ago. I complained so much and told them this was not on. I felt like I had had the rug pulled from underneath me. 

Annoyingly I also had my customers data on there too. But thankfully at the time hardly any. As a gesture of good will they offered to put the API feature back for a year. But genie was out of the bottle now. If they are doing this now they could do it again either with feature withdrawal or ramping up the price. 

Also in a years time I would have even more customers to migrate. I needed a new solution. I knew Stripe did subscriptions and an excellent embeddable pricing table. However Stripe did not connect to a fulfilment partner easily for subscriptions except with another plugin. Support for plugins can be flakey and sometimes they get shelved. 

I then found Make.com. It connected with Stripe, Wordpress, Woocommerce, Google sheets. I had a plan. The learning curve with Make for me was steep as I didn’t know what some of the concepts were especially JSON and parsing JSON to get the data. It’s easy when you know how. 

The Make Scenario is:

1. Stripe module watches for a new invoice to be created
2.
