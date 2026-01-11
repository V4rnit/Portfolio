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
    tech: "React, Node.js, MongoDB",
    description: "DSA learning platform with simulated interview scenarios",
    link: "https://codeclearity.netlify.app/"
  },
  {
    name: "AlgoPath",
    tech: "HTML/CSS/JS, React, Tailwind, Node.js, Firebase",
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

// Skills data
const skills = {
  languages: ["Java", "Python", "C/C++", "SQL (Postgres)", "JavaScript", "HTML/CSS", "Bash"],
  frameworks: ["React", "Node.js", "JUnit", "WordPress", "Spring Boot"],
  developerTools: ["Git", "Docker", "Google Cloud Platform", "VS Code", "PyCharm", "IntelliJ", "TMUX", "Vim", "NeoVim"],
  concepts: ["Multithreading", "CLI", "REST APIs", "JWT Authentication"],
  librariesTools: ["JWT (jjwt)"]
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
  // Welcome message
  await typeLine("Welcome to Varnit Rawat's Portfolio", TYPE_DELAY, "welcome");
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

      // List all projects
      await typeLine("Projects:", TYPE_DELAY, "output");
      await new Promise((resolve) => setTimeout(resolve, LINE_PAUSE));
      
      for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const prefix = `[${i + 1}] `;
        const padding = " ".repeat(Math.max(0, 20 - project.name.length));
        const suffix = ` - ${project.description}`;
        
        // Create div for the line
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

        // Add clickable link for project name
        const link = document.createElement("a");
        link.href = project.link;
        link.textContent = project.name;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        div.appendChild(link);
        
        // Add spacing and description
        const rest = document.createTextNode(padding + suffix);
        div.appendChild(rest);
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

    // Display all skills quickly with horizontal formatting
    printLine("Languages: " + skills.languages.join(", "), "output");
    printLine("", "output");
    
    printLine("Frameworks: " + skills.frameworks.join(", "), "output");
    printLine("", "output");
    
    printLine("Developer Tools: " + skills.developerTools.join(", "), "output");
    printLine("", "output");
    
    printLine("Concepts: " + skills.concepts.join(", "), "output");
    printLine("", "output");
    
    printLine("Libraries & Tools: " + skills.librariesTools.join(", "), "output");
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
