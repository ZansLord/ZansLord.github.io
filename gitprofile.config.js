// gitprofile.config.js

const config = {
  github: {
    username: 'ZansLord', // Your GitHub org/user name. (Required)
    sortBy: 'stars', // stars | updated
    limit: 10, // How many projects to display.
    exclude: {
      forks: false, // Forked projects will not be displayed if set to true.
      projects: [], // These projects will not be displayed. example: ['my-project1', 'my-project2']
    },
  },
  social: {
    linkedin: 'ZansLord',
    twitter: 'Abdul_Zans',
    facebook: 'Abdul Malik Rizky',
    instagram: 'black_team_indonesia',
    dribbble: '',
    behance: '',
    medium: '',
    dev: '',
    stackoverflow: '20615525/ZansLord', // format: userid/username
    website: 'https://elaina-multidevice.zanslord.repl.co/',
    phone: '+6285869074622',
    email: 'abdulzans11@gmail.com',
  },
  resume: {
    fileUrl: '', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'Python','Machine Learning', 'Image Processing', 'Drawing', 'Data Engineering',
    'Express.js',
    'JavaScript',
    'React.js','Redux.js',
    'Node.js',
    'Nest.js',
    'PostgreSQL',
    'Git',
    'Docker',
    'AWS',
    'CSS',
  ],
  experiences: [
    {
      company: ' Black Team Meme Indonesia ',
      position: 'Admin',
      from: 'July 2018',
      to: 'Now',
      companyLink: 'https://instagram.com/black_team_indonesia',
    },
    {
      company: ' Elaina-Chan Bot MultiDevice ',
      position: 'owner',
      from: '26 Nov 2022',
      to: 'Now',
      companyLink: 'wa.me/62895333501279',
     },
  ],
  education: [
    {
      institution: 'SDN JELEKONG',
      degree: 'Murid',
      from: '2015',
      to: '2021',
    },
    {
      institution: 'SMPN 2 BALEENDAH',
      degree: 'Pelajar',
      from: '2021',
      to: 'now',
    },
  ],
  // Display blog posts from your medium or dev account. (Optional)
  blog: {
    source: 'dev', // medium | dev
    username: 'deverf', // to hide blog section, keep it empty
    limit: 3, // How many posts to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  backgroundsArray: [
    'dots' ,
    'birds' ,
    'cells',
    'clouds' ,
    'clouds2' ,
    'dots' ,
    'globle' ,
    'halo' ,
    'net' ,
    'rings' ,
    'ripple' ,
    'topology' ,
    'trunk' ,
    'waves' ,
  ],
  themeConfig: {
    defaultTheme: 'night',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Hide the ring in Profile picture
    hideAvatarRing: false,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'procyon',
    ],


    // Custom theme
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },
};

export default config;
