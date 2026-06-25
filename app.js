// ==========================================================================
// APP STATE & FALLBACK DATA
// ==========================================================================
const appData = {
    // Pre-calculated stats from simulated dataset (matching cleaning_stats.json)
    etlStats: {
        initial_rows: 565,
        duplicates_removed: 15,
        missing_emails_filled: 22,
        casing_fixes: 348,
        date_format_fixes: 1036,
        date_order_fixes: 5,
        mrr_fixes: 3,
        final_clean_rows: 550
    },
    // Chart data computed directly from the cleaned CRM CSV
    weeklyMetrics: [
        { week: 'Mar 01', leads: 44, trials: 15, convs: 0, mrr: 0 },
        { week: 'Mar 08', leads: 53, trials: 35, convs: 1, mrr: 1176 },
        { week: 'Mar 15', leads: 44, trials: 28, convs: 3, mrr: 12205 },
        { week: 'Mar 22', leads: 33, trials: 32, convs: 5, mrr: 14835 },
        { week: 'Mar 29', leads: 48, trials: 25, convs: 14, mrr: 39453 },
        { week: 'Apr 05', leads: 48, trials: 34, convs: 10, mrr: 24537 },
        { week: 'Apr 12', leads: 46, trials: 27, convs: 10, mrr: 27610 },
        { week: 'Apr 19', leads: 34, trials: 31, convs: 6, mrr: 17361 },
        { week: 'Apr 26', leads: 40, trials: 24, convs: 8, mrr: 19594 },
        { week: 'May 03', leads: 52, trials: 27, convs: 14, mrr: 27850 },
        { week: 'May 10', leads: 58, trials: 35, convs: 5, mrr: 15972 },
        { week: 'May 17', leads: 46, trials: 32, convs: 9, mrr: 34035 },
        { week: 'May 24', leads: 4,  trials: 18, convs: 12, mrr: 31043 }
    ],
    segmentMRR: {
        'SMB': 7291,
        'Mid-Market': 36894,
        'Enterprise': 244741
    },
    currentSlide: 1,
    totalSlides: 6
};

