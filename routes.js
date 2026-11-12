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
    "description": "Case study: a guided tool that makes a personalized saddle fitting service work reliably at the point of sale, for staff at any level of expertise.",
    "image": "og-fizik.jpg"
  },
  {
    "page": "fleetwatch",
    "path": "/fleetwatch",
    "title": "Fleetwatch Cockpit | Maryam Moradian, Product Designer",
    "description": "A weekly decision tool for a fleet manager, built to show what needs attention, how sure the system is, and what happens next.",
    "image": "og-fleetwatch.jpg"
  },
  {
    "page": "footcare",
    "path": "/footcare",
    "title": "Preventive Foot Care Platform | Maryam Moradian, Product Designer",
    "description": "Case study: a dual-user monitoring system that makes biomechanical foot health data interpretable for individuals and the professionals supporting them.",
    "image": "og-footcare.jpg"
  }
];

window.SITE_ORIGIN = "https://maryammoradian.com";
