const AGENTS = [
  { id: "risk", index: "01", name: "风险画像", short: "画像与适当性" },
  { id: "framework", index: "02", name: "投资框架", short: "目标与约束" },
  { id: "evidence", index: "03", name: "证据检索", short: "来源与置信度" },
  { id: "product", index: "04", name: "产品理解", short: "风险与费用" },
  { id: "challenge", index: "05", name: "观点挑战", short: "反方与假设" },
  { id: "compliance", index: "06", name: "合规审查", short: "规则与审批" },
  { id: "trace", index: "07", name: "服务留痕", short: "写回与任务" },
];

const SCENARIOS = {
  consumer: {
    sidebarName: "C 端稳健型新手",
    requestTitle: "客户请求",
    question: "市场最近波动比较大，我现在要不要调整？我担心继续持有会亏得更多。",
    profile: {
      name: "林晓雨",
      role: "个人投资者",
      tags: ["R2 稳健型", "投资新手", "画像有效"],
      details: [
        ["资金目标", "3 年教育金储备"],
        ["流动性需求", "中等"],
        ["知识水平", "基础"],
        ["画像更新", "2026-07-01"],
      ],
    },
    plan: ["risk", "framework", "challenge", "evidence", "product", "compliance", "trace"],
    skipped: ["challenge"],
    logs: {
      risk: ["画像校验通过", "R2 稳健型；目标、期限与流动性字段完整，画像仍在有效期内。"],
      framework: ["生成四维投资框架", "将问题重构为目标、期限、风险承受和流动性四个判断维度。"],
      challenge: ["路由跳过", "当前用户为稳健型新手，不启用自定义 thesis 与观点挑战分支。"],
      evidence: ["形成可追溯证据包", "检索 3 项白名单资料，保留来源、日期、摘要和不确定性。"],
      product: ["生成通俗产品解释", "拆解风险等级、费用、持有期限和流动性，不给出交易指令。"],
      compliance: ["合规检查通过", "未发现收益承诺或具体买卖指令；补充非投资建议与风险提示。"],
      trace: ["完成服务留痕", "写回服务记录并创建 30 天复盘任务。"],
    },
    results: {
      framework: {
        title: "稳健型新手投资框架",
        summary: "先确认目标是否变化，再判断风险暴露是否偏离；市场波动本身不是立即操作的充分理由。",
        bullets: [
          "目标：资金用于 3 年后的教育支出，优先保证可用性。",
          "风险：当前画像为 R2，应避免因短期情绪扩大风险暴露。",
          "期限：区分短期所需资金与可以长期持有的资金。",
          "行动：检查应急资金、分散程度和原定复盘规则，而不是追逐单日涨跌。",
        ],
      },
      evidence: [
        {
          source: "Investor.gov",
          date: "检索于 2026-07-11",
          confidence: "高可信",
          title: "Asset Allocation",
          summary: "资产配置应结合投资期限和风险承受能力；分散化用于管理集中风险。",
        },
        {
          source: "客户画像表",
          date: "更新于 2026-07-01",
          confidence: "内部结构化数据",
          title: "林晓雨风险画像",
          summary: "R2 稳健型、基础知识水平、三年教育金目标、流动性需求中等。",
        },
        {
          source: "投教知识库",
          date: "版本 2026.07",
          confidence: "已审核",
          title: "波动市场沟通模板",
          summary: "先解释波动与目标的关系，再说明不确定性和复盘条件，避免确定性判断。",
        },
      ],
      draft: {
        title: "客户版解释",
        paragraphs: [
          "市场波动会带来不安，但是否调整不应只由短期涨跌决定。对你来说，更重要的是确认三年后的教育金目标、当前可承受波动以及近期是否有用款需求。",
          "建议先按原有框架做一次检查：应急资金是否充足、持仓是否过度集中、风险水平是否已超过 R2 画像，以及是否到达原先设定的复盘时间。若这些条件没有明显变化，可以先记录观察，而不是因为一天或一周的波动仓促行动。",
          "以上内容用于帮助你理解投资框架，不构成具体产品或买卖建议。任何产品都可能产生损失，请结合自身情况审慎判断。",
        ],
        notes: ["不输出具体买卖动作", "显示依据和更新时间", "30 天后复盘画像与目标"],
      },
      compliance: {
        level: "低风险",
        hits: [],
        revised: "已包含风险揭示、非投资建议声明和不确定性表达，可进入服务记录。",
      },
    },
  },
  advisor: {
    sidebarName: "B 端投顾服务",
    requestTitle: "投顾服务任务",
    question: "请根据客户张伟的风险画像和产品材料，生成一份市场波动期的客户解释话术，并判断是否需要合规审批。",
    profile: {
      name: "陈顾问 / 张伟",
      role: "投顾服务场景",
      tags: ["客户 R3", "进阶用户", "需外发审批"],
      details: [
        ["客户目标", "5 年长期增值"],
        ["候选产品", "中风险混合型基金（演示）"],
        ["服务渠道", "客户 IM 群"],
        ["最近服务", "2026-06-28"],
      ],
    },
    plan: ["risk", "framework", "challenge", "evidence", "product", "compliance"],
    skipped: [],
    logs: {
      risk: ["读取客户画像与历史服务", "客户为 R3 平衡型，画像有效；本次内容涉及中风险产品和对外发送。"],
      framework: ["提取服务约束", "保留长期目标、可承受波动、流动性和适当性四项约束。"],
      challenge: ["生成反方检查", "识别“短期回撤不影响长期收益”为脆弱假设，要求补充不确定性。"],
      evidence: ["形成投顾证据包", "读取公开投教材料、产品说明和客户历史记录，来源覆盖率 100%。"],
      product: ["生成三层产品解释", "输出客户版、投顾备注和合规检查字段。"],
      compliance: ["触发合规门禁", "发现 2 处风险表达；生成替换建议并要求人工审批。"],
      trace: ["写回最终服务版本", "保存证据、修改记录和审批结果，创建 7 天回访任务。"],
    },
    results: {
      framework: {
        title: "投顾服务约束",
        summary: "客户风险画像与产品等级初步匹配，但任何外发内容仍需完整披露波动、费用与不确定性。",
        bullets: [
          "客户：R3 平衡型，具备基础投资经验。",
          "目标：五年长期增值，近期无明确大额流动性需求。",
          "产品：中风险混合型基金示例，不承诺本金或收益。",
          "流程：涉及产品解释与客户外发，必须完成合规检查并留痕。",
        ],
      },
      evidence: [
        {
          source: "产品池表",
          date: "版本 2026.07",
          confidence: "内部结构化数据",
          title: "中风险混合型基金（演示）",
          summary: "风险等级 R3；净值可能波动；存在管理费与申赎费用；流动性受交易规则约束。",
        },
        {
          source: "客户画像表",
          date: "更新于 2026-06-20",
          confidence: "内部结构化数据",
          title: "张伟风险画像",
          summary: "R3 平衡型、五年投资目标、基础产品经验、近期无大额用款计划。",
        },
        {
          source: "投教知识库",
          date: "审核于 2026-07-02",
          confidence: "已审核",
          title: "净值波动与长期目标",
          summary: "历史表现不代表未来；沟通应说明可能亏损场景，不能把长期目标等同于确定收益。",
        },
      ],
      draft: {
        title: "待审批客户话术",
        paragraphs: [
          "近期市场波动有所增加，你关注的这类中风险产品净值也可能出现阶段性回撤。结合你五年的长期目标，可以先确认风险承受能力、资金期限和近期用款安排是否发生变化。",
          "该产品有望在中长期带来较稳定的收益，因此当前不必过度担心短期波动。我们建议继续持有，等待市场恢复。",
          "产品净值仍可能下跌，历史表现不代表未来结果，具体决策需要结合你的实际情况。",
        ],
        notes: ["第二段含收益暗示", "存在具体持有建议", "需补充费用与流动性说明"],
      },
      compliance: {
        level: "需审批",
        hits: ["有望在中长期带来较稳定的收益", "建议继续持有"],
        revised:
          "该产品属于中风险产品，净值可能随市场变化产生波动或损失。是否调整应结合你的目标期限、风险承受能力、流动性需求及产品费用综合判断；历史表现不代表未来结果。",
      },
    },
  },
};