// ==========================================================================
// DYNAMIC SLIDE CONTENT TEMPLATES
// ==========================================================================
const slidesTemplates = {
    1: () => `
        <div class="slide-layout-dark">
            <h1 class="slide-title-large">B2B SaaS Revenue Pipeline Analysis</h1>
            <p class="slide-subtitle-large">Designing ETL Data Cleanse Pipelines & Automating Quote-to-Access Workflows</p>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 20px;">
                <span class="slide-org-tag"><i class="fa-solid fa-chart-line-up"></i> RevOps Independent Research Project</span>
                <span style="font-size: 0.8rem; opacity: 0.8;">Slide 1 of 6</span>
            </div>
        </div>
    `,
    2: () => `
        <div class="slide-layout-light">
            <h2 class="slide-header-text">Executive Summary</h2>
            <div class="slide-columns">
                <div class="slide-col">
                    <div class="slide-col-title"><i class="fa-solid fa-chart-pie"></i> 1. Pipeline Operations</div>
                    <ul>
                        <li>Scanned <strong>550 clean leads</strong> over 12-week CRM log, establishing the baseline funnel.</li>
                        <li>Identified 363 Trials (Activation: <strong>66.0%</strong>) and 97 Conversions (Conversion: <strong>17.6%</strong>).</li>
                        <li>Added <strong>$265,671</strong> in MRR.</li>
                        <li>Average cycle time: <strong>19.0 days</strong> from lead creation to paying customer conversion.</li>
                    </ul>
                </div>
                <div class="slide-col border-orange" style="border-left: 3px solid #C65911;">
                    <div class="slide-col-title" style="color: #C65911;"><i class="fa-solid fa-triangle-exclamation"></i> 2. Identified Process Gaps</div>
                    <ul>
                        <li><strong>Manual Contract Handoff</strong>: PDF contracts emailed from Sales to Finance causing a <strong>4.2-day lag</strong>.</li>
                        <li><strong>Double Customer Data Entry</strong>: Lack of CRM-to-billing API integration leads to manual copy errors (~5% typo rate).</li>
                        <li><strong>Siloed Access Setup</strong>: Ops manually provisions app access after payment checks, adding a <strong>2.1-day delay</strong>.</li>
                    </ul>
                </div>
                <div class="slide-col border-green" style="border-left: 3px solid #375623;">
                    <div class="slide-col-title" style="color: #375623;"><i class="fa-solid fa-circle-nodes"></i> 3. Automation Outcomes</div>
                    <ul>
                        <li><strong>Quote-to-Invoice Integration</strong>: Automatic Stripe invoice generated on Salesforce Opportunity Stage = Won.</li>
                        <li><strong>Stripe-to-Auth0 Webhooks</strong>: Payment success webhooks instantly provision accounts via API.</li>
                        <li><strong>Operational Benefit</strong>: Time-to-Value cut from <strong>6.3 days to minutes</strong>; reconciliation workload cut by <strong>~30%</strong>.</li>
                    </ul>
                </div>
            </div>
            <div class="slide-footer-tag">RevOps Pipeline & Onboarding Analysis</div>
        </div>
    `,
    3: () => `
        <div class="slide-layout-light">
            <h2 class="slide-header-text">SaaS Sales Funnel & Segment Analysis</h2>
            <div class="slide-columns">
                <div class="slide-col" style="flex: 0.9;">
                    <div class="slide-col-title"><i class="fa-solid fa-filter"></i> Funnel Conversion Metrics</div>
                    <ul style="margin-top: 10px;">
                        <li>Leads Captured: <strong>550</strong></li>
                        <li>Trial Activation Rate: <strong>66.0%</strong> (363 accounts)</li>
                        <li>Trial-to-Paid Rate: <strong>26.7%</strong> (97 conversions)</li>
                        <li>Overall Funnel Efficiency: <strong>17.6%</strong></li>
                        <li>Avg Deal Velocity: <strong>19.0 days</strong></li>
                    </ul>
                    <div style="background-color: #EBF1F5; padding: 10px; border-radius: 6px; font-size: 0.65rem; color: #1F4E78; font-weight: 600; margin-top: 15px;">
                        RevOps Insight: The primary funnel leak is in the Trial-to-Conversion stage (26.7%), suggesting trial-adoption hurdles.
                    </div>
                </div>
                <div class="slide-col" style="flex: 1.1; justify-content: center;">
                    <table class="slide-table">
                        <thead>
                            <tr>
                                <th>Segment</th>
                                <th>Leads</th>
                                <th>Conversions</th>
                                <th>Conv. %</th>
                                <th>MRR Added</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>SMB</strong></td>
                                <td>180</td>
                                <td>33</td>
                                <td>18.3%</td>
                                <td>$7,291</td>
                            </tr>
                            <tr>
                                <td><strong>Mid-Market</strong></td>
                                <td>192</td>
                                <td>37</td>
                                <td>19.3%</td>
                                <td>$36,894</td>
                            </tr>
                            <tr>
                                <td><strong>Enterprise</strong></td>
                                <td>178</td>
                                <td>27</td>
                                <td>15.2%</td>
                                <td>$244,741</td>
                            </tr>
                            <tr class="total-row">
                                <td><strong>Total / Avg</strong></td>
                                <td>550</td>
                                <td>97</td>
                                <td>17.6%</td>
                                <td>$288,926</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="slide-footer-tag">RevOps Pipeline & Onboarding Analysis</div>
        </div>
    `,
    4: () => `
        <div class="slide-layout-light">
            <h2 class="slide-header-text">Current Process Gaps & Operational Friction</h2>
            <div class="slide-block-row">
                <div class="slide-block">
                    <div class="slide-block-num" style="background-color: #C65911;">GAP 1</div>
                    <div class="slide-block-details">
                        <h5>Manual Contract Emailing (Sales to Finance) | <span style="color:#C65911; font-weight:700;">Impact: 4.2-Day Lag</span></h5>
                        <p>Opportunity won triggers DocuSign. Sales emails PDF contract manually to Finance billing. Invoice generation remains stalled in inbox queues.</p>
                    </div>
                </div>
                <div class="slide-block">
                    <div class="slide-block-num" style="background-color: #C65911;">GAP 2</div>
                    <div class="slide-block-details">
                        <h5>Double-Entry Customer Profile Creation | <span style="color:#C65911; font-weight:700;">Impact: 5.0% Typo Rate</span></h5>
                        <p>Finance managers manually type company name, email, subscription tier, and MRR details from PDF contract into Stripe billing. Breaks database mapping.</p>
                    </div>
                </div>
                <div class="slide-block">
                    <div class="slide-block-num" style="background-color: #C65911;">GAP 3</div>
                    <div class="slide-block-details">
                        <h5>Siloed Application Access Provisioning | <span style="color:#C65911; font-weight:700;">Impact: 2.1-Day Delay</span></h5>
                        <p>Access provisioning is deferred until Finance validates bank deposits manually, posting Slack pings to Ops. Customers wait days for initial login setup.</p>
                    </div>
                </div>
            </div>
            <div class="slide-footer-tag">RevOps Pipeline & Onboarding Analysis</div>
        </div>
    `,
    5: () => `
        <div class="slide-layout-light">
            <h2 class="slide-header-text">Target State: Automated Lifecycle Architecture</h2>
            <div class="slide-columns">
                <div class="slide-col" style="border-top: 3px solid #1F4E78;">
                    <div class="slide-col-title"><i class="fa-solid fa-bolt"></i> 1. CRM Webhook Trigger</div>
                    <ul style="padding-left: 0;">
                        <li style="font-size: 0.7rem; margin-bottom:4px;">Sales sets Stage to Closed Won in Salesforce.</li>
                        <li style="font-size: 0.7rem; margin-bottom:4px;">Salesforce trigger pushes deal details (Value, Tier, Customer Email) instantly via webhook to iPaaS.</li>
                    </ul>
                </div>
                <div class="slide-col" style="border-top: 3px solid #1F4E78;">
                    <div class="slide-col-title"><i class="fa-solid fa-gears"></i> 2. Auto Invoice Setup</div>
                    <ul style="padding-left: 0;">
                        <li style="font-size: 0.7rem; margin-bottom:4px;">iPaaS matches Salesforce Account ID to Stripe Customer metadata.</li>
                        <li style="font-size: 0.7rem; margin-bottom:4px;">Draft Invoice created, finalized, and emailed dynamically to the customer. No key-entry errors.</li>
                    </ul>
                </div>
                <div class="slide-col border-green" style="border-top: 3px solid #375623;">
                    <div class="slide-col-title" style="color: #375623;"><i class="fa-solid fa-circle-check"></i> 3. Webhook Provision</div>
                    <ul style="padding-left: 0;">
                        <li style="font-size: 0.7rem; margin-bottom:4px;">Payment success event triggers webhook callback from Stripe.</li>
                        <li style="font-size: 0.7rem; margin-bottom:4px;">App calling API provisions workspace in Auth0 database. Onboarding delay drops from 6.3 days to &lt;2 minutes.</li>
                    </ul>
                </div>
            </div>
            <div class="slide-footer-tag">RevOps Pipeline & Onboarding Analysis</div>
        </div>
    `,
    6: () => `
        <div class="slide-layout-light">
            <h2 class="slide-header-text">RevOps Strategic GTM Recommendations</h2>
            <div class="slide-columns">
                <div class="slide-col" style="flex: 1;">
                    <div class="slide-col-title"><i class="fa-solid fa-bullseye"></i> GTM & Funnel Priorities</div>
                    <ul>
                        <li><strong>Optimize Trial adopting guides</strong> to improve the 26.7% trial-to-conversion rate bottleneck.</li>
                        <li><strong>Salesforce Validation rules</strong> to block 'Negotiation' or 'Won' stages if billing email is empty.</li>
                        <li><strong>Marketing Budget Reallocation</strong> to Google & Referral channels representing higher deal velocity.</li>
                    </ul>
                </div>
                <div class="slide-col border-green" style="flex: 1; border-left: 3px solid #375623;">
                    <div class="slide-col-title" style="color: #375623;"><i class="fa-solid fa-percent"></i> Audit & Time Savings ROI</div>
                    <ul>
                        <li><strong>Reconciliation workload:</strong> cut from 12.5 hrs/week to 8.8 hrs/week (30% staff efficiency gain).</li>
                        <li><strong>Customer Onboarding:</strong> Slashed time-to-value from 6.3 combined calendar days to 1.5 minutes.</li>
                        <li><strong>Audit checks:</strong> Monitor 'RevOps Data Audit' tab in Excel weekly. Focus on maintaining 0 unresolved duplicates.</li>
                    </ul>
                </div>
            </div>
            <div class="slide-footer-tag">RevOps Pipeline & Onboarding Analysis</div>
        </div>
    `
};

