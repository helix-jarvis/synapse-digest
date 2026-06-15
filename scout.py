import argparse
import os
import sys

def main():
    parser = argparse.ArgumentParser(description="Synapse Digest Orchestration Engine")
    parser.add_argument("--mode", choices=["burst", "manual", "status"], default="status",
                        help="Execution mode: burst (Parallel Batch), manual (Guided), or status (System check)")
    parser.add_argument("--project", default="synapse-digest",
                        help="Project directory name")
    
    args = parser.parse_args()

    print(f"--- Synapse Digest Orchestration Engine | Mode: {args.mode.upper()} ---")
    
    project_path = os.path.abspath(args.project)
    if not os.path.exists(project_path):
        print(f"Error: Project directory '{args.project}' not found.")
        sys.exit(1)

    if args.mode == "status":
        print(f"Project Path: {project_path}")
        print(f"Agent Schema: {os.path.join(project_path, 'AGENTS.md')}")
        print("Cron Status: Scheduled (Check via 'cronjob list')")
        
    elif args.mode == "burst":
        print("Initiating Parallel Burst Mode...")
        print("Instruction: Hand over to Hermes Agent via 'delegate_task' to execute the parallel workflow.")
        print("Workflow: Scout $\\rightarrow$ [Parallel Analyst Workers] $\\rightarrow$ Designer $\\rightarrow$ DevOps.")
        
    elif args.mode == "manual":
        print("Initiating Manual Orchestration Mode...")
        print("Instruction: Follow the Kanban lanes defined in AGENTS.md manually.")

if __name__ == "__main__":
    main()
