import { Maximize2, Minimize2, Filter } from "lucide-react";
import TicketFilter from "./supportTicket/ticketFilter";
import { useState, useMemo } from "react";
import AllTicket from "./supportTicket/allTicket";
import { useRef, useEffect } from "react";
interface Ticket {
  id: string;
  name: string;
  submission: string;
  view: string;
  assigned: string;
  close: string;
  time: string;
  status: string;
}

interface Filters {
  userName: string;
  ticketID: string;
  status: string[];
}
interface TicketComment {
  author: string;
  time: string;
  message: string;
}
export default function SupportTicket() {
  const allTickets: Ticket[] = [
    {
      id: "#2222",
      name: "John Smith",
      submission: "1/2/24",
      view: "Read",
      assigned: "Sam",
      close: "2/2/24",
      time: "60 hr",
      status: "Closed",
    },
    {
      id: "#3333",
      name: "Jolie Hoskins",
      submission: "2/3/25",
      view: "Unread",
      assigned: "Sam",
      close: "-",
      time: "0 min",
      status: "Open",
    },
    {
      id: "#4444",
      name: "Pennington Joy",
      submission: "4/11/24",
      view: "Read",
      assigned: "Sam",
      close: "5/11/24",
      time: "60 hr",
      status: "New",
    },
    {
      id: "#5555",
      name: "Millie Marsden",
      submission: "5/10/25",
      view: "Unread",
      assigned: "Sam",
      close: "-",
      time: "0 min",
      status: "Open",
    },
    {
      id: "#6666",
      name: "John Smith",
      submission: "10/2/25",
      view: "Unread",
      assigned: "Sam",
      close: "-",
      time: "0 min",
      status: "Open",
    },
    {
      id: "#7777",
      name: "Sarah Connor",
      submission: "15/3/25",
      view: "Read",
      assigned: "John",
      close: "16/3/25",
      time: "24 hr",
      status: "Closed",
    },
    {
      id: "#8888",
      name: "Mike Johnson",
      submission: "20/4/25",
      view: "Unread",
      assigned: "Emma",
      close: "-",
      time: "0 min",
      status: "New",
    },
    {
      id: "#9999",
      name: "Lisa Anderson",
      submission: "25/5/25",
      view: "Read",
      assigned: "Sam",
      close: "26/5/25",
      time: "12 hr",
      status: "Closed",
    },
    {
      id: "#1010",
      name: "David Brown",
      submission: "1/6/25",
      view: "Unread",
      assigned: "John",
      close: "-",
      time: "0 min",
      status: "Open",
    },
    {
      id: "#1111",
      name: "Emma Wilson",
      submission: "5/7/25",
      view: "Read",
      assigned: "Emma",
      close: "7/7/25",
      time: "48 hr",
      status: "Closed",
    },
  ];

  const [activeTab, setActiveTab] = useState("all");
  const [isMaximized, setIsMaximized] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketStatus, setTicketStatus] = useState("");
  const [ticketAssigned, setTicketAssigned] = useState("");
  const [ticketComment, setTicketComment] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [ticketComments, setTicketComments] = useState<TicketComment[]>([
    {
      author: "Sam",
      time: "Nov 2 · 9:43 AM",
      message:
        "We’re currently looking into this issue and will update you once we have more information.",
    },
  ]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever ticketComments changes
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [ticketComments]);

  const handleAddComment = () => {
    if (ticketComment.trim() === "") return;
    const newComment = {
      author: "You",
      time: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
      message: ticketComment.trim(),
    };
    setTicketComments((prev) => [...prev, newComment]);
    setTicketComment("");
  };

  const [filters, setFilters] = useState<Filters>({
    userName: "",
    ticketID: "",
    status: [],
  });

  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    userName: "",
    ticketID: "",
    status: [],
  });

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setTicketAssigned(ticket.assigned);
    setTicketStatus(ticket.status);
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  const handleClearFilters = () => {
    const emptyFilters = { userName: "", ticketID: "", status: [] };
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
  };

  const filteredTickets = useMemo(() => {
    return allTickets.filter((ticket) => {
      const matchesUserName =
        !appliedFilters.userName ||
        ticket.name
          .toLowerCase()
          .includes(appliedFilters.userName.toLowerCase());

      const matchesTicketID =
        !appliedFilters.ticketID ||
        ticket.id.toLowerCase().includes(appliedFilters.ticketID.toLowerCase());

      const matchesStatus =
        appliedFilters.status.length === 0 ||
        appliedFilters.status.includes(ticket.status);

      return matchesUserName && matchesTicketID && matchesStatus;
    });
  }, [appliedFilters, allTickets]);

  return (
    <div className="min-h-screen ">
      <div className="bg-white shadow-md rounded-2xl p-2">
        <div className="p-4">
          <h2 className="font-semibold text-gray-800 mb-4">
            List of User Ticket
          </h2>
          <div className="flex gap-2 justify-between items-center mb-4">
            <div className="flex gap-8 text-sm">
              <button
                onClick={() => setActiveTab("all")}
                className={`pb-2 ${
                  activeTab === "all"
                    ? "text-[#2f5dd6] font-semibold border-b-2 border-[#2f5dd6]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All Ticket
              </button>
              <button
                onClick={() => setActiveTab("new")}
                className={`pb-2 ${
                  activeTab === "new"
                    ? "text-[#2f5dd6] font-semibold border-b-2 border-[#2f5dd6]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                New Ticket History
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`pb-2 ${
                  activeTab === "past"
                    ? "text-[#2f5dd6] font-semibold border-b-2 border-[#2f5dd6]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Past Ticket History
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="flex items-center gap-1 bg-black text-white text-xs px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-800 transition"
              >
                <span>{isMaximized ? "Minimize" : "Expand"}</span>
                {isMaximized ? (
                  <Minimize2 size={14} />
                ) : (
                  <Maximize2 size={14} />
                )}
              </button>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="bg-black text-white p-2 rounded-full shadow-sm hover:bg-gray-800 transition"
              >
                <Filter size={14} />
              </button>
            </div>
          </div>

          {isFilterOpen && (
            <TicketFilter
              filters={filters}
              onFilterChange={setFilters}
              onApply={handleApplyFilters}
              onClear={handleClearFilters}
            />
          )}

          <AllTicket
            isMaximized={isMaximized}
            onTicketSelect={handleTicketSelect}
            tickets={filteredTickets}
          />
        </div>
      </div>

      {!isMaximized && selectedTicket && (
        <>
          <div className="mt-6 bg-white shadow-md rounded-2xl p-2">
            <div className="p-6">
              <h2 className="font-semibold text-gray-800 mb-6 text-lg">
                Over View of Issue from User
              </h2>
              <div className="space-y-4 text-gray-500 text-md">
                <div>
                  <span className="font-medium mr-1">User Name:</span>
                  {selectedTicket.name}
                </div>
                <div>
                  <span className="font-medium mr-1">Ticket ID:</span>
                  {selectedTicket.id}
                </div>
                <div>
                  <span className="font-medium mr-1">Date Submission:</span>
                  {selectedTicket.submission}
                </div>
                <div>
                  <span className="font-medium">Close Date:</span>{" "}
                  {selectedTicket.close}
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <select
                    value={ticketStatus}
                    onChange={(e) => setTicketStatus(e.target.value)}
                    className="ml-2 border border-gray-300 rounded-md px-2 py-1"
                  >
                    <option>Open</option>
                    <option>Closed</option>
                    <option>New</option>
                  </select>
                </div>
                <div>
                  <span className="font-medium">File and Attachment:</span>
                </div>
                <div>
                  <span className="font-medium">Assigned To:</span>
                  <select
                    value={ticketAssigned}
                    onChange={(e) => setTicketAssigned(e.target.value)}
                    className="ml-2 border border-gray-300 rounded-md px-2 py-1"
                  >
                    <option>Sam</option>
                    <option>Dylan</option>
                    <option>Sheema</option>-
                  </select>
                </div>
                {/* old Comment Section's */}
                {/* <div className="flex items-start gap-4 w-full">
                  <label className="font-medium text-gray-700 mt-2">
                    Comment
                  </label>
                  <div className="flex-1 flex flex-col">
                    <textarea
                      value={ticketComment}
                      onChange={(e) => setTicketComment(e.target.value)}
                      className="w-full border border-gray-300 bg-gray-100 rounded-md px-3 py-2 text-sm outline-none resize-none h-20"
                    ></textarea>
                    <div className="flex justify-end mt-2">
                      <button className="px-4 py-1 border rounded-md text-sm hover:bg-gray-200 transition">
                        Send
                      </button>
                    </div>
                  </div>
                </div> */}
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-600 mb-3">Comments</h3>
                  <div
                    ref={containerRef}
                    id="comment-scroll"
                    className="max-h-38 overflow-y-auto pr-2 max-w-4xl space-y-4"
                  >
                    {ticketComments.map((comment, index) => (
                      <div key={index}>
                        <p className="flex  justify-between max-w-xl">
                          <p className="text-sm text-gray-600 font-semibold">
                            {comment.author}
                          </p>
                          <p className="text-sm text-gray-400 font-stretch-90%">
                            {comment.time}
                          </p>
                        </p>
                        <div className="bg-gray-100 text-gray-700 rounded-lg px-4 py-2 mt-1 inline-block max-w-xl">
                          {comment.message}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Box */}
                  <div className="flex items-start gap-4 max-w-4xl mt-4">
                    <div className="flex-1 flex flex-col">
                      <textarea
                        value={ticketComment}
                        onChange={(e) => setTicketComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full  border-gray-100 bg-gray-50 rounded-md px-3 py-2 text-sm outline-none resize-none h-16 focus:ring-1 focus:ring-[#2f5dd6]"
                      ></textarea>
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={handleAddComment}
                          className="px-4 py-1 border border-gray-400 rounded-md text-sm hover:bg-gray-200 transition"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-16 justify-end">
                <button className="bg-[#1A4BB5] hover:bg-[#153d91] text-white px-6 py-2 rounded-lg shadow-sm font-medium transition">
                  Solve
                </button>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="bg-[#EAF2FA] hover:bg-[#d6e6f8] text-[#1A4BB5] px-6 py-2 rounded-lg shadow-sm font-medium transition"
                >
                  Close
                </button>
                <button className="border border-gray-400 hover:bg-gray-100 px-6 py-2 rounded-lg shadow-sm text-gray-700 font-medium transition">
                  Read Next Comment
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 text-right text-[#2E6FF2] text-sm font-medium">
            <a href="#" className="hover:underline">
              Next Support Ticket Page →
            </a>
          </div>
        </>
      )}
    </div>
  );
}
