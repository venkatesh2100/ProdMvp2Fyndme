"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export type Member = {
  _id?: string;
  avatar?: string;
  "Member Name": string;
  Username: string;
  "No. Of Portfolios": string;
  "ID Verification": string;
  "Portfolio Verification": string;
  Location: string;
  "Size (KB)": string;
  Subscription: string;
  "Member Since"?: string;
  memberSince?: string;
  joinedAt?: string;

  portfolios?: any;
  portfolioTags?: string[];
};

type RowStatus = "Verified" | "In Progress" | "Not Verified" | "Blocked";

type Props = {
  member: Member;
  onApprove?: () => void;
  onReject?: () => void;
  onPortfolioVerifyChange?: (status: RowStatus) => void;
};

type Tab = "overview" | "portfolios" | "subscriptions" | "id";

function formatMonthYear(input?: string) {
  if (!input) return undefined;
  const d = new Date(input);
  if (isNaN(d.getTime())) return input;
  return d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

function getPortfolioChips(member: Member): string[] {
  const anyM = member as any;
  if (Array.isArray(anyM.portfolioTags) && anyM.portfolioTags.length) {
    return anyM.portfolioTags.map(String);
  }
  if (Array.isArray(anyM.portfolios) && anyM.portfolios.length) {
    const arr = anyM.portfolios;
    if (typeof arr[0] === "string") return arr.map(String);
    return arr
      .map((x: any) => x?.name ?? x?.category ?? x?.title ?? x?.type)
      .filter(Boolean)
      .map(String);
  }
  return ["Personal", "Creative - Photography"];
}

export default function MemberProfile({
  member,
  onApprove,
  onReject,
  onPortfolioVerifyChange,
}: Props) {
  const [tab, setTab] = useState<Tab>("overview");
  const [memberState, setMemberState] = useState<Member>(member);

  const parts = (memberState.Location || "").split(",");
  const cityLine = parts.slice(0, -1).join(",").trim();
  const countryLine = parts.slice(-1)[0]?.trim();

  const nameParts = (memberState["Member Name"] || "").split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const rawSince =
    memberState["Member Since"] ||
    memberState.memberSince ||
    memberState.joinedAt ||
    "";
  const sinceDisplay = formatMonthYear(rawSince);

  const chips = getPortfolioChips(memberState);
  const parsedCount = Number(memberState?.["No. Of Portfolios"]);
  const total =
    Number.isFinite(parsedCount) && parsedCount > 0 ? parsedCount : chips.length;

  async function saveUsername(newUsername: string) {
    setMemberState((m) => ({ ...m, Username: newUsername }));
    try {
      await fetch("/api/members/update-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: memberState._id,
          username: newUsername,
        }),
      });
    } catch {}
  }

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-5 overflow-x-hidden">
      <div className="flex gap-6 flex-wrap">
        {/* LEFT COLUMN */}
        <div className="shrink-0 w-[310px]">
          {/* ORANGE CARD */}
          <div
            className="relative overflow-hidden bg-[#F38D32] mt-6 rounded-lg"
            style={{ height: "219px" }}
          >
            <div className="relative z-10 p-4 max-w-[240px] mt-6">
              <h2 className="text-white text-[20px] font-bold leading-tight whitespace-pre-line">
                {firstName + "\n" + lastName}
              </h2>
              <p className="text-white/90 mt-1 text-[12px]">Software Engineer</p>
              <p className="text-white mt-3 text-[13px] leading-snug">
                Description of description and the description
              </p>
            </div>

            {memberState.avatar && (
              <div className="absolute top-0 right-0 pointer-events-none select-none pt-2 pr-2">
                <div className="relative">
                  <Image
                    src={memberState.avatar}
                    alt={memberState["Member Name"]}
                    width={260}
                    height={260}
                    className="object-contain drop-shadow-md"
                    priority
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[80px]"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent, #F38D32)",
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Portfolios under orange card on Overview only */}
          {tab === "overview" && (
            <div className="mt-6">
              <div className="text-gray-700 font-semibold mb-2">Portfolios</div>
              <div className="flex flex-wrap gap-2">
                {chips.map((c) => (
                  <Chip key={c}>{c}</Chip>
                ))}
              </div>
            </div>
          )}

          {/* Subscriptions-only extras */}
          {tab === "subscriptions" && (
            <div className="mt-4">
              <p className="text-gray-600">Current Subscription:</p>
              <p className="text-gray-900 font-semibold text-lg">
                {memberState.Subscription || "—"}
              </p>
              <p className="text-gray-600 mt-4">
                Member Since:{" "}
                <span className="text-gray-700">{sinceDisplay || "—"}</span>
              </p>
            </div>
          )}
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="flex-1 min-w-[280px] w-full">
          {/* Tabs */}
          <div className="flex items-center gap-4 border-b border-gray-200 text-sm">
            <TabButton active={tab === "overview"} onClick={() => setTab("overview")}>
              Overview
            </TabButton>
            <Divider />
            <TabButton
              active={tab === "portfolios"}
              onClick={() => setTab("portfolios")}
            >
              Portfolios
            </TabButton>
            <Divider />
            <TabButton
              active={tab === "subscriptions"}
              onClick={() => setTab("subscriptions")}
            >
              Subscriptions
            </TabButton>
            <Divider />
            <TabButton active={tab === "id"} onClick={() => setTab("id")}>
              ID Verification
            </TabButton>
          </div>

          <div className="pt-4">
            {tab === "overview" && (
              <OverviewBlock
                member={memberState}
                fullName={memberState["Member Name"]}
                username={memberState.Username}
                cityLine={cityLine}
                countryLine={countryLine}
                totalOnly={total}
                onUsernameSave={saveUsername}
              />
            )}

            {tab === "portfolios" && (
              <PortfoliosBlock
                member={memberState}
                onOverallChange={onPortfolioVerifyChange}
              />
            )}

            {tab === "subscriptions" && (
              <SubscriptionsBlock
                currentPlan={memberState.Subscription || "Advanced"}
              />
            )}

            {tab === "id" && (
              <IdVerificationBlock
                onApprove={onApprove}
                onReject={onReject}
                items={[
                  { label: "Selfie", files: 1, img: "/verifications/selfie-1.jpg" },
                  { label: "Selfie", files: 1, img: "/verifications/selfie-2.jpg" },
                  // ↓ dummy card added so you can see the horizontal scroll
                  { label: "Passport", files: 1, img: "/verifications/selfie-3.jpg" },
                ]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- UI helpers ---------- */

function TabButton({ active, onClick, children }: any) {
  return (
    <button
      onClick={onClick}
      className={`py-3 ${active ? "text-blue-600 font-semibold" : "text-gray-700"}`}
      style={{ borderBottom: "none" }}
      type="button"
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="text-gray-300">|</span>;
}

/* ---------- OVERVIEW ---------- */

function OverviewBlock({
  member,
  fullName,
  username,
  cityLine,
  countryLine,
  totalOnly,
  onUsernameSave,
}: {
  member: Member;
  fullName: string;
  username: string;
  cityLine: string;
  countryLine: string;
  totalOnly: number;
  onUsernameSave: (u: string) => Promise<void> | void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(username);

  useEffect(() => {
    setValue(username);
  }, [username]);

  async function handleSave() {
    const next = value.trim();
    if (!next) {
      setEditing(false);
      return;
    }
    if (next !== username) {
      await onUsernameSave(next);
    }
    setEditing(false);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setValue(username);
      setEditing(false);
    }
  }

  return (
    <div className="text-sm text-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        <Field
          label="Full Name"
          value={<span className="text-gray-800">{fullName}</span>}
        />
        <Field
          label="Username"
          action={
            editing ? (
              <button
                onClick={handleSave}
                className="px-2 py-1 rounded bg-[#111827] text-white text-xs leading-none"
                type="button"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="px-2 py-1 rounded bg-[#111827] text-white text-xs leading-none"
                type="button"
              >
                Edit
              </button>
            )
          }
          value={
            editing ? (
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKey}
                className="border border-gray-300 rounded px-2 py-1 text-gray-800 w-full"
                autoFocus
              />
            ) : (
              <span className="text-gray-800">{username}</span>
            )
          }
        />
        <Field
          label="Location"
          value={
            <div className="md:text-right">
              <div className="text-gray-800">{cityLine}</div>
              <div className="text-gray-500">{countryLine}</div>
            </div>
          }
          rightAlignOnDesktop
        />
      </div>

      <div className="mt-4">
        <div className="font-semibold text-gray-800">Introduction</div>
        <p className="mt-2 text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Justo viverra hac eu tortor gravida nulla
          viverra semper. Hac elementum volutpat lectus volutpat tortor. Sollicitudin tempor
          elementum at feugiat ornare. Tellus quisque nam porta congue viverra quam nibh
          facilisi.
        </p>
        <div className="mt-3 border-b border-gray-200" />
      </div>

      <div className="pt-4 text-right text-xs text-gray-500 select-none">
        Total: {totalOnly}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  action,
  rightAlignOnDesktop = false,
}: {
  label: string;
  value: React.ReactNode;
  action?: React.ReactNode;
  rightAlignOnDesktop?: boolean;
}) {
  return (
    <div className={(rightAlignOnDesktop ? "md:text-right " : "") + "h-full flex flex-col"}>
      <div
        className={
          "flex items-center gap-1 mb-2" +
          (rightAlignOnDesktop ? " justify-end md:text-right" : "")
        }
      >
        <div className="text-gray-600 font-semibold">{label}</div>
        {action ? <div>{action}</div> : null}
      </div>

      <div className="pb-2 flex-1">{value}</div>
      <div className="border-b border-gray-200" />
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-200 text-gray-700 text-xs px-3 py-1">
      {children}
    </span>
  );
}

/* ---------- PORTFOLIOS ---------- */

function statusStyles(s: RowStatus) {
  switch (s) {
    case "Verified":
      return { bg: "#CFEAFC", text: "#2C678A" };
    case "Not Verified":
      return { bg: "#0D1E63", text: "#FFFFFF" };
    case "Blocked":
      return { bg: "#FFE2E1", text: "#B42318" };
    default:
      return { bg: "#E8F4FF", text: "#3C81C6" };
  }
}

function PortfoliosBlock({
  member,
  onOverallChange,
}: {
  member: Member;
  onOverallChange?: (status: RowStatus) => void;
}) {
  const base =
    Array.isArray(member.portfolios) && member.portfolios.length
      ? member.portfolios
      : getPortfolioChips(member).map((name: string) => ({ name }));

  const initialRows = base.map((item: any, idx: number) => {
    const name =
      typeof item === "string"
        ? item
        : item?.name ?? item?.category ?? item?.title ?? `Portfolio ${idx + 1}`;
    const status: RowStatus =
      (item?.status as RowStatus) ??
      (String(item?.status || "").match(/verified/i)
        ? "Verified"
        : String(item?.status || "").match(/blocked/i)
        ? "Blocked"
        : String(item?.status || "").match(/not/i)
        ? "Not Verified"
        : "In Progress");
    const sizeKb = Number(item?.sizeKb) || Number(member["Size (KB)"]) || 543;

    return {
      title: `Portfolio ${idx + 1}`,
      category: name,
      status,
      sizeKb,
    };
  });

  const [rows, setRows] = useState(initialRows);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest?.("[data-verify-menu]")) setOpenMenu(null);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  function emitOverall(status: RowStatus) {
    onOverallChange?.(status);
  }

  async function updateVerification(index: number, status: RowStatus) {
    setRows((r) => {
      const next = [...r];
      next[index] = { ...next[index], status };
      return next;
    });
    emitOverall(status);
    try {
      await fetch("/api/portfolios/update-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: member._id,
          index,
          status,
        }),
      });
    } catch {}
  }

  async function blockPortfolio(index: number) {
    setOpenMenu(null);
    try {
      await fetch("/api/portfolios/block", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: member._id, index }),
      });
    } catch {}
    emitOverall("Blocked");
    await updateVerification(index, "Blocked");
  }

  function viewPortfolio(index: number) {
    const url = `/portfolio/${encodeURIComponent(member.Username)}/${index + 1}`;
    window.open(url, "_blank");
  }

  const totalKb = rows.reduce(
    (acc, r) => acc + (Number.isFinite(r.sizeKb) ? r.sizeKb : 0),
    0
  );

  return (
    <div className="text-sm text-gray-900">
      <div className="border-b border-gray-200 pb-3" />

      {/* SCROLL CONTAINER tuned to ~2 rows */}
      <div className="mt-4">
        <div
          className="h-[260px] overflow-y-scroll pr-2"
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="space-y-6">
            {rows.map((r, i) => {
              const { bg, text } = statusStyles(r.status);
              return (
                <div key={i} className="border-b border-gray-200 pb-6">
                  <div className="grid grid-cols-12 items-start gap-4">
                    <div className="col-span-1 flex items-start pt-1">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                    </div>

                    <div className="col-span-6">
                      <div className="text-gray-800 font-semibold">{r.title}</div>
                      <div className="text-gray-600 mt-1">{r.category}</div>
                    </div>

                    <div className="col-span-3 relative" data-verify-menu>
                      <div className="text-gray-600 mb-2">Verification</div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu((cur) => (cur === i ? null : i));
                        }}
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1"
                        style={{ background: bg, color: text, fontWeight: 500 }}
                        data-verify-menu
                      >
                        {r.status}
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                          className="h-4 w-4"
                          fill="currentColor"
                        >
                          <path d="M6 8l4 4 4-4H6z" />
                        </svg>
                      </button>

                      {openMenu === i && (
                        <div
                          className="absolute z-20 mt-2 w-40 rounded-xl shadow-lg bg-white ring-1 ring-black/5 overflow-hidden py-1"
                          data-verify-menu
                        >
                          <MenuItem onClick={() => viewPortfolio(i)}>View Portfolio</MenuItem>

                          <MenuSplit />

                          <MenuChoice
                            active={r.status === "Verified"}
                            label="Verified"
                            onClick={() => {
                              setOpenMenu(null);
                              updateVerification(i, "Verified");
                            }}
                          />
                          <MenuChoice
                            active={r.status === "In Progress"}
                            label="In Progress"
                            onClick={() => {
                              setOpenMenu(null);
                              updateVerification(i, "In Progress");
                            }}
                          />
                          <MenuChoice
                            active={r.status === "Not Verified"}
                            label="Not Verified"
                            onClick={() => {
                              setOpenMenu(null);
                              updateVerification(i, "Not Verified");
                            }}
                          />

                          <MenuSplit />
                          <MenuDanger onClick={() => blockPortfolio(i)}>
                            Block Portfolio
                          </MenuDanger>
                        </div>
                      )}
                    </div>

                    <div className="col-span-2">
                      <div className="text-gray-600 mb-2">Size</div>
                      <div className="text-gray-800">{r.sizeKb} KB</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-4 text-right text-xs text-gray-500 select-none">
        Total: {Intl.NumberFormat().format(totalKb)} KB
      </div>
    </div>
  );
}

function MenuItem({ children, onClick }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-center px-3 py-2 text-gray-800 hover:bg-gray-50 text-xs font-medium"
      data-verify-menu
    >
      {children}
    </button>
  );
}

