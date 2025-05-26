window.arbreGuide = [
  {
    "etape": 1,
    "titre": "Forme générale",
    "question": "Quelle est la forme générale du champignon ?",
    "type": "choix",
    "cle": "forme",
    "options": [
      { "valeur": "chapeau", "label": "Avec chapeau" },
      { "valeur": "corail", "label": "Forme de massue ou de corail" },
      { "valeur": "boule", "label": "En boule ou globuleux" },
      { "valeur": "gelatine", "label": "Gélatineux ou visqueux" },
      { "valeur": "croute", "label": "En croûte ou en nappe" }
    ]
  },
  {
    "etape": "couleur_gelatine",
    "titre": "Couleur Gélatine",
    "question": "Quelle est la couleur du champignon gélatineux?",
    "type": "choix",
    "cle": "couleur_gelatine",
    "condition": {
      "cle": "forme",
      "valeurs": ["gelatine"]
    },
    "options": [
        { "valeur": "jaune", "label": "Jaune vif ou doré" },
        { "valeur": "orange", "label": "Orange ou orangé translucide" },
        { "valeur": "brun", "label": "Brun clair à brun foncé" },
        { "valeur": "noir", "label": "Noir ou noirâtre luisant" },
        { "valeur": "violet", "label": "Violet ou lilas (ex. Ascocoryne)" },
        { "valeur": "rose", "label": "Rose ou saumon (rare mais possible)" },
        { "valeur": "vert_olive", "label": "Vert olive (ex. Leotia lubrica)" },
        { "valeur": "transparent", "label": "Transparent ou gélatineux clair" },
        { "valeur": "gris", "label": "Gris ou noir fumé" }
    ]
  },
  {
    "etape": "couleur_externe_boule",
    "titre": "Couleur Externe",
    "question": "Quelle est la couleur externe du champignon?",
    "type": "choix",
    "cle": "couleur_externe_boule",
    "condition": {
      "cle": "forme",
      "valeurs": ["boule"]
    },
    "options": [
        { "valeur": "blanc", "label": "Blanc" },
        { "valeur": "brun ou clair", "label": "Brun" },
        { "valeur": "ocre", "label": "Ocre" },
        { "valeur": "gris", "label": "Gris" },
        { "valeur": "jaune", "label": "Jaune" },
        { "valeur": "olive", "label": "Olive" },
        { "valeur": "noir", "label": "Noir" }
        ]
  },
  {
    "etape": "couleur_interne_boule",
    "titre": "Couleur Interne",
    "question": "Quelle est la couleur interne du champignon?",
    "type": "choix",
    "cle": "couleur_interne_boule",
    "condition": {
      "cle": "forme",
      "valeurs": ["boule"]
    },
    "options": [
        { "valeur": "blanc", "label": "Blanc" },
        { "valeur": "brun", "label": "Brun" },
        { "valeur": "noire", "label": "Noire" }
    ]
  },
  {
    "etape": "couleur_corail",
    "titre": "Couleur Corail",
    "question": "Quelle est la couleur du champignon en forme de corail ?",
    "type": "choix",
    "cle": "corail_couleur",
    "condition": {
      "cle": "forme",
      "valeurs": ["corail"]
    },
    "options": [
        { "valeur": "blanc", "label": "Blanc pur" },
        { "valeur": "creme", "label": "Crème ou ivoire" },
        { "valeur": "beige", "label": "Beige" },
        { "valeur": "jaune et pale", "label": "Jaune pâle" },
        { "valeur": "jaune", "label": "Jaune vif ou doré" },
        { "valeur": "orange", "label": "Orangé" },
        { "valeur": "rose", "label": "Rosé ou saumon" },
        { "valeur": "rouge et brique", "label": "Rouge brique ou vineux" },
        { "valeur": "brun", "label": "Brun clair" },
        { "valeur": "brun ou rouille", "label": "Brun rouille" },
        { "valeur": "violet", "label": "Violet pâle ou lilas" },
        { "valeur": "gris", "label": "Gris pâle" }
        ]
  },
  {
    "etape": "couleur_croute",
    "titre": "Couleur Croute",
    "question": "Quelle est la couleur de la croute ?",
    "type": "choix",
    "cle": "croute_couleur",
    "condition": {
      "cle": "forme",
      "valeurs": ["croute"]
    },
    "options": [
        { "valeur": "blanc", "label": "Blanc" },
        { "valeur": "creme", "label": "Crème ou ivoire" },
        { "valeur": "jaune", "label": "Jaune ou ocre" },
        { "valeur": "orange", "label": "Orangé" },
        { "valeur": "rouge et brique", "label": "Rouge brique" },
        { "valeur": "rose", "label": "Rosé" },
        { "valeur": "brun et clair", "label": "Brun clair" },
        { "valeur": "brun et rouille ou cannelle", "label": "Brun rouille ou cannelle" },
        { "valeur": "brun et foncé", "label": "Brun foncé" },
        { "valeur": "gris", "label": "Gris ou ardoise" },
        { "valeur": "noir", "label": "Noir ou noirâtre" },
        { "valeur": "violet", "label": "Violet ou lilas" },
        { "valeur": "bleu ou vert", "label": "Bleu-vert (vert-de-gris ou algue)" },
        { "valeur": "bicolore", "label": "Bicolore ou zoné" }
        ]
  },
  {
    "etape": "couleur_chapeau",
    "titre": "Chapeau",
    "question": "Quelle est la couleur du chapeau ?",
    "type": "multi",
    "cle": "chapeau",
    "condition": {
      "cle": "forme",
      "valeurs": ["chapeau"]
    },
    "options": [
        { "valeur": "blanc", "label": "Blanc pur" },
        { "valeur": "creme", "label": "Crème ou ivoire" },
        { "valeur": "gris", "label": "Gris clair à foncé" },
        { "valeur": "noir", "label": "Noir ou noirâtre" },
        { "valeur": "brun", "label": "Brun moyen" },
        { "valeur": "jaune", "label": "Jaune pâle à vif" },
        { "valeur": "orange", "label": "Orangé ou ocre" },
        { "valeur": "rouge", "label": "Rouge vif à brique" },
        { "valeur": "rose", "label": "Rose ou saumon" },
        { "valeur": "bleu", "label": "Bleu ou bleu-gris" },
        { "valeur": "violet", "label": "Violet ou lilas" },
        { "valeur": "vert", "label": "Vert olive ou verdâtre" }
    ]
  },
  {
    "etape": "texture_chapeau",
    "titre": "Chapeau",
    "question": "Comment est la texture du chapeau ?",
    "type": "multi",
    "cle": "chapeau",
    "condition": {
      "cle": "forme",
      "valeurs": ["chapeau"]
    },
    "options": [
      { "valeur": "visqueux", "label": "Visqueux" },
      { "valeur": "sec", "label": "Sec" },
      { "valeur": "ecailleux", "label": "Écailleux" },
      { "valeur": "lisse", "label": "Lisse" },
      { "valeur": "conique", "label": "Conique" },
      { "valeur": "plat", "label": "Plat" },
      { "valeur": "ombilique", "label": "Ombiliqué (déprimé au centre)" }
    ]
  },
  {
    "etape": 3,
    "titre": "Structure fertile",
    "question": "Quelle est la structure sous le chapeau ?",
    "type": "choix",
    "cle": "structure_fertile",
    "condition": {
      "cle": "forme",
      "valeurs": ["chapeau"]
    },
    "options": [
      { "valeur": "lames", "label": "Lames" },
      { "valeur": "pores", "label": "Pores" },
      { "valeur": "aiguillons", "label": "Aiguillons" },
      { "valeur": "surface_lisse", "label": "Surface lisse ou veinée" }
    ]
  },
  {
    "etape": 4,
    "titre": "Couleur des lames",
    "question": "Quelle couleur sont les lames ?",
    "type": "multi",
    "cle": "lames",
    "condition": {
      "cle": "structure_fertile",
      "valeurs": ["lames"]
    },
    "options": [
        { "valeur": "blanc", "label": "Blanc pur" },
        { "valeur": "creme", "label": "Crème" },
        { "valeur": "jaune", "label": "Jaune" },
        { "valeur": "rose", "label": "Rose pâle à rose vif" },
        { "valeur": "brun", "label": "Brun clair à foncé" },
        { "valeur": "noir", "label": "Noir ou noirâtre" },
        { "valeur": "gris", "label": "Gris ou ardoise" },
        { "valeur": "violace", "label": "Violacé" },
        { "valeur": "vert", "label": "Vert olive" }
    ]
  },
  {
    "etape": "Espacement des lames",
    "question": "Quel est l'espacement des lames ?",
    "type": "multi",
    "cle": "lames",
    "condition": {
        "cle": "structure_fertile",
        "valeurs": ["lames"]
    },
    "options": [
        { "valeur": "serrees", "label": "Serrées (nombreuses et rapprochées)" },
        { "valeur": "espacees", "label": "Espacées (visiblement séparées)" }
    ]
    },
  {
    "etape": "Couleur du lait",
    "question": "Y a-t-il du lait qui s'écoule quand on casse une lame ?",
    "type": "choix",
    "cle": "latex",
    "condition": {
        "cle": "structure_fertile",
        "valeurs": ["lames"]
    },
    "options": [
        { "valeur": "aucun", "label": "Aucun lait visible" },
        { "valeur": "blanc", "label": "Lait blanc" },
        { "valeur": "jaune", "label": "Lait jaune" },
        { "valeur": "orange", "label": "Lait orangé" },
        { "valeur": "bleu", "label": "Lait bleuâtre ou verdâtre" },
        { "valeur": "transparent", "label": "Lait clair ou transparent" }
    ]
    },
    
    {
    "etape": "Couleur des pores",
    "question": "Quelle est la couleur des pores ?",
    "type": "choix",
    "cle": "pores",
    "condition": {
        "cle": "structure_fertile",
        "valeurs": ["pores"]
    },
    "options": [
        { "valeur": "blanc", "label": "Blanc" },
        { "valeur": "jaune", "label": "Jaune vif ou pâle" },
        { "valeur": "orange", "label": "Orangé" },
        { "valeur": "brun", "label": "Brun ou rouille" },
        { "valeur": "vert_olive", "label": "Vert olive" },
        { "valeur": "bleu", "label": "Bleu ou bleuâtre" },
        { "valeur": "rose", "label": "Rosé" },
        { "valeur": "noir", "label": "Noir ou sombre" }
    ]
    },
    {
    "etape": "Couleur des aiguillons",
    "question": "Quelle est la couleur des aiguillons ?",
    "type": "multi",
    "cle": "aiguillons",
    "condition": {
        "cle": "structure_fertile",
        "valeurs": ["aiguillons"]
    },
    "options": [
        { "valeur": "blanc", "label": "Blanc" },
        { "valeur": "beige", "label": "Beige ou crème" },
        { "valeur": "jaune", "label": "Jaune ou ocre" },
        { "valeur": "rose", "label": "Rosé ou saumon" },
        { "valeur": "orange", "label": "Orangé" },
        { "valeur": "brun", "label": "Brun" },
        { "valeur": "gris", "label": "Gris ou terne" }
    ]
    },
    {
    "etape": 5,
    "titre": "Pied",
    "question": "Le champignon a-t-il un pied ?",
    "type": "multi",
    "cle": "pied_present",
    "condition": {
      "cle": "forme",
      "valeurs": ["chapeau"]
    },
    "options": [
      { "valeur": "sans_pied", "label": "Sans pied" },
      { "valeur": "pied_present", "label": "Avec pied" }
    ]
  },
  {
    "etape": "Couleur du pied",
    "question": "Quelle est la couleur du pied ?",
    "type": "choix",
    "cle": "pied",
    "condition": {
        "cle": "pied_present",
        "valeurs": ["pied_present"]
    },
    "options": [
        { "valeur": "blanc", "label": "Blanc" },
        { "valeur": "jaune", "label": "Jaune" },
        { "valeur": "ocre", "label": "Ocre ou brun clair" },
        { "valeur": "rouge", "label": "Rouge ou rougeâtre" },
        { "valeur": "rose", "label": "Rose" },
        { "valeur": "brun", "label": "Brun" },
        { "valeur": "gris", "label": "Gris" },
        { "valeur": "violet", "label": "Violet ou lilas" },
        { "valeur": "vert", "label": "Vert" },
        { "valeur": "noir", "label": "Noir" }
    ]
    },
    {
  "etape": "Texture du pied",
  "question": "Quel est l’aspect du pied au toucher ou visuellement ?",
  "type": "multi",
  "cle": "pied",
  "condition": {
    "cle": "pied_present",
    "valeurs": ["pied_present"]
  },
  "options": [
    { "valeur": "lisse", "label": "Lisse" },
    { "valeur": "soyeux", "label": "Soyeux ou satiné" },
    { "valeur": "strie", "label": "Strié (lignes longitudinales)" },
    { "valeur": "ecailleux", "label": "Écailleux ou rugueux" },
    { "valeur": "grenu", "label": "Orné de granules ou verrues" },
    { "valeur": "réticulé", "label": "Réticulé (réseau visible)" },
    { "valeur": "visqueux", "label": "Visqueux ou gluant" }
  ]
},
 {
  "etape": "Éléments du pied",
  "question": "Est-ce qu'il y a un volve ou un anneau ?",
  "type": "multi",
  "cle": "pied_volve_anneau",
  "condition": {
    "cle": "pied_present",
    "valeurs": ["pied_present"]
  },
  "options": [
    { "valeur": "volve", "label": "Volve" },
    { "valeur": "anneau", "label": "Anneau" }
  ]
}/*,
  {
    "etape": 6,
    "titre": "Milieu",
    "question": "Sur quoi pousse le champignon ?",
    "type": "multi",
    "cle": "ecologie",
    "options": [
      { "valeur": "sol", "label": "Sol" },
      { "valeur": "vivant", "label": "Sur tronc ou racine vivante" },
      { "valeur": "mort", "label": "Sur bois mort (tronc, branche, souche)" },
      { "valeur": "feuilles", "label": "Sur litière ou feuilles mortes" },
      { "valeur": "mousse", "label": "Sur mousse" },
      { "valeur": "herbe", "label": "Dans l’herbe ou prairie" }
    ]
  }*/
]
