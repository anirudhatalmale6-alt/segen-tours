from playwright.sync_api import sync_playwright
import os

os.makedirs("/var/lib/freelancer/projects/40481937/screenshots", exist_ok=True)
base = "file:///var/lib/freelancer/projects/40481937"
out = "/var/lib/freelancer/projects/40481937/screenshots"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 720})

    page.goto(f"{base}/index.html")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{out}/home_hero.png")

    page.evaluate("window.scrollBy(0, 720)")
    page.wait_for_timeout(800)
    page.screenshot(path=f"{out}/home_about.png")

    page.evaluate("window.scrollBy(0, 720)")
    page.wait_for_timeout(800)
    page.screenshot(path=f"{out}/home_services.png")

    page.evaluate("window.scrollBy(0, 720)")
    page.wait_for_timeout(800)
    page.screenshot(path=f"{out}/home_packages.png")

    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(800)
    page.screenshot(path=f"{out}/home_footer.png")

    page.goto(f"{base}/packages.html")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{out}/packages.png")

    page.evaluate("window.scrollBy(0, 720)")
    page.wait_for_timeout(800)
    page.screenshot(path=f"{out}/packages_cards.png")

    page.goto(f"{base}/booking.html")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{out}/booking.png")

    page.goto(f"{base}/contact.html")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{out}/contact.png")

    page.goto(f"{base}/services.html")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{out}/services.png")

    page.goto(f"{base}/about.html")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{out}/about.png")

    browser.close()
    print("Done!")
