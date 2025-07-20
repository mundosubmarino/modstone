// --------------------------------------
// Ajuste real de full-screen en móviles
// --------------------------------------
function setVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setVh);
window.addEventListener('orientationchange', setVh);
setVh();

// ----------------------------
// Traductor y menú lateral
// ----------------------------
const Translator = (() => {
  const dict = {
    es: {
      appTitle: 'ModStone',
      searchPlaceholder: 'Buscar mods...',
      versionAll: 'Todas las versiones',
      pop: ['Popularidad','Más popular','Menos popular'],
      age: ['Antigüidad','Más antiguo','Menos antiguo'],
      menuLanguage: 'Idioma',
      btnDownload: 'Descargar',
      modeLight: 'Modo claro',
      modeDark: 'Modo oscuro',
      navAddons: 'AddOns',
      navWorlds: 'Mapas',
      noResultsBeforeLink:
        '¿No encuentras lo que buscas o quieres publicar un AddOn o Mapa? Comunícate con nosotros ',
      noResultsLinkText: 'aquí.'
    },
    en: {
      appTitle: 'ModStone',
      searchPlaceholder: 'Search mods...',
      versionAll: 'All versions',
      pop: ['Popularity','Most popular','Least popular'],
      age: ['Age','Oldest first','Newest first'],
      menuLanguage: 'Language',
      btnDownload: 'Download',
      modeLight: 'Light mode',
      modeDark: 'Dark mode',
      navAddons: 'AddOns',
      navWorlds: 'Maps',
      noResultsBeforeLink:
        "Can't find what you're looking for or want to publish an AddOn or Map? Reach out to us ",
      noResultsLinkText: 'here.'
    },
    pt: {
      appTitle: 'ModStone',
      searchPlaceholder: 'Buscar mods...',
      versionAll: 'Todas as versões',
      pop: ['Popularidade','Mais popular','Menos popular'],
      age: ['Antigüidade','Mais antigas','Mais recentes'],
      menuLanguage: 'Idioma',
      btnDownload: 'Baixar',
      modeLight: 'Modo claro',
      modeDark: 'Modo escuro',
      navAddons: 'AddOns',
      navWorlds: 'Mapas',
      noResultsBeforeLink:
        'Não encontra o que procura ou quer publicar um AddOn ou Mapa? Entre em contato conosco ',
      noResultsLinkText: 'aqui.'
    }
  };

  function getLang() {
    return localStorage.getItem('lang') || 'es';
  }
  function setLang(lang) {
    localStorage.setItem('lang', lang);
    applyTranslations();
    document.dispatchEvent(new Event('langChanged'));
  }
  function applyTranslations() {
    const L = getLang();
    document.documentElement.lang = L;
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
      const key = el.getAttribute('data-i18n-key');
      if (dict[L][key]) el.innerText = dict[L][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[L][key]) el.placeholder = dict[L][key];
    });
  }
  function initMenu() {
    const btnOpen  = document.getElementById('menu-toggle');
    const btnClose = document.getElementById('menu-close');
    const overlay  = document.getElementById('overlay');
    const sideMenu = document.getElementById('side-menu');
    if (!btnOpen || !btnClose || !overlay || !sideMenu) return;
    btnOpen.addEventListener('click', () => {
      sideMenu.classList.add('active');
      overlay.classList.add('active');
      btnOpen.setAttribute('aria-expanded', 'true');
    });
    [btnClose, overlay].forEach(el =>
      el.addEventListener('click', () => {
        sideMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.getElementById('select-idioma').classList.remove('active');
        btnOpen.setAttribute('aria-expanded', 'false');
      })
    );
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    initMenu();
    document.dispatchEvent(new Event('langChanged'));
  });

  return { getLang, setLang, applyTranslations, dict };
})();

// ----------------------------
// Contenido de texto informativo
// ----------------------------
const PRIVACY_TEXT = {
  es: `
    <p>En ModStone respetamos tu privacidad.</p>
    <p>Este sitio no recopila información personal de los visitantes. No almacenamos datos, no utilizamos cookies de seguimiento ni solicitamos formularios con información identificable.</p>
    <p>Sin embargo, algunas secciones del sitio pueden mostrar anuncios proporcionados por Google AdSense. Estos anuncios pueden usar cookies para mostrar contenido más relevante. Puedes leer cómo funciona la recopilación de datos por parte de Google en su política oficial:</p>
    <p><a href="https://policies.google.com/technologies/ads" target="_blank">https://policies.google.com/technologies/ads</a></p>
    <p>Al utilizar ModStone, aceptas esta política de privacidad. Si tienes preguntas, contáctanos desde nuestra sección de contacto.</p>
  `,
  en: `
    <p>At ModStone, we respect your privacy.</p>
    <p>This site does not collect personal information from visitors. We do not store data, use tracking cookies, or request any identifiable information.</p>
    <p>However, some sections of the site may display ads provided by Google AdSense. These ads may use cookies to show more relevant content. You can read how Google handles data collection in their official policy:</p>
    <p><a href="https://policies.google.com/technologies/ads" target="_blank">https://policies.google.com/technologies/ads</a></p>
    <p>By using ModStone, you agree to this privacy policy. If you have questions, feel free to reach out through our contact page.</p>
  `,
  pt: `
    <p>Na ModStone, respeitamos sua privacidade.</p>
    <p>Este site não coleta informações pessoais dos visitantes. Não armazenamos dados, não usamos cookies de rastreamento e não solicitamos informações identificáveis.</p>
    <p>No entanto, algumas seções do site podem exibir anúncios fornecidos pelo Google AdSense. Esses anúncios podem usar cookies para mostrar conteúdo mais relevante. Você pode ler como o Google lida com a coleta de dados em sua política oficial:</p>
    <p><a href="https://policies.google.com/technologies/ads" target="_blank">https://policies.google.com/technologies/ads</a></p>
    <p>Ao usar a ModStone, você concorda com esta política de privacidade. Se tiver dúvidas, entre em contato através da nossa página de contato.</p>
  `
};

const ABOUT_TEXT = {
  es: `
    <p>Mi nombre es Victor y soy el creador de ModStone.</p>
    <p>Este proyecto nació con un propósito sencillo pero importante: ofrecer a los jugadores de Minecraft un lugar confiable, ordenado y claro donde puedan descargar Mapas y Mods/Texturas sin complicaciones, ni pasos innecesarios, ni publicidad invasiva.</p>
    <p>Como desarrollador apasionado por la personalización de Minecraft, me aseguré de que ModStone tuviera una navegación intuitiva, descripciones claras en varios idiomas, filtros útiles y una interfaz adaptable a cualquier dispositivo. Todo está pensado para que tanto jugadores nuevos como experimentados encuentren exactamente lo que necesitan, en cuestión de segundos.</p>
    <p>ModStone está en constante evolución, con el objetivo de reunir a una comunidad que valore la creatividad y la accesibilidad.</p>
    <p>Gracias por ser parte de esta experiencia.</p>
  `,
  en: `
    <p>My name is Victor, and I’m the creator of ModStone.</p>
    <p>This project was born with a simple but important goal: to offer Minecraft players a reliable, organized, and clear place to download Maps and Mods/Textures without complications, unnecessary steps, or intrusive ads.</p>
    <p>As a developer passionate about Minecraft customization, I made sure ModStone features intuitive navigation, clear descriptions in multiple languages, useful filters, and a responsive interface for any device. Everything is designed so that both new and experienced players can find exactly what they need in seconds.</p>
    <p>ModStone is constantly evolving, aiming to build a community that values creativity and accessibility.</p>
    <p>Thank you for being part of this experience.</p>
  `,
  pt: `
    <p>Meu nome é Victor e sou o criador da ModStone.</p>
    <p>Este projeto nasceu com um objetivo simples, mas importante: oferecer aos jogadores de Minecraft um lugar confiável, organizado e claro para baixar Mapas e Mods/Texturas sem complicações, etapas desnecessárias ou anúncios invasivos.</p>
    <p>Como desenvolvedor apaixonado pela personalização do Minecraft, garanti que a ModStone tivesse uma navegação intuitiva, descrições claras em vários idiomas, filtros úteis e uma interface adaptável a qualquer dispositivo. Tudo foi pensado para que jogadores iniciantes e experientes encontrem exatamente o que precisam em segundos.</p>
    <p>A ModStone está em constante evolução, com o objetivo de reunir uma comunidade que valorize a criatividade e a acessibilidade.</p>
    <p>Obrigado por fazer parte dessa experiência.</p>
  `
};

