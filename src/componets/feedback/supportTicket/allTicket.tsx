import { useState } from "react";

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

export default function AllTicket({
  isMaximized,
  onTicketSelect,
  tickets,
}: {
  isMaximized: boolean;
  onTicketSelect: (ticket: Ticket) => void;
  tickets: Ticket[];
}) {
  const displayTickets = isMaximized ? tickets : tickets.slice(0, 5);

  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const onhandleClick = (ticket: Ticket) => {
    setSelectedTicket(ticket.id);
    onTicketSelect(ticket);
  };

  return (
    <div className="overflow-x-auto mt-4 rounded-xl border border-gray-100 shadow-sm">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-[#F9FAFB] text-gray-600 text-[13px]">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Ticket ID</th>
            <th className="px-4 py-3 text-left font-medium">User Name</th>
            <th className="px-4 py-3 text-left font-medium">Date Submission</th>
            <th className="px-4 py-3 text-left font-medium">Issue</th>
            <th className="px-4 py-3 text-left font-medium">Assigned to</th>
            <th className="px-4 py-3 text-left font-medium">Close Date</th>
            <th className="px-4 py-3 text-left font-medium">Time Spend</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="text-[13px]">
          {displayTickets.length > 0 ? (
            displayTickets.map((ticket, index) => (
              <tr
                key={ticket.id}
                onClick={() => onhandleClick(ticket)}
                className={`  hover:bg-gray-200 transition-colors duration-150 cursor-pointer ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } ${
                  selectedTicket === ticket.id
                    ? "  border-l-4 border-blue-400 "
                    : ""
                }`}
              >
                <td className="px-4 py-3">{ticket.id}</td>
                <td className="px-4 py-3">{ticket.name}</td>
                <td className="px-4 py-3">{ticket.submission}</td>
                <td className="px-4 py-3">
                  {ticket.view === "Read" ? (
                    <span className="font-medium">Read</span>
                  ) : (
                    <span className="font-semibold underline">Unread</span>
                  )}
                </td>
                <td className="px-4 py-3">{ticket.assigned}</td>
                <td className="px-4 py-3">{ticket.close}</td>
                <td className="px-4 py-3">{ticket.time}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      ticket.status === "Closed"
                        ? "bg-[#D1EFFE] text-[#62B1F4]"
                        : "bg-[#D4EDFB] text-[#2C678A]"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                No tickets found matching your filters
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
