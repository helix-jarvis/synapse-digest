import os
import datetime
import sys
from hermes_tools import web_search, web_extract, write_file

def scout():
    print("Starting AI Scout...")
    
    # 1. Search for news
    search_results = web_search(query="latest AI research news and blog posts", limit=5)
    
    if not search_results or not search_results.get('data', {}).get('web'):
        print("No search results found.")
        return

    articles = search_results['data']['web']
    content_summary = "# Daily AI Intelligence Digest\n\n"
    
    for i, article in enumerate(articles):
        url = article['url']
        title = article['title']
        print(f"Scouting: {title}")
        
        try:
            # 2. Extract content
            extracted = web_extract(urls=[url])
            content = extracted['results'][0]['content']
            
            # Since I can't call the LLM directly inside a standalone script without an API key
            # (and the script runs in a separate process), I will simulate a summary
            # or rely on the agent to run this script. 
            # However, for a real "agentic" scout, the script should be run BY me.
            # Let's create a template that I (the agent) can fill.
            
            content_summary += f"## {title}\n"
            content_summary += f"*Source: [{url}]({url})*\n\n"
            content_summary += f"{content[:500]}...\n\n" # Placeholder
            
        except Exception as e:
            print(f"Failed to extract {url}: {e}")

    # 3. Create the markdown file
    date_str = datetime.datetime.now().strftime("%Y-%m-%d")
    filename = f"content/scout_{date_str}.md"
    
    # We'll append the metadata manually to ensure it works
    with open(filename, 'w') as f:
        f.write(f"---\ntitle: \"AI Daily Digest - {date_str}\"\ndate: \"{date_str}\"\nsummary: \"Automated AI news summary.\"\ncategory: \"News\"\n---\n\n")
        f.write(content_summary)
        
    print(f"Successfully created {filename}")

if __name__ == "__main__":
    scout()
