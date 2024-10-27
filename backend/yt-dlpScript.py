import sys
import subprocess

def install_yt_dlp():
    try:
        # Upgrade pip to the latest version
        print("Upgrading pip...")
        subprocess.run([sys.executable, "-m", "pip", "install", "--upgrade", "pip"], check=True)

        # Install yt-dlp using pip
        print("Installing yt-dlp...")
        subprocess.run([sys.executable, "-m", "pip", "install", "-U", "yt-dlp[default]"], check=True)

        # Verify installation
        result = subprocess.run(["yt-dlp", "--version"], check=True, text=True, capture_output=True)
        print("yt-dlp version:", result.stdout.strip())
    
    except subprocess.CalledProcessError as e:
        print(f"Failed to install yt-dlp: {e}")
        sys.exit(1)

if __name__ == "__main__":
    install_yt_dlp()
