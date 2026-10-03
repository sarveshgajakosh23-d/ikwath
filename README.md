# iKwath

Frontend website for **iKwath – A Pod-Based Smart Kwatha (Kadha) Maker**.

- Team: The Infinity Loops (Team ID 172414)
- Smart India Hackathon, Problem Statement 26048
- Theme: MedTech / BioTech / HealthTech, Category: Hardware

## Run locally

No build step. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Structure

```
index.html
css/style.css
js/main.js      # brew simulator
assets/         # images from the project presentation
```

Google Fonts (Bricolage Grotesque, Newsreader) load from the web, so fonts need an internet connection.

The brew simulator illustrates the intended design targets (400 mL to ~100 mL, 85-90 C), not measured machine data.