const CONTACT_TEXT = {
  es: `
    <p>¿Tienes alguna duda, sugerencia o deseas enviar tu propio Mod/Textura o Mapa?</p>
    <p>Estamos aquí para escucharte.</p>
    <p>Puedes escribirnos directamente a:</p>
    <p><a href="mailto:modstoneweb@gmail.com">modstoneweb@gmail.com</a></p>
    <p>Intentamos leer todos los correos posibles. Ya seas creador, jugador o simplemente curioso, tu mensaje es bienvenido.</p>
  `,
  en: `
    <p>Do you have a question, suggestion, or want to submit your own Mod/Texture or Map?</p>
    <p>We are here to listen.</p>
    <p>You can reach us directly at:</p>
    <p><a href="mailto:modstoneweb@gmail.com">modstoneweb@gmail.com</a></p>
    <p>We try to read every message. Whether you’re a creator, player, or just curious, your message is welcome.</p>
  `,
  pt: `
    <p>Tem alguma dúvida, sugestão ou deseja enviar seu próprio Mod/Textura ou Mapa?</p>
    <p>Estamos aqui para ouvir você.</p>
    <p>Você pode nos escrever diretamente para:</p>
    <p><a href="mailto:modstoneweb@gmail.com">modstoneweb@gmail.com</a></p>
    <p>Tentamos ler todas as mensagens possíveis. Seja você criador, jogador ou apenas curioso, sua mensagem é bem-vinda.</p>
  `
};