// ==========================================================================
// NAVIGATION CONTROLLER
// ==========================================================================
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active classes
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active-section'));
            
            // Add active to clicked nav
            item.classList.add('active');
            
            // Display active section
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active-section');
            }
        });
    });
}

// ==========================================================================
// LIGHT / DARK MODE THEME SYSTEM
// ==========================================================================
function setupThemeToggler() {
    const toggle = document.getElementById('theme-toggle');
    const root = document.documentElement;

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            root.setAttribute('data-theme', 'dark');
            document.querySelector('.theme-label').innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
        } else {
            root.setAttribute('data-theme', 'light');
            document.querySelector('.theme-label').innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
        }
        // Update Chart text colors if charts exist
        updateChartsTheme();
    });
}

// ==========================================================================
// WORKFLOW TOGGLER (CURRENT VS FUTURE STATE MAP)
// ==========================================================================
function setupWorkflowToggler() {
    const btnCurrent = document.getElementById('btn-workflow-current');
    const btnFuture = document.getElementById('btn-workflow-future');
    const mapCurrent = document.getElementById('map-current');
    const mapFuture = document.getElementById('map-future');

    if (btnCurrent && btnFuture && mapCurrent && mapFuture) {
        btnCurrent.addEventListener('click', () => {
            btnCurrent.classList.add('active');
            btnFuture.classList.remove('active');
            mapCurrent.classList.add('active-map');
            mapFuture.classList.remove('active-map');
        });

        btnFuture.addEventListener('click', () => {
            btnFuture.classList.add('active');
            btnCurrent.classList.remove('active');
            mapFuture.classList.add('active-map');
            mapCurrent.classList.remove('active-map');
        });
    }
}

