/* =====================================================================
   CATALOGUE « OBJECTIF TOP 1 » (4e)
   - CLASSES    : une seule classe (4e) → la page d'accueil affiche directement les matières
   - courses    : les matières
   - SEQUENCES  : les chapitres d'une matière
   - RESSOURCES : fiches, quiz, activités, cours
       type : "jeu" | "quiz" | "fiche" | "cours"
       cls / course / seq : où la ressource est rangée
   Ouvert / à venir / masqué : se règle dans la page admin (etat.json).
   ===================================================================== */
window.CATALOGUE = {
  CLASSES: [
    { id: "4e", name: "4e", emoji: "🎯", color: "#7b5cff",
      full: "Toutes mes matières de 4e",
      courses: [
        { id: "francais", emoji: "📚", name: "Français",          sub: "Lecture, grammaire, conjugaison, écriture" },
        { id: "maths",    emoji: "📐", name: "Maths",             sub: "Nombres, calcul, géométrie" },
        { id: "hg",       emoji: "🌍", name: "Histoire-Géo-EMC",  sub: "Histoire, géographie, enseignement moral et civique" },
        { id: "svt",      emoji: "🌱", name: "SVT",               sub: "Sciences de la vie et de la Terre" },
        { id: "pc",       emoji: "⚗️", name: "Physique-Chimie",   sub: "Matière, énergie, mouvements" },
        { id: "techno",   emoji: "⚙️", name: "Technologie",       sub: "Objets techniques, programmation" },
        { id: "anglais",  emoji: "💬", name: "Anglais",           sub: "Vocabulaire, grammaire, compréhension" },
        { id: "espagnol", emoji: "🗣️", name: "Espagnol",          sub: "Vocabulaire, grammaire, compréhension" },
      ] },
  ],

  SEQUENCES: [
    // Exemple : { cls: "4e", course: "maths", id: "fractions", emoji: "🍕", name: "Les fractions", notions: "Simplifier · additionner · comparer" },
  ],

  RESSOURCES: [
    // Exemple : { type: "quiz", id: "fractions", cls: "4e", course: "maths", seq: "fractions", emoji: "🧠", title: "Quiz : les fractions", desc: "10 questions", url: "quiz.html?q=fractions", color: "#7b5cff" },
  ],
};

/* Règles d'accès (partagées par le site et la page admin)
   États : "ouvert" | "grise" (visible, « À venir ») | "masque" (invisible)
   - Chapitre absent de etat.json  → "grise"  (un nouveau chapitre reste fermé tant qu'il n'est pas ouvert)
   - Ressource absente de etat.json → "ouvert" (elle suit son chapitre)
   - Une ressource ne peut pas être plus ouverte que son chapitre. */
window.ACCES = {
  seqKey: (s) => s.cls + "/" + s.course + "/" + s.id,
  seqState(etat, s) { return (etat.sequences || {})[this.seqKey(s)] || "grise"; },
  resOwnState(etat, r) { return (etat.ressources || {})[r.id] || "ouvert"; },
  resState(etat, r) {
    const rank = { ouvert: 0, grise: 1, masque: 2 };
    let st = this.resOwnState(etat, r);
    if (r.seq) {
      const s = window.CATALOGUE.SEQUENCES.find(x => x.cls === r.cls && x.course === r.course && x.id === r.seq);
      if (s) { const ss = this.seqState(etat, s); if (rank[ss] > rank[st]) st = ss; }
    }
    return st;
  },
};