// ----------------------------
// Arrays de contenido
// ----------------------------
const addons = [
  {
    nombre: { es:'Insane Disasters', en:'Insane Disasters', pt:'Insane Disasters' },
    descripcion: {
      es:'Agrega desastres naturales impredecibles y extremos a tu mundo. Desde tormentas apocalípticas hasta cataclismos surrealistas, cada partida será una locura climatológica.',
      en:'Unleash chaotic and unpredictable natural disasters into your world. From apocalyptic storms to surreal cataclysms, every session becomes a meteorological madhouse.',
      pt:'Adicione desastres naturais imprevisíveis e insanos ao seu mundo. De tempestades apocalípticas a cataclismos surreais, cada jogo vira um caos climático total.'
    },
    imagen:    'insane_disasters.jpg',
    url:       'https://www.mediafire.com/file/mzvc3vlme8dg5ir/Insane_Disasters.mcaddon/file',
    version:   '1.20.0',
    downloads: 0,
    fecha:     '2024-04-16'
  },
   {
    nombre: { es:'Actions and Stuff', en:'Actions and Stuff', pt:'Actions and Stuff' },
    descripcion: {
      es:'Añade animaciones fluidas, gestos expresivos y efectos visuales que dan vida a tu personaje y al mundo. Actions and Stuff transforma Minecraft con movimientos realistas, partículas dinámicas y objetos en 3D.',
      en:'Bring your character and world to life with smooth animations, expressive gestures, and dynamic effects. Actions and Stuff revamps Minecraft with realistic movement, 3D items, and immersive visuals.',
      pt:'Dê vida ao seu personagem e ao mundo com animações suaves, gestos expressivos e efeitos dinâmicos. Actions and Stuff renova o Minecraft com movimentos realistas, itens em 3D e visuais envolventes.'
    },
    imagen:    'actions_and_stuff.jpg',
    url:       'https://www.mediafire.com/file/4dpdg6cbmx9qphk/Actions++Stuff+1.5+(resources).zip/file',
    version:   '1.21.50',
    downloads: 0,
    fecha:     '2024-12-24'
  },
  {
    nombre: { es:'Cave Biomes', en:'Cave Biomes', pt:'Cave Biomes' },
    descripcion: {
      es:'Descubre biomas subterráneos únicos que transforman por completo las cuevas. Nuevas criaturas, bloques y atmósferas te esperan en cada rincón oculto del mundo.',
      en:'Uncover underground biomes that completely transform caves. New creatures, blocks, and moods await in every hidden corner of the world.',
      pt:'Explore biomas subterrâneos únicos que renovam totalmente as cavernas. Novas criaturas, blocos e atmosferas surpreendentes em cada canto escondido.'
    },
    imagen:    'cave_biomes.jpg',
    url:       'https://www.mediafire.com/file/m187hlax7pdb0nk/Cave_Biomes.mcaddon/file',
    version:   '1.21.50',
    downloads: 0,
    fecha:     '2024-06-11'
  },
  {
    nombre: { es:'Grotesque Steve', en:'Grotesque Steve', pt:'Grotesque Steve' },
    descripcion: {
      es:'Convierte a Steve en una figura grotesca con movimientos extraños y sonidos perturbadores. El mod añade un toque de terror psicológico al juego.',
      en:'Turns Steve into a grotesque figure with creepy sounds and erratic movement. This mod adds a disturbing horror vibe to the game.',
      pt:'Transforma o Steve em uma figura grotesca com sons assustadores e movimentos estranhos. O mod traz um clima de horror perturbador.'
    },
    imagen:    'grotesque_steve.jpg',
    url:       'https://www.mediafire.com/file/6mqc7y4enhuoyy5/Grotesque_Steve.mcaddon/file',
    version:   '1.17.0',
    downloads: 0,
    fecha:     '2025-06-01'
  },
  {
    nombre: { es:'TacZ', en:'TacZ', pt:'TacZ' },
    descripcion: {
      es:'Expande tu arsenal con armas modernas, animaciones realistas y gestión avanzada de accesorios. TacZ AddOn lleva el combate en Minecraft a otro nivel.',
      en:'Expand your arsenal with modern weapons, realistic animations, and advanced attachment management. TacZ AddOn takes Minecraft combat to the next level.',
      pt:'Amplie seu arsenal com armas modernas, animações realistas e gerenciamento avançado de acessórios. O TacZ AddOn eleva o combate no Minecraft a outro patamar.'
    },
    imagen:    'tacz.jpg',
    url:       'https://www.mediafire.com/file/1lks19yd1gzpann/TacZ.mcaddon/file',
    version:   '1.17.0',
    downloads: 0,
    fecha:     '2025-03-08'
  },
  {
    nombre: { es:'Dyed Blocks', en:'Dyed Blocks', pt:'Dyed Blocks' },
    descripcion: {
      es:'Agrega más de 930 bloques teñidos en 16 colores vibrantes. Dyed Blocks++ transforma la construcción en Minecraft con texturas únicas, ideal para crear desde estructuras audaces hasta detalles sutiles.',
      en:'Adds over 930 dyed blocks in 16 vibrant colors. Dyed Blocks++ transforms building in Minecraft with unique textures—perfect for bold structures or subtle accents.',
      pt:'Adiciona mais de 930 blocos tingidos em 16 cores vibrantes. O Dyed Blocks++ transforma a construção no Minecraft com texturas únicas, ideal para criações ousadas ou detalhes sutis.'
    },
    imagen:    'dyed_blocks.jpg',
    url:       'https://www.mediafire.com/file/bdyg81yg4m5pb3w/Dyed_Blocks.mcaddon/file',
    version:   '1.21.40',
    downloads: 0,
    fecha:     '2025-07-01'
  },
  {
    nombre: { es:'Trains', en:'Trains', pt:'Trains' },
    descripcion: {
      es:'Agrega trenes personalizables con locomotoras de vapor, diésel y metro. Trains Add-On incluye vagones, estaciones, señales y acoplamiento automático para crear tu propia red ferroviaria.',
      en:'Adds customizable trains including steam, diesel, and subway engines. Trains Add-On features wagons, stations, signals, and auto-coupling to build your own railway network.',
      pt:'Adiciona trens personalizáveis com locomotivas a vapor, diesel e metrô. O Trains Add-On inclui vagões, estações, sinais e acoplamento automático para montar sua rede ferroviária.'
    },
    imagen:    'trains.jpg',
    url:       'https://www.mediafire.com/file/r74r77qm7heggdv/Trains.mcaddon/file',
    version:   '1.21.80',
    downloads: 0,
    fecha:     '2024-11-12'
  },
  {
    nombre: { es:'Mexican Build Set', en:'Mexican Build Set', pt:'Mexican Build Set' },
    descripcion: {
      es:'Agrega más de 100 bloques decorativos inspirados en la arquitectura y cultura mexicana. Mexican Build Set transforma tu mundo con muebles coloridos, alfombras festivas y detalles auténticos para crear pueblos vibrantes o haciendas tradicionales.',
      en:'Adds over 100 decorative blocks inspired by Mexican architecture and culture. Mexican Build Set brings your world to life with colorful furniture, festive rugs, and authentic details—perfect for vibrant towns or traditional haciendas.',
      pt:'Adiciona mais de 100 blocos decorativos inspirados na arquitetura e cultura mexicana. O Mexican Build Set dá vida ao seu mundo com móveis coloridos, tapetes festivos e detalhes autênticos para criar vilarejos vibrantes ou haciendas tradicionais.'
    },
    imagen:    'mexican_build_set.jpg',
    url:       'https://www.mediafire.com/file/ou68thlslnv6kfe/Mexican_Build_Set.mcaddon/file',
    version:   '1.20.80',
    downloads: 0,
    fecha:     '2025-07-01'
  },
  {
    nombre: { es:'Starter Pack', en:'Starter Pack', pt:'Starter Pack' },
    descripcion: {
      es:'Obtén kits iniciales personalizables con herramientas, recursos y efectos especiales para comenzar tu aventura. Starter Pack AddOn ofrece opciones para jugadores nuevos, intermedios y avanzados, todo desde una interfaz intuitiva.',
      en:'Start your adventure with customizable kits packed with tools, resources, and special effects. Starter Pack AddOn offers options for new, intermediate, and advanced players—all through an intuitive interface.',
      pt:'Comece sua aventura com kits iniciais personalizáveis cheios de ferramentas, recursos e efeitos especiais. O Starter Pack AddOn oferece opções para jogadores iniciantes, intermediários e avançados, tudo com uma interface intuitiva.'
    },
    imagen:    'starter_pack.jpg',
    url:       'https://www.mediafire.com/file/93shdszmg8hyv1i/Starter_Pack.mcaddon/file',
    version:   '1.21.2',
    downloads: 0,
    fecha:     '2025-06-21'
  },
  {
    nombre: { es:'Horror Weapons', en:'Horror Weapons', pt:'Horror Weapons' },
    descripcion: {
      es:'Empuña armas malditas con habilidades oscuras, enfrentando monstruos aterradores y sustos repentinos. Horror Weapons AddOn convierte tu mundo en una pesadilla interactiva.',
      en:'Wield cursed weapons with dark powers, face terrifying monsters, and survive sudden jump scares. Horror Weapons AddOn turns your world into an interactive nightmare.',
      pt:'Empunhe armas amaldiçoadas com poderes sombrios, enfrente monstros assustadores e sobreviva a sustos repentinos. O Horror Weapons AddOn transforma seu mundo em um pesadelo interativo.'
    },
    imagen:    'horror_weapons.jpg',
    url:       'https://www.mediafire.com/file/5jkfatl1usky6kk/Horror_Weapons.mcaddon/file',
    version:   '1.21.1',
    downloads: 0,
    fecha:     '2025-06-24'
  },
  {
    nombre: { es:'Dinosaurs', en:'Dinosaurs', pt:'Dinosaurs' },
    descripcion: {
      es:'Revive la era prehistórica con más de 150 dinosaurios únicos. Dinosaurs Add-On incluye criaturas domesticables, ADN extraíble, vehículos, armas especiales y la posibilidad de transformarte en dinosaurio.',
      en:'Bring the prehistoric age to life with over 150 unique dinosaurs. Dinosaurs Add-On features tamable creatures, extractable DNA, special weapons, vehicles, and the ability to morph into dinosaurs.',
      pt:'Reviva a era pré-histórica com mais de 150 dinossauros únicos. O Dinosaurs Add-On inclui criaturas domesticáveis, extração de DNA, armas especiais, veículos e a habilidade de se transformar em dinossauro.'
    },
    imagen:    'dinosaurs.jpg',
    url:       'https://www.mediafire.com/file/rhpp67y59dohlws/Dinosaurs.mcaddon/file',
    version:   '1.20.20',
    downloads: 0,
    fecha:     '2024-07-16'
  },
  {
    nombre: { es:'Difficulty Brutal', en:'Difficulty Brutal', pt:'Difficulty Brutal' },
    descripcion: {
      es:'Convierte Minecraft en una experiencia extrema. Difficulty Brutal AddOn añade sed, daño por extremidades, comida que se pudre y efectos climáticos que afectan tu supervivencia.',
      en:'Turns Minecraft into a hardcore survival challenge. Difficulty Brutal AddOn adds thirst, limb damage, rotting food, and climate effects that impact your survival.',
      pt:'Transforma o Minecraft em um desafio de sobrevivência brutal. O Difficulty Brutal AddOn adiciona sede, dano nos membros, comida que apodrece e efeitos climáticos que afetam sua jornada.'
    },
    imagen:    'difficulty_brutal.jpg',
    url:       'https://www.mediafire.com/file/awbcr7wa2ojeism/Difficulty_Brutal.mcaddon/file',
    version:   '1.20.80',
    downloads: 0,
    fecha:     '2025-07-10'
  },
  {
    nombre: { es:'Sculk Dinosaurs', en:'Sculk Dinosaurs', pt:'Sculk Dinosaurs' },
    descripcion: {
      es:'Dinosaurios mutantes con poder Sculk y habilidades oscuras. Criaturas como el T-Rex Sculk y el Spinosaurus infectado transforman cada bioma en una pesadilla.',
      en:'Mutated dinosaurs fused with Sculk power and dark abilities. Creatures like the Sculk T-Rex and infected Spinosaurus turn biomes into nightmares.',
      pt:'Dinossauros mutantes com energia Sculk e habilidades sombrias. Criaturas como o T-Rex Sculk e o Spinosaurus infectado trazem o terror aos biomas.'
    },
    imagen:    'sculk_dinosaurs.jpg',
    url:       'https://www.mediafire.com/file/rvwyoj5dqb4t3iy/Sculk_Dinosaurs.mcaddon/file',
    version:   '1.21.30',
    downloads: 0,
    fecha:     '2024-06-18'
  },
  {
    nombre: { es:'Age of Berk', en:'Age of Berk', pt:'Age of Berk' },
    descripcion: {
      es:'Domestica dragones legendarios del universo Cómo entrenar a tu dragón. Age of Berk Add-On incluye criaturas como Furia Nocturna, Nadder Mortal y Pesadilla Monstruosa, con animaciones únicas, vuelo libre y sistemas de entrenamiento.',
      en:'Tame legendary dragons from the How to Train Your Dragon universe. Age of Berk Add-On features creatures like Night Fury, Deadly Nadder, and Monstrous Nightmare—with custom animations, free flight, and training systems.',
      pt:'Domestique dragões lendários do universo Como Treinar o Seu Dragão. O Age of Berk Add-On traz criaturas como Fúria da Noite, Nadder Mortal e Pesadelo Monstruoso, com animações únicas, voo livre e sistemas de treinamento.'
    },
    imagen:    'age_of_berk.jpg',
    url:       'https://www.mediafire.com/file/ll1lyffq5wol90m/Age_of_Berk.mcaddon/file',
    version:   '1.21.90',
    downloads: 0,
    fecha:     '2024-12-05'
  },
  {
    nombre: { es:'MCArk', en:'MCArk', pt:'MCArk' },
    descripcion: {
      es:'Domestica dinosaurios, cría criaturas y sobrevive en un mundo salvaje con sistemas de torpor, huevos y combate. MCArk Add-On transforma Minecraft Bedrock en una experiencia estilo ARK con armas, armaduras, estructuras y biomas únicos.',
      en:'Tame dinosaurs, breed creatures, and survive in a wild world with torpor, eggs, and combat systems. MCArk Add-On turns Minecraft Bedrock into an ARK-style experience with weapons, armor, structures, and unique biomes.',
      pt:'Domestique dinossauros, crie criaturas e sobreviva em um mundo selvagem com torpor, ovos e sistemas de combate. O MCArk Add-On transforma o Minecraft Bedrock em uma experiência estilo ARK com armas, armaduras, estruturas e biomas únicos.'
    },
    imagen:    'mcark.jpg',
    url:       'https://www.mediafire.com/file/w25ssuy8pqfkh80/MCArk.mcaddon/file',
    version:   '1.21.0',
    downloads: 0,
    fecha:     '2025-04-08'
  },
  {
    nombre: { es:'DeadZone', en:'DeadZone', pt:'DeadZone' },
    descripcion: {
      es:'Sobrevive en un mundo postapocalíptico lleno de infectados, saqueadores y estructuras abandonadas. DeadZone Add-On incluye armas en 2.5D, ropa personalizable, mecánicas de sed, sangrado e infección, y facciones con sus propias agendas.',
      en:'Survive in a post-apocalyptic world filled with infected, raiders, and abandoned structures. DeadZone Add-On features 2.5D weapons, customizable outfits, thirst and bleeding mechanics, and factions with unique agendas.',
      pt:'Sobreviva em um mundo pós-apocalíptico com infectados, saqueadores e estruturas abandonadas. O DeadZone Add-On traz armas em 2.5D, roupas personalizáveis, sede, sangramento e facções com objetivos próprios.'
    },
    imagen:    'deadzone.jpg',
    url:       'https://www.mediafire.com/file/0d873fvf49p93u3/DeadZone.mcaddon/file',
    version:   '1.21.70',
    downloads: 0,
    fecha:     '2025-03-12'
  },
  {
    nombre: { es:'Aux Ores', en:'Aux Ores', pt:'Aux Ores' },
    descripcion: {
      es:'Añade 28 minerales nuevos, 29 armaduras, martillos, cascos mineros y talismanes. Aux Ores Add-On amplía la minería y el combate en Minecraft Bedrock.',
      en:'Adds 28 new ores, 29 armors, mining helmets, hammers, and talismans. Aux Ores Add-On expands mining and combat in Minecraft Bedrock.',
      pt:'Adiciona 28 minérios, 29 armaduras, capacetes de mineração, martelos e talismãs. O Aux Ores Add-On amplia a mineração e o combate no Minecraft Bedrock.'
    },
    imagen:    'aux_ores.jpg',
    url:       'https://www.mediafire.com/file/iqz18tc7xpibdrd/AuxOres.mcaddon/file',
    version:   '1.21.10',
    downloads: 0,
    fecha:     '2024-09-10'
  },
  {
    nombre: { es:'Morphing Bracelet', en:'Morphing Bracelet', pt:'Morphing Bracelet' },
    descripcion: {
      es:'Transforma tu cuerpo en cualquier mob que derrotes. Morphing Bracelet Add-On te permite adoptar habilidades únicas como volar, nadar o lanzar hechizos, según la criatura.',
      en:'Morph into any mob you defeat. Morphing Bracelet Add-On grants unique abilities like flying, swimming, or casting spells—depending on the creature.',
      pt:'Transforme-se em qualquer mob que derrotar. O Morphing Bracelet Add-On oferece habilidades únicas como voar, nadar ou lançar feitiços, conforme a criatura.'
    },
    imagen:    'morphing_bracelet.jpg',
    url:       'https://www.mediafire.com/file/v10c6nxa66ishnb/Morphing+Bracelet.mcaddon/file',
    version:   '1.21.70',
    downloads: 0,
    fecha:     '2022-11-15'
  },
  {
    nombre: { es:'Modern Doors', en:'Modern Doors', pt:'Modern Doors' },
    descripcion: {
      es:'Agrega más de 150 puertas modernas con diseños únicos, sistemas de bloqueo por llave o jugador, y compatibilidad con redstone. Modern Doors Add-On mejora la seguridad y estética de tus construcciones.',
      en:'Adds over 150 modern doors with unique designs, key/player locking systems, and redstone compatibility. Modern Doors Add-On enhances both security and style in your builds.',
      pt:'Adiciona mais de 150 portas modernas com designs únicos, sistemas de bloqueio por chave ou jogador e compatibilidade com redstone. O Modern Doors Add-On melhora a segurança e o visual das construções.'
    },
    imagen:    'modern_doors.jpg',
    url:       'https://www.mediafire.com/file/bptsww2pwfryyhz/Modern+Doors.mcaddon/file',
    version:   '1.16.0',
    downloads: 0,
    fecha:     '2024-09-10'
  },
  {
    nombre: { es:'Chisel for Bedrock', en:'Chisel for Bedrock', pt:'Chisel for Bedrock' },
    descripcion: {
      es:'Agrega más de 2,000 bloques decorativos con patrones únicos. Chisel for Bedrock Add-On permite transformar bloques usando el cortapiedras o un cincel especial, ideal para construcciones detalladas.',
      en:'Adds over 2,000 decorative blocks with unique patterns. Chisel for Bedrock Add-On lets you reshape blocks using the stonecutter or a special chisel—perfect for intricate builds.',
      pt:'Adiciona mais de 2.000 blocos decorativos com padrões únicos. O Chisel for Bedrock Add-On permite transformar blocos com cortador de pedra ou cinzel especial, ideal para construções detalhadas.'
    },
    imagen:    'chisel_for_bedrock.jpg',
    url:       'https://www.mediafire.com/file/8pj9jp17jb07ze7/Chisel+for+Bedrock.mcaddon/file',
    version:   '1.21.20',
    downloads: 0,
    fecha:     '2024-09-10'
  },
  {
    nombre: { es:'Sleeping Bags', en:'Sleeping Bags', pt:'Sleeping Bags' },
    descripcion: {
      es:'Agrega 24 sacos de dormir con patrones y colores únicos. Sleeping Bags Add-On permite dormir en cualquier dimensión, acelerar el tiempo y evitar fantasmas.',
      en:'Adds 24 sleeping bags with unique patterns and colors. Sleeping Bags Add-On lets you sleep in any dimension, speed up time, and avoid phantoms.',
      pt:'Adiciona 24 sacos de dormir com padrões e cores únicas. O Sleeping Bags Add-On permite dormir em qualquer dimensão, acelerar o tempo e evitar fantasmas.'
    },
    imagen:    'sleeping_bags.jpg',
    url:       'https://www.mediafire.com/file/zojt6yoqgyzje14/Sleeping+Bags.mcaddon/file',
    version:   '1.16.0',
    downloads: 0,
    fecha:     '2024-09-10'
  },
  {
    nombre: { es:'System Dynamic Lights', en:'System Dynamic Lights', pt:'System Dynamic Lights' },
    descripcion: {
      es:'Ilumina tu camino con objetos comunes como antorchas, linternas o cascos especiales. System Dynamic Lights Add-On permite que los ítems emitan luz al sostenerlos o colocarlos en la segunda mano.',
      en:'Light your way with common items like torches, lanterns, or special helmets. System Dynamic Lights Add-On makes items glow when held or placed in the off-hand.',
      pt:'Ilumine seu caminho com itens como tochas, lanternas ou capacetes especiais. O System Dynamic Lights Add-On faz os objetos brilharem ao segurá-los ou usá-los na mão secundária.'
    },
    imagen:    'system_dynamic_lights.jpg',
    url:       'https://www.mediafire.com/file/kstspbq221zw2vs/System+Dynamic+Lights.mcaddon/file',
    version:   '1.21.30',
    downloads: 0,
    fecha:     '2025-06-22'
  },
  {
    nombre: { es:'System Hydra AddOn', en:'System Hydra AddOn', pt:'System Hydra AddOn' },
    descripcion: {
      es:'Enfrenta a la temible Hidra de tres cabezas con variantes de fuego, hielo, veneno y electricidad. System Hydra Add-On añade un jefe mitológico con ataques brutales, animaciones únicas y recompensas como corazones, escamas y tótems con efectos permanentes.',
      en:'Face the fearsome three-headed Hydra with fire, ice, poison, and electric variants. System Hydra Add-On introduces a mythological boss with brutal attacks, custom animations, and rewards like hearts, scales, and totems with permanent effects.',
      pt:'Enfrente a temível Hidra de três cabeças com variantes de fogo, gelo, veneno e eletricidade. O System Hydra Add-On traz um chefe mitológico com ataques brutais, animações únicas e recompensas como corações, escamas e totens com efeitos permanentes.'
    },
    imagen:    'system_hydra_addon.jpg',
    url:       'https://www.mediafire.com/file/0yxpzputbpzlfgh/System+Hydra+AddOn.mcaddon/file',
    version:   '1.20.30',
    downloads: 0,
    fecha:     '2025-06-08'
  },
  {
    nombre: { es:'Parasite Paradise', en:'Parasite Paradise', pt:'Parasite Paradise' },
    descripcion: {
      es:'Enfrenta una invasión de parásitos mutantes que evolucionan, infectan mobs y transforman el mundo. Parasite Paradise Add-On incluye jefes, biomas oscuros y mecánicas de infección progresiva.',
      en:'Face a mutant parasite invasion that evolves, infects mobs, and reshapes the world. Parasite Paradise Add-On features bosses, dark biomes, and progressive infection mechanics.',
      pt:'Enfrente uma invasão de parasitas mutantes que evoluem, infectam mobs e transformam o mundo. O Parasite Paradise Add-On traz chefes, biomas sombrios e mecânicas de infecção progressiva.'
    },
    imagen:    'parasite_paradise.jpg',
    url:       'https://www.mediafire.com/file/34sg1nbuyc5spq7/Parasite+Paradise.mcaddon/file',
    version:   '1.16.0',
    downloads: 0,
    fecha:     '2023-06-18'
  },
  {
    nombre: { es:'Crab AddOn', en:'Crab AddOn', pt:'Crab AddOn' },
    descripcion: {
      es:'Agrega el cangrejo del Mob Vote 2023 con animaciones, comportamiento acuático y mecánicas únicas como perder la garra en combate. Crab Add-On permite usar esa garra para crear pociones que extienden el alcance al colocar bloques.',
      en:'Adds the crab from the 2023 Mob Vote with swimming behavior, animations, and unique mechanics like claw loss during fights. Crab Add-On lets you craft potions that increase block placement range using the dropped claw.',
      pt:'Adiciona o caranguejo do Mob Vote 2023 com comportamento aquático, animações e mecânicas como perda da garra em batalhas. O Crab Add-On permite criar poções que aumentam o alcance ao colocar blocos.'
    },
    imagen:    'crab_addon.jpg',
    url:       'https://www.mediafire.com/file/4027u06v86fxix9/Crab_AddOn.mcaddon/file',
    version:   '1.10.0',
    downloads: 0,
    fecha:     '2023-10-06'
  },
  {
    nombre: { es:'Luxury Cars', en:'Luxury Cars', pt:'Luxury Cars' },
    descripcion: {
      es:'Conduce superautos personalizables, derrapa y corre por cualquier mundo. Luxury Cars Add-On incluye vehículos de alto rendimiento con diseños modernos y opción de cambiar colores.',
      en:'Drive customizable supercars, drift, and race across any world. Luxury Cars Add-On features high-performance vehicles with sleek designs and color options.',
      pt:'Dirija supercarros personalizáveis, derrape e corra por qualquer mundo. O Luxury Cars Add-On traz veículos de alto desempenho com designs modernos e opções de cores.'
    },
    imagen:    'luxury_cars.jpg',
    url:       'https://www.mediafire.com/file/pugk2s5lfvdnoip/Luxury+Cars.mcaddon/file',
    version:   '1.21.60',
    downloads: 0,
    fecha:     '2025-05-17'
  },
  {
    nombre: { es:'Effect Statues', en:'Effect Statues', pt:'Effect Statues' },
    descripcion: {
      es:'Coloca estatuas que otorgan efectos como fuerza, regeneración o resistencia. Effect Statues Add-On convierte tus construcciones en fuentes de poder, con diseños únicos y activación por ítems específicos.',
      en:'Place statues that grant effects like strength, regeneration, or resistance. Effect Statues Add-On turns your builds into power sources with unique designs and item-based activation.',
      pt:'Coloque estátuas que concedem efeitos como força, regeneração ou resistência. O Effect Statues Add-On transforma suas construções em fontes de poder com designs únicos e ativação por itens específicos.'
    },
    imagen:    'effect_statues.jpg',
    url:       'https://www.mediafire.com/file/dsuw9a6uw820xcq/Effect+Statues.mcaddon/file',
    version:   '1.21.62',
    downloads: 0,
    fecha:     '2025-07-15'
  },
  {
    nombre: { es:'Wolf Expansion', en:'Wolf Expansion', pt:'Wolf Expansion' },
    descripcion: {
      es:'Domestica 24 especies de lobos con habilidades únicas, collares personalizables y animaciones especiales. Wolf Expansion Add-On incluye enemigos, un jefe lobo, equipo temático y mecánicas de cría para obtener al poderoso Alpha Wolf.',
      en:'Tame 24 unique wolf species with special abilities, customizable collars, and custom animations. Wolf Expansion Add-On features enemies, a wolf boss, themed gear, and breeding mechanics to unlock the mighty Alpha Wolf.',
      pt:'Domestique 24 espécies únicas de lobos com habilidades especiais, coleiras personalizáveis e animações exclusivas. O Wolf Expansion Add-On inclui inimigos, um chefe lobo, equipamentos temáticos e mecânicas de reprodução para obter o poderoso Alpha Wolf.'
    },
    imagen:    'wolf_expansion.jpg',
    url:       'https://www.mediafire.com/file/mdjhrvkdi0t7gwm/Wolf+Expansion.mcaddon/file',
    version:   '1.20.80',
    downloads: 0,
    fecha:     '2020-10-01'
  },
  {
    nombre: { es:'Scary', en:'Scary', pt:'Scary' },
    descripcion: {
      es:'Enfrenta hordas de zombis, jefes terroríficos y estructuras malditas. Scary Add-On añade 14 armas, 8 sets de armadura, nuevos mobs infectados y mecánicas de horror para transformar cualquier mundo en una pesadilla.',
      en:'Face zombie hordes, terrifying bosses, and cursed structures. Scary Add-On adds 14 weapons, 8 armor sets, infected mobs, and horror mechanics to turn any world into a nightmare.',
      pt:'Enfrente hordas de zumbis, chefes assustadores e estruturas amaldiçoadas. O Scary Add-On adiciona 14 armas, 8 conjuntos de armaduras, mobs infectados e mecânicas de terror para transformar qualquer mundo em um pesadelo.'
    },
    imagen:    'scary.jpg',
    url:       'https://www.mediafire.com/file/6nrphg8jcfw722w/Scary.mcaddon/file',
    version:   '1.21.0',
    downloads: 0,
    fecha:     '2024-09-24'
  },
  {
    nombre: { es:'Food Expansion', en:'Food Expansion', pt:'Food Expansion' },
    descripcion: {
      es:'Cultiva, cocina y crea más de 70 nuevos alimentos con muebles interactivos. Food Expansion Add-On incluye jugos, estofados, especias, postres mágicos y hasta pasteles que te teletransportan.',
      en:'Grow, cook, and craft over 70 new foods with interactive kitchen furniture. Food Expansion Add-On features juices, stews, spices, magical desserts, and cakes that teleport you.',
      pt:'Cultive, cozinhe e crie mais de 70 novos alimentos com móveis de cozinha interativos. O Food Expansion Add-On traz sucos, ensopados, temperos, sobremesas mágicas e bolos que teleportam você.'
    },
    imagen:    'food_expansion.jpg',
    url:       'https://www.mediafire.com/file/ciz6oi18hsih9p3/Food_Expansion.mcaddon/file',
    version:   '1.20.30',
    downloads: 0,
    fecha:     '2024-07-02'
  },
  {
    nombre: { es:'True Backpack', en:'True Backpack', pt:'True Backpack' },
    descripcion: {
      es:'Amplía tu inventario con mochilas personalizables que ofrecen hasta 256 espacios. True Backpack Add-On permite llevar herramientas, teñir mochilas, compartir acceso con amigos y recuperar tus ítems tras la muerte. Incluye mejoras como imán, teletransporte y mochilas temáticas de animales.',
      en:'Expand your inventory with customizable backpacks offering up to 256 slots. True Backpack Add-On lets you carry tools, dye backpacks, share access with friends, and recover items after death. Includes upgrades like magnet, teleportation, and animal-themed backpacks.',
      pt:'Expanda seu inventário com mochilas personalizáveis com até 256 espaços. O True Backpack Add-On permite carregar ferramentas, tingir mochilas, compartilhar acesso com amigos e recuperar itens após a morte. Inclui melhorias como ímã, teletransporte e mochilas temáticas de animais.'
    },
    imagen:    'true_backpack.jpg',
    url:       'https://www.mediafire.com/file/aody3flnvr4qtyz/True+Backpack.mcaddon/file',
    version:   '1.17.0',
    downloads: 0,
    fecha:     '2024-06-07'
  },
  {
    nombre: { es:'Nicos Magic Spells' , en:'Nicos Magic Spells', pt:'Nicos Magic Spells' },
    descripcion: {
      es:'Domina más de 70 hechizos con pergaminos mágicos, aldeanos encantadores y estructuras místicas. Nico’s Magic Spells Add-On introduce quills, varitas, aldeanos hechiceros, casas de escribas y bibliotecas mágicas. Usa la Mesa de Hechizos para crear pergaminos con efectos como curación, teletransporte, explosiones, invocaciones y más.',
      en:'Master over 70 spells using magical scrolls, enchanted villagers, and mystical structures. Nico’s Magic Spells Add-On adds quills, wands, spellcaster villagers, Scrollwright houses, and magical libraries. Use the Magic Spells Table to craft scrolls with effects like healing, teleportation, explosions, summoning, and more.',
      pt:'Domine mais de 70 feitiços com pergaminhos mágicos, aldeões encantados e estruturas místicas. O Nico’s Magic Spells Add-On adiciona penas mágicas, varinhas, aldeões feiticeiros, casas de escribas e bibliotecas mágicas. Use a Mesa de Feitiços para criar pergaminhos com efeitos como cura, teletransporte, explosões, invocação e muito mais.'
    },
    imagen:    'nicos_magic_spells.jpg',
    url:       'https://www.mediafire.com/file/eamuuoqwgz4vm8f/Nicos+Magic+Spells.mcaddon/file',
    version:   '1.21.70',
    downloads: 0,
    fecha:     '2020-10-01'
  },
  {
    nombre: { es:'Gravestones', en:'Gravestones', pt:'Gravestones' },
    descripcion: {
      es:'Al morir, aparece una lápida que guarda todos tus objetos. Gravestones Add-On evita que pierdas tu inventario y te muestra las coordenadas para recuperarlo.',
      en:'When you die, a gravestone spawns and stores your items. Gravestones Add-On keeps your gear safe and shows coordinates so you can retrieve it.',
      pt:'Ao morrer, uma lápide aparece e guarda seus itens. O Gravestones Add-On protege seu inventário e mostra as coordenadas para recuperá-lo.'
    },
    imagen:    'gravestones.jpg',
    url:       'https://www.mediafire.com/file/aipxd675fnmxy38/Gravestones.mcaddon/file',
    version:   '1.21.0',
    downloads: 0,
    fecha:     '2020-10-01'
  },
  {
    nombre: { es:'Legendary Texture Pack', en:'Legendary Texture Pack', pt:'Legendary Texture Pack' },
    descripcion: {
      es:'Transforma Minecraft con texturas medievales en pixel art, cielos personalizados, mobs remodelados y más de 100 modelos únicos. Legendary Texture Pack ofrece una estética detallada sin necesidad de shaders.',
      en:'Revamp Minecraft with medieval pixel art textures, custom skies, remodeled mobs, and over 100 unique models. Legendary Texture Pack delivers rich visuals without requiring shaders.',
      pt:'Transforme o Minecraft com texturas medievais em pixel art, céus personalizados, mobs remodelados e mais de 100 modelos únicos. Legendary Texture Pack oferece visuais detalhados sem precisar de shaders.'
    },
    imagen:    'legendary_texture_pack.jpg',
    url:       'https://www.mediafire.com/file/8hwwjtg83zz7q44/Legendary+Texture+Pack.mcpack/file',
    version:   '1.20.0',
    downloads: 0,
    fecha:     '2021-07-11'
  },
  {
    nombre: { es:'Smartphones', en:'Smartphones', pt:'Smartphones' },
    descripcion: {
      es:'Agrega un smartphone funcional que te permite jugar, escuchar música, enviar mensajes y hasta navegar por Reddit. Smartphones Mod incluye apps como fondo de pantalla, mapa y mensajería, todo dentro de un solo ítem que se fabrica con cristal, hierro y redstone.',
      en:'Adds a working smartphone that lets you play games, listen to music, send messages, and even browse Reddit. Smartphones Mod includes apps like wallpaper, map, and messaging—all packed into one item crafted with glass, iron, and redstone.',
      pt:'Adiciona um smartphone funcional que permite jogar, ouvir música, enviar mensagens e até navegar no Reddit. O Smartphones Mod inclui apps como papel de parede, mapa e mensagens, tudo em um único item feito com vidro, ferro e redstone.'
    },
    imagen:    'smartphones.jpg',
    url:       'https://www.mediafire.com/file/k2heesovya1n4rr/Smartphones.mcaddon/file',
    version:   '1.20.80',
    downloads: 0,
    fecha:     '2023-08-11'
  },
  {
    nombre: { es:'3D Craft', en:'3D Craft', pt:'3D Craft' },
    descripcion: {
      es:'Convierte los bloques clásicos en modelos tridimensionales sin perder el estilo pixelado. 3D Craft Texture Pack mejora la profundidad visual con texturas en 3D optimizadas para mantener buen rendimiento, incluso con shaders.',
      en:'Turns classic blocks into 3D models while preserving the pixelated style. 3D Craft Texture Pack enhances visual depth with optimized 3D textures that run smoothly, even with shaders.',
      pt:'Transforma blocos clássicos em modelos 3D sem perder o estilo pixelado. O 3D Craft Texture Pack melhora a profundidade visual com texturas 3D otimizadas para bom desempenho, mesmo com shaders.'
    },
    imagen:    '3d_craft.jpg',
    url:       'https://www.mediafire.com/file/rqp0xaqqtzgzz1t/3D+Craft.mcpack/file',
    version:   '1.21.0',
    downloads: 0,
    fecha:     '2020-10-01'
  },
  {
    nombre: { es:'Vehicles', en:'Vehicles', pt:'Vehicles' },
    descripcion: {
      es:'Agrega más de 20 vehículos funcionales como autos, tractores, aviones y remolques. Vehicles Mod permite personalizar motores, ruedas y colores, además de incluir sistema de combustible y accesorios como mesas de trabajo móviles.',
      en:'Adds over 20 functional vehicles like cars, tractors, planes, and trailers. Vehicles Mod lets you customize engines, wheels, and colors, with a fuel system and mobile workstations.',
      pt:'Adiciona mais de 20 veículos funcionais como carros, tratores, aviões e reboques. O Vehicles Mod permite personalizar motores, rodas e cores, com sistema de combustível e estações de trabalho móveis.'
    },
    imagen:    'vehicles.jpg',
    url:       '#',
    version:   '1.21.0',
    downloads: 0,
    fecha:     '2020-11-06'
  },
  {
    nombre: { es:'Arcane Creatures', en:'Arcane Creatures', pt:'Arcane Creatures' },
    descripcion: {
      es:'Invoca criaturas mágicas como gólems de fuego, espectros de hielo y jefes elementales. Arcane Creatures Add-On añade enemigos únicos, armas con efectos visuales y estructuras encantadas para combates épicos.',
      en:'Summon magical beings like fire golems, ice specters, and elemental bosses. Arcane Creatures Add-On introduces unique enemies, weapons with visual effects, and enchanted structures for epic battles.',
      pt:'Invoque criaturas mágicas como golens de fogo, espectros de gelo e chefes elementais. O Arcane Creatures Add-On traz inimigos únicos, armas com efeitos visuais e estruturas encantadas para batalhas épicas.'
    },
    imagen:    'arcane_creatures.jpg',
    url:       '#',
    version:   '1.21.0',
    downloads: 0,
    fecha:     '2020-10-01'
  },
  {
    nombre: { es:'Pixels', en:'Pixels', pt:'Pixels' },
    descripcion: {
      es:'Agrega criaturas pixeladas con animaciones retro, efectos especiales y mecánicas únicas. Pixels Add-On transforma el mundo con enemigos, mascotas y objetos inspirados en juegos clásicos.',
      en:'Adds pixel-style creatures with retro animations, special effects, and unique mechanics. Pixels Add-On revamps the world with enemies, pets, and items inspired by classic games.',
      pt:'Adiciona criaturas em estilo pixel com animações retrô, efeitos especiais e mecânicas únicas. O Pixels Add-On transforma o mundo com inimigos, mascotes e itens inspirados em jogos clássicos.'
    },
    imagen:    'pixels.jpg',
    url:       '#',
    version:   '1.18.0',
    downloads: 0,
    fecha:     '2024-11-12'
  },
  {
    nombre: { es:'Excalibur', en:'Excalibur', pt:'Excalibur' },
    descripcion: {
      es:'Convierte Minecraft Bedrock en una experiencia medieval con texturas rústicas, mobs personalizados y efectos atmosféricos únicos. Excalibur Texture Pack mantiene la resolución clásica de 16x, incluye interfaz rediseñada estilo medieval.',
      en:'Transform Minecraft Bedrock into a medieval experience with rustic textures, custom mobs, and unique atmospheric effects. Excalibur Texture Pack keeps the classic 16x resolution, features a redesigned medieval UI.',
      pt:'Transforme o Minecraft Bedrock em uma aventura medieval com texturas rústicas, mobs personalizados e efeitos atmosféricos únicos. O Excalibur Texture Pack mantém a resolução clássica de 16x, possui interface medieval.'
    },
    imagen:    'excalibur.jpg',
    url:       '#',
    version:   '1.20.0',
    downloads: 0,
    fecha:     '2024-05-28'
  },
  {
    nombre: { es:'Millionaire Mansions', en:'Millionaire Mansions', pt:'Millionaire Mansions' },
    descripcion: {
      es:'Construye mansiones de lujo con planos automáticos, muebles elegantes y vehículos exclusivos. Millionaire Mansions Add-On incluye seis estilos de mansión, más de 40 muebles, mascotas, herramientas de decoración y un sistema de monedas para desbloquear contenido.',
      en:'Build luxury mansions with auto-blueprints, stylish furniture, and exclusive vehicles. Millionaire Mansions Add-On features six mansion styles, over 40 furniture pieces, pets, decoration tools, and a coin system to unlock content.',
      pt:'Construa mansões de luxo com projetos automáticos, móveis elegantes e veículos exclusivos. O Millionaire Mansions Add-On traz seis estilos de mansão, mais de 40 móveis, mascotes, ferramentas de decoração e um sistema de moedas para desbloquear conteúdo.'
    },
    imagen:    'millionaire_mansions.jpg',
    url:       '#',
    version:   '1.21.0',
    downloads: 0,
    fecha:     '2025-05-13'
  },
  {
    nombre: { es:'Biomes', en:'Biomes', pt:'Biomes' },
    descripcion: {
      es:'Explora más de 20 biomas nuevos con animales únicos, estructuras especiales y bloques decorativos. Biomes Add-On para Minecraft Bedrock transforma el mundo con tundras, oasis, volcanes, bosques mágicos y criaturas como ciervos, mapaches y yetis.',
      en:'Discover over 20 new biomes with unique animals, special structures, and decorative blocks. Biomes Add-On for Minecraft Bedrock revamps the world with tundras, oases, volcanoes, magical forests, and creatures like deer, raccoons, and yetis.',
      pt:'Explore mais de 20 novos biomas com animais únicos, estruturas especiais e blocos decorativos. O Biomes Add-On para Minecraft Bedrock transforma o mundo com tundras, oásis, vulcões, florestas mágicas e criaturas como cervos, guaxinins e yetis.'
    },
    imagen:    'biomes.jpg',
    url:       '#',
    version:   '1.21.0',
    downloads: 0,
    fecha:     '2020-10-01'
  },
  {
    nombre: { es:'Ultimate Textures 8x8', en:'Ultimate Textures 8x8', pt:'Ultimate Textures 8x8' },
    descripcion: {
      es:'proximamente',
      en:'proximamente',
      pt:'proximamente'
    },
    imagen:    'ultimate_textures_8x8.jpg',
    url:       '#',
    version:   '1.19.0',
    downloads: 0,
    fecha:     '2020-10-01'
  },
  {
    nombre: { es:'Lunar Moon', en:'Lunar Moon', pt:'Lunar Moon' },
    descripcion: {
      es:'proximamente',
      en:'proximamente',
      pt:'proximamente'
    },
    imagen:    'lunar_moon.jpg',
    url:       '#',
    version:   '1.21.0',
    downloads: 0,
    fecha:     '2020-10-01'
  },
  {
    nombre: { es:'Monsters', en:'Monsters', pt:'Monsters' },
    descripcion: {
      es:'proximamente',
      en:'proximamente',
      pt:'proximamente'
    },
    imagen:    'monsters.jpg',
    url:       '#',
    version:   '1.21.40',
    downloads: 0,
    fecha:     '2020-10-01'
  },
  {
    nombre: { es:'The Cursed Harvester', en:'The Cursed Harvester', pt:'The Cursed Harvester' },
    descripcion: {
      es:'proximamente',
      en:'proximamente',
      pt:'proximamente'
    },
    imagen:    'the_cursed_harvester.jpg',
    url:       '#',
    version:   '1.21.72',
    downloads: 0,
    fecha:     '2020-10-01'
  },
  {
    nombre: { es:'Dinosaurs', en:'Dinosaurs', pt:'Dinosaurs' },
    descripcion: {
      es:'proximamente',
      en:'proximamente',
      pt:'proximamente'
    },
    imagen:    'dinosaursb.jpg',
    url:       '#',
    version:   '1.21.0',
    downloads: 0,
    fecha:     '2020-10-01'
  },
  {
    nombre: { es:'Security Sandbox', en:'Security Sandbox', pt:'Security Sandbox' },
    descripcion: {
      es:'proximamente',
      en:'proximamente',
      pt:'proximamente'
    },
    imagen:    'security_sandbox.jpg',
    url:       '#',
    version:   '1.21.0',
    downloads: 0,
    fecha:     '2020-10-01'
  },
  {
    nombre: { es:'Morph 2.0', en:'Morph 2.0', pt:'Morph 2.0' },
    descripcion: {
      es:'proximamente',
      en:'proximamente',
      pt:'proximamente'
    },
    imagen:    'morph2.0.jpg',
    url:       '#',
    version:   '1.21.0',
    downloads: 0,
    fecha:     '2020-10-01'
  },
  {
    nombre: { es:'Raft Survival', en:'Raft Survival', pt:'Raft Survival' },
    descripcion: {
      es:'proximamente',
      en:'proximamente',
      pt:'proximamente'
    },
    imagen:    'raft_survival.jpg',
    url:       '#',
    version:   '1.21.50',
    downloads: 0,
    fecha:     '2020-10-01'
  },
  {
    nombre: { es:'Ultimate Blasters', en:'Ultimate Blasters', pt:'Ultimate Blasters' },
    descripcion: {
      es:'proximamente',
      en:'proximamente',
      pt:'proximamente'
    },
    imagen:    'ultimate_blasters.jpg',
    url:       '#',
    version:   '1.20.80',
    downloads: 0,
    fecha:     '2020-10-01'
  },
  {
    nombre: { es:'Supercars', en:'Supercars', pt:'Supercars' },
    descripcion: {
      es:'proximamente',
      en:'proximamente',
      pt:'proximamente'
    },
    imagen:    'supercars.jpg',
    url:       '#',
    version:   '1.20.50',
    downloads: 0,
    fecha:     '2020-10-01'
  },
  {
    nombre: { es:'FantasyCraft', en:'FantasyCraft', pt:'FantasyCraft' },
    descripcion: {
      es:'proximamente',
      en:'proximamente',
      pt:'proximamente'
    },
    imagen:    'fantasycraft.jpg',
    url:       '#',
    version:   '1.21.20',
    downloads: 0,
    fecha:     '2020-10-01'
  }
];

