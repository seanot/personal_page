---
layout: post
title: "Jekyll... First Impressions"
date: 2014-05-25 09:30:00
categories: jekyll coding
---

After ignoring my personal site for the better part of the last six months, I finally upgraded from hardcoded HTML to the Jekyll static site generator. The transition is ongoing as I've not yet really added any styling to the site but the mechanical elements are up and running. What follows is a review of some of the difficulties that I had in getting the site up and running on Github Pages along with the solutions that I discovered.

Running Jekyll locally is simple and straight forward on a Mac – less so an a Windows Machine. The reasons for this are the availability of Ruby and Python right out of the box on the Mac. Windows users have some installations to do before getting around to installing Jekyll. For Mac users, the following commands get you started:
{% highlight ruby %}
~ $ gem install jekyll
~ $ jekyll new new_blog_name
~/new_blog_name $ jekyll serve –w
{% endhighlight %}

This created a basic Jekyll framework in the new_blog_name directory that has all of the basic files necessary to publish your blog. Note that when I start the Jekyll server with the “Jekyll serve” command, I follow it with “-w”. This adds a watcher to the server that regenerates the site files on each saved change. It’s worth noting, however, that config files, headers and footers are not detected by the watcher and require a control-c restart of the server in order to be regenerated.

One of the comments that I saw posted on Jekyll’s help page mentioned that Github was not running the latest version of the software leading to potential compatibility issues for those using the newest features. The solution is to add a Gemfile to your root directory with the following content:
{% highlight ruby %}
source https://rubygems.org

gem “github-pages”
{% endhighlight %}

Notes:
<ul>
  <li>Jekyll docs recommend putting the _site directory in your .gitignore file as Github auto-generates the _site directory on each push.</li>
  <li>Unless you are using Project Pages on your site, you will push to master.</li>
  <li>If you have a custom domain specified, be sure to put a file named CNAME in your root directory with your URL as its only content.</li>
  <li>I like the ability to use both Markdown and HTML  for your pages. I wanted a call to my resume to open a new tab and found that this was challenging in Markdown. I, instead, wrote it in HTML with a simple “target=_blank” in the href.</li>
</ul>
Overall, I found Jekyll to be easy to install and modify. With Github Pages costing nothing, it’s a great way to host a static website and blog.
