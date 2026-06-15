import os
import subprocess
import time
from hermes_tools import terminal

def run_spike():
    print("🚀 Starting Visual Audit Spike...")
    
    # 1. Start dev server in background
    print("--- Starting Dev Server ---")
    server_proc = terminal(
        command="npm run dev", 
        background=True, 
        notify_on_complete=False, 
        workdir="/home/ubuntu/synapse-digest"
    )
    
    print("--- Waiting for server to initialize (15s) ---")
    time.sleep(15)
    
    try:
        print("--- Capturing Screenshots ---")
        
        playwright_script = """
import asyncio
from playwright.async_api import async_playwright

async def capture():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})
        
        await page.goto('http://localhost:3000')
        await page.wait_for_load_state('networkidle')
        
        await page.screenshot(path='light_mode.png', full_page=True)
        await page.emulate_media(color_scheme='dark')
        await page.screenshot(path='dark_mode.png', full_page=True)
        
        await browser.close()

asyncio.run(capture())
"""
        with open("capture.py", "w") as f:
            f.write(playwright_script)

        result = terminal(command="python3 capture.py", workdir="/home/ubuntu/synapse-digest")
        
        if result["exit_code"] != 0:
            print(f"❌ Capture failed: {result['output']}")
            return

        if os.path.exists("light_mode.png"):
            print("✅ light_mode.png captured. Absolute path: /home/ubuntu/synapse-digest/light_mode.png")
        else:
            print("❌ light_mode.png not found.")

        if os.path.exists("dark_mode.png"):
            print("✅ dark_mode.png captured. Absolute path: /home/ubuntu/synapse-digest/dark_mode.png")
        else:
            print("❌ dark_mode.png not found.")

    except Exception as e:
        print(f"❌ An error occurred during spike: {e}")
    finally:
        pass

if __name__ == "__main__":
    run_spike()