const mundos = [
  {
    nombre: { es:'Battle Royale', en:'Battle Royale', pt:'Battle Royale' },
    descripcion: {
      es:'Arena amplia con diversos biomas, edificios en ruinas, zonas de botín y un perímetro que se encoge para intensificar el combate.',
      en:'Vast arena featuring varied biomes, ruined structures, loot hotspots, and a shrinking perimeter to heighten the action.',
      pt:'Ampla arena com biomas variados, construções em ruínas, pontos de loot e um perímetro que se reduz para elevar o combate.'
    },
    imagen:    'battle_royale.jpg',
    url:       'https://www.mediafire.com/file/71hkujewjo5z9cc/Battle+Royale.mctemplate/file',
    version:   '1.21.82',
    downloads: 0,
    fecha:     '2024-10-03'
  },
  {
    nombre: { es:'Corridors', en:'Corridors', pt:'Corridors' },
    descripcion: {
      es:'Explora pasillos oscuros, puertas cerradas y secretos ocultos. Corridors es una plantilla de mundo para Minecraft Bedrock con ambientación de terror, ideal para aventuras en solitario o mapas de escape.',
      en:'Explore dark hallways, locked doors, and hidden secrets. Corridors is a Minecraft Bedrock world template with a horror atmosphere—perfect for solo adventures or escape maps.',
      pt:'Explore corredores sombrios, portas trancadas e segredos ocultos. Corridors é uma template de mundo para Minecraft Bedrock com clima de terror, ideal para aventuras solo ou mapas de fuga.'
    },
    imagen:    'corridors.jpg',
    url:       'https://www.mediafire.com/file/7pauxzxhec3uu57/Corridors.mctemplate/file',
    version:   '1.21.60',
    downloads: 0,
    fecha:     '2024-10-03'
  },
  {
    nombre: { es:'Secret Warden Base', en:'Secret Warden Base', pt:'Secret Warden Base' },
    descripcion: {
      es:'Explora una base secreta oculta en lo profundo del bioma Sculk. Secret Warden Base es una plantilla de mundo para Minecraft Bedrock con salas protegidas, trampas, laboratorios y ambientación de sigilo.',
      en:'Explore a hidden base deep within the Sculk biome. Secret Warden Base is a Minecraft Bedrock world template featuring secure rooms, traps, labs, and stealth-themed design.',
      pt:'Explore uma base secreta escondida no bioma Sculk. O Secret Warden Base é uma template de mundo para Minecraft Bedrock com salas protegidas, armadilhas, laboratórios e clima furtivo.'
    },
    imagen:    'secret_warden_base.jpg',
    url:       'https://www.mediafire.com/file/xl9vn9gdr4j2s9i/Secret+Warden+Base.mctemplate/file',
    version:   '1.21.0',
    downloads: 0,
    fecha:     '2024-10-03'
  },
  {
    nombre: { es:'Realistic Landscapes', en:'Realistic Landscapes', pt:'Realistic Landscapes' },
    descripcion: {
      es:'Explora un mundo con paisajes realistas, montañas detalladas, ríos dinámicos y ambientación natural. Realistic Landscapes es una plantilla de mundo para Minecraft Bedrock ideal para construir, explorar o crear aventuras inmersivas.',
      en:'Explore a world with realistic terrain, detailed mountains, dynamic rivers, and natural ambiance. Realistic Landscapes is a Minecraft Bedrock world template perfect for building, exploring, or crafting immersive adventures.',
      pt:'Explore um mundo com terrenos realistas, montanhas detalhadas, rios dinâmicos e clima natural. Realistic Landscapes é uma template de mundo para Minecraft Bedrock ideal para construir, explorar ou criar aventuras imersivas.'
    },
    imagen:    'realistic_landscapes.jpg',
    url:       'https://www.mediafire.com/file/qufmqzrqienrwbw/Realistic+Landscapes.mctemplate/file',
    version:   '1.20.60',
    downloads: 0,
    fecha:     '2023-03-27'
  },
  {
    nombre: { es:'Lucky One Block', en:'Lucky One Block', pt:'Lucky One Block' },
    descripcion: {
      es:'Rompe bloques de la suerte en una isla flotante. Lucky One Block es una plantilla caótica y divertida para supervivencia.',
      en:'Break lucky blocks on a floating island. Lucky One Block is a chaotic and fun survival template.',
      pt:'Quebre blocos da sorte em uma ilha flutuante. Lucky One Block é uma template caótica e divertida para sobrevivência.'
    },
    imagen:    'lucky_one_block.jpg',
    url:       'https://www.mediafire.com/file/gjetd542h7a51k3/Lucky+One+Block.mcworld/file',
    version:   '1.21.0',
    downloads: 0,
    fecha:     '2024-06-15'
  }
];

