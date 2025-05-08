import json
import re
import unicodedata
from openai import OpenAI;

client = OpenAI(api_key = "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")  # Remplace par ta propre clé API OpenAI

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
    normalized_name = re.sub(r'[^a-zA-Z0-9]', '', name)
    # Convert to uppercase for consistency
    normalized_name = normalized_name.upper()
    return normalized_name

def generer_resume(resume):
    res = ""

    prompt = (
        "Voici un extrait de fiche descriptive d’un champignon. "
        "Fais un résumé concis (en 150 mots maximum), en français, informatif mais accessible :\n\n"
        f"{resume}"
    )

    try:
        response = client.chat.completions.create(
            model="gpt-4.1",  # ou "gpt-3.5-turbo"
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.3
        )
        res = response.choices[0].message.content.strip()
    except Exception as e:
        print("Erreur :", e)
        res = ""

    print(f"Résumé généré : {res}")

    return res;

#tokenizer = AutoTokenizer.from_pretrained("plguillou/t5-base-fr-sum-cnndm", use_fast=False)
#summarizer = pipeline("summarization", model="plguillou/t5-base-fr-sum-cnndm", tokenizer=tokenizer)

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

