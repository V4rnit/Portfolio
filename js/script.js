const terminal = document.getElementById("terminal");
let commandHistory = [];
let historyIndex = -1;
let currentInput = "";
const TYPE_DELAY = 20;
const LINE_PAUSE = 50;

// Projects data
const projects = [
  {
    name: "CodeClarity",
    tech: "React, Node.js, Express, MongoDB, REST APIs, JavaScript, HTML/CSS",
    description: "DSA learning platform with simulated interview scenarios",
    link: "https://codeclearity.netlify.app/"
  },
  {
    name: "AlgoPath",
    tech: "HTML, CSS, JavaScript, React, Tailwind CSS, Node.js, Firebase",
    description: "Algorithm roadmap website with interactive learning paths",
    link: "https://v4rnit.github.io/AlgoPath/"
  },
  {
    name: "Secure Command-Line Shell",
    tech: "Java, JWT, Multithreading, File I/O, CLI, Linux",
    description: "Modular Java shell with custom commands and JWT session management",
    link: "https://github.com/V4rnit/SecrureShell"
  },
  {
    name: "Terminalfolio",
    tech: "HTML, CSS, JavaScript",
    description: "This terminal-style portfolio website",
    link: "https://v4rnit.github.io/Portfolio/"
  }
];

// Skills data with logo mappings
const skills = {
  all: [
    { name: "Java", icon: "openjdk" },
    { name: "Python", icon: "python" },
    { name: "C", icon: "c" },
    { name: "C++", icon: "cplusplus" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "JavaScript", icon: "javascript" },
    { name: "HTML5", icon: "html5" },
    { name: "CSS3", icon: "css3" },
    { name: "Bash", icon: "gnubash" },
    { name: "React", icon: "react" },
    { name: "Node.js", icon: "nodedotjs" },
    { name: "JUnit", icon: "junit5" },
    { name: "WordPress", icon: "wordpress" },
    { name: "Spring Boot", icon: "spring" },
    { name: "Git", icon: "git" },
    { name: "Docker", icon: "docker" },
    { name: "Google Cloud", icon: "googlecloud" },
    { name: "VS Code", icon: "visualstudiocode" },
    { name: "PyCharm", icon: "pycharm" },
    { name: "IntelliJ IDEA", icon: "intellijidea" },
    { name: "TMUX", icon: "tmux" },
    { name: "Vim", icon: "vim" },
    { name: "NeoVim", icon: "neovim" },
    { name: "MongoDB", icon: "mongodb" },
    { name: "Express", icon: "express" },
    { name: "Firebase", icon: "firebase" },
    { name: "Tailwind CSS", icon: "tailwindcss" }
  ]
};

// Experience data
const experience = [
  {
    period: "Aug 2025 – Present",
    role: "Teaching Assistant — Data Structures & Algorithms",
    company: "University of Central Florida",
    location: "Orlando, FL",
    bullets: [
      "Assisted 140+ students during lab sessions by debugging code and explaining core DSA topics such as arrays, trees, and sorting algorithms.",
      "Created eight unique corner-case test cases, improving code quality and saving students approximately 20+ hours of debugging time per week.",
      "Improved grading efficiency by 50% by developing automated Bash scripts to grade programming assignments, ensuring accuracy and consistency."
    ]
  },
  {
    period: "Aug 2025 – Present",
    role: "Workshop Instructor",
    company: "Knight Hacks",
    location: "Orlando, FL",
    bullets: [
      "Managed workshops for 40+ students on coding strategies for technical interviews.",
      "Guide students on effective communication and coding approaches during interviews, resulting in 20% higher mock interview success rates.",
      "Collaborated with peers in weekly planning sessions, iterating on curriculum based on student feedback and achieving a 30% improvement in outcomes."
    ]
  }
];

/* -------- TYPING FUNCTIONS -------- */

