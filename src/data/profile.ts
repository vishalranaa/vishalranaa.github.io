export const site = {
  url: "https://vishalranaa.github.io",
  name: "Vishal Rana",
  role: "AI & Full-Stack Engineer",
  title: "Vishal Rana — AI & Full-Stack Engineer | LLM Agents, Automation, Python, Java, Kotlin",
  description:
    "Vishal Rana is an AI and full-stack engineer in Chandigarh, India building LLM agents, voice AI and workflow automation with OpenAI, Claude and ElevenLabs — and shipping products in Python, Java, Kotlin (Spring Boot, Hibernate), TypeScript, Angular, React and Node.js.",
  location: "Chandigarh, India",
  coords: "30.7333° N · 76.7794° E",
  email: "vishalrajput9595@gmail.com",
  phone: "+91 81460 14182",
  careerStart: 2018,
};

export const nav = [
  { href: "#about", label: "About" },
  { href: "#ai", label: "AI Lab" },
  { href: "#work", label: "Work" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export const socials = [
  { name: "LinkedIn", short: "Li", href: "https://www.linkedin.com/in/vishal-rana-a40149139/" },
  { name: "GitHub", short: "Gh", href: "https://github.com/vishalranaa" },
  { name: "Twitter / X", short: "X", href: "https://twitter.com/vishalranaa" },
  { name: "Instagram", short: "Ig", href: "https://www.instagram.com/thevish____" },
  { name: "YouTube", short: "Yt", href: "https://www.youtube.com/channel/UCWGkZhrhsbZgZ85ONJZuHNgrr" },
];

export const values = ["AI Agents", "Automation", "Voice AI", "Python", "Java", "Kotlin", "TypeScript", "Precision", "Scale", "Craft"];

/* ---------- AI Lab ---------- */
export const aiProviders = ["OpenAI", "Claude", "ElevenLabs", "ChatGPT", "Codex", "Claude Code", "REST & Webhooks"];

export const aiCaps = [
  { icon: "agent", title: "LLM Agents & Assistants", body: "Task-doing assistants on OpenAI and Claude that read context, call tools and APIs, and hand back finished work — not just chat.", tags: ["OpenAI", "Claude", "Tool use"] },
  { icon: "voice", title: "Voice AI", body: "Natural, multilingual voice experiences with ElevenLabs — narrated content, voice notes and spoken assistants.", tags: ["ElevenLabs", "TTS", "Multilingual"] },
  { icon: "flow", title: "Workflow Automation", body: "Pipelines that connect CRMs, inboxes, sheets and internal tools through APIs and webhooks — so repetitive work runs itself.", tags: ["APIs", "Webhooks", "Schedulers"] },
  { icon: "code", title: "AI-Accelerated Engineering", body: "Claude Code, Codex and ChatGPT woven into daily engineering — faster delivery in any language, with human review on every line.", tags: ["Claude Code", "Codex", "ChatGPT"] },
  { icon: "data", title: "Data → Insight", body: "LLM-powered summarisation, extraction and conversational analytics that turn raw records into decisions.", tags: ["Summaries", "Extraction", "Chat over data"] },
  { icon: "api", title: "AI API Integration", body: "Production-grade integration of AI APIs into existing products — auth, retries, cost control, streaming and observability.", tags: ["Streaming", "Retries", "Cost control"] },
];

export const agentRun = [
  { k: "cmd", t: 'agent run "Follow up with today\'s new leads"' },
  { k: "step", t: "Planning task", tool: "claude", r: "✓ plan · 5 steps" },
  { k: "step", t: "Fetching CRM records", tool: "rest api", r: "✓ 24 leads" },
  { k: "step", t: "Drafting personalised messages", tool: "openai", r: "✓ 24 drafts" },
  { k: "step", t: "Generating voice notes", tool: "elevenlabs", r: "✓ 24 clips" },
  { k: "step", t: "Scheduling sends", tool: "webhook", r: "✓ queued" },
  { k: "done", t: "Done — 24 follow-ups automated, zero manual steps." },
];

/* ---------- Polyglot ---------- */
export const languages = [
  {
    name: "Python", file: "summarise.py", stack: "OpenAI SDK",
    code: `from openai import OpenAI

client = OpenAI()

def summarise(text: str) -> str:
    res = client.responses.create(
        model="gpt-5",
        input=f"Summarise for a busy founder: {text}",
    )
    return res.output_text`,
  },
  {
    name: "Java", file: "SummaryController.java", stack: "Spring Boot · Spring AI",
    code: `@RestController
class SummaryController {
    private final ChatClient chat;

    SummaryController(ChatClient.Builder builder) {
        this.chat = builder.build();
    }

    @PostMapping("/summarise")
    String summarise(@RequestBody String text) {
        return chat.prompt("Summarise: " + text).call().content();
    }
}`,
  },
  {
    name: "Kotlin", file: "LeadService.kt", stack: "Spring Boot · Hibernate",
    code: `@Entity
class Lead(
    @Id @GeneratedValue val id: Long? = null,
    val email: String,
    var summary: String? = null,
)

@Service
class LeadService(private val repo: LeadRepository, private val chat: ChatClient) {
    fun enrich(lead: Lead) = repo.save(lead.apply {
        summary = chat.prompt("Profile: \${lead.email}").call().content()
    })
}`,
  },
  {
    name: "TypeScript", file: "summarise.ts", stack: "Anthropic SDK · Claude",
    code: `import Anthropic from "@anthropic-ai/sdk";

const claude = new Anthropic();

export async function summarise(text: string) {
  const res = await claude.messages.create({
    model: "claude-opus-5-5",
    max_tokens: 16000,
    messages: [{ role: "user", content: \`Summarise: \${text}\` }],
  });
  const block = res.content.find((b) => b.type === "text");
  return block?.type === "text" ? block.text : "";
}`,
  },
  {
    name: "JavaScript", file: "narrate.js", stack: "ElevenLabs · Node.js",
    code: `import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const voice = new ElevenLabsClient();

export async function narrate(summary) {
  return voice.textToSpeech.convert(process.env.VOICE_ID, {
    text: summary,
    modelId: "eleven_multilingual_v2",
  });
}`,
  },
];
export const moreLanguages = ["Dart", "SQL", "Bash", "HTML / CSS"];
export const frameworks = ["Spring Boot", "Hibernate", "Angular", "React", "Next.js", "Node.js", "React Native", "Flutter", "MongoDB", "MySQL", "AWS", "GCP", "Azure", "Docker", "Kubernetes"];

export const projects = [
  {
    name: "CLÉ Marketplace",
    url: "https://werecle.com/",
    kind: "Luxury Commerce",
    body: "A luxury marketplace connecting discerning buyers, collectors and connoisseurs with sellers worldwide on an end-to-end, secure platform.",
    tech: ["React", "Magento"],
    hue: ["#d4b47c", "#3a2a14"],
  },
  {
    name: "Hello Patients",
    url: "https://www.hellopatients.com/",
    kind: "Healthcare SaaS",
    body: "A modern practice-management platform focused on patient engagement and delivering improved financial results for clinics.",
    tech: ["React", "Node.js", "MySQL"],
    hue: ["#b9c7c0", "#18221f"],
  },
  {
    name: "Orah Care",
    url: "https://orah.care/",
    kind: "Clinical Platform",
    body: "Combines caregiver-generated patient data with human clinical teams to help home-care agencies raise the quality of care.",
    tech: ["Angular", "Node.js", "MySQL"],
    hue: ["#e0b8a4", "#2a1712"],
  },
  {
    name: "Operr HomeCare",
    url: "https://operrhomecare.com/",
    kind: "Care Management",
    body: "Caregiver and patient management covering scheduling, records and the day-to-day operations of home-care agencies.",
    tech: ["Angular", "Node.js", "MySQL"],
    hue: ["#c8bfa8", "#1d1a14"],
  },
  {
    name: "Operr Work",
    url: "https://operrwork.com/",
    kind: "Conversational Data",
    body: "A conversational assistant that surfaces key statistics from operational data — turning raw records into insight.",
    tech: ["Angular", "Node.js"],
    hue: ["#a9b4d0", "#14161f"],
  },
  {
    name: "Steuern",
    url: "https://steuern59.ch/",
    kind: "Swiss FinTech",
    body: "A mobile-first application that makes filing Swiss income-tax returns refreshingly straightforward.",
    tech: ["Angular", "Node.js", "MongoDB"],
    hue: ["#e6d2a8", "#22180c"],
  },
];

export const journey = [
  {
    period: "2022 — Now",
    role: "Software Engineer",
    company: "PKWARE",
    url: "https://www.pkware.com/",
    location: "Mohali",
    body: "Engineering for a global leader in data discovery and protection — software that locates and secures sensitive data across devices and complex environments.",
  },
  {
    period: "2021 — 2022",
    role: "MEAN / MERN Stack Developer",
    company: "Netsmartz Infotech",
    url: "https://netsmartz.com/",
    location: "Chandigarh",
    body: "Built and automated healthcare products, e-commerce applications and API-testing tools across the MEAN and MERN stacks.",
  },
  {
    period: "2018 — 2020",
    role: "MEAN Stack Developer",
    company: "Kayosys Softwares",
    url: "https://kayosys.com/",
    location: "Mohali",
    body: "Joined as a fresher and grew into shipping finance, healthcare and CRM applications end to end.",
  },
  {
    period: "2015 — 2017",
    role: "Internships",
    company: "NetMax Technologies · Infowiz",
    url: "https://netmaxtech.com/",
    location: "Chandigarh",
    body: "Where it began — Java and Android at Infowiz, then JavaScript and modern web development at NetMax.",
  },
];

export const education = {
  degree: "B.Tech, Information Technology",
  school: "Punjab Technical University, Jalandhar",
  url: "https://ptu.ac.in/",
  notes: [
    "Graduated with honours — First Division",
    "Data structures, algorithms, DBMS, operating systems, computer architecture & AI",
    "Additional study in Java, Android, JavaScript & full-stack development",
  ],
};
