# Jonathan A. Pichardo — Professional Portfolio

**Defensive cyber operations · Cyber range engineering · Intelligence analysis**

[View the portfolio](https://mr-3xploit.github.io/) · [Connect on LinkedIn](https://www.linkedin.com/in/jonathanpichardo) · [Email Jonathan](mailto:jonathan.a.pichardo2.mil@gmail.com)

This repository contains the GitHub Pages portfolio of **WO1 Jonathan A. Pichardo**, a Cyber Operations Technician (170A) and Cyber Protection Team crew lead in the Maryland Army National Guard.

The site connects professional experience with concrete examples of engineering, operational leadership, and analysis. It is organized for recruiters, hiring managers, and technical peers who want to understand the work and explore the supporting qualifications.

## Featured experience

- **Build and sustain:** A personal, containerized cyber training range on AWS, with automated rebuilds, access controls, monitoring, and cost guardrails.
- **Lead and defend:** Crew leadership for defensive cyber operations and threat hunting during a combined IT/OT engagement at exercise Cyber Fortress.
- **Analyze and communicate:** Analytic products and briefings supporting federal, state, and local law enforcement during Counterdrug Task Force service.
- **Integrate and maintain:** Deployed systems and network integration in Kuwait and ISR systems sustainment in Djibouti.

The portfolio includes eight capability areas, service history, education, certifications, specialized training, and verification information.

## Repository scope

This is the source for the **portfolio website**. The AWS cyber range is a separate personal engineering project whose source repositories are private.

The range video uses sample data, with names, logos, and connection details replaced by placeholders. The diagram and six engineering layers are conceptual explanations, not network or deployment diagrams. Professional experience is described at the capability level.

## Website features

- Green-and-brass visual design with light and dark themes.
- A professional overview linked to detailed experience.
- A featured range video and six expandable engineering layers.
- Capability filters, credential tabs, and qualification detail dialogs.
- Responsive navigation, keyboard controls, reduced-motion support, and native dialogs.
- Direct email and LinkedIn contact, copy-email feedback, and a print/save-profile action.
- Progressive enhancement: core portfolio content remains readable without JavaScript.

## Structure

```text
.
├── index.html                 # Professional content and semantic page structure
├── assets/
│   ├── portfolio.css          # Design system, responsive layout, and print styles
│   ├── theme.js               # Applies the saved theme before the page renders
│   └── portfolio.js           # Navigation, filters, tabs, dialogs, and other controls
├── media/
│   ├── range-preview.jpg      # Video poster
│   └── range-preview.mp4      # Sanitized range interface demonstration
├── .nojekyll                  # Serve the static site without Jekyll processing
└── README.md
```

The site uses plain HTML, CSS, and JavaScript. It has no package installation or build step, backend, or database.

## Preview locally

Clone the repository, then run a local server from its root:

```sh
git clone https://github.com/Mr-3xploit/mr-3xploit.github.io.git
cd mr-3xploit.github.io
python -m http.server 8000 --bind 127.0.0.1
```

Open [localhost:8000](http://127.0.0.1:8000/). On Windows, `py -m http.server 8000 --bind 127.0.0.1` is an alternative when Python is available through the launcher.

## Updating the portfolio

Edit `index.html` for content, `assets/portfolio.css` for presentation, and `assets/portfolio.js` for interactions. Keep element IDs and their matching anchor, tab, and dialog references aligned.

Before publishing:

- Check the layout on desktop and phone widths in both themes.
- Exercise the capability filters, evidence links, range layers, credential tabs, and dialogs.
- Check keyboard navigation, focus return, contact links, and print preview.
- Confirm that media loads and that no local filesystem paths or private project details were introduced.
- Keep coursework distinct from certifications, stackable credentials clearly identified, and time-sensitive professional details current.

Optional JavaScript syntax checks, if Node.js is installed:

```sh
node --check assets/theme.js
node --check assets/portfolio.js
```

## Publishing

GitHub Pages publishes this repository's static site from `main`. Merge reviewed changes into `main`, then check the **pages build and deployment** run in [Actions](https://github.com/Mr-3xploit/mr-3xploit.github.io/actions) and confirm the result on the [live portfolio](https://mr-3xploit.github.io/).

## Contact and verification

For role discussions, technical interviews, or credential verification, contact [Jonathan by email](mailto:jonathan.a.pichardo2.mil@gmail.com) or [LinkedIn](https://www.linkedin.com/in/jonathanpichardo). Education and certifications are verifiable on request. Clearance verification is handled through a hiring organization's official security channels.