function typeLine(line, delay = TYPE_DELAY, className = "output") {
  return new Promise((resolve) => {
    const div = document.createElement("div");
    div.className = `line ${className}`;
    terminal.appendChild(div);
    terminal.scrollTop = terminal.scrollHeight;

    let idx = 0;
    const interval = setInterval(() => {
      if (idx <= line.length) {
        div.textContent = line.slice(0, idx);
        idx++;
        terminal.scrollTop = terminal.scrollHeight;
      } else {
        clearInterval(interval);
        resolve(div);
      }
    }, delay);
  });
}

function typeLines(lines, delay = TYPE_DELAY, className = "output") {
  return lines.reduce(
    (promise, line) =>
      promise
        .then(() => typeLine(line, delay, className))
        .then(() => new Promise((r) => setTimeout(r, LINE_PAUSE))),
    Promise.resolve()
  );
}

function printLine(text, className = "output") {
  const div = document.createElement("div");
  div.className = `line ${className}`;
  div.textContent = text;
  terminal.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
}

function printLineWithHTML(html, className = "output") {
  const div = document.createElement("div");
  div.className = `line ${className}`;
  div.innerHTML = html;
  terminal.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
}

/* -------- BOOT SEQUENCE -------- */

async function bootSequence() {
  const asciiArt = [
    "$$\\    $$\\                              $$\\   $$\\           $$$$$$$\\                                     $$\\     ",
    "$$ |   $$ |                             \\__|  $$ |          $$  __$$\\                                    $$ |    ",
    "$$ |   $$ |$$$$$$\\   $$$$$$\\  $$$$$$$\\  $$\\ $$$$$$\\         $$ |  $$ | $$$$$$\\  $$\\  $$\\  $$\\  $$$$$$\\ $$$$$$\\   ",
    "\\$$\\  $$  |\\____$$\\ $$  __$$\\ $$  __$$\\ $$ |\\_$$  _|        $$$$$$$  | \\____$$\\ $$ | $$ | $$ | \\____$$\\\\_$$  _|  ",
    " \\$$\\$$  / $$$$$$$ |$$ |  \\__|$$ |  $$ |$$ |  $$ |          $$  __$$<  $$$$$$$ |$$ | $$ | $$ | $$$$$$$ | $$ |    ",
    "  \\$$$  / $$  __$$ |$$ |      $$ |  $$ |$$ |  $$ |$$\\       $$ |  $$ |$$  __$$ |$$ | $$ | $$ |$$  __$$ | $$ |$$\\ ",
    "   \\$  /  \\$$$$$$$ |$$ |      $$ |  $$ |$$ |  \\$$$$  |      $$ |  $$ |\\$$$$$$$ |\\$$$$$\\$$$$  |\\$$$$$$$ | \\$$$$  |",
    "    \\_/    \\_______|\\__|      \\__|  \\__|\\__|   \\____/       \\__|  \\__| \\_______| \\_____\\____/  \\_______|  \\____/ "
  ];

  // Display ASCII art instantly
  for (const line of asciiArt) {
    printLine(line, "ascii-art");
  }

  printLine("", "system");
  await typeLine("Welcome to Varnit Rawat's Terminal Portfolio", TYPE_DELAY, "system");
  await new Promise((resolve) => setTimeout(resolve, LINE_PAUSE));
  await typeLine("Type `help` to see available commands", TYPE_DELAY, "system");
  await new Promise((resolve) => setTimeout(resolve, LINE_PAUSE));
  printLine("", "system");
}

/* -------- COMMANDS -------- */

