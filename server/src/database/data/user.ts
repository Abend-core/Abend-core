const users = [
    {
        id: "018f3b9c-93a6-772f-bc34-4d2f8e3d5a6b",
        username: "Rudy",
        mail: "rudyalvs@gmail.com",
        image: "rudy.jpg",
        password: "password1",
        isAdmin: true,
        isActive: true,
        token: "",
        content:
            "Rudy, passionné de technologie, admin dévoué, aide les utilisateurs à résoudre leurs problèmes avec patience et expertise, toujours à l’affût des dernières innovations numériques.", // 166 caractères
    },
    {
        id: "018f3c2b-93a6-772f-bc34-4d2f8e3d5a7c",
        username: "Lucas",
        mail: "lucasrolland@gmail.com",
        password: "password1",
        isAdmin: true,
        isActive: true,
        token: "",
        content:
            "Lucas, admin créatif et coder passionné, adore relever des défis complexes, construire des solutions ingénieuses et partager ses connaissances avec la communauté tech.", // 155 caractères
    },
    {
        id: "018f3c5d-93a6-772f-bc34-4d2f8e3d5a7f",
        username: "Hugo",
        mail: "hlm@gmail.com",
        password: "password1",
        isAdmin: true,
        isActive: true,
        token: "",
        content:
            "Hugo, admin énergique et fan d’anime, gère les tâches avec style et précision, tout en rêvant de cosplays et de marathons de séries japonaises le week-end.", // 141 caractères
    },
    {
        id: "018f3ca1-93a6-772f-bc34-4d2f8e3d5a80",
        username: "Jerome",
        mail: "jerome@gmail.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "Jerome, curieux insatiable, explore sans cesse de nouvelles compétences, de la programmation au design, motivé par une soif d’apprendre et de créer quelque chose d’unique.", // 157 caractères
    },
    {
        id: "018f3cc3-93a6-772f-bc34-4d2f8e3d5a81",
        username: "Emma",
        mail: "emma@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "Emma, fan de mangas et de voyages, rêve de découvrir le Japon, dessine des personnages inspirés de ses lectures et planifie ses prochaines aventures autour du globe.", // 152 caractères
    },
    {
        id: "018f3cf6-93a6-772f-bc34-4d2f8e3d5a82",
        username: "Alice",
        mail: "alice@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "Alice, esprit créatif et rêveur, passe ses journées à peindre, concevoir des portfolios originaux et imaginer des mondes fantastiques qu’elle partage avec ses amis.", // 152 caractères
    },
    {
        id: "018f3d19-93a6-772f-bc34-4d2f8e3d5a83",
        username: "David",
        mail: "david@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "David, développeur passionné, contribue activement sur DevHub, partage ses astuces de code et travaille sur des projets open-source pour aider les autres à progresser.", // 156 caractères
    },
    {
        id: "018f3d43-93a6-772f-bc34-4d2f8e3d5a84",
        username: "Sophia",
        mail: "sophia@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "Sophia, exploratrice et blogueuse, parcourt le monde, raconte ses aventures sur son blog et inspire ses lecteurs avec des récits de voyages et des photos époustouflantes.", // 160 caractères
    },
    {
        id: "018f3d6d-93a6-772f-bc34-4d2f8e3d5a85",
        username: "John",
        mail: "john@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "John, mélomane invétéré, explore quotidiennement de nouveaux genres musicaux, crée des playlists personnalisées et partage ses découvertes avec ses amis en ligne.", // 149 caractères
    },
    {
        id: "018f3d97-93a6-772f-bc34-4d2f8e3d5a86",
        username: "Michael",
        mail: "michael@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "Michael, passionné de tech et de cuisine, suit les innovations numériques tout en expérimentant des recettes du monde entier pour épater ses proches lors des dîners.", // 157 caractères
    },
    {
        id: "018f3db9-93a6-772f-bc34-4d2f8e3d5a87",
        username: "Maxime",
        mail: "maxime@example.com",
        password: "password1",
        isAdmin: true,
        isActive: true,
        token: "",
        content:
            "Maxime, admin et gamer acharné, excelle dans la gestion tout en explorant des univers vidéoludiques, toujours prêt à tester les derniers jeux avec ses amis.", // 145 caractères
    },
    {
        id: "018f3de3-93a6-772f-bc34-4d2f8e3d5a88",
        username: "Clara",
        mail: "clara@example.com",
        password: "password1",
        isAdmin: true,
        isActive: true,
        token: "",
        content:
            "Clara, admin et designer talentueuse, transforme des idées en sites web magnifiques, mêlant créativité et rigueur pour offrir des expériences utilisateur uniques.", // 151 caractères
    },
    {
        id: "018f3e0d-93a6-772f-bc34-4d2f8e3d5a89",
        username: "Victor",
        mail: "victor@example.com",
        password: "password1",
        isAdmin: true,
        isActive: true,
        token: "",
        content:
            "Victor, admin et photographe passionné, capture des instants précieux avec son appareil, gérant ses responsabilités tout en perfectionnant son art visuel.", // 141 caractères
    },
    {
        id: "018f3e37-93a6-772f-bc34-4d2f8e3d5a8a",
        username: "Lena",
        mail: "lena@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "Lena, sportive et déterminée, utilise des applications de fitness pour suivre ses entraînements, repousser ses limites et atteindre ses objectifs personnels.", // 143 caractères
    },
    {
        id: "018f3e61-93a6-772f-bc34-4d2f8e3d5a8b",
        username: "Samuel",
        mail: "samuel@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "Samuel, cinéphile enthousiaste, passe ses soirées à streamer des films et séries, analysant chaque scène pour partager ses avis avec sa communauté en ligne.", // 145 caractères
    },
    {
        id: "018f3e8b-93a6-772f-bc34-4d2f8e3d5a8c",
        username: "Eva",
        mail: "eva@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "Eva, amoureuse d’art et de culture, visite des galeries, explore des expositions et rêve de créer sa propre collection d’œuvres modernes et classiques.", // 141 caractères
    },
    {
        id: "018f3eb5-93a6-772f-bc34-4d2f8e3d5a8d",
        username: "Mathieu",
        mail: "mathieu.m@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "Mathieu, féru de science, lit des blogs pointus, suit les avancées technologiques et partage ses réflexions sur les découvertes qui façonnent notre futur.", // 144 caractères
    },
    {
        id: "018f3ede-93a6-772f-bc34-4d2f8e3d5a8e",
        username: "Paul",
        mail: "paul@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "Paul, apprenant assidu, maîtrise rapidement de nouvelles langues grâce à des outils en ligne, motivé par le désir de communiquer avec le monde entier.", // 140 caractères
    },
    {
        id: "018f3f08-93a6-772f-bc34-4d2f8e3d5a8f",
        username: "Sophie",
        mail: "sophie@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "Sophie, gameuse passionnée, explore les dernières sorties vidéoludiques, participe à des tournois en ligne et partage ses exploits avec ses coéquipiers.", // 141 caractères
    },
    {
        id: "018f3f32-93a6-772f-bc34-4d2f8e3d5a90",
        username: "George",
        mail: "george@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "George, amateur de photographie, capture des paysages et portraits magnifiques, partage ses clichés sur des plateformes et perfectionne son style unique.", // 144 caractères
    },
    {
        id: "018f3f5c-93a6-772f-bc34-4d2f8e3d5a91",
        username: "Charlotte",
        mail: "charlotte@example.com",
        password: "password1",
        isAdmin: true,
        isActive: true,
        token: "",
        content:
            "Charlotte, admin et experte en marketing, excelle dans les stratégies digitales, aidant les projets à briller en ligne grâce à son sens aigu de la communication.", // 154 caractères
    },
    {
        id: "018f3f86-93a6-772f-bc34-4d2f8e3d5a92",
        username: "Jules",
        mail: "jules@example.com",
        password: "password1",
        isAdmin: true,
        isActive: true,
        token: "",
        content:
            "Jules, admin mélomane, gère avec brio tout en suivant les tendances tech et musicales, créant des playlists qui rythment ses journées bien remplies.", // 139 caractères
    },
    {
        id: "018f3fb0-93a6-772f-bc34-4d2f8e3d5a93",
        username: "Benoit",
        mail: "benoit@example.com",
        password: "password1",
        isAdmin: true,
        isActive: true,
        token: "",
        content:
            "Benoit, admin passionné de code, adore gérer des projets complexes, coder des solutions innovantes et motiver son équipe pour atteindre les objectifs fixés.", // 147 caractères
    },
    {
        id: "018f3fda-93a6-772f-bc34-4d2f8e3d5a94",
        username: "Celine",
        mail: "celine.m@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "Celine, fan de sport, suit les scores en direct, participe à des défis sportifs et partage ses performances avec une communauté passionnée comme elle.", // 140 caractères
    },
    {
        id: "018f4004-93a6-772f-bc34-4d2f8e3d5a95",
        username: "Mia",
        mail: "mia@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "Mia, foodie passionnée, explore des recettes du monde, teste des saveurs exotiques et partage ses créations culinaires avec ses amis et sa famille.", // 138 caractères
    },
    {
        id: "018f402e-93a6-772f-bc34-4d2f8e3d5a96",
        username: "Oscar",
        mail: "oscar@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "Oscar, bricoleur dans l’âme, réalise des projets DIY impressionnants, de la déco au mobilier, et inspire les autres avec ses idées créatives faites maison.", // 145 caractères
    },
    {
        id: "018f4058-93a6-772f-bc34-4d2f8e3d5a97",
        username: "Sofia",
        mail: "sofia@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "Sofia, voyageuse dans l’âme, rêve de destinations exotiques, planifie ses aventures avec soin et partage ses expériences pour inspirer d’autres globe-trotters.", // 150 caractères
    },
    {
        id: "018f4082-93a6-772f-bc34-4d2f8e3d5a98",
        username: "Thomas",
        mail: "thomas@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "Thomas, cinéphile passionné, passe ses soirées à streamer des films, découvre des classiques et partage ses critiques détaillées avec ses amis cinéastes.", // 143 caractères
    },
    {
        id: "018f40ac-93a6-772f-bc34-4d2f8e3d5a99",
        username: "Justine",
        mail: "justine.m@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "Justine, artiste talentueuse, expose ses œuvres en ligne, mêlant couleurs et émotions pour captiver son public et raconter des histoires à travers son art.", // 143 caractères
    },
    {
        id: "018f40d6-93a6-772f-bc34-4d2f8e3d5a9a",
        username: "Theo",
        mail: "theo.d@example.com",
        password: "password1",
        isAdmin: false,
        isActive: true,
        token: "",
        content:
            "Theo, passionné de jeux vidéo, explore des univers immersifs, participe à des compétitions en ligne et partage ses stratégies avec sa communauté de gamers.", // 146 caractères
    },
];

export { users };
