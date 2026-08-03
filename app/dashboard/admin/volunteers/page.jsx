"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2, XCircle, Eye, Trash2, Search,
  Filter, Loader2, Users, Clock, BadgeCheck,
  AlertCircle, ChevronDown, X, Phone, MapPin,
  Briefcase, Calendar, RefreshCw,
} from "lucide-react";
import { Button } from "@/app/Components/Ui/button";

// ─── Mock data — replace with real API fetch ──────────────────────────────────
const MOCK_VOLUNTEERS = [
  { _id: "1", name: "Robin Ahmed", email: "robin@gmail.com", phone: "01712345678", district: "Feni", upazila: "Fulgazi", skills: ["First Aid", "Swimming"], availability: "Full Time", status: "Pending", createdAt: "2024-06-20T10:00:00Z", experience: "Worked in 2022 Feni flood relief." },
  { _id: "2", name: "Sadia Islam", email: "sadia@gmail.com", phone: "01898765432", district: "Sylhet", upazila: "Sadar", skills: ["Medical Training", "Cooking"], availability: "Weekends", status: "Pending", createdAt: "2024-06-21T08:30:00Z", experience: "Nurse with 3 years experience." },
  { _id: "3", name: "Mahfuz Karim", email: "mahfuz@gmail.com", phone: "01611223344", district: "Noakhali", upazila: "Companiganj", skills: ["Boat Operation", "Driving"], availability: "On Call", status: "Approved", createdAt: "2024-06-18T14:00:00Z", experience: "Owns a rescue boat.", approvedAt: "2024-06-19T09:00:00Z" },
  { _id: "4", name: "Tania Begum", email: "tania@gmail.com", phone: "01955544433", district: "Feni", upazila: "Daganbhuiyan", skills: ["First Aid", "Communication"], availability: "Part Time", status: "Rejected", createdAt: "2024-06-17T11:00:00Z", experience: "Community organizer." },
  { _id: "5", name: "Rakib Hossain", email: "rakib@gmail.com", phone: "01733221100", district: "Feni", upazila: "Parshuram", skills: ["Search & Rescue", "Swimming"], availability: "Full Time", status: "Pending", createdAt: "2024-06-22T07:15:00Z", experience: "Ex-army, trained in rescue ops." },
];

