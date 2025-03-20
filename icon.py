import os
import requests
from concurrent.futures import ThreadPoolExecutor

def download_icon(chara_id):
    url = f"https://bestdori.com/res/icon/chara_icon_{chara_id}.png"
    save_path = os.path.join("icon", f"chara_icon_{chara_id}.png")
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        with open(save_path, "wb") as f:
            f.write(response.content)
        print(f"Downloaded icon {chara_id}")
    except Exception as e:
        print(f"Error downloading icon {chara_id}: {e}")

def main():
    if not os.path.exists("icon"):
        os.makedirs("icon")
    
    # Download icons 1-40 concurrently
    with ThreadPoolExecutor(max_workers=5) as executor:
        executor.map(download_icon, range(1, 41))

if __name__ == "__main__":
    main()