const colaboradoresArr = [
  {
    nombre: 'Neyman',
    redesSociales: [
      { img: 'whatsapp.jpg', url: 'https://chat.whatsapp.com/LveZVIb5c3hBxP9s5Ffm9d' },
      { img: 'whatsapp.jpg', url: 'https://chat.whatsapp.com/HB384o5RG2b4yiNS5RPG2m' }
    ]
  },
  {
    nombre: 'SoyDaik',
    redesSociales: [
      { img: 'youtube.jpg', url: 'https://youtube.com/@soydaik?si=N-YMWeAnADuPJ649' },
      { img: 'tiktok.jpg', url: 'https://www.tiktok.com/@soydaik_01?_t=ZS-8y5mpZDlOev&_r=1' },
      { img: 'facebook.jpg', url: 'https://www.facebook.com/share/1KkKxqfogJ/' }
    ]
  }
];

// ----------------------------
// Estado y textos UI
// ----------------------------
let currentCategory = 'addons';
let currentData = addons;
const UI_TEXT = {
  es: {
    placeholder: 'Buscar mods...',
    versionLabel: 'Versión',
    pop: ['Popularidad','Más popular','Menos popular'],
    age: ['Antigüidad','Más antiguo','Menos antiguo']
  },
  en: {
    placeholder: 'Search mods...',
    versionLabel: 'Version',
    pop: ['Popularity','Most popular','Least popular'],
    age: ['Age','Oldest first','Newest first']
  },
  pt: {
    placeholder: 'Buscar mods...',
    versionLabel: 'Versão',
    pop: ['Popularidade','Mais popular','Menos popular'],
    age: ['игInformações antigas','Mais recentes']
  }
};