const commands = {
  help: async () => {
    await typeLines(
      [
        "Available commands:",
        "",
        "help",
        "about",
        "projects",
        "skills",
        "experience",
        "contact",
        "resume",
        "clear",
        "whoami",
        ""
      ],
      TYPE_DELAY,
      "output"
    );
  },

  about: async () => {
    // Profile image
    const img = document.createElement("img");
    img.src = "images/pfp.png";
    img.alt = "Photo of Varnit Rawat";
    img.className = "about-photo";
    terminal.appendChild(img);
    terminal.scrollTop = terminal.scrollHeight;

    const aboutLines = [
      "Name: Varnit Rawat",
      "Role: Software Engineer / Information Technology Student",
      "Interests: Systems, Backend, Full-Stack, DSA",
      "",
      "I'm a Senior at the University of Central Florida majoring in Information Technology,",
      "with a heavy focus on Backend Systems and Full-Stack Development.",
      "",
      "I've always felt that code is at its best when it's helping people, which is why I'm so",
      "passionate about my role as a Teaching Assistant for Data Structures & Algorithms.",
      "I genuinely love hosting lab sessions—there's nothing better than the 'aha!' moment when",
      "a student finally cracks a tough sorting algorithm.",
      "I collaborate with an amazing team of TAs to support 140+ students, and I built",
      "automated Bash scripts that sped up grading by about 50%.",
      "",
      "When I'm not in labs or leading workshops at Knight Hacks, I'm usually watching Vinland",
      "Saga, gaming, or refining my Java-based shell to be as fast and secure as possible.",
      "I'm a big believer that there are 'no enemies' in engineering—just puzzles waiting to be",
      "solved and people waiting to learn.",
      ""
    ];

    // Display all lines instantly (no typing animation)
    for (const line of aboutLines) {
      printLine(line, "output");
    }
  },

  projects: async (args) => {
    if (args.length === 0) {
      // Display project cat image
      const img = document.createElement("img");
      img.src = "images/projectCat.jpg";
      img.alt = "Project Cat";
      img.className = "about-photo";
      terminal.appendChild(img);
      terminal.scrollTop = terminal.scrollHeight;

      // Tech to icon mapping
      const techToIcon = {
        "React": "react",
        "Node.js": "nodedotjs",
        "Express": "express",
        "MongoDB": "mongodb",
        "HTML": "html5",
        "HTML5": "html5",
        "CSS": "css3",
        "CSS3": "css3",
        "JavaScript": "javascript",
        "JS": "javascript",
        "Tailwind": "tailwindcss",
        "Tailwind CSS": "tailwindcss",
        "Firebase": "firebase",
        "Java": "openjdk",
        "Linux": "linux"
      };

      // Function to parse tech stack and get icons
      function getTechIcons(techString) {
        const icons = [];
        // Split by comma, slash, or "and"
        const techArray = techString.split(/[,\/]| and /i).map(t => t.trim()).filter(t => t.length > 0);
        
        techArray.forEach(tech => {
          // Skip non-icon techs (like "Multithreading", "File I/O", JWT, CLI, REST APIs, etc.)
          const skipTerms = ["multithreading", "file i/o", "file i", "i/o", "cli", "jwt", "rest apis", "rest api", "apis", "api"];
          if (skipTerms.some(term => tech.toLowerCase().includes(term))) {
            return;
          }
          
          // Try exact match first
          if (techToIcon[tech]) {
            icons.push({ name: tech, icon: techToIcon[tech] });
          } else {
            // Try partial matches
            let matched = false;
            for (const [key, icon] of Object.entries(techToIcon)) {
              if (tech.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(tech.toLowerCase())) {
                icons.push({ name: tech, icon: icon });
                matched = true;
                break;
              }
            }
            // If no match found, try to extract main tech name
            if (!matched) {
              // Handle cases like "Node.js" when we have "Node"
              const normalized = tech.toLowerCase().replace(/[^a-z0-9]/g, '');
              for (const [key, icon] of Object.entries(techToIcon)) {
                const keyNormalized = key.toLowerCase().replace(/[^a-z0-9]/g, '');
                if (normalized.includes(keyNormalized) || keyNormalized.includes(normalized)) {
                  icons.push({ name: tech, icon: icon });
                  matched = true;
                  break;
                }
              }
            }
          }
        });
        
        return icons;
      }

      // List all projects
      await typeLine("Projects:", TYPE_DELAY, "output");
      await new Promise((resolve) => setTimeout(resolve, LINE_PAUSE));
      
      for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        
        // Create container for project line
        const projectLine = document.createElement("div");
        projectLine.className = "line output project-line";
        terminal.appendChild(projectLine);
        terminal.scrollTop = terminal.scrollHeight;

        // Add clickable link for project name
        const link = document.createElement("a");
        link.href = project.link;
        link.textContent = project.name;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        projectLine.appendChild(link);
        
        // Add colon
        const colon = document.createTextNode(": ");
        projectLine.appendChild(colon);
        
        // Get tech icons for this project
        const techIcons = getTechIcons(project.tech);
        
        if (techIcons.length > 0) {
          // Create slider container
          const sliderContainer = document.createElement("div");
          sliderContainer.className = "project-slider-container";
          
          const slider = document.createElement("div");
          slider.className = "project-slider";
          
          // Use logos once (no duplication needed for static display)
          const allLogos = techIcons;
          
          allLogos.forEach(tech => {
            const logoItem = document.createElement("div");
            logoItem.className = "project-logo-item";
            
            if (tech.name === "Java") {
              // Special handling for Java to display 'J'
              const textLogo = document.createElement("div");
              textLogo.className = "skill-logo-text";
              textLogo.textContent = "J";
              logoItem.appendChild(textLogo);
            } else {
              const logoImg = document.createElement("img");
              logoImg.src = `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${tech.icon}.svg`;
              logoImg.alt = tech.name;
              logoImg.className = "project-logo";
              
              logoImg.onerror = function() {
                // Hide image if it fails to load
                this.style.display = 'none';
              };
              logoItem.appendChild(logoImg);
            }
            
            const logoLabel = document.createElement("span");
            logoLabel.className = "project-logo-label";
            logoLabel.textContent = tech.name;
            
            logoItem.appendChild(logoLabel);
            slider.appendChild(logoItem);
          });
          
          sliderContainer.appendChild(slider);
          projectLine.appendChild(sliderContainer);
        }
        
        terminal.scrollTop = terminal.scrollHeight;
        await new Promise((resolve) => setTimeout(resolve, LINE_PAUSE));
      }
      
      await typeLine("", TYPE_DELAY, "output");
      await typeLine("Type `projects <number>` to see details (e.g., `projects 1`)", TYPE_DELAY, "system");
      await new Promise((resolve) => setTimeout(resolve, LINE_PAUSE));
    } else {
      // Show project details
      const index = parseInt(args[0]) - 1;
      if (index >= 0 && index < projects.length) {
        const project = projects[index];
        await typeLine(`Name: ${project.name}`, TYPE_DELAY, "output");
        await new Promise((resolve) => setTimeout(resolve, LINE_PAUSE));
        await typeLine(`Tech: ${project.tech}`, TYPE_DELAY, "output");
        await new Promise((resolve) => setTimeout(resolve, LINE_PAUSE));
        await typeLine(`Description: ${project.description}`, TYPE_DELAY, "output");
        await new Promise((resolve) => setTimeout(resolve, LINE_PAUSE));
        
        if (project.link && project.link !== "#") {
          const prefix = "Link: ";
          const div = document.createElement("div");
          div.className = "line output";
          terminal.appendChild(div);
          terminal.scrollTop = terminal.scrollHeight;

          // Type prefix
          let idx = 0;
          await new Promise((resolve) => {
            const interval = setInterval(() => {
              if (idx <= prefix.length) {
                div.textContent = prefix.slice(0, idx);
                idx++;
              } else {
                clearInterval(interval);
                resolve();
              }
            }, TYPE_DELAY);
          });

          // Add link
          const link = document.createElement("a");
          link.href = project.link;
          link.textContent = project.link;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          div.appendChild(link);
          terminal.scrollTop = terminal.scrollHeight;
          await new Promise((resolve) => setTimeout(resolve, LINE_PAUSE));
        }
      } else {
        await typeLine(`Project ${args[0]} not found. Use \`projects\` to list all projects.`, TYPE_DELAY, "error");
        await new Promise((resolve) => setTimeout(resolve, LINE_PAUSE));
      }
    }
  },

  skills: async () => {
    // Display catSkills image
    const img = document.createElement("img");
    img.src = "images/catSkills.webp";
    img.alt = "Skills Cat";
    img.className = "about-photo";
    terminal.appendChild(img);
    terminal.scrollTop = terminal.scrollHeight;

    // Create skills slider container
    const sliderContainer = document.createElement("div");
    sliderContainer.className = "skills-slider-container";
    
    const slider = document.createElement("div");
    slider.className = "skills-slider";
    
    // Create two sets of logos for seamless loop
    const logos = [...skills.all, ...skills.all];
    
    logos.forEach(skill => {
      const logoItem = document.createElement("div");
      logoItem.className = "skill-logo-item";
      
      // Special case for Java - show capital J instead of icon
      if (skill.icon === "openjdk") {
        const javaLogo = document.createElement("div");
        javaLogo.className = "skill-logo skill-logo-text";
        javaLogo.textContent = "J";
        logoItem.appendChild(javaLogo);
      } else {
        const logoImg = document.createElement("img");
        // Use jsDelivr CDN for Simple Icons - more reliable format
        // Format: https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/{icon}.svg
        // Then we'll apply color filter via CSS
        logoImg.src = `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${skill.icon}.svg`;
        logoImg.alt = skill.name;
        logoImg.className = "skill-logo";
        
        let retryCount = 0;
        logoImg.onerror = function() {
          retryCount++;
          // Fallback: try alternative icon names for missing logos
          const altIcons = {
            "openjdk": "oracle",
            "visualstudiocode": "visualstudio", 
            "css3": "css3"
          };
          
          if (retryCount === 1 && altIcons[skill.icon]) {
            // Try alternative name once
            this.src = `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${altIcons[skill.icon]}.svg`;
          } else {
            // If still fails, hide image - label will still show
            this.style.display = 'none';
          }
        };
        logoItem.appendChild(logoImg);
      }
      
      const logoLabel = document.createElement("span");
      logoLabel.className = "skill-logo-label";
      logoLabel.textContent = skill.name;
      
      logoItem.appendChild(logoLabel);
      slider.appendChild(logoItem);
    });
    
    sliderContainer.appendChild(slider);
    terminal.appendChild(sliderContainer);
    terminal.scrollTop = terminal.scrollHeight;
    
    printLine("", "output");
  },

  experience: async () => {
    // Display experienceCat image
    const img = document.createElement("img");
    img.src = "images/experienceCat.jpg";
    img.alt = "Experience Cat";
    img.className = "about-photo";
    terminal.appendChild(img);
    terminal.scrollTop = terminal.scrollHeight;

    for (const exp of experience) {
      // Display header info quickly (no typing delay)
      printLine(`${exp.role}`, "output");
      printLine(`${exp.period}`, "output");
      printLine(`${exp.company} | ${exp.location}`, "output");
      printLine("", "output");
      
      // Display bullet points quickly
      for (const bullet of exp.bullets) {
        printLine(`• ${bullet}`, "output");
      }
      printLine("", "output");
    }
  },

  contact: async () => {
    // Display contactCat image
    const img = document.createElement("img");
    img.src = "images/contactCat.webp";
    img.alt = "Contact Cat";
    img.className = "about-photo";
    terminal.appendChild(img);
    terminal.scrollTop = terminal.scrollHeight;

    const contacts = [
      {
        text: "Email: va501919@ucf.edu",
        href: "mailto:va501919@ucf.edu",
        label: "va501919@ucf.edu"
      },
      {
        text: "GitHub: https://github.com/V4rnit",
        href: "https://github.com/V4rnit",
        label: "github.com/V4rnit"
      },
      {
        text: "LinkedIn: https://www.linkedin.com/in/varnit-rawat/",
        href: "https://www.linkedin.com/in/varnit-rawat/",
        label: "linkedin.com/in/varnit-rawat/"
      }
    ];

    for (const item of contacts) {
      const div = document.createElement("div");
      div.className = "line output";
      terminal.appendChild(div);
      terminal.scrollTop = terminal.scrollHeight;

      // Type the prefix
      let prefix = item.text.split(":")[0] + ": ";
      let idx = 0;
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (idx <= prefix.length) {
            div.innerHTML = prefix.slice(0, idx);
            idx++;
          } else {
            clearInterval(interval);
            resolve();
          }
        }, TYPE_DELAY);
      });

      // Add the link
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      div.appendChild(link);
      terminal.scrollTop = terminal.scrollHeight;
      
      await new Promise((resolve) => setTimeout(resolve, LINE_PAUSE));
    }
    await new Promise((resolve) => setTimeout(resolve, LINE_PAUSE));
  },

  resume: async () => {
    const resumeUrl = window.location.origin.replace(/\/$/, "") +
      window.location.pathname.replace(/\/[^/]*$/, "/") +
      "assets/Varnit_Rawat.pdf";
    
    // Open resume in a new tab
    window.open(resumeUrl, "_blank", "noopener");
    
    printLine("Opening resume in a new tab...", "output");
    printLine("", "output");
  },

  clear: async () => {
    terminal.innerHTML = "";
  },

  whoami: async () => {
    // Display whoami image
    const img = document.createElement("img");
    img.src = "images/whoami.jpeg";
    img.alt = "Who Am I";
    img.className = "about-photo";
    terminal.appendChild(img);
    terminal.scrollTop = terminal.scrollHeight;

    // Display message and quote
    printLine("You are viewing the portfolio of Varnit Rawat", "output");
    printLine("", "output");
    printLine('"The unexamined life is not worth living,', "output");
    printLine(' but the examined life is no picnic either."', "output");
    printLine("    — Socrates (probably)", "output");
    printLine("", "output");
  }
};