// ==========================================================================
// LEADERSHIP SLIDE DECK VIEWER
// ==========================================================================
function setupSlideDeckViewer() {
    const slideCanvas = document.getElementById('slide-canvas');
    const btnPrev = document.getElementById('btn-slide-prev');
    const btnNext = document.getElementById('btn-slide-next');
    const indicator = document.getElementById('slide-indicator');

    function updateSlide() {
        if (slideCanvas && indicator) {
            // Render HTML content
            slideCanvas.innerHTML = slidesTemplates[appData.currentSlide]();
            // Update Page Indicator
            indicator.textContent = `Slide ${appData.currentSlide} of ${appData.totalSlides}`;
        }
    }

    if (btnPrev && btnNext) {
        btnPrev.addEventListener('click', () => {
            if (appData.currentSlide > 1) {
                appData.currentSlide--;
                updateSlide();
            }
        });

        btnNext.addEventListener('click', () => {
            if (appData.currentSlide < appData.totalSlides) {
                appData.currentSlide++;
                updateSlide();
            }
        });
    }

    // Load slide 1 on startup
    updateSlide();
}

// ==========================================================================
// LOAD DATA STATS LOGS
// ==========================================================================
function loadETLStats() {
    // Attempt to fetch from JSON file (if running via local server)
    fetch('reports/cleaning_stats.json')
        .then(response => {
            if (!response.ok) throw new Error('CORS or file access restriction');
            return response.json();
        })
        .then(json => {
            console.log('Successfully fetched live ETL stats:', json);
            appData.etlStats = json;
            renderStatsInDOM();
        })
        .catch(err => {
            console.log('Using pre-populated fallback ETL stats (Running offline/file://):', appData.etlStats);
            renderStatsInDOM();
        });
}

function renderStatsInDOM() {
    // Update KPI Card Numbers
    document.getElementById('kpi-leads').textContent = appData.etlStats.final_clean_rows.toLocaleString();
    
    // Update Audit Log Table
    document.getElementById('audit-dups').textContent = appData.etlStats.duplicates_removed;
    document.getElementById('audit-emails').textContent = appData.etlStats.missing_emails_filled;
    document.getElementById('audit-casing').textContent = appData.etlStats.casing_fixes;
    document.getElementById('audit-dates').textContent = appData.etlStats.date_format_fixes;
    document.getElementById('audit-chronology').textContent = appData.etlStats.date_order_fixes;
    document.getElementById('audit-revenue').textContent = appData.etlStats.mrr_fixes;
    document.getElementById('audit-total-in').textContent = appData.etlStats.initial_rows;
    document.getElementById('audit-total-out').textContent = appData.etlStats.final_clean_rows;
}