// ─── Config ───────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  Pending: { label: "Pending", color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-200", icon: Clock },
  Approved: { label: "Approved", color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-200", icon: BadgeCheck },
  Rejected: { label: "Rejected", color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20", border: "border-red-200", icon: XCircle },
};

const DISTRICTS = ["All Districts", "Feni", "Sylhet", "Noakhali", "Dhaka", "Chittagong"];

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="flex flex-col gap-2 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{label}</span>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</span>
    </div>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function DetailModal({ volunteer, onClose, onApprove, onReject }) {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const [processing, setProcessing] = useState(false);

  async function handleApprove() {
    setProcessing(true);
    await onApprove(volunteer._id);
    setProcessing(false);
    onClose();
  }

  async function handleReject() {
    if (!reason.trim()) return;
    setProcessing(true);
    await onReject(volunteer._id, reason);
    setProcessing(false);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="font-bold text-gray-900 dark:text-gray-100">Volunteer Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh] flex flex-col gap-5">

          {/* Status badge */}
          {(() => {
            const cfg = STATUS_CONFIG[volunteer.status];
            const Icon = cfg.icon;
            return (
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${cfg.bg} ${cfg.border} w-fit`}>
                <Icon className={`w-4 h-4 ${cfg.color}`} />
                <span className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</span>
              </div>
            );
          })()}

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Full Name", value: volunteer.name, icon: Users },
              { label: "Phone", value: volunteer.phone, icon: Phone },
              { label: "Email", value: volunteer.email, icon: null },
              { label: "District", value: volunteer.district, icon: MapPin },
              { label: "Upazila", value: volunteer.upazila, icon: MapPin },
              { label: "Occupation", value: volunteer.occupation || "—", icon: Briefcase },
              { label: "Availability", value: volunteer.availability, icon: Calendar },
              { label: "Applied", value: new Date(volunteer.createdAt).toLocaleDateString("en-BD"), icon: Calendar },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-1">
                  {Icon && <Icon className="w-3 h-3 text-gray-400" />}
                  {value || "—"}
                </span>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Skills</span>
            <div className="flex flex-wrap gap-1.5">
              {(volunteer.skills || []).map(skill => (
                <span key={skill} className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          {volunteer.experience && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Experience</span>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
                {volunteer.experience}
              </p>
            </div>
          )}

          {/* Reject reason input */}
          {rejecting && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">Rejection Reason *</span>
              <select value={reason} onChange={e => setReason(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400">
                <option value="">Select a reason</option>
                <option>Incomplete information</option>
                <option>Age requirement not met</option>
                <option>Area not covered</option>
                <option>Duplicate application</option>
                <option>Other</option>
              </select>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {volunteer.status === "Pending" && (
          <div className="flex gap-2 px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            {!rejecting ? (
              <>
                <Button onClick={() => setRejecting(true)} variant="outline"
                  className="flex-1 gap-2 border-red-200 text-red-600 hover:bg-red-50">
                  <XCircle className="w-4 h-4" /> Reject
                </Button>
                <Button onClick={handleApprove} disabled={processing}
                  className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold">
                  {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  Approve
                </Button>
              </>
            ) : (
              <>
                <button onClick={() => setRejecting(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Cancel
                </button>
                <Button onClick={handleReject} disabled={!reason || processing}
                  className="flex-1 gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold">
                  {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                  Confirm Reject
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatus] = useState("All");
  const [districtFilter, setDistrict] = useState("All Districts");
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Fetch
  async function fetchVolunteers() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/volunteer");
      const json = await res.json();
      const safeVolunteers = Array.isArray(json?.data) ? json.data : [];
      setVolunteers(safeVolunteers);

      if (!res.ok || !json?.success) {
        setError(json?.error || "Unable to load volunteer requests right now.");
      }
    } catch (err) {
      console.error("Failed to fetch volunteers:", err);
      setError("Unable to load volunteer requests right now.");
      setVolunteers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchVolunteers(); }, []);

  // Approve
  async function handleApprove(id) {
    await fetch(`/api/volunteer/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Approved" }),
    });
    setVolunteers(prev =>
      prev.map(v => v._id === id ? { ...v, status: "Approved", approvedAt: new Date().toISOString() } : v)
    );
  }

  // Reject
  async function handleReject(id, rejectionReason) {
    await fetch(`/api/volunteer/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Rejected", rejectionReason }),
    });
    setVolunteers(prev =>
      prev.map(v => v._id === id ? { ...v, status: "Rejected", rejectionReason } : v)
    );
  }

  // Delete
  async function handleDelete(id) {
    setDeleting(id);
    await fetch(`/api/volunteer/${id}`, { method: "DELETE" });
    setVolunteers(prev => prev.filter(v => v._id !== id));
    setDeleting(null);
  }

  // Filter
  const volunteersList = Array.isArray(volunteers) ? volunteers : [];
  const filtered = volunteersList.filter(v => {
    const name = typeof v?.name === "string" ? v.name : "";
    const district = typeof v?.district === "string" ? v.district : "";
    const email = typeof v?.email === "string" ? v.email : "";
    const status = typeof v?.status === "string" ? v.status : "";

    const matchSearch = name.toLowerCase().includes(search.toLowerCase()) ||
      district.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || status === statusFilter;
    const matchDistrict = districtFilter === "All Districts" || district === districtFilter;
    return matchSearch && matchStatus && matchDistrict;
  });

  // Stats
  const total = volunteersList.length;
  const pending = volunteersList.filter(v => v?.status === "Pending").length;
  const approved = volunteersList.filter(v => v?.status === "Approved").length;
  const rejected = volunteersList.filter(v => v?.status === "Rejected").length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Volunteer Requests</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Review and manage volunteer applications</p>
          </div>
          <button onClick={fetchVolunteers}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors self-start">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total" value={total} icon={Users} color="text-blue-500" />
          <StatCard label="Pending" value={pending} icon={Clock} color="text-orange-500" />
          <StatCard label="Approved" value={approved} icon={BadgeCheck} color="text-green-500" />
          <StatCard label="Rejected" value={rejected} icon={XCircle} color="text-red-500" />
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search volunteer..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <select value={statusFilter} onChange={e => setStatus(e.target.value)}
              className="pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
              {["All", "Pending", "Approved", "Rejected"].map(s => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>

          {/* District filter */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <select value={districtFilter} onChange={e => setDistrict(e.target.value)}
              className="pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer">
              {DISTRICTS.map(d => <option key={d}>{d}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* ── Table ── */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2 text-gray-400">
              <AlertCircle className="w-8 h-8 opacity-40" />
              <p className="text-sm">No volunteers found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                    {["Name", "District", "Skills", "Availability", "Applied", "Status", "Actions"].map(col => (
                      <th key={col} className="text-left px-5 py-3.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {filtered.map(v => {
                    const cfg = STATUS_CONFIG[v.status];
                    const Icon = cfg.icon;
                    return (
                      <tr key={v._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">

                        {/* Name + email */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-sm font-bold text-blue-700 dark:text-blue-300 flex-shrink-0">
                              {v.name.charAt(0)}
                            </div>
                            <div className="flex flex-col gap-0.5 min-w-0">
                              <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">{v.name}</span>
                              <span className="text-xs text-gray-400 truncate">{v.email}</span>
                            </div>
                          </div>
                        </td>

                        {/* District */}
                        <td className="px-5 py-4">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-medium text-gray-800 dark:text-gray-200">{v.district}</span>
                            <span className="text-xs text-gray-400">{v.upazila}</span>
                          </div>
                        </td>

                        {/* Skills */}
                        <td className="px-5 py-4">
                          <div className="flex flex-wrap gap-1 max-w-[180px]">
                            {(v.skills || []).slice(0, 2).map(s => (
                              <span key={s} className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[11px] font-medium">
                                {s}
                              </span>
                            ))}
                            {v.skills?.length > 2 && (
                              <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 text-[11px] font-medium">
                                +{v.skills.length - 2}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Availability */}
                        <td className="px-5 py-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                          {v.availability}
                        </td>

                        {/* Applied date */}
                        <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">
                          {new Date(v.createdAt).toLocaleDateString("en-BD")}
                        </td>

                        {/* Status badge */}
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                            <Icon className="w-3 h-3" />
                            {cfg.label}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5">
                            {/* View */}
                            <button onClick={() => setSelected(v)}
                              className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                              title="View details">
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Quick approve — pending only */}
                            {v.status === "Pending" && (
                              <>
                                <button onClick={() => handleApprove(v._id)}
                                  className="p-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                                  title="Approve">
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => { setSelected(v); }}
                                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                  title="Reject">
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}

                            {/* Delete */}
                            <button onClick={() => handleDelete(v._id)} disabled={deleting === v._id}
                              className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-40"
                              title="Delete">
                              {deleting === v._id
                                ? <Loader2 className="w-4 h-4 animate-spin" />
                                : <Trash2 className="w-4 h-4" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Table footer */}
          {!loading && filtered.length > 0 && (
            <div className="px-5 py-3.5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400">
              <span>Showing {filtered.length} of {volunteersList.length} volunteers</span>
              <span>{pending} pending review</span>
            </div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <DetailModal
          volunteer={selected}
          onClose={() => setSelected(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
}