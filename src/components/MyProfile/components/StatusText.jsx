export const statusText = (status) => {
  switch (status) {
    case 0: return "Pending";
    case 1: return "Processing";
    case 2: return "Completed";
    case 3: return "Cancelled";
    default: return "Unknown";
  }
};