// ----------------------------
// Referencias DOM
// ----------------------------
const contenedor       = document.getElementById('contenedor-mods');
const buscador         = document.getElementById('buscador');
const selVer           = document.getElementById('filtro-version');
const selPop           = document.getElementById('filtro-popularidad');
const selAge           = document.getElementById('filtro-antiguedad');
const btnFiltros       = document.getElementById('btn-filtros');
const contFiltros      = document.getElementById('filtros');
const btnNavAddons     = document.getElementById('btn-nav-addons');
const btnNavMapas      = document.getElementById('btn-nav-mundos');
const btnNavPrivacy    = document.getElementById('btn-nav-privacy');
const btnNavAbout      = document.getElementById('btn-nav-about');
const btnNavContact    = document.getElementById('btn-nav-contact');
const btnMenuLang      = document.getElementById('btn-menu-idioma');
const selectLang       = document.getElementById('select-idioma');
const themeButton      = document.getElementById('btn-theme-toggle');
const btnColaboradores = document.getElementById('btn-colaboradores');
const btnRequest       = document.getElementById('btn-request');

// ----------------------------
// Navegación y renderizado
// ----------------------------
function closeMenu() {
  document.getElementById('side-menu').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
  document.getElementById('menu-toggle').setAttribute('aria-expanded','false');
  selectLang.classList.remove('active');
}

