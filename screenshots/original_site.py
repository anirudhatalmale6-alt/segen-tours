from playwright.sync_api import sync_playwright

out = "/var/lib/freelancer/projects/40481937/screenshots"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 720})

    page.goto("https://segengo.com", wait_until="domcontentloaded")
    page.wait_for_timeout(5000)
    page.screenshot(path=f"{out}/original_home.png")

    page.evaluate("window.scrollBy(0, 720)")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{out}/original_home2.png")

    page.evaluate("window.scrollBy(0, 720)")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{out}/original_home3.png")

    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(2000)
    page.screenshot(path=f"{out}/original_footer.png")

    browser.close()
    print("Original site screenshots done!")
