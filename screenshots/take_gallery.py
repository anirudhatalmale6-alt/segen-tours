from playwright.sync_api import sync_playwright

base = "file:///var/lib/freelancer/projects/40481937"
out = "/var/lib/freelancer/projects/40481937/screenshots"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 720})

    page.goto(f"{base}/gallery.html")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{out}/gallery_hero.png")

    page.evaluate("window.scrollBy(0, 720)")
    page.wait_for_timeout(800)
    page.screenshot(path=f"{out}/gallery_grid.png")

    page.evaluate("window.scrollBy(0, 720)")
    page.wait_for_timeout(800)
    page.screenshot(path=f"{out}/gallery_grid2.png")

    browser.close()
    print("Gallery screenshots done!")
