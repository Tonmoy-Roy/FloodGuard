"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, XCircle, Loader2, ChevronRight } from "lucide-react";
import { Button } from "@/app/Components/Ui/button";
import Link from "next/link";

const STATUS_CONFIG = {
  Pending: {
    icon: Clock,
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
    label: "Under Review",
    message: "Your application is being reviewed by our admin team. This usually takes 24–48 hours.",
  },
  Approved: {
    icon: CheckCircle2,
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-800",
    label: "Approved",
    message: "Congratulations! You are now a verified FloodGuard BD volunteer. Access your dashboard below.",
  },
  Rejected: {
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800",
    label: "Not Approved",
    message: "Unfortunately, your application was not approved at this time. You may re-apply after 30 days.",
  },
};

export default function VolunteerStatusPage() {
  const [loading, setLoading] = useState(true);
  const [application, setApp] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStatus() {
      try {
        const email = localStorage.getItem("volunteer_email");

        if (!email) {
          setLoading(false);
          return; 
        }

        const res = await fetch(`/api/volunteer?email=${email}`);
        const json = await res.json();
        if (json.data?.length > 0) {
          setApp(json.data[0]);
        }
      } catch {
        setError("Failed to load application status.");
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
    </div>
  );

  if (!application) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center flex flex-col gap-4 p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
        <p className="text-gray-500 dark:text-gray-400">No application found.</p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
          <Link href="/volunteer/apply">Apply Now</Link>
        </Button>
      </div>
    </div>
  );

  const config = STATUS_CONFIG[application.status] || STATUS_CONFIG.Pending;
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full flex flex-col gap-5">

        {/* Status card */}
        <div className={`p-6 rounded-2xl border-2 ${config.border} ${config.bg} flex flex-col items-center text-center gap-4`}>
          <Icon className={`w-12 h-12 ${config.color}`} />
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Application {config.label}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {config.message}
            </p>
          </div>
          {application.rejectionReason && (
            <div className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
              <strong>Reason:</strong> {application.rejectionReason}
            </div>
          )}
        </div>

        {/* Application details */}
        <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Your Application
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Name", application.name],
              ["District", application.district],
              ["Availability", application.availability],
              ["Submitted", new Date(application.createdAt).toLocaleDateString("en-BD")],
              ["Skills", (application.skills || []).slice(0, 2).join(", ")],
            ].map(([label, val]) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">{label}</span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{val || "—"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {application.status === "Approved" && (
          <Button className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold" asChild>
            <Link href="/dashboard/volunteer">
              Go to Volunteer Dashboard <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        )}
        {application.status === "Rejected" && (
          <Button variant="outline" className="w-full" asChild>
            <Link href="/volunteer/apply">Re-apply</Link>
          </Button>
        )}
      </div>
    </div>
  );
}