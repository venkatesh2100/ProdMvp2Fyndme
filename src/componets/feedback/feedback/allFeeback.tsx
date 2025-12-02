import { useState } from "react";
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
export default function AllFeedbacks({
  isMaximized,
  onTicketSelect,
  tickets,
}: {
  isMaximized: boolean;
  onTicketSelect: (ticket: Feedback) => void;
  tickets: Feedback[];
}) {
  const displayFeedbacks = isMaximized ? tickets : tickets.slice(0, 5);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  const handelClick = (ticket: Feedback) => {
    setSelectedTicket(ticket.id);
    onTicketSelect(ticket);
  };
  return (
    <div className="overflow-x-auto mt-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="overflow-x-auto mt-2 p-2">
        <table className="w-full text-sm">
          <thead className="bg-[#F9FAFB] text-gray-600">
            <tr>
              <th className="p-3 text-left font-medium">UserName</th>
              <th className="p-3 text-left font-medium">Platform</th>
              <th className="p-3 text-left font-medium">Comment</th>
              <th className="p-3 text-left font-medium">Date Submission</th>
              <th className="p-3 text-left font-medium">Solved</th>
              <th className="p-3 text-left font-medium">Close Date</th>
            </tr>
          </thead>
          <tbody className="">
            {displayFeedbacks.length > 0 ? (
              displayFeedbacks.map((feedback, index) => (
                <tr
                  onClick={() => handelClick(feedback)}
                  key={feedback.id}
                  className={`hover:bg-gray-200  duration-150 transition-colors cursor-pointer ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }
                    ${
                      selectedTicket === feedback.id
                        ? "border-l-4 border-blue-400"
                        : ""
                    }
                    `}
                >
                  <td className="p-3 flex items-center gap-2">
                    <img
                      src={feedback.avatar}
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                    {feedback.name}
                  </td>
                  <td className="p-3">{feedback.platform}</td>
                  <td
                    className={`p-3 text-[#2E6FF2] cursor-pointer ${
                      !feedback.isRead ? "font-semibold" : ""
                    }`}
                  >
                    {feedback.isRead ? "Read" : "Unread"}
                  </td>
                  <td className="p-3">{feedback.dateSubmission}</td>
                  <td className="p-3">{feedback.solved ? "✔" : ""}</td>
                  <td className="p-3">{feedback.closeDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No tickets found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
