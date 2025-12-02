import { Minimize2, Maximize2, Filter } from "lucide-react";
import { useState, useMemo } from "react";
import AllFeedbacks from "./feedback/allFeeback";
import FeedbackFilter from "./feedback/feebackFilter";

interface Feedback {
  id: number;
  name: string;
  avatar: string;
  platform: string;
  comment: string;
  isRead: boolean;
  dateSubmission: string;
  solved: boolean;
  closeDate: string;
}

interface Filters {
  userName: string;
  platform: string[];
  comment: string[];
  status: string[];
}
export default function UserFeedback() {
  const feedbacks: Feedback[] = [
    {
      id: 1,
      name: "John Smith",
      avatar: "https://i.pravatar.cc/40?img=1",
      platform: "Web",
      comment: "The loading time is too slow on the dashboard page.",
      isRead: true,
      dateSubmission: "1/2/24",
      solved: true,
      closeDate: "2/2/24",
    },
    {
      id: 2,
      name: "Jolie Hoskins",
      avatar: "https://i.pravatar.cc/40?img=2",
      platform: "Web",
      comment: "Unable to upload files larger than 10MB.",
      isRead: false,
      dateSubmission: "2/3/25",
      solved: false,
      closeDate: "",
    },
    {
      id: 3,
      name: "Pennington Joy",
      avatar: "https://i.pravatar.cc/40?img=3",
      platform: "App",
      comment: "App crashes when I try to access the profile settings.",
      isRead: false,
      dateSubmission: "4/11/24",
      solved: true,
      closeDate: "5/11/24",
    },
    {
      id: 4,
      name: "Millie Marsden",
      avatar: "https://i.pravatar.cc/40?img=4",
      platform: "Web",
      comment: "The search function is not returning accurate results.",
      isRead: false,
      dateSubmission: "5/10/25",
      solved: false,
      closeDate: "",
    },
    {
      id: 5,
      name: "John Smith",
      avatar: "https://i.pravatar.cc/40?img=5",
      platform: "App",
      comment: "Push notifications are not working properly.",
      isRead: true,
      dateSubmission: "10/2/25",
      solved: false,
      closeDate: "",
    },
    {
      id: 6,
      name: "Sarah Connor",
      avatar: "https://i.pravatar.cc/40?img=6",
      platform: "Web",
      comment: "Great update! Love the new UI design.",
      isRead: false,
      dateSubmission: "15/3/25",
      solved: true,
      closeDate: "16/3/25",
    },
    {
      id: 7,
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/40?img=7",
      platform: "App",
      comment: "Cannot log in with Google authentication.",
      isRead: true,
      dateSubmission: "20/4/25",
      solved: false,
      closeDate: "",
    },
    {
      id: 8,
      name: "Lisa Anderson",
      avatar: "https://i.pravatar.cc/40?img=8",
      platform: "Web",
      comment: "Billing information page shows error 404.",
      isRead: false,
      dateSubmission: "25/5/25",
      solved: true,
      closeDate: "26/5/25",
    },
    {
      id: 9,
      name: "David Brown",
      avatar: "https://i.pravatar.cc/40?img=9",
      platform: "App",
      comment: "Dark mode is not saving my preference.",
      isRead: true,
      dateSubmission: "1/6/25",
      solved: false,
      closeDate: "",
    },
    {
      id: 10,
      name: "Emma Wilson",
      avatar: "https://i.pravatar.cc/40?img=10",
      platform: "Web",
      comment: "Export feature is working perfectly now. Thanks!",
      isRead: false,
      dateSubmission: "5/7/25",
      solved: true,
      closeDate: "7/7/25",
    },
  ];

  const [isMaximized, setIsMaximized] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Feedback | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    userName: "",
    platform: [],
    comment: [],
    status: [],
  });

  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    userName: "",
    platform: [],
    comment: [],
    status: [],
  });

  const handleTicketSelect = (ticket: Feedback) => {
    setSelectedTicket(ticket);
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  const handleClearFilters = () => {
    const emptyFilters: Filters = {
      userName: "",
      platform: [],
      comment: [],
      status: [],
    };
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
  };

  const handleSolve = () => {
    if (selectedTicket) {
      alert(`Marking ticket #${selectedTicket.id} as solved`);
    }
  };

  const handleClose = () => {
    if (selectedTicket) {
      alert(`Closing ticket #${selectedTicket.id}`);
    }
  };

  const handleReadNext = () => {
    const currentIndex = filteredTickets.findIndex(
      (t) => t.id === selectedTicket?.id
    );
    if (currentIndex < filteredTickets.length - 1) {
      setSelectedTicket(filteredTickets[currentIndex + 1]);
    } else if (filteredTickets.length > 0) {
      setSelectedTicket(filteredTickets[0]);
    }
  };

  const filteredTickets = useMemo(() => {
    return feedbacks.filter((ticket) => {
      const matchesUserName =
        appliedFilters.userName === "" ||
        ticket.name
          .toLowerCase()
          .includes(appliedFilters.userName.toLowerCase());

      const matchesPlatform =
        appliedFilters.platform.length === 0 ||
        appliedFilters.platform.includes(ticket.platform);

      const matchesComment =
        appliedFilters.comment.length === 0 ||
        (appliedFilters.comment.includes("Read") && ticket.isRead) ||
        (appliedFilters.comment.includes("Unread") && !ticket.isRead);

      const matchesStatus =
        appliedFilters.status.length === 0 ||
        (appliedFilters.status.includes("Solved") && ticket.solved) ||
        (appliedFilters.status.includes("Unsolved") && !ticket.solved);

      return (
        matchesUserName && matchesPlatform && matchesComment && matchesStatus
      );
    });
  }, [appliedFilters]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-2xl overflow-hidden p-2">
        <div className="p-4 flex justify-between items-center">
          <h2 className="font-semibold text-gray-800">List of User Ticket</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="flex items-center gap-1 bg-black text-white text-xs px-3 py-1 rounded-full shadow-sm hover:bg-gray-800 transition"
            >
              <span>{isMaximized ? "Minimize" : "Expand"}</span>
              {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
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
          <FeedbackFilter
            filters={filters}
            onFilterChange={setFilters}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />
        )}
        <AllFeedbacks
          isMaximized={isMaximized}
          onTicketSelect={handleTicketSelect}
          tickets={filteredTickets}
        />
      </div>

      {!isMaximized && selectedTicket &&(
        <>
          <div className="mt-6 bg-white shadow-md rounded-2xl p-2">
            <div className="p-6">
              <h2 className="font-semibold text-gray-800 mb-6 text-lg">
                Overview of Comments from User
              </h2>

              {selectedTicket ? (
                <div className="space-y-4 text-gray-700 text-md">
                  <div>
                    <span className="font-medium">Name:</span>{" "}
                    <span className="text-gray-600">{selectedTicket.name}</span>
                  </div>
                  <div>
                    <span className="font-medium">Platform:</span>{" "}
                    <span className="text-gray-600">
                      {selectedTicket.platform}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Date Submission:</span>{" "}
                    <span className="text-gray-600">
                      {selectedTicket.dateSubmission}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Close Date:</span>{" "}
                    {selectedTicket.closeDate ? (
                      <span className="text-gray-600">
                        {selectedTicket.closeDate}
                      </span>
                    ) : (
                      <input
                        type="date"
                        value={
                          selectedTicket.closeDate
                            ? new Date(
                                selectedTicket.closeDate
                                  .split("/")
                                  .reverse()
                                  .join("-")
                              )
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          setSelectedTicket({
                            ...selectedTicket,
                            closeDate: e.target.value
                              ? new Date(e.target.value).toLocaleDateString(
                                  "en-GB"
                                )
                              : "",
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1A4BB5]"
                      />
                    )}
                  </div>

                  <div>
                    <span className="font-medium">Status:</span>{" "}
                    <select
                      value={selectedTicket.solved ? "Solved" : "Unsolved"}
                      onChange={(e) =>
                        setSelectedTicket({
                          ...selectedTicket,
                          solved: e.target.value === "Solved",
                        })
                      }
                      className="ml-2 border border-gray-300 rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1A4BB5]"
                    >
                      <option value="Solved">Solved</option>
                      <option value="Unsolved">Unsolved</option>
                    </select>
                  </div>

                  <div>
                    <span className="font-medium">Read Status:</span>{" "}
                    <select
                      value={selectedTicket.isRead ? "Read" : "Unread"}
                      onChange={(e) =>
                        setSelectedTicket({
                          ...selectedTicket,
                          isRead: e.target.value === "Read",
                        })
                      }
                      className="ml-2 border border-gray-300 rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1A4BB5]"
                    >
                      <option value="Read">Read</option>
                      <option value="Unread">Unread</option>
                    </select>
                  </div>

                  {/* Comment */}
                  <div>
                    <div className="font-medium mb-2">Comment:</div>
                    <div className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {selectedTicket.comment}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-gray-400 text-md text-center py-12">
                  <div>Select a ticket to view details</div>
                </div>
              )}

              <div className="flex gap-4 mt-16 justify-end">
                <button
                  onClick={handleSolve}
                  disabled={!selectedTicket}
                  className="bg-[#1A4BB5] hover:bg-[#153d91] text-white px-6 py-2 rounded-lg shadow-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Solve
                </button>
                <button
                  onClick={handleClose}
                  disabled={!selectedTicket}
                  className="bg-[#EAF2FA] hover:bg-[#d6e6f8] text-[#1A4BB5] px-6 py-2 rounded-lg shadow-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Close
                </button>
                <button
                  onClick={handleReadNext}
                  disabled={!selectedTicket || filteredTickets.length === 0}
                  className="border border-gray-400 hover:bg-gray-100 px-6 py-2 rounded-lg shadow-sm text-gray-700 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
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
