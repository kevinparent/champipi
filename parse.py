import json
import re
import unicodedata

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

# Load the input file
input_file = "champipi.json"  # Replace with your file name
output_file = "champipi_parsed.json"  # Replace with your desired output file name

# Read the input JSON file
with open(input_file, "r", encoding="utf-8") as file:
    data = json.load(file)

# Transform the data
transformed_data = []
for item in data:
    if "description" in item:
        transformed_descriptions = []
        for desc in item["description"]:
            if "description-id" in desc and "description" in desc:
                transformed_descriptions.append({
                    normalize_element_name(desc["description-id"]): desc["description"],
                    "description-name": desc["description-id"]
                })
        item["description"] = transformed_descriptions

# Write the transformed data to the output file
with open(output_file, "w", encoding="utf-8") as file:
    json.dump(data, file, indent=4)

print(f"Transformation complete. Output written to {output_file}")

