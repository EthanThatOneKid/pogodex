# Changelog
> This document contains a list of descriptions for each time I make a major change to the project

## 8/2/19: Removed Shield Badges
I noticed that the page was extremely slow to load. I had been using shields.io badges as little elements to display information about each Pokemon. Today, I changed that and replaced them with my own [KeyVal](src/components/keyval.js) component to hopefully lighten the load of the site. In the end, the webpage went from 34.99s to completely load to 25.18s. That is a whopping 9.81s saved! I am, overall, happy with the outcome of this change.
