const terminal = document.getElementById("terminal");
let activeInput = null;
const TYPE_DELAY = 14;     // faster typing speed
const LINE_PAUSE = 45;     // pause between lines

/* -------- HEADER -------- */

function typeLine(line, delay = TYPE_DELAY, type = "system") {
  return new Promise((resolve) => {
    const div = document.createElement("div");
    div.className = "line " + type;
    terminal.appendChild(div);

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

function typeLines(lines, delay = TYPE_DELAY, type = "system") {
  return lines.reduce(
    (promise, line) =>
      promise
        .then(() => typeLine(line, delay, type))
        .then(() => new Promise((r) => setTimeout(r, delay))),
    Promise.resolve()
  );
}

function showHeader() {
  return typeLines(
    [
      "Varnit Rawat — Terminal Portfolio",
      "Type 'help' to see available commands.",
      ""
    ],
    18,
    "system"
  );
}

/* -------- COMMANDS -------- */

const commands = {
  help: async () => {
    await typeLines(
      [
        "Available commands:",
        "- about",
        "- projects",
        "- contact",
        "- resume",
        "- clear"
      ],
      TYPE_DELAY,
      "output"
    );
  },

  about: async () => {
    // Profile image
    const img = document.createElement("img");
    img.src = "pfp.png";
    img.alt = "Photo of Varnit Rawat";
    img.className = "about-photo";
    terminal.appendChild(img);
    terminal.scrollTop = terminal.scrollHeight;

    // Wait a bit for image to appear, then add spacing
    await new Promise(resolve => setTimeout(resolve, 180));
    const spacer = document.createElement("div");
    spacer.className = "line about-section";
    spacer.textContent = "";
    terminal.appendChild(spacer);
    terminal.scrollTop = terminal.scrollHeight;

    const aboutLines = [
      "I'm a Senior at the University of Central Florida majoring in Information Technology,",
      "with a heavy focus on Backend Systems and Full-Stack Development.",
      "",
      "I've always felt that code is at its best when it's helping people, which is why I'm so",
      "passionate about my role as a Teaching Assistant for Data Structures & Algorithms.",
      "I genuinely love hosting lab sessions—there's nothing better than the 'aha!' moment when",
      "a student finally cracks a tough sorting algorithm.",
      "I collaborate with an amazing team of TAs to support 140+ students, and I even built",
      "automated Bash scripts that sped up grading by about 50%.",
      "",
      "When I'm not in labs or leading workshops at Knight Hacks, I'm usually watching Vinland",
      "Saga, gaming, or refining my Java-based shell to be as fast and secure as possible.",
      "I'm a big believer that there are 'no enemies' in engineering—just puzzles waiting to be",
      "solved and people waiting to learn."
    ];

    // Type out lines with animation, handling empty lines as spacing
    for (const line of aboutLines) {
      if (line === "") {
        // Empty line - just add spacing
        const spacerDiv = document.createElement("div");
        spacerDiv.className = "line about-section";
        spacerDiv.textContent = " ";
        terminal.appendChild(spacerDiv);
        terminal.scrollTop = terminal.scrollHeight;
        await new Promise(resolve => setTimeout(resolve, 60));
      } else {
        // Type out the line with animation
        await typeLine(line, TYPE_DELAY, "about-paragraph output");
        await new Promise(resolve => setTimeout(resolve, LINE_PAUSE));
      }
    }

    return [];
  },

  projects: async () => {
    await typeLines(
      [
        "Projects:",
        "1) Secure Command-Line Shell | Java, JWT, Multithreading, File I/O, CLI, Linux (Oct 2025)",
        "   • Modular Java shell with custom commands, pipelines, and extensible flow.",
        "   • JWT session management in the pipeline cut unauthorized attempts by 55%.",
        "   • Parallelized command execution to reduce latency ~35% under load.",
        "2) AlgoPath | HTML/CSS/JS, React, Tailwind, Node.js, Firebase (Jul 2024)",
        "   • Full-stack learning platform with auth and persistent progress tracking.",
        "   • Mobile-first UI improved mobile retention by 25%.",
        "   • Real-time sync via Firebase listeners increased daily interactions by 20%.",
        "3) CodeClarity | React, Node.js, Express, MongoDB, REST (May 2025)",
        "   • Simulated interview scenarios across 20+ DS/Algo patterns.",
        "   • Generated 100+ snippets for practice with complexity analysis.",
        "   • Concurrent submissions persisted in MongoDB with <200ms responses."
      ],
      TYPE_DELAY,
      "output"
    );
  },

  contact: async () => {
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
      const div = await typeLine(item.text, TYPE_DELAY, "output");
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      // Replace plain text portion after prefix with clickable link
      const prefix = item.text.split(":")[0] + ": ";
      div.innerHTML = prefix + link.outerHTML;
      await new Promise((resolve) => setTimeout(resolve, LINE_PAUSE));
    }
  },

  resume: async () => {
    const link =
      window.location.origin.replace(/\/$/, "") +
      window.location.pathname.replace(/\/[^/]*$/, "/") +
      "Varnit_Rawat.pdf";

    // Try to open in a new tab immediately (most popup blockers allow this from a user action)
    window.open(link, "_blank", "noopener");

    await typeLines(
      [
        "Opening resume in a new tab..."
      ],
      TYPE_DELAY,
      "output"
    );
  },

  clear: async () => {
    terminal.innerHTML = "";
    await showHeader();
  }
};

/* -------- TERMINAL LOGIC -------- */

function printLine(text, type = "output") {
  const div = document.createElement("div");
  div.className = "line " + type;
  div.textContent = text;
  terminal.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
}

function createPrompt() {
  const promptDiv = document.createElement("div");
  promptDiv.className = "prompt";

  const label = document.createElement("span");
  label.textContent = ">";

  const input = document.createElement("input");
  input.autofocus = true;
  activeInput = input;

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = input.value.trim().toLowerCase();
      activeInput = null;
      promptDiv.remove();
      printLine("> " + value, "command");

      if (commands[value]) {
        const output = commands[value]();
        // Handle async commands (like about)
        if (output instanceof Promise) {
          output.then(() => createPrompt());
        } else {
          // Handle sync commands that return arrays
          output.forEach(line => printLine(line));
          createPrompt();
        }
      } else if (value !== "") {
        printLine("Command not found. Type 'help'.");
        createPrompt();
      } else {
        createPrompt();
      }
    }
  });

  promptDiv.appendChild(label);
  promptDiv.appendChild(input);
  terminal.appendChild(promptDiv);
  input.focus();
  terminal.scrollTop = terminal.scrollHeight;
}

// Allow clicking back into the terminal to continue typing
terminal.addEventListener("mousedown", () => {
  if (activeInput) {
    activeInput.focus();
  } else {
    createPrompt();
  }
});

/* -------- BOOT -------- */

(async () => {
  await showHeader();
  createPrompt();
})();
