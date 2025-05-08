import json
import re
import unicodedata

from transformers import pipeline, AutoTokenizer
from time import sleep

def normalize_element_name(name):
    """
    Normalizes the given element name by:
    - Removing spaces and special characters
    - Replacing accented characters with their unaccented equivalents
    - Converting to uppercase
    """
    # Normalize Unicode to decompose accented characters (e.g., É -> E)
    name = unicodedata.normalize('NFD', name)
    # Remove diacritics (accents) by filtering out combining characters
    name = ''.join(char for char in name if not unicodedata.combining(char))
    # Remove all non-alphanumeric characters using regex
    normalized_name = re.sub(r'[^a-zA-Z0-9]', '', name)
    # Convert to uppercase for consistency
    normalized_name = normalized_name.upper()
    return normalized_name

def generer_resume(resume):
    res = ""

    if len(resume) > 0:
        try:
            tex = resume.strip()
            mots = tex.split()
            if len(mots) > 1000:
                tex = " ".join(mots[:1000])
            res = summarizer(tex, max_length=250, min_length=10, do_sample=False)[0]["summary_text"]
        except Exception as e:
            print(f"[Erreur à l’entrée] {e}")
            res = ""

    # Facultatif : pause pour éviter surcharge CPU ou throttling
    sleep(0.1)

    print(f"Résumé : {res}")

    return res;

tokenizer = AutoTokenizer.from_pretrained("plguillou/t5-base-fr-sum-cnndm", use_fast=False)
summarizer = pipeline("summarization", model="plguillou/t5-base-fr-sum-cnndm", tokenizer=tokenizer)

# Load the input file
input_file = "champipi.json"  # Replace with your file name
output_file = "champipi_parsed_2.json"  # Replace with your desired output file name

# Read the input JSON file
with open(input_file, "r", encoding="utf-8") as file:
    data = json.load(file)

# Transform the data
resume = ""
transformed_data = []
for item in data:
    print(f"Transforming. {item['list champi']}")
    if "description" in item:
        item.pop("web-scraper-order")
        item.pop("web-scraper-start-url")
        item.pop("list select")
        item.pop("list select-href")
        item.pop("champiTitre")
        item.pop("description-id")
        item.pop("groupe")
        transformed_descriptions = []
        for desc in item["description"]:
            resume = "\n\n".join(
                d["description-id"].strip() + " " + d["description"].strip()
                for d in item["description"]
                if "description" in d and d["description"].strip() and d["description-id"] not in ["Remarques", "Références", "Adaptation", "titres"]
            )
            item["resume"] = resume
            if "description-id" in desc and "description" in desc:
                if desc["description-id"] not in ["Remarques", "Références", "Adaptation", "titres"]: 
                    transformed_descriptions.append({
                        normalize_element_name(desc["description-id"]): desc["description"],
                        "description-name": desc["description-id"]
                    })
        item["description"] = transformed_descriptions
        item["resume_concis"] = generer_resume(resume)
       # item["resume"] = resume.strip()

# Write the transformed data to the output file
with open(output_file, "w", encoding="utf-8") as file:
    json.dump(data, file, indent=4)

print(f"Transformation complete. Output written to {output_file}")