// ==========================================================================
// RENDERING CHARTJS VISUALIZATIONS
// ==========================================================================
let funnelChartInst = null;
let funnelDropChartInst = null;
let segmentChartInst = null;

function getChartColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
        text: isDark ? '#9CA3AF' : '#4B5563',
        grid: isDark ? '#243552' : '#E5E7EB',
        primary: isDark ? '#3B82F6' : '#1F4E78',
        trial: '#F97316',
        conv: '#10B981',
        segments: ['#8B5CF6', '#10B981', '#3B82F6'] // violet, green, blue
    };
}

function updateChartsTheme() {
    const colors = getChartColors();
    const charts = [funnelChartInst, funnelDropChartInst, segmentChartInst];
    
    charts.forEach(chart => {
        if (chart) {
            if (chart.options.scales && chart.options.scales.x) {
                chart.options.scales.x.ticks.color = colors.text;
                chart.options.scales.x.grid.color = colors.grid;
            }
            if (chart.options.scales && chart.options.scales.y) {
                chart.options.scales.y.ticks.color = colors.text;
                chart.options.scales.y.grid.color = colors.grid;
            }
            if (chart.options.plugins.legend && chart.options.plugins.legend.labels) {
                chart.options.plugins.legend.labels.color = colors.text;
            }
            chart.update();
        }
    });
}

function renderCharts() {
    const colors = getChartColors();
    
    // 1. Weekly Funnel Line/Bar Chart
    const ctxWeekly = document.getElementById('weeklyFunnelChart');
    if (ctxWeekly) {
        funnelChartInst = new Chart(ctxWeekly, {
            type: 'line',
            data: {
                labels: appData.weeklyMetrics.map(d => d.week),
                datasets: [
                    {
                        label: 'Leads Generated',
                        data: appData.weeklyMetrics.map(d => d.leads),
                        borderColor: colors.primary,
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Trials Activated',
                        data: appData.weeklyMetrics.map(d => d.trials),
                        borderColor: colors.trial,
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        tension: 0.3
                    },
                    {
                        label: 'Conversions (Closed Won)',
                        data: appData.weeklyMetrics.map(d => d.convs),
                        borderColor: colors.conv,
                        backgroundColor: 'transparent',
                        borderWidth: 2.5,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: colors.text, font: { family: 'Inter' } }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: colors.text },
                        grid: { color: colors.grid }
                    },
                    y: {
                        ticks: { color: colors.text },
                        grid: { color: colors.grid }
                    }
                }
            }
        });
    }

    // 2. Funnel drop-off chart (Horizontal Bar Chart)
    const ctxDrop = document.getElementById('funnelDropChart');
    if (ctxDrop) {
        funnelDropChartInst = new Chart(ctxDrop, {
            type: 'bar',
            data: {
                labels: ['1. Leads Generated', '2. Trials Activated', '3. Paid Conversions'],
                datasets: [{
                    label: 'Volume',
                    data: [550, 363, 97],
                    backgroundColor: [colors.primary, colors.trial, colors.conv],
                    borderRadius: 6,
                    barThickness: 32
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        ticks: { color: colors.text },
                        grid: { color: colors.grid }
                    },
                    y: {
                        ticks: { color: colors.text },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // 3. Segment Doughnut Chart
    const ctxSegment = document.getElementById('segmentChart');
    if (ctxSegment) {
        segmentChartInst = new Chart(ctxSegment, {
            type: 'doughnut',
            data: {
                labels: ['Enterprise MRR', 'Mid-Market MRR', 'SMB MRR'],
                datasets: [{
                    data: [
                        appData.segmentMRR['Enterprise'],
                        appData.segmentMRR['Mid-Market'],
                        appData.segmentMRR['SMB']
                    ],
                    backgroundColor: colors.segments,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: colors.text, font: { family: 'Inter' } }
                    }
                }
            }
        });
    }
}

// ==========================================================================
// APPLICATION INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupThemeToggler();
    setupWorkflowToggler();
    setupSlideDeckViewer();
    loadETLStats();
    renderCharts();
});
