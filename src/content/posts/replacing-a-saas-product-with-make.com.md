---
title: Replacing a Saas product with Make.com & Stripe
date: 2026-08-24
standfirst: My fulfilment platform switched off the API I was paying for, then offered to sell it back at more than double the price. Here's what I built instead with Stripe, Make.com and WooCommerce.
image: /images/uploads/ScreenshotMake copy.jpg
imageAlt: Make.com coffee subscription with Stripe
link: https://vendum.coffee/coffee-morning-subscription/
linkLabel: Coffee bean subscription at vendum.coffee
linkedin: true
draft: false
---

Part of running a new coffee roasting business is selling beans online, as a one off or a subscription. When I found an order management and fulfilment platform for Subscriptions (who shall remain nameless) that did the lot and even connected to Stripe for the princely sum of £25 a month, I thought great! Now I can think about something else.

All was well for a couple of weeks, then orders stopped coming through. Support told me over chat that connecting via API was no longer part of the base tier I was on. Just perfect. All I had to do was pay them £60 a month instead and I'd get back what I had a few weeks ago. I complained and told them this was not on. It felt like they pulled  rug pulled from under me.

Annoyingly my customer data was on there too, though thankfully not much of it yet. As a gesture of goodwill they offered to put the API back for a year. But the genie was out of the bottle. If they could do this now, they could do it again, by withdrawing features or ramping up the price.

And in a year's time I'd have even more customers to migrate. I needed a new solution. Stripe does subscriptions and an excellent embeddable pricing table, but it doesn't do fulfilment for subscriptions without another plugin, and plugin support can be flaky. Sometimes they just get shelved.

Then I found Make.com. It connects to Stripe, WordPress, WooCommerce and Google Sheets. I had a plan. The learning curve was steep, mostly because I didn't know much about JSON feeds and how to parse it to get at the data. It's easy when you know how.

My Subscription Make.com scenario is:

1. Stripe watches for an invoice being paid. Not created, paid. Stripe raises an invoice for every subscription renewal.
2. A filter checks the invoice belongs to a subscription. Anything else on that webhook gets ignored.
3. Make calls the Stripe API for the price on the invoice, with the product expanded. The invoice only gives you a price ID, so this second call pulls back the full product.
4. Each product in Stripe has three bits of metadata I added by hand: the SKU, the WooCommerce product ID and the variation ID. Make reads those into variables. This is what joins the two systems together.
5. Make creates the order in WooCommerce. Name, email, billing and shipping address come from the invoice, the line item is the product from step 4, the total is converted from pence to pounds, the Stripe event ID goes in as the transaction ID, and the order is marked paid and set to Processing.

From there it's just another WooCommerce order. Packing, labels and customer emails carry on exactly as they do for a one-off purchase. My customer data lives on Stripe so it's all secure. So far so good. Nobody gets to pull the rug from under me twice. Now I can get back to work!  

Has anyone else had trouble with SaaS products moving the goalposts?
