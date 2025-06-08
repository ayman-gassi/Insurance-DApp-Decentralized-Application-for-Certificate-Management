const StatusMessage = ({ status }) => {
  if (!status) return null;

  let bg = "bg-blue-100 text-blue-800";
  let icon = "ℹ️";
  if (status.includes("✅")) {
    bg = "bg-green-100 text-green-800";
    icon = "✅";
  } else if (status.includes("❌")) {
    bg = "bg-red-100 text-red-800";
    icon = "❌";
  } else if (status.includes("📤") || status.includes("⛓️")) {
    bg = "bg-yellow-100 text-yellow-800";
    icon = "⏳";
  }

  return (
    <div className={`mt-6 p-4 rounded-lg text-center font-medium ${bg}`}>
      <div className="flex flex-col items-center gap-2">
        <span className="text-2xl">{icon}</span>
        <div
          className="whitespace-pre-line text-xs"
          dangerouslySetInnerHTML={{ __html: status }}
        />
      </div>
    </div>
  );
};
export default StatusMessage;