const FEISHU_MAPPING = [
  ["Agent 入口与路由", "飞书 AI / 智能伙伴", "场景入口、结构化执行轨迹与分支路由"],
  ["共享流程状态", "多维表格", "客户画像、材料索引、产品池、服务记录与合规规则"],
  ["投研知识底座", "文档 / 知识库", "带来源和更新时间的证据卡、模板与投教材料"],
  ["高风险内容门禁", "飞书审批", "命中规则后暂停外发，保留修改和审批记录"],
  ["客户问题归集", "IM / 表单", "客户问题或投顾任务进入服务记录表"],
  ["回访和责任人", "飞书任务", "审批后自动创建回访任务并绑定负责人"],
  ["会谈内容沉淀", "妙记", "会议摘要、客户反馈和决策依据写回服务记录"],
  ["过程质量指标", "多维表格仪表盘", "响应时间、来源覆盖率、审批通过率和复用率"],
];

const DEFAULT_LEDGER = [
  {
    id: "FP-2026-000",
    subject: "示例客户 / 王宁",
    scenario: "产品说明解读",
    evidence: "3/3",
    compliance: "通过",
    approval: "无需审批",
    task: "30 天复盘",
  },
];

const state = {
  scenario: "consumer",
  running: false,
  stepState: {},
  logs: [],
  startTime: null,
  approval: "idle",
  ledger: loadLedger(),
};

const elements = {
  navItems: [...document.querySelectorAll(".nav-item")],
  views: {
    workspace: document.getElementById("workspaceView"),
    architecture: document.getElementById("architectureView"),
    ledger: document.getElementById("ledgerView"),
  },
  pageTitle: document.getElementById("pageTitle"),
  sidebarScenario: document.getElementById("sidebarScenario"),
  scenarioCards: [...document.querySelectorAll(".scenario-card")],
  profileCard: document.getElementById("profileCard"),
  requestTitle: document.getElementById("requestTitle"),
  requestStatus: document.getElementById("requestStatus"),
  questionInput: document.getElementById("questionInput"),
  runButton: document.getElementById("runButton"),
  loadExampleButton: document.getElementById("loadExampleButton"),
  resetButton: document.getElementById("resetButton"),
  agentFlow: document.getElementById("agentFlow"),
  executionLog: document.getElementById("executionLog"),
  runtimeText: document.getElementById("runtimeText"),
  resultsSection: document.getElementById("resultsSection"),
  resultSummary: document.getElementById("resultSummary"),
  frameworkCard: document.getElementById("frameworkCard"),
  evidenceCard: document.getElementById("evidenceCard"),
  draftCard: document.getElementById("draftCard"),
  complianceCard: document.getElementById("complianceCard"),
  approvalPanel: document.getElementById("approvalPanel"),
  mappingTableBody: document.getElementById("mappingTableBody"),
  kpiGrid: document.getElementById("kpiGrid"),
  ledgerTableBody: document.getElementById("ledgerTableBody"),
  ledgerCount: document.getElementById("ledgerCount"),
  toast: document.getElementById("toast"),
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function loadLedger() {
  try {
    const stored = JSON.parse(localStorage.getItem("finpilot-ledger"));
    return Array.isArray(stored) && stored.length ? stored : [...DEFAULT_LEDGER];
  } catch {
    return [...DEFAULT_LEDGER];
  }
}

function saveLedger() {
  localStorage.setItem("finpilot-ledger", JSON.stringify(state.ledger));
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => elements.toast.classList.remove("show"), 2200);
}

function setView(viewName) {
  Object.entries(elements.views).forEach(([name, view]) => {
    view.classList.toggle("active", name === viewName);
  });
  elements.navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === viewName));
  const titles = {
    workspace: "场景工作台",
    architecture: "Agent 架构",
    ledger: "服务留痕",
  };
  elements.pageTitle.textContent = titles[viewName];
  if (viewName === "ledger") renderLedger();
}