/* -------- COMMAND PARSING -------- */

function parseCommand(input) {
  const trimmed = input.trim();
  if (!trimmed) return { command: null, args: [] };
  
  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);
  
  return { command, args };
}

/* -------- PROMPT CREATION -------- */

function createPrompt() {
  const promptDiv = document.createElement("div");
  promptDiv.className = "prompt";

  const label = document.createElement("span");
  label.className = "prompt-label";
  label.textContent = "varnitr@portfolio:~$";

  const inputWrapper = document.createElement("div");
  inputWrapper.className = "prompt-input-wrapper";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "prompt-input";
  input.autocomplete = "off";
  input.spellcheck = "false";

  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const value = input.value.trim();
      input.value = "";
      
      // Add to history
      if (value) {
        commandHistory.push(value);
        historyIndex = commandHistory.length;
      }
      
      // Remove input from prompt
      promptDiv.remove();
      
      // Print command
      printLine(`varnitr@portfolio:~$ ${value}`, "command");
      
      // Parse and execute
      const { command, args } = parseCommand(value);
      
      if (command && commands[command]) {
        await commands[command](args);
        createPrompt();
      } else if (command) {
        await typeLine(`command not found: ${command}`, TYPE_DELAY, "error");
        await new Promise((resolve) => setTimeout(resolve, LINE_PAUSE));
        await typeLine("Type `help` for available commands", TYPE_DELAY, "error");
        await new Promise((resolve) => setTimeout(resolve, LINE_PAUSE));
        createPrompt();
      } else {
        createPrompt();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        if (historyIndex > 0) {
          historyIndex--;
        }
        input.value = commandHistory[historyIndex] || "";
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex] || "";
      } else {
        historyIndex = commandHistory.length;
        input.value = "";
      }
    }
  });

  inputWrapper.appendChild(input);
  promptDiv.appendChild(label);
  promptDiv.appendChild(inputWrapper);
  terminal.appendChild(promptDiv);
  input.focus();
  terminal.scrollTop = terminal.scrollHeight;
}

/* -------- INITIALIZATION -------- */

(async () => {
  await bootSequence();
  createPrompt();
})();

// Focus terminal on click
terminal.addEventListener("click", (e) => {
  const promptInput = terminal.querySelector(".prompt-input");
  if (promptInput) {
    promptInput.focus();
  } else {
    createPrompt();
  }
});

// Prevent losing focus
terminal.addEventListener("mousedown", (e) => {
  e.preventDefault();
  const promptInput = terminal.querySelector(".prompt-input");
  if (promptInput) {
    promptInput.focus();
  }
});
