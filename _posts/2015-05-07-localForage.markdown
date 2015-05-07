---
layout: post
title: "Local Storage with localForage"
date: 2015-05-07 14:30
description: localForage usage with search and update functions
keywords: localForage
catagories: coding
comments: true
---

Over the past several months, I have been working on a project that provides scheduling, invoicing and payroll for a small contracting firm. Cost constraints dictate a responsive web app versus native apps – at least for now. Schedule creation and manipulation and payroll are pretty much handled in an office environment with a reliable web connection but clocking of hours and invoicing can happen either in the office or in the field. The geographical reach of this firm made it almost certain that mobile users would find themselves without a reliable internet connection much of the time.

Perfect use case for WebSQL! No, wait… deprecated and not available in all browsers. Okay, how about IndexedDB? Not universally supported in older browser versions. Well then localStorage, right? Not if we plan to store objects.

Enter localForage – Mozilla’s JavaScript library that utilizes IndexedDB, WebSQL, and localStorage when all else fails. And it even works asynchronously to make the user experience more pleasant. Documentation is light but adequate, [localForage](https://mozilla.github.io/localForage/), and there are a few blog posts that basically parrot the Mozilla docs.

Before I get into how I put localForage to work, let’s go over the use case. My client employs skilled laborers that have a need to see schedules and other documentation pertaining to the specific jobs to which they have been assigned. They need to have the ability to clock in and out and record start and stop times for those specific jobs. Most of their interaction with the app will be remote via mobile devices. Here are the constraints that matter for the clock functionality: unreliable internet connections; a wide variety of mobile devices likely to be used; and the possibility of clocking in and out on different devices.

With the use case and constraints in mind, I decided that local persistence, periodically synced with the server would provide assurance that time data was being accurately recorded and would allow for the possibility of multiple devices being used by the same user.

I chose Rails 4.2 for the app utilizing HTML and ERB for the various entry forms while everything else resembles a single page app. While I enjoy working with Rails, I fear the dependencies that come with using additional gems. I also dislike using gemified versions of JavaScript libraries as I have no control over library versions employed. Instead, I use Bower (clean, without the gem) to manage the few libraries that I use and I write my own code (in most cases) to fulfill the needs I might otherwise find in a gem or two. I also utilize services to keep my models and controllers on task but that is a story for another day.

Learning the localForage library was pretty painless. The data API contains only eight functions and I found myself using only for four of them.
{% highlight javascript %}
Used: getItem(), setItem(), removeItem(), iterate()
 Not used: clear(), length(), key(), keys()
{% endhighlight %}
Intitally I also used `keys()` and `length()` but no longer found them useful once I switched from integer ids to uuids. uuids made synchronization much simpler than it otherwise might have been. And in keeping with my fear of dependencies, I forewent the use of a gem to manage the uuid process. It’s not complicated; just do it. I used `clear()` from the browser console's commandline while I was testing.

There is nothing that I can share in the way of general usage of localForage that adds to the general knowledgebase. However, you’ll notice in the short list of functions that there is no mention of search or update so I’ll touch on how I handled those.

Search was accomplished by way of the `iterate()` function. Here’s an example:
{% highlight javascript %}
localforage.iterate(function(value, ke) {
    console.log('checking local db for start key');
    if (value.start && value.stop == null) {
        console.log('found one');
        key = ke;
    }
    return key;
});
{% endhighlight %}
If your search might return more than one record, push the keys into an array. Simple.

Updates were also pretty straight forward.
{% highlight javascript %}
localforage.getItem(key, function(err, value) {
    /* modify you value here */
    localforage.setItem(key, value, function(err, response) {
        console.log(response);
    });
});
{% endhighlight %}
You are going to want to generate your uuids locally. I looked at several examples around the internet and found the same basic structure in all of them. I ended up writing mine to incorporate date (performance.now) into the randomness as I haven’t any control over the Math.random function in my user’s browsers.
{% highlight javascript %}
function generateGuid() {
    var d = performance.now();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16|0;
        d = Math.floor(d/16);
        return (c == 'x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}
{% endhighlight %}
Syncing with the server was simple as well but outside the scope of this post. Maybe, once I’ve refactored my JavaScript a bit more, I’ll post something on how I handled it.

If you haven’t tried localForage in your web apps, you should. There is no reason, with the tools available today, that we should leave our users stranded if their internet connection goes down.

{% if page.comments %}
<div id="disqus_thread"></div>
<script type="text/javascript">
    /* * * CONFIGURATION VARIABLES * * */
    var disqus_shortname = 'seanotoole';

    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>
{% endif %}
