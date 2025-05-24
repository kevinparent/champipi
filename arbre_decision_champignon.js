window.champiGuide = [
  {
    "id": "1",
    "question": "Est-ce que le champignon a un chapeau ?",
    "type": "choix",
    "cle": "a_chapeau",
    "options": [
      {
        "valeur": "oui",
        "label": "Oui"
      },
      {
        "valeur": "non",
        "label": "Non"
      }
    ]
  },
  {
    "id": "1.1",
    "question": "Quelle est la couleur du chapeau ?",
    "type": "choix",
    "cle": "couleur_chapeau",
    "condition": {
      "cle": "a_chapeau",
      "valeur": "oui"
    },
    "options": [
      {
        "valeur": "brun",
        "label": "Brun"
      },
      {
        "valeur": "blanc",
        "label": "Blanc"
      },
      {
        "valeur": "rouge",
        "label": "Rouge"
      },
      {
        "valeur": "autre",
        "label": "Autre"
      }
    ]
  },
  {
    "id": "1.2",
    "question": "Quelle est la texture du chapeau ?",
    "type": "choix",
    "cle": "texture_chapeau",
    "condition": {
      "cle": "a_chapeau",
      "valeur": "oui"
    },
    "options": [
      {
        "valeur": "lisse",
        "label": "Lisse"
      },
      {
        "valeur": "squameux",
        "label": "Squameux"
      },
      {
        "valeur": "visqueux",
        "label": "Visqueux"
      }
    ]
  },
  {
    "id": "1.3",
    "question": "Qu'est-ce qu'il y a sous le chapeau ?",
    "type": "choix",
    "cle": "structure_fertile",
    "condition": {
      "cle": "a_chapeau",
      "valeur": "oui"
    },
    "options": [
      {
        "valeur": "lames",
        "label": "Des lames"
      },
      {
        "valeur": "pores",
        "label": "Des pores"
      },
      {
        "valeur": "aiguillons",
        "label": "Des aiguillons"
      },
      {
        "valeur": "lisse",
        "label": "Surface lisse"
      }
    ]
  },
  {
    "id": "1.3.1",
    "question": "Quelle est la couleur des lames ?",
    "type": "choix",
    "cle": "couleur_lames",
    "condition": {
      "cle": "structure_fertile",
      "valeur": "lames"
    },
    "options": [
      {
        "valeur": "blanches",
        "label": "Blanches"
      },
      {
        "valeur": "roses",
        "label": "Roses"
      },
      {
        "valeur": "brunes",
        "label": "Brunes"
      }
    ]
  },
  {
    "id": "1.3.2",
    "question": "Quel est l'espacement des lames ?",
    "type": "choix",
    "cle": "espacement_lames",
    "condition": {
      "cle": "structure_fertile",
      "valeur": "lames"
    },
    "options": [
      {
        "valeur": "serrées",
        "label": "Serrées"
      },
      {
        "valeur": "espacées",
        "label": "Espacées"
      }
    ]
  },
  {
    "id": "1.3.3",
    "question": "Comment les lames sont-elles attachées au pied ?",
    "type": "choix",
    "cle": "attachement_lames",
    "condition": {
      "cle": "structure_fertile",
      "valeur": "lames"
    },
    "options": [
      {
        "valeur": "libres",
        "label": "Libres"
      },
      {
        "valeur": "adnées",
        "label": "Adnées"
      },
      {
        "valeur": "décurrentes",
        "label": "Décurrentes"
      }
    ]
  },
  {
    "id": "1.3.4",
    "question": "Présence de lait ?",
    "type": "choix",
    "cle": "lait_present",
    "condition": {
      "cle": "structure_fertile",
      "valeur": "lames"
    },
    "options": [
      {
        "valeur": "non",
        "label": "Non"
      },
      {
        "valeur": "blanc",
        "label": "Oui, blanc"
      },
      {
        "valeur": "jaune",
        "label": "Oui, jaune"
      },
      {
        "valeur": "orange",
        "label": "Oui, orange"
      }
    ]
  },
  {
    "id": "1.3.5",
    "question": "Quelle est la forme des pores ?",
    "type": "choix",
    "cle": "forme_pores",
    "condition": {
      "cle": "structure_fertile",
      "valeur": "pores"
    },
    "options": [
      {
        "valeur": "ronds",
        "label": "Ronds"
      },
      {
        "valeur": "anguleux",
        "label": "Anguleux"
      }
    ]
  },
  {
    "id": "1.3.6",
    "question": "Quelle est la couleur des pores ?",
    "type": "choix",
    "cle": "couleur_pores",
    "condition": {
      "cle": "structure_fertile",
      "valeur": "pores"
    },
    "options": [
      {
        "valeur": "blancs",
        "label": "Blancs"
      },
      {
        "valeur": "jaunes",
        "label": "Jaunes"
      },
      {
        "valeur": "olivâtres",
        "label": "Olivâtres"
      }
    ]
  },
  {
    "id": "1.3.7",
    "question": "Quelle est la longueur des aiguillons ?",
    "type": "choix",
    "cle": "longueur_aiguillons",
    "condition": {
      "cle": "structure_fertile",
      "valeur": "aiguillons"
    },
    "options": [
      {
        "valeur": "courts",
        "label": "Courts"
      },
      {
        "valeur": "longs",
        "label": "Longs"
      }
    ]
  },
  {
    "id": "1.3.8",
    "question": "Quelle est la densité des aiguillons ?",
    "type": "choix",
    "cle": "densite_aiguillons",
    "condition": {
      "cle": "structure_fertile",
      "valeur": "aiguillons"
    },
    "options": [
      {
        "valeur": "denses",
        "label": "Denses"
      },
      {
        "valeur": "espacés",
        "label": "Espacés"
      }
    ]
  },
  {
    "id": "1.3.9",
    "question": "Quelle est la couleur des aiguillons ?",
    "type": "choix",
    "cle": "couleur_aiguillons",
    "condition": {
      "cle": "structure_fertile",
      "valeur": "aiguillons"
    },
    "options": [
      {
        "valeur": "blancs",
        "label": "Blancs"
      },
      {
        "valeur": "rosâtres",
        "label": "Rosâtres"
      },
      {
        "valeur": "bruns",
        "label": "Bruns"
      }
    ]
  },
  {
    "id": "1.4",
    "question": "Quel est l’aspect du champignon ?",
    "type": "choix",
    "cle": "aspect_sans_chapeau",
    "condition": {
      "cle": "a_chapeau",
      "valeur": "non"
    },
    "options": [
      {
        "valeur": "coupe",
        "label": "En forme de coupe"
      },
      {
        "valeur": "boule",
        "label": "En forme de boule"
      },
      {
        "valeur": "autre",
        "label": "Autre"
      }
    ]
  },
  {
    "id": "1.5",
    "question": "Quelle est la couleur générale du champignon ?",
    "type": "choix",
    "cle": "couleur_sans_chapeau",
    "condition": {
      "cle": "a_chapeau",
      "valeur": "non"
    },
    "options": [
      {
        "valeur": "blanc",
        "label": "Blanc"
      },
      {
        "valeur": "ocre",
        "label": "Ocre"
      },
      {
        "valeur": "gris",
        "label": "Gris"
      }
    ]
  },
  {
    "id": "2",
    "question": "Est-ce que le champignon a un pied ?",
    "type": "choix",
    "cle": "a_pied",
    "options": [
      {
        "valeur": "oui",
        "label": "Oui"
      },
      {
        "valeur": "non",
        "label": "Non"
      }
    ]
  },
  {
    "id": "2.1",
    "question": "Quelle est la couleur du pied ?",
    "type": "choix",
    "cle": "couleur_pied",
    "condition": {
      "cle": "a_pied",
      "valeur": "oui"
    },
    "options": [
      {
        "valeur": "blanc",
        "label": "Blanc"
      },
      {
        "valeur": "brun",
        "label": "Brun"
      },
      {
        "valeur": "jaune",
        "label": "Jaune"
      },
      {
        "valeur": "autre",
        "label": "Autre"
      }
    ]
  },
  {
    "id": "2.2",
    "question": "Quelle est la texture du pied ?",
    "type": "choix",
    "cle": "texture_pied",
    "condition": {
      "cle": "a_pied",
      "valeur": "oui"
    },
    "options": [
      {
        "valeur": "lisse",
        "label": "Lisse"
      },
      {
        "valeur": "rugueux",
        "label": "Rugueux"
      },
      {
        "valeur": "réticulé",
        "label": "Réticulé"
      }
    ]
  },
  {
    "id": "2.3",
    "question": "Y a-t-il une volve ?",
    "type": "choix",
    "cle": "volve",
    "condition": {
      "cle": "a_pied",
      "valeur": "oui"
    },
    "options": [
      {
        "valeur": "oui",
        "label": "Oui"
      },
      {
        "valeur": "non",
        "label": "Non"
      },
      {
        "valeur": "non_visible",
        "label": "Non visible"
      }
    ]
  },
  {
    "id": "2.4",
    "question": "Y a-t-il un anneau ?",
    "type": "choix",
    "cle": "anneau",
    "condition": {
      "cle": "a_pied",
      "valeur": "oui"
    },
    "options": [
      {
        "valeur": "fixe",
        "label": "Oui, fixe"
      },
      {
        "valeur": "coulissant",
        "label": "Oui, coulissant"
      },
      {
        "valeur": "non",
        "label": "Non"
      },
      {
        "valeur": "non_visible",
        "label": "Non visible"
      }
    ]
  },
  {
    "id": "3",
    "question": "Où pousse le champignon ?",
    "type": "choix",
    "cle": "substrat",
    "options": [
      {
        "valeur": "sol",
        "label": "Au sol"
      },
      {
        "valeur": "arbre",
        "label": "Sur un arbre"
      },
      {
        "valeur": "autre",
        "label": "Autre"
      }
    ]
  },
  {
    "id": "3.1",
    "question": "Si sur un arbre, quel type ?",
    "type": "choix",
    "cle": "essence_arbre",
    "condition": {
      "cle": "substrat",
      "valeur": "arbre"
    },
    "options": [
      {
        "valeur": "feuillu",
        "label": "Feuillu"
      },
      {
        "valeur": "conifere",
        "label": "Conifère"
      },
      {
        "valeur": "inconnu",
        "label": "Inconnu"
      }
    ]
  },
  {
    "id": "5",
    "question": "Quelle est l'odeur du champignon ?",
    "type": "choix",
    "cle": "odeur",
    "options": [
      {
        "valeur": "anisee",
        "label": "Anisée"
      },
      {
        "valeur": "fruitée",
        "label": "Fruitée"
      },
      {
        "valeur": "fongique",
        "label": "Fongique/classique"
      },
      {
        "valeur": "désagréable",
        "label": "Désagréable"
      },
      {
        "valeur": "aucune",
        "label": "Aucune odeur"
      }
    ]
  },
  {
    "id": "6",
    "question": "Quelle est la couleur de la sporée ?",
    "type": "choix",
    "cle": "sporee",
    "options": [
      {
        "valeur": "blanche",
        "label": "Blanche"
      },
      {
        "valeur": "rose",
        "label": "Rose"
      },
      {
        "valeur": "brune",
        "label": "Brune"
      },
      {
        "valeur": "noire",
        "label": "Noire"
      },
      {
        "valeur": "autre",
        "label": "Autre"
      },
       {
        "valeur": "nesaitpas",
        "label": "Ne sait pas"
      }
    ]
  }
]