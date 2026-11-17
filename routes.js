// routes.js: the single list of pages and their URLs.
// Read by App.jsx (client-side routing, document.title) and by build-pages.py
// (writes one static index.html per route at deploy time, with its own <head>).
//
// To add a page: add an entry here, add its case in App.jsx renderPage(),
// and add a cp line in deploy.sh for its og image.
// Everything after "window.SITE_ROUTES =" must stay valid JSON (double quotes,
// no trailing commas, no comments) so build-pages.py can parse it.
window.SITE_ROUTES = [
  {
    "page": "home",
    "path": "/",
    "title": "Maryam Moradian | Product Designer",
    "description": "Maryam Moradian is a product designer in Düsseldorf who shapes complex products into clear, usable systems. Selected work in B2B retail tech and healthtech.",
    "image": "og-default.jpg"
  },
  {
    "page": "about",
    "path": "/about",
    "title": "About | Maryam Moradian, Product Designer",
    "description": "About Maryam Moradian, product designer in Düsseldorf, Germany: background, experience, how she works, and how to get in touch.",
    "image": "og-default.jpg"
  },
  {
    "page": "fizik",
    "path": "/fizik",
    "title": "Fizik 121 Platform | Maryam Moradian, Product Designer",
    "description": "Turning a complex, specialist-dependent 3D-printed saddle service into a repeatable point-of-sale workflow for global bike retailers.",
    "image": "og-fizik.jpg"
  },
  {
    "page": "fleetwatch",
    "path": "/fleetwatch",
    "title": "Fleetwatch Cockpit | Maryam Moradian, Product Designer",
    "description": "Designing a low-noise decision space for fleet operations, shaped around uncertain data, blind spots, and offline team hand-offs.",
    "image": "og-fleetwatch.jpg"
  },
  {
    "page": "footcare",
    "path": "/footcare",
    "title": "Preventive Foot Care Platform | Maryam Moradian, Product Designer",
    "description": "Translating clinical biomechanics research into a dual-user digital architecture for early detection and longitudinal foot health monitoring.",
    "image": "og-footcare.jpg"
  }
];

window.SITE_ORIGIN = "https://maryammoradian.com";