function MenuChoice({
  label,
  active,
  onClick,
}: {
  label: Exclude<RowStatus, "Blocked">;
  active?: boolean;
  onClick: () => void;
}) {
  const styleByLabel = (() => {
    if (label === "Verified") return { bg: "#CFEAFC", text: "#2C678A" };
    if (label === "In Progress") return { bg: "#E8F4FF", text: "#3C81C6" };
    return { bg: "#0D1E63", text: "#FFFFFF" };
  })();

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full px-2 py-1.5 flex items-center justify-center hover:bg-gray-50"
      data-verify-menu
    >
      <span
        className="rounded-full px-3 py-[3px] text-[11px] font-medium leading-none"
        style={{ background: styleByLabel.bg, color: styleByLabel.text }}
      >
        {label}
      </span>
    </button>
  );
}

function MenuDanger({ children, onClick }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-center px-3 py-2 text-[#FF512F] hover:bg-gray-50 text-xs font-medium"
      data-verify-menu
    >
      {children}
    </button>
  );
}
function MenuSplit() {
  return <div className="h-px bg-gray-100 my-1" data-verify-menu />;
}

/* ---------- SUBSCRIPTIONS ---------- */

function SubscriptionsBlock({ currentPlan }: any) {
  const stats = [
    { label: "Free Months Used", value: 1 },
    { label: "Total Referrals", value: 3 },
    { label: "Remaining Free Months", value: 2 },
  ];

  const billing = [
    {
      invoice: "Invoice #1023",
      date: "June 15, 2025",
      status: "Paid",
      amount: "$9.99",
      plan: currentPlan,
    },
    {
      invoice: "Invoice #1022",
      date: "May 15, 2025",
      status: "Paid",
      amount: "$9.99",
      plan: currentPlan,
    },
  ];

  return (
    <div className="text-sm text-gray-900">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
        {stats.map((s) => (
          <div key={s.label} className="pb-6 border-b border-gray-300 text-center">
            <p className="text-gray-500">{s.label}</p>
            <p className="text-2xl font-semibold mt-2">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-base mb-4">Billing History</h3>
        <div className="overflow-x-auto">
          {/* SCROLL CONTAINER tuned to ~2 rows visible */}
          <div
            className="h-[180px] overflow-y-scroll pr-2"
            style={{ scrollbarGutter: "stable" }}
          >
            <table className="min-w-full text-sm text-gray-800">
              <thead>
                <tr className="bg-[#F6F7F8] text-center">
                  <Th title="Invoice" />
                  <Th title="Billing Date" />
                  <Th title="Status" />
                  <Th title="Amount" />
                  <Th title="Plan" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-center">
                {billing.map((row, i) => (
                  <tr key={i}>
                    <td className="py-4">{row.invoice}</td>
                    <td className="py-4">{row.date}</td>
                    <td className="py-4">
                      <span
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1"
                        style={{
                          background: "#A4DCFD",
                          color: "#2C678A",
                          fontWeight: 500,
                        }}
                      >
                        <span className="h-2 w-2 rounded-full bg-[#2C678A]" />{" "}
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4">{row.amount}</td>
                    <td className="py-4">{row.plan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* END SCROLL CONTAINER */}
        </div>
      </div>
    </div>
  );
}

function Th({ title }: { title: string }) {
  return (
    <th className="py-3 border-b border-gray-200 text-center">
      <span
        style={{
          color: "#666",
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "32px",
        }}
      >
        {title}
      </span>
    </th>
  );
}

/* ---------- ID VERIFICATION (keep only the top horizontal scroll) ---------- */
function IdVerificationBlock({ items, onApprove, onReject }: any) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // reserved for future read-only position logic
  }, []);

  return (
    <div>
      <div className="text-gray-900 font-medium text-[18px]">Verification Status</div>
      <div className="mt-2 border-b border-gray-300"></div>
      <div className="mt-6">
        <div ref={scrollerRef} className="flex gap-8 overflow-x-auto">
          {items.map((it: any, idx: number) => (
            <div key={idx} className="space-y-4 shrink-0" style={{ width: "425px" }}>
              <div
                className="relative rounded-[18px] overflow-hidden bg-gray-200"
                style={{ width: "425px", height: "190px" }}
              >
                <div
                  className="w-full h-full bg-center bg-cover"
                  style={{ backgroundImage: `url(${it.img})` }}
                />
                <div className="absolute left-0 right-0 bottom-3 mx-auto w-[80%] bg-white rounded-full shadow flex justify-between px-4 py-1 text-sm">
                  <span>{it.label}</span>
                  <span className="text-gray-600 border border-gray-400 rounded-full px-3 py-0.5">
                    {it.files} File
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  className="px-5 py-2 rounded-full bg-[#D7ECFF] text-[#2B6CB0]"
                  onClick={onReject}
                >
                  Reject
                </button>
                <button
                  className="px-5 py-2 rounded-full bg-[#1F2C59] text-white"
                  onClick={onApprove}
                >
                  Approve
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* NOTE: extra bottom progress/slider removed */}
      </div>
    </div>
  );
}
