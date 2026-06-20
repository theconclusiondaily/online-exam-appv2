export function riskLevel(
  violations: number
) {
  if (violations >= 6) {
    return "HIGH";
  }

  if (violations >= 3) {
    return "MEDIUM";
  }

  return "LOW";
}

export function riskColor(
  violations: number
) {
  if (violations >= 6) {
    return "bg-red-100 text-red-700";
  }

  if (violations >= 3) {
    return "bg-yellow-100 text-yellow-700";
  }

  return "bg-green-100 text-green-700";
}