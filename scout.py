import subprocess
import json
import sys

def run_command(cmd):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return result.stdout

def main():
    # We use the shell to run web_search if possible, or just provide instructions.
    # Since I cannot easily call hermes_tools from a subprocess without complex setup,
    # I will provide a list of high-quality URLs to check or use a simple search.
    # Actually, the best way is for the Agent to do the work.
    print("Ready for Agent instructions.")

if __name__ == "__main__":
    main()