function renderProfile() {
  const scenario = SCENARIOS[state.scenario];
  const profile = scenario.profile;
  elements.sidebarScenario.textContent = scenario.sidebarName;
  elements.requestTitle.textContent = scenario.requestTitle;
  elements.questionInput.value = scenario.question;
  elements.profileCard.innerHTML = `
    <div class="profile-name-row">
      <strong>${escapeHtml(profile.name)}</strong>
      <span class="status-pill success">${escapeHtml(profile.role)}</span>
    </div>
    <div class="profile-tags">
      ${profile.tags.map((tag) => `<span class="profile-tag">${escapeHtml(tag)}</span>`).join("")}
    </div>
    <div class="profile-detail">
      ${profile.details
        .map(
          ([label, value]) => `
            <div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderAgentFlow() {
  elements.agentFlow.innerHTML = AGENTS.map((agent) => {
    const status = state.stepState[agent.id] || "pending";
    const labels = {
      pending: "待执行",
      running: "执行中",
      completed: "已完成",
      skipped: "已路由跳过",
      gated: "等待审批",
    };
    return `
      <div class="agent-step ${status}" data-agent="${agent.id}">
        <span class="agent-index">${agent.index}</span>
        <strong>${agent.name} Agent</strong>
        <small>${labels[status]}</small>
      </div>
    `;
  }).join("");
}

function renderLogs() {
  if (!state.logs.length) {
    elements.executionLog.innerHTML = `
      <div class="empty-state compact-empty">
        启动编排后，这里将展示每个 Agent 的结构化输入、输出和路由结果。
      </div>
    `;
    return;
  }

  elements.executionLog.innerHTML = state.logs
    .map(
      (log) => `
        <div class="log-item">
          <div class="log-agent">${escapeHtml(log.agent)}</div>
          <div class="log-content">
            <strong>${escapeHtml(log.title)}</strong>
            <p>${escapeHtml(log.detail)}</p>
          </div>
        </div>
      `,
    )
    .join("");
  elements.executionLog.scrollTop = elements.executionLog.scrollHeight;
}

function resetRunState() {
  state.running = false;
  state.logs = [];
  state.startTime = null;
  state.approval = "idle";
  state.stepState = Object.fromEntries(AGENTS.map((agent) => [agent.id, "pending"]));
  elements.resultsSection.hidden = true;
  elements.approvalPanel.hidden = true;
  elements.requestStatus.className = "status-pill";
  elements.requestStatus.textContent = "待运行";
  elements.runtimeText.textContent = "未启动";
  elements.runButton.disabled = false;
  elements.runButton.textContent = "启动 Agent 编排";
  renderAgentFlow();
  renderLogs();
}

function selectScenario(scenarioName) {
  if (state.running) return;
  state.scenario = scenarioName;
  elements.scenarioCards.forEach((card) => {
    card.classList.toggle("selected", card.dataset.scenario === scenarioName);
  });
  renderProfile();
  resetRunState();
}

function logAgent(agentId, title, detail) {
  const agent = AGENTS.find((item) => item.id === agentId);
  state.logs.push({ agent: `${agent.index} ${agent.name}`, title, detail });
  renderLogs();
}

function updateRuntime() {
  if (!state.startTime) return;
  const elapsed = ((performance.now() - state.startTime) / 1000).toFixed(1);
  elements.runtimeText.textContent = `演示耗时 ${elapsed}s`;
}

async function executeAgent(agentId, scenario) {
  if (scenario.skipped.includes(agentId)) {
    state.stepState[agentId] = "skipped";
    const [title, detail] = scenario.logs[agentId];
    logAgent(agentId, title, detail);
    renderAgentFlow();
    await wait(260);
    return;
  }

  state.stepState[agentId] = "running";
  renderAgentFlow();
  await wait(430);
  const [title, detail] = scenario.logs[agentId];
  logAgent(agentId, title, detail);
  state.stepState[agentId] = "completed";
  renderAgentFlow();
  updateRuntime();
  await wait(240);
}

async function runScenario() {
  if (state.running) return;
  if (!elements.questionInput.value.trim()) {
    showToast("请先输入本次问题。 ");
    elements.questionInput.focus();
    return;
  }

  resetRunState();
  state.running = true;
  state.startTime = performance.now();
  elements.runButton.disabled = true;
  elements.runButton.textContent = "编排执行中";
  elements.requestStatus.textContent = "执行中";
  elements.requestStatus.className = "status-pill";

  const scenario = SCENARIOS[state.scenario];
  for (const agentId of scenario.plan) {
    await executeAgent(agentId, scenario);
  }

  renderResults();

  if (state.scenario === "advisor") {
    state.stepState.trace = "gated";
    state.approval = "pending";
    renderAgentFlow();
    renderApproval();
    elements.requestStatus.textContent = "等待审批";
    elements.requestStatus.className = "status-pill";
  } else {
    completeRun();
    addLedgerRecord("consumer");
  }

  state.running = false;
  elements.runButton.disabled = false;
  elements.runButton.textContent = "重新运行";
  updateRuntime();
  elements.resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderResults() {
  const results = SCENARIOS[state.scenario].results;
  const evidenceCoverage = `${results.evidence.length}/${results.evidence.length}`;
  elements.resultsSection.hidden = false;
  elements.resultSummary.innerHTML = `
    <span class="summary-chip">来源覆盖 ${evidenceCoverage}</span>
    <span class="summary-chip">结构化字段 12</span>
    <span class="summary-chip">合规等级 ${escapeHtml(results.compliance.level)}</span>
  `;

  elements.frameworkCard.innerHTML = `
    <h3>${escapeHtml(results.framework.title)}</h3>
    <p>${escapeHtml(results.framework.summary)}</p>
    <ul>${results.framework.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  `;

  elements.evidenceCard.innerHTML = `
    <h3>证据包</h3>
    <div class="evidence-list">
      ${results.evidence
        .map(
          (item) => `
            <div class="evidence-item">
              <div class="evidence-meta">
                <span>${escapeHtml(item.source)} · ${escapeHtml(item.date)}</span>
                <span>${escapeHtml(item.confidence)}</span>
              </div>
              <strong>${escapeHtml(item.title)}</strong>
              <p>${escapeHtml(item.summary)}</p>
            </div>
          `,
        )
        .join("")}
    </div>
  `;

  elements.draftCard.innerHTML = `
    <h3>${escapeHtml(results.draft.title)}</h3>
    <div class="draft-layout">
      <div class="draft-copy">
        ${results.draft.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      </div>
      <div class="advisor-notes">
        <h4>系统备注</h4>
        <ul>${results.draft.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>
      </div>
    </div>
  `;

  const hitMarkup = results.compliance.hits.length
    ? results.compliance.hits.map((hit) => `<li><span class="risk-hit">${escapeHtml(hit)}</span></li>`).join("")
    : "<li>未发现收益承诺、保本暗示或具体买卖指令。</li>";

  elements.complianceCard.innerHTML = `
    <h3>合规审查 · ${escapeHtml(results.compliance.level)}</h3>
    <div class="compliance-grid">
      <div class="compliance-block">
        <strong>规则命中</strong>
        <ul>${hitMarkup}</ul>
      </div>
      <div class="compliance-block">
        <strong>安全表达建议</strong>
        <p>${escapeHtml(results.compliance.revised)}</p>
      </div>
    </div>
  `;
}

function renderApproval() {
  if (state.approval === "idle") {
    elements.approvalPanel.hidden = true;
    return;
  }

  elements.approvalPanel.hidden = false;
  if (state.approval === "pending") {
    elements.approvalPanel.className = "approval-panel";
    elements.approvalPanel.innerHTML = `
      <div>
        <h3>飞书审批门禁 · 等待合规负责人</h3>
        <p>外发内容命中 2 条规则。审批通过前，服务留痕 Agent 不会写入“已外发”状态。</p>
      </div>
      <button class="button approve" id="approveButton">模拟审批通过</button>
    `;
    document.getElementById("approveButton").addEventListener("click", approveAdvisorFlow);
  } else {
    elements.approvalPanel.className = "approval-panel approved";
    elements.approvalPanel.innerHTML = `
      <div>
        <h3>审批已通过，最终版本已写回</h3>
        <p>审批人：合规负责人（演示） · 已保存修改记录并创建 7 天回访任务。</p>
      </div>
      <button class="button secondary" id="openLedgerButton">查看服务记录</button>
    `;
    document.getElementById("openLedgerButton").addEventListener("click", () => setView("ledger"));
  }
}

async function approveAdvisorFlow() {
  if (state.approval !== "pending") return;
  state.running = true;
  const button = document.getElementById("approveButton");
  button.disabled = true;
  button.textContent = "审批处理中";
  await wait(420);
  state.stepState.trace = "running";
  renderAgentFlow();
  await wait(420);
  const scenario = SCENARIOS.advisor;
  const [title, detail] = scenario.logs.trace;
  logAgent("trace", title, detail);
  state.stepState.trace = "completed";
  state.approval = "approved";
  state.running = false;
  completeRun();
  addLedgerRecord("advisor");
  renderAgentFlow();
  renderApproval();
  showToast("审批通过：服务记录与回访任务已写回。 ");
}

function completeRun() {
  elements.requestStatus.textContent = "已完成";
  elements.requestStatus.className = "status-pill success";
}

function addLedgerRecord(type) {
  const id = `FP-2026-${String(Date.now()).slice(-3)}`;
  const record =
    type === "consumer"
      ? {
          id,
          subject: "林晓雨",
          scenario: "C 端稳健型框架",
          evidence: "3/3",
          compliance: "通过",
          approval: "无需审批",
          task: "30 天复盘",
        }
      : {
          id,
          subject: "陈顾问 / 张伟",
          scenario: "B 端客户话术",
          evidence: "3/3",
          compliance: "修改后通过",
          approval: "已批准",
          task: "7 天回访",
        };

  state.ledger = [record, ...state.ledger.filter((item) => item.scenario !== record.scenario)];
  saveLedger();
  renderLedger();
}

function renderMapping() {
  elements.mappingTableBody.innerHTML = FEISHU_MAPPING.map(
    ([capability, component, demo]) => `
      <tr>
        <td>${escapeHtml(capability)}</td>
        <td>${escapeHtml(component)}</td>
        <td>${escapeHtml(demo)}</td>
      </tr>
    `,
  ).join("");
}

function renderLedger() {
  elements.ledgerCount.textContent = `${state.ledger.length} 条记录`;
  const approved = state.ledger.filter((record) => record.approval === "已批准").length;
  const evidenceComplete = state.ledger.filter((record) => record.evidence === "3/3").length;
  const tasks = state.ledger.filter((record) => record.task).length;
  const kpis = [
    ["服务记录", state.ledger.length, "模拟多维表格记录"],
    ["来源完整率", `${Math.round((evidenceComplete / state.ledger.length) * 100)}%`, "证据含来源与日期"],
    ["人工审批", approved, "高风险外发门禁"],
    ["后续任务", tasks, "自动生成回访"],
  ];
  elements.kpiGrid.innerHTML = kpis
    .map(
      ([label, value, note]) => `
        <div class="kpi-card">
          <div class="kpi-label">${escapeHtml(label)}</div>
          <div class="kpi-value">${escapeHtml(value)}</div>
          <div class="kpi-note">${escapeHtml(note)}</div>
        </div>
      `,
    )
    .join("");

  elements.ledgerTableBody.innerHTML = state.ledger
    .map(
      (record) => `
        <tr>
          <td>${escapeHtml(record.id)}</td>
          <td>${escapeHtml(record.subject)}</td>
          <td>${escapeHtml(record.scenario)}</td>
          <td>${escapeHtml(record.evidence)}</td>
          <td><span class="table-status">${escapeHtml(record.compliance)}</span></td>
          <td><span class="table-status ${record.approval === "无需审批" ? "pending" : ""}">${escapeHtml(record.approval)}</span></td>
          <td>${escapeHtml(record.task)}</td>
        </tr>
      `,
    )
    .join("");
}

function bindEvents() {
  elements.navItems.forEach((item) => item.addEventListener("click", () => setView(item.dataset.view)));
  elements.scenarioCards.forEach((card) => {
    card.addEventListener("click", () => selectScenario(card.dataset.scenario));
  });
  elements.runButton.addEventListener("click", runScenario);
  elements.loadExampleButton.addEventListener("click", () => {
    elements.questionInput.value = SCENARIOS[state.scenario].question;
    showToast("已恢复示例问题。 ");
  });
  elements.resetButton.addEventListener("click", () => {
    resetRunState();
    renderProfile();
    showToast("当前场景已重置。 ");
  });
}

function init() {
  bindEvents();
  renderMapping();
  renderLedger();
  renderProfile();
  resetRunState();
}

init();