function switchCategory(cat) {
  closeMenu();
  document.getElementById('search-container').style.removeProperty('display');
  contFiltros.style.removeProperty('display');
  contFiltros.classList.remove('active');
  btnFiltros.setAttribute('aria-expanded','false');
  buscador.value = '';
  buscador.focus();
  currentCategory = cat;
  currentData     = cat === 'addons' ? addons : mundos;
  applyLanguage();
}

btnNavAddons.addEventListener('click', () => switchCategory('addons'));
btnNavMapas.addEventListener('click', () => switchCategory('mundos'));

// ----------------------------
// Mostrar secciones informativas
// ----------------------------
function hideSearchAndFilters() {
  document.getElementById('search-container').style.display = 'none';
  contFiltros.style.display            = 'none';
}
function showTextSection(textMap) {
  closeMenu();
  hideSearchAndFilters();
  const L = Translator.getLang();
  contenedor.innerHTML = `<div class="info-section">${textMap[L]}</div>`;
}
btnNavPrivacy.addEventListener('click', () => showTextSection(PRIVACY_TEXT));
btnNavAbout  .addEventListener('click', () => showTextSection(ABOUT_TEXT));
btnNavContact.addEventListener('click', () => showTextSection(CONTACT_TEXT));

// ----------------------------
// Filtros dinámicos
// ----------------------------
btnFiltros.addEventListener('click', () => {
  contFiltros.classList.toggle('active');
  const exp = btnFiltros.getAttribute('aria-expanded') === 'true';
  btnFiltros.setAttribute('aria-expanded', String(!exp));
});
function buildVersionOptions() {
  const L = Translator.getLang();
  selVer.innerHTML = '';
  const allOpt = document.createElement('option');
  allOpt.value       = 'todas';
  allOpt.textContent = Translator.dict[L].versionAll;
  selVer.appendChild(allOpt);
  for (let i = 0; i <= 21; i++) {
    const opt = document.createElement('option');
    opt.value       = `1.${i}`;
    opt.textContent = `1.${i}`;
    selVer.appendChild(opt);
  }
}
function buildPopOptions() {
  const L = Translator.getLang();
  selPop.innerHTML = '';
  UI_TEXT[L].pop.forEach((lab, i) => {
    const opt = document.createElement('option');
    opt.value       = i === 0 ? 'none' : (i === 1 ? 'desc' : 'asc');
    opt.textContent = lab;
    selPop.appendChild(opt);
  });
}
function buildAgeOptions() {
  const L = Translator.getLang();
  selAge.innerHTML = '';
  UI_TEXT[L].age.forEach((lab, i) => {
    const opt = document.createElement('option');
    opt.value       = i === 0 ? 'none' : (i === 1 ? 'desc' : 'asc');
    opt.textContent = lab;
    selAge.appendChild(opt);
  });
}

