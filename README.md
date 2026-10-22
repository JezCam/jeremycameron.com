# jeremycameron.com

Personal site and blog, built with Jekyll on GitHub Pages.

## Writing a new post

Add a Markdown file to `_posts/` named `YYYY-MM-DD-title-in-kebab-case.md` with this front matter:

```yaml
---
layout: post
title: Post title
subtitle: Optional one-line subtitle
description: One sentence for search engines and link previews.
---
```

Push to `main` and it appears at the top of the home page list.

## Previewing locally (optional)

```sh
gem install jekyll
jekyll serve
```

Then open http://localhost:4000.
