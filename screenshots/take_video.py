from playwright.sync_api import sync_playwright

base = "file:///var/lib/freelancer/projects/40481937"
out = "/var/lib/freelancer/projects/40481937/screenshots"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 720})

    page.goto(f"{base}/index.html")
    page.wait_for_timeout(2000)
    # Scroll past hero to see video section
    page.evaluate("window.scrollTo(0, 750)")
    page.wait_for_timeout(1500)
    page.screenshot(path=f"{out}/home_video.png")

    browser.close()
    print("Video section screenshot done!")
