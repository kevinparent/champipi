import json
import time
import openai

# 🔐 Ta clé API OpenAI
openai.api_key = "sk-..."  # remplace par ta propre clé

# 🔁 Résumer un texte via ChatGPT (GPT-4 recommandé)
def generer_resume_concis(texte):
    prompt = (
        "Voici un extrait de fiche descriptive d’un champignon. "
        "Fais un résumé concis (en 150 mots maximum), en français, informatif mais accessible :\n\n"
        f"{texte}"
    )

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",  # ou "gpt-3.5-turbo" si tu veux moins cher
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
        )
        return response['choices'][0]['message']['content'].strip()
    except Exception as e:
        print("Erreur :", e)
        return ""

# 📂 Charger les données avec champ "resume"
with open("champipi_avec_resume.json", "r", encoding="utf-8") as f:
    champignons = json.load(f)

# 🪄 Générer les résumés synthétiques
for i, champi in enumerate(champignons):
    if "resume_concis" in champi and champi["resume_concis"].strip():
        continue  # sauter si déjà résumé
    texte = champi.get("resume", "")
    if not texte.strip():
        champi["resume_concis"] = ""
        continue

    print(f"⏳ [{i+1}/{len(champignons)}] Résumé en cours…")
    champi["resume_concis"] = generer_resume_concis(texte)
    time.sleep(1.2)  # ⏱️ Pour respecter les limites de l’API (surtout avec GPT-4)

# 💾 Sauvegarder dans un nouveau fichier
with open("champipi_resume_concis_chatgpt.json", "w", encoding="utf-8") as f:
    json.dump(champignons, f, ensure_ascii=False, indent=2)

print("✅ Résumés terminés et enregistrés.")
