interface Filters {
  userName: string;
  platform: string[];
  comment: string[];
  status: string[];
}
export default function FeedbackFilter({
  filters,
  onFilterChange,
  onApply,
  onClear,
}: {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onApply: () => void;
  onClear: () => void;
}) {
  const handlePlatformChange = (platform: string, checked: boolean) => {
    const newPlatform = checked
      ? [...filters.platform, platform]
      : filters.platform.filter((p) => p !== platform);
    onFilterChange({ ...filters, platform: newPlatform });
  };

  const handleCommentChange = (comment: string, checked: boolean) => {
    const newComment = checked
      ? [...filters.comment, comment]
      : filters.comment.filter((c) => c !== comment);
    onFilterChange({ ...filters, comment: newComment });
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked
      ? [...filters.status, status]
      : filters.status.filter((s) => s !== status);
    onFilterChange({ ...filters, status: newStatus });
  };

  return (
    <div className="px-4 pb-4 border-b border-gray-200">
      <div className="font-semibold text-gray-800 mb-4">Filter</div>
      <div className="flex justify-between items-end">
        <div className="flex gap-6">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Search By Username
            </p>
            <input
              type="text"
              placeholder="Enter here"
              value={filters.userName}
              onChange={(e) =>
                onFilterChange({ ...filters, userName: e.target.value })
              }
              className="border border-gray-300 px-3 py-2 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Search By Platform
            </p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.platform.includes("Web")}
                  onChange={(e) =>
                    handlePlatformChange("Web", e.target.checked)
                  }
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                />
                <span className="text-sm text-gray-700">Web</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.platform.includes("App")}
                  onChange={(e) =>
                    handlePlatformChange("App", e.target.checked)
                  }
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                />
                <span className="text-sm text-gray-700">App</span>
              </label>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Search By Comment
            </p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.comment.includes("Read")}
                  onChange={(e) =>
                    handleCommentChange("Read", e.target.checked)
                  }
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                />
                <span className="text-sm text-gray-700">Read</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.comment.includes("Unread")}
                  onChange={(e) =>
                    handleCommentChange("Unread", e.target.checked)
                  }
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                />
                <span className="text-sm text-gray-700">Unread</span>
              </label>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Search By Status
            </p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.status.includes("Solved")}
                  onChange={(e) =>
                    handleStatusChange("Solved", e.target.checked)
                  }
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                />
                <span className="text-sm text-gray-700">Solved</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.status.includes("Unsolved")}
                  onChange={(e) =>
                    handleStatusChange("Unsolved", e.target.checked)
                  }
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                />
                <span className="text-sm text-gray-700">Unsolved</span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClear}
            className="text-sm text-gray-600 hover:text-gray-800 underline font-medium transition"
          >
            Clear All
          </button>
          <button
            onClick={onApply}
            className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
