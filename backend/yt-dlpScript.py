import os
import sys
import subprocess
import platform
import urllib.request

def install_yt_dlp():
    # Set download URL for yt-dlp based on platform
    yt_dlp_url = "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp"
    
    # Set install path for yt-dlp
    install_path = "/usr/local/bin/yt-dlp"
    
    try:
        # Download the yt-dlp binary
        print("Downloading yt-dlp...")
        urllib.request.urlretrieve(yt_dlp_url, install_path)
        
        # Make the file executable
        os.chmod(install_path, 0o755)
        
        print("yt-dlp installed successfully!")
        
        # Verify installation
        result = subprocess.run(["yt-dlp", "--version"], check=True, text=True, capture_output=True)
        print("yt-dlp version:", result.stdout.strip())
    
    except Exception as e:
        print(f"Failed to install yt-dlp: {e}")
        sys.exit(1)

if __name__ == "__main__":
    install_yt_dlp()
