/**
 * Calculate distance between two coordinates in kilometers using Haversine formula
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return Math.round(d * 10) / 10; // 1 decimal place
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Estimate travel time in minutes based on distance (assumes motor bike speed in city ~25-30 km/h)
 */
export function estimateTravelTime(distanceKm: number): { motorMinutes: number; walkMinutes: number } {
  const motorMinutes = Math.max(2, Math.round((distanceKm / 25) * 60 + 2)); // 2 min buffer
  const walkMinutes = Math.max(3, Math.round((distanceKm / 4.5) * 60));
  return { motorMinutes, walkMinutes };
}

/**
 * Generate direct Google Maps navigation URL
 */
export function getGoogleMapsRouteUrl(
  userLat?: number,
  userLng?: number,
  destLat?: number,
  destLng?: number,
  destName?: string
): string {
  if (userLat && userLng && destLat && destLng) {
    return `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destLat},${destLng}&travelmode=driving`;
  }
  if (destLat && destLng) {
    return `https://www.google.com/maps/search/?api=1&query=${destLat},${destLng}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destName || 'Depot Air Minum')}`;
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}