// ----------------------------
// Renderizado de tarjetas
// ----------------------------
function renderMods(list) {
  contenedor.innerHTML = '';
  const L = Translator.getLang();
  list.forEach(m => {
    const card = document.createElement('div');
    card.className = 'tarjeta';
    card.innerHTML = `
      <div class="tarjeta-contenido">
        <img src="${m.imagen}" alt="${m.nombre[L]}">
        <div class="tarjeta-info">
          <h3>${m.nombre[L]}</h3>
          <p>${m.descripcion[L]}</p>
          <p><small>${UI_TEXT[L].versionLabel}: ${m.version}</small></p>
        </div>
      </div>
      <button class="leer-mas">${Translator.dict[L].btnDownload}</button>
    `;
    card.querySelector('.leer-mas').addEventListener('click', () => {
      window.open(m.url, '_blank');
    });
    contenedor.appendChild(card);
  });
}

// ----------------------------
// “No results”
// ----------------------------
function showNoResults() {
  const L = Translator.getLang();
  contenedor.innerHTML = `
    <div class="no-results">
      <p>
        ${Translator.dict[L].noResultsBeforeLink}
        <a href="#" id="no-results-link">${Translator.dict[L].noResultsLinkText}</a>
      </p>
    </div>
  `;
  document.getElementById('no-results-link').addEventListener('click', e => {
    e.preventDefault();
    const url =
      'https://docs.google.com/forms/d/e/1FAIpQLSfOg7MVx8uV55RtT3Eib0uJXtu2G6ceKoEhcZZDfbrfXXNf_g/viewform?usp=header';
    window.open(url, '_blank');
  });
}

// ----------------------------
// Búsqueda y filtrado
// ----------------------------
function actualizarLista() {
  let lst = currentData.slice();
  const term = buscador.value.toLowerCase();
  lst = lst.filter(m =>
    m.nombre[Translator.getLang()].toLowerCase().includes(term)
  );
  if (currentCategory !== 'skins' && selVer.value !== 'todas') {
    lst = lst.filter(m => m.version.startsWith(selVer.value));
  }
  if (selPop.value === 'desc') lst.sort((a, b) => b.downloads - a.downloads);
  if (selPop.value === 'asc') lst.sort((a, b) => a.downloads - b.downloads);
  if (selAge.value === 'desc')
    lst.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  if (selAge.value === 'asc')
    lst.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  lst.length === 0 ? showNoResults() : renderMods(lst);
}
[buscador, selVer, selPop, selAge].forEach(el =>
  el.addEventListener('input', actualizarLista)
);

// ----------------------------
// Colaboradores
// ----------------------------
function showColaboradores() {
  closeMenu();
  document.getElementById('search-container').style.display = 'none';
  contFiltros.style.display = 'none';
  contenedor.innerHTML = '<div class="colab-grid"></div>';
  const grid = document.querySelector('.colab-grid');
  colaboradoresArr.forEach(person => {
    const card = document.createElement('div');
    card.className = 'colaborador';
    const name = document.createElement('h3');
    name.innerText = person.nombre;
    card.appendChild(name);
    const icons = document.createElement('div');
    icons.className = 'icons';
    person.redesSociales.forEach(soc => {
      const a = document.createElement('a');
      a.href = soc.url;
      a.target = '_blank';
      const img = document.createElement('img');
      img.src = soc.img;
      img.alt = '';
      a.appendChild(img);
      icons.appendChild(a);
    });
    card.appendChild(icons);
    grid.appendChild(card);
  });
}
btnColaboradores.addEventListener('click', showColaboradores);

// ----------------------------
// Solicitar un Mod/Mapa
// ----------------------------
btnRequest.addEventListener('click', () => {
  const url =
    'https://docs.google.com/forms/d/e/1FAIpQLSfOg7MVx8uV55RtT3Eib0uJXtu2G6ceKoEhcZZDfbrfXXNf_g/viewform?usp=header';
  window.open(url, '_blank');
});

// ----------------------------
// Idioma y tema
// ----------------------------
function buildIdiomaOptions() {
  const langs = ['es', 'en', 'pt'];
  const labels = { es: 'Español', en: 'English', pt: 'Português' };
  selectLang.innerHTML = '';
  langs.forEach(l => {
    const o = document.createElement('option');
    o.value = l;
    o.textContent = labels[l];
    selectLang.appendChild(o);
  });
  selectLang.value = Translator.getLang();
}

btnMenuLang.addEventListener('click', () =>
  selectLang.classList.toggle('active')
);
selectLang.addEventListener('change', e => {
  Translator.setLang(e.target.value);
  selectLang.classList.remove('active');
});

// ----------------------------
// Tema claro/oscuro
// ----------------------------
themeButton.addEventListener('click', () => {
  const current =
    document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = current === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
});

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  // Actualiza texto del botón de tema
  const L = Translator.getLang();
  const key = theme === 'dark' ? 'modeDark' : 'modeLight';
  themeButton.innerText = Translator.dict[L][key];

  // Actualiza icono del filtro
  const filtroImg = document.querySelector('#btn-filtros img');
  if (filtroImg) {
    filtroImg.src = theme === 'dark' ? 'filtro_oscuro.jpg' : 'filtro.jpg';
  }

  localStorage.setItem('theme', theme);
}

// ----------------------------
// Aplicación de idioma y refresco
// ----------------------------
function applyLanguage() {
  Translator.applyTranslations();
  const L = Translator.getLang();
  buscador.placeholder = Translator.dict[L].searchPlaceholder;
  selVer.style.display = currentCategory === 'skins' ? 'none' : 'block';
  buildVersionOptions();
  buildPopOptions();
  buildAgeOptions();
  actualizarLista();
}

document.addEventListener('langChanged', applyLanguage);
buildIdiomaOptions();
applyLanguage();

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme') || 'light';
  applyTheme(saved);
});