---
layout: post
title: "Jekyll… Beyond Github.io"
date: 2014-06-11 09:30:00
---

After playing with Jekyll for a couple of weeks, I felt it was time to push beyond my github.io installation and try setting it up on a VPS. I already have multiple apps running at Digital Ocean so they were the natural choice for this exercise.

Initially, I planned to deploy with Mina, a Ruby gem that I have found to be delightfully simple to set up. However I had never set up a remote git repository and this exercise was all about new challenges. I chose nginx for my HTTP server and its installation was entirely straight forward so I won’t elaborate here. As I plan to use this VPS for additional websites that may require different versions of Ruby, I chose to use rbenv for Ruby version control. I moved from RVM to rbenv locally about six months ago and I’ve found that I really like it.

The recipe that I followed to set up Jekyll and git on the VPS was from Digital Ocean entitled [How to Deploy Jekyll Blogs with Git](https://www.digitalocean.com/community/tutorials/how-to-deploy-jekyll-blogs-with-git). The only snag that I ran into is still unsolved and it involved a post-receive hook for pushing the git repo into production. The commands run fine when executed line by line on the server but I get a command not found error when I run the script. Every bit of advice I can find tells me that this is a path issue, however setting the path does not correct the error. When I figure this out, I’ll document it in another blog post.

Notes on what was installed on this VPS:
Ubuntu 14.04
Nginx
Git
Rbenv
Jekyll
