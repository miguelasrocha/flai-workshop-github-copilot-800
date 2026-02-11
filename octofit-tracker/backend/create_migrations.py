import subprocess
import sys

# Run makemigrations with automatic responses
process = subprocess.Popen(
    [sys.executable, 'manage.py', 'makemigrations'],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True,
    cwd='/workspaces/flai-workshop-github-copilot-800/octofit-tracker/backend'
)

# Answers for the interactive prompts
# 1. Was user.name renamed to user.full_name? Answer: N
# 2. Select an option: 1 (provide a one-off default)
# 3. Enter default value: 'Unknown'
# 4. Was user.name renamed to user.username? Answer: N
# 5. Select an option: 1
# 6. Enter default value: 'unknown'

responses = "N\n1\n'Unknown'\nN\n1\n'unknown'\n"

output, errors = process.communicate(input=responses)
print(output)
if errors:
    print(errors, file=sys.stderr)

sys.exit(process.returncode)
