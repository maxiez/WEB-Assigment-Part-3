# CodeMzansi website

**Module:** WEB DEVELOPMENT (INTRODUCTION), WEDE5020 | **Assessment:** Part 3

So, CodeMzansi is this non-profit organisation that… yeah basically goes around Africa and teaches young people free computer skills, hardware repair and digital literacy. This is its website, kind of like the main place where everything lives.

## Pages and files

| File | What it does |
|---|---|
| `index.html` | Home page with a "Get involved" pop- up (modal) |
| `about.html` | Our story, mission and team shown in tabs |
| `services.html` | Course list with search, filter and sort, plus an FAQ accordion |
| `enquires.html` | Enquiry form with validation, AJAX and a response about cost and availability |
| `contacts.html` | Contact form that builds an email, plus an interactive map |
| `gallery.html` | Photo gallery with a lightbox |
| `css_assets/mystyle.css` | All the styling |
| `jsassets/myfirstscript.js` | All the JavaScript (one function per feature) |
| `_Images/` | Local images with descriptive file names |
| `robots.txt`, `sitemap.xml` | SEO files |

Libraries used (from cdnjs) jQuery 3.7.1, Leaflet 1.9.4 (map), Lightbox2 2.11.4 (gallery). Not too many, just the ones needed for each feature.

## Features (Part 3)

**JavaScript**
* Tabs (about page), accordion and course search (services page), modal (home page) using jQuery. Mostly for the UI stuff, you click, it switches, things slide, etc.
* Interactive map with markers and a "Show my location" button (Leaflet).
* Gallery with lightbox (Lightbox2).
* Animations: CSS hover transitions on buttons , menu and cards. also some jQuery fade and slide effects.
* DOM manipulation: the course cards, drop-down options, error messages and responses are created by JavaScript. Like, it builds them on the fly.
* Dynamic content: the courses come from an array in the JavaScript file and are shown as cards. The user can search, filter by category and sort too, pretty straight.

# Changelog

### New in Part 3
* **Tabs** on the about page (story, mission and vision, team), yeah this part is more interactive now.
* **Accordion** on the services page (three FAQ questions , one open at a time). Not all at once , only one, keeps it clean.
* **Modal** on the home page ("Get involved"). It pops up, you close it, then continue.
* **Interactive map** on the contact page with three markers, and a "Show my location" button. 
* **Gallery page** (`gallery.html`) with a lightbox for six images, and a Gallery link in the menu on every page, so you don’t miss it.
* **Dynamic content and search:** the services page builds course cards from a JavaScript array. there’s a search box, category filter and sort drop-down, and also a result count.
* **Animations:** fade in and out on the modal and tabs, slide effect on the accordion, hover effects on cards, buttons and menu. 
* **Enquiry form:** new fields, JavaScript validation with error messages, AJAX submit, and a response with cost and availability.
* **Contact form:** new fields, JavaScript validation with error messages, and an email that is built from the answers, based on what the user types.
* **SEO:** new titles, meta descriptions and meta keywords, alt text, descriptive image names, internal links, `robots.txt` and `sitemap.xml`.
* **Navigation:** the current page is highlighted, and a footer with links was added to every page.
* **README:** added Part 3 information, this changelog and the references.

**References:**

Sitemaps.org. 2020. Sitemaps XML format. [Online]. Available at: https://www.sitemaps.org/protocol.html [Accessed 16 October 2026].

Dhakar, L. 2018. Lightbox2 (version 2.11.4). [Online]. Available at: https://lokeshdhakar.com/projects/lightbox2/ [Accessed 17 October 2026].

Agafonkin, V. 2023. Leaflet: an open-source JavaScript library for mobile-friendly interactive maps (version 1.9.4). [Online]. Available at: https://leafletjs.com [Accessed 22 October 2026].

MDN Web Docs. 2026a. Using the dialog element and ARIA tab, accordion and modal patterns. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog [Accessed 22 October 2026].

MDN Web Docs. n.d.e. Array.prototype.sort(). Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort [Accessed 14 October 2026].

MDN Web Docs. n.d.f. CSS grid layout. Mozilla. [Online]. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout [Accessed 12 October 2026].

jQuery. 2023. jQuery (version 3.7.1). OpenJS Foundation. [Online]. Available at: https://jquery.com [Accessed 26 October 2026].

