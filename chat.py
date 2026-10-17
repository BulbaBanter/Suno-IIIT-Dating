import os
from pathlib import Path

for line in Path(__file__).with_name(".env").read_text().splitlines():
    key, _, value = line.partition("=")
    if key == "SARVAM_API_KEY" and value:
        os.environ.setdefault(key, value)

from sarvamai import SarvamAI


client = SarvamAI()
response = client.chat.completions(
    model="sarvam-105b-conversations",
    messages=[{"role": "user", "content": "Say hello in one sentence."}],
)
print(response.choices[0].message.content)
