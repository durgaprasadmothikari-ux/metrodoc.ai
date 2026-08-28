import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, AlertTriangle, ArrowUpRight, BarChart3, Bell, CheckCircle2, ChevronRight, Clock3, FileText, FolderOpen, LayoutDashboard, Menu, Search, Settings, ShieldCheck, Sparkles, Upload, X } from 'lucide-react';
import './styles.css';

const demoDocuments = [
  { id: 1, name: 'Train Maintenance Report.pdf', type: 'Maintenance', date: 'Today', pages: 48, status: 'Analyzed', priority: 'High', summary: 'Brake inspection and door-sensor maintenance across 12 train sets.' },
  { id: 2, name: 'Safety Inspection Q2.pdf', type: 'Safety', date: 'Yesterday', pages: 31, status: 'Analyzed', priority: 'Medium', summary: 'Quarterly safety inspection with 7 observations and 3 follow-up actions.' },
  { id: 3, name: 'Project Status Report.pdf', type: 'Project', date: 'Aug 26', pages: 22, status: 'Analyzed', priority: 'Low', summary: 'Progress update for station modernization and signaling work.' },
];

const findings = [
  ['Brake inspection overdue on KM-07', 'High', 'Safety'],
  ['Recurring door sensor fault on KM-03', 'Medium', 'Maintenance'],
  ['Battery replacement recommended for KM-05', 'Low', 'Maintenance'],
];

function App() {
  const [documents, setDocuments] = useState(demoDocuments);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');
  const [uploading, setUploading] = useState(false);
  const filtered = useMemo(() => documents.filter(d => d.name.toLowerCase().includes(query.toLowerCase()) || d.type.toLowerCase().includes(query.toLowerCase())), [documents, query]);

  function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      setDocuments(prev => [{ id: Date.now(), name: file.name, type: 'Uploaded', date: 'Just now', pages: '—', status: 'Analyzed', priority: 'Medium', summary: 'Demo analysis completed. Connect the FastAPI AI endpoint for live extraction and analysis.' }, ...prev]);
      setUploading(false);
    }, 900);
  }

  return <div className="app">
    <aside className="sidebar">
      <div className="brand"><div className="brandIcon"><FileText size={21}/></div><div><strong>MetroDoc</strong><span>AI</span></div></div>
      <nav>
        <a className="active"><LayoutDashboard size={18}/> Dashboard</a>
        <a><FolderOpen size={18}/> Documents <b>{documents.length}</b></a>
        <a><BarChart3 size={18}/> Analytics</a>
        <a><ShieldCheck size={18}/> Compliance</a>
      </nav>
      <div className="sideBottom"><a><Settings size={18}/> Settings</a><div className="user"><div className="avatar">DP</div><div><strong>Metro Operations</strong><small>Admin</small></div></div></div>
    </aside>

    <main>
      <header><div className="mobileBrand"><Menu size={21}/><strong>MetroDoc AI</strong></div><div className="search"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search documents..."/></div><button className="iconBtn"><Bell size={19}/><i/></button></header>

      <section className="hero"><div><p className="eyebrow"><Sparkles size={15}/> DOCUMENT INTELLIGENCE</p><h1>Good evening, Operations Team</h1><p>Turn lengthy metro documents into clear, actionable insights.</p></div><label className="uploadBtn"><Upload size={18}/>{uploading ? 'Analyzing...' : 'Upload PDF'}<input type="file" accept="application/pdf" onChange={handleUpload}/></label></section>

      <section className="stats">
        <Stat icon={<FileText/>} label="Documents analyzed" value={documents.length + 124} trend="+18%" />
        <Stat icon={<AlertTriangle/>} label="Issues detected" value="17" trend="+5" danger />
        <Stat icon={<CheckCircle2/>} label="Actions completed" value="83%" trend="+12%" />
        <Stat icon={<Clock3/>} label="Time saved" value="42h" trend="This month" />
      </section>

      <section className="grid">
        <div className="panel recent"><div className="panelHead"><div><h2>Recent documents</h2><p>Your latest analyzed operational reports</p></div><button>View all <ChevronRight size={15}/></button></div>
          <div className="docList">{filtered.map(d => <button className="docRow" key={d.id} onClick={() => setSelected(d)}><div className="pdf"><FileText size={19}/></div><div className="docInfo"><strong>{d.name}</strong><span>{d.type} · {d.pages} pages · {d.date}</span></div><span className="status"><CheckCircle2 size={14}/> {d.status}</span><span className={'priority '+d.priority.toLowerCase()}>{d.priority}</span><ArrowUpRight size={17} className="arrow"/></button>)}</div>
        </div>
        <div className="panel"><div className="panelHead"><div><h2>Priority findings</h2><p>Issues requiring attention</p></div><Activity size={19}/></div><div className="findings">{findings.map((f,i)=><div className="finding" key={i}><div className={'dot '+f[1].toLowerCase()}/><div><strong>{f[0]}</strong><span>{f[2]}</span></div><b className={f[1].toLowerCase()}>{f[1]}</b></div>)}</div><button className="wideBtn">Open issue tracker <ArrowUpRight size={16}/></button></div>
      </section>

      <section className="panel insights"><div className="panelHead"><div><h2>Operational overview</h2><p>Document analysis activity</p></div><select><option>Last 30 days</option><option>Last 7 days</option></select></div><div className="chart"><div className="bars">{[42,58,49,74,65,88,78,96,70,84,91,76].map((h,i)=><div className="barWrap" key={i}><div className="bar" style={{height:h+'%'}}/><small>{i+1}</small></div>)}</div><div className="chartLabel"><span><i className="legend"/> Documents processed</span><strong>124 <small>+18%</small></strong></div></div></section>
    </main>
    {selected && <div className="modalBg" onClick={() => setSelected(null)}><div className="modal" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setSelected(null)}><X size={19}/></button><div className="modalIcon"><FileText/></div><p className="eyebrow">AI ANALYSIS</p><h2>{selected.name}</h2><p>{selected.summary}</p><div className="modalGrid"><div><small>Priority</small><strong className={'priority '+selected.priority.toLowerCase()}>{selected.priority}</strong></div><div><small>Pages</small><strong>{selected.pages}</strong></div><div><small>Status</small><strong>{selected.status}</strong></div></div><h3>Recommended actions</h3><ul><li>Review flagged operational findings.</li><li>Assign responsible maintenance team.</li><li>Record resolution and verification date.</li></ul></div></div>}
  </div>
}

function Stat({icon,label,value,trend,danger}) { return <div className="stat"><div className={'statIcon '+(danger?'danger':'')}>{icon}</div><div><span>{label}</span><strong>{value}</strong><small>{trend}</small></div></div> }

createRoot(document.getElementById('root')).render(<App/>);
