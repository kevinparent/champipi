import json

def fusionner_descriptions(objets):
    for obj in objets:
        descriptions = obj.get("description", [])
        texte_complet = []

        for d in descriptions:
            contenu = d.get("description", "").strip()
            if contenu:
                texte_complet.append(contenu)

        # Joindre tous les blocs de texte avec deux retours à la ligne
        texte_fusionne = "\n\n".join(texte_complet)
        obj["texte"] = texte_fusionne

    return objets

# Charger depuis un fichier JSON existant
with open("champipi.json", "r", encoding="utf-8") as f:
    lignes = f.read().strip().split("\n")
    objets = [json.loads(ligne) for ligne in lignes if ligne.strip()]

# Fusionner les descriptions
objets_enrichis = fusionner_descriptions(objets)

# Sauvegarder dans un nouveau fichier
with open("champipi_texte.json", "w", encoding="utf-8") as f:
    for obj in objets_enrichis:
        json.dump(obj, f, ensure_ascii=False)
        f.write("\n")
