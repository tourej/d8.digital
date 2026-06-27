---
name: project-formspree-todo
description: Contact form in contact.html is inert — to be wired to Website OS form engine after D8 project is added there
metadata:
  type: project
---

Contact form at `/contact.html` has `action="#"` (inert placeholder). Formspree was removed in favor of Website OS as the form engine.

**Why:** Website OS will handle form submission, routing, and notifications centrally instead of a third-party dependency.

**How to apply:** After deploying the D8 site, add the D8 project folder to Website OS, then wire the contact form action to the Website OS form endpoint. The placeholder is marked with a `<!-- TODO: FORM ENGINE -->` comment in `contact.html`.
