/* Apply a saved preference before the stylesheet is painted. */
try {
  const preference = localStorage.getItem('portfolio-theme');
  if (preference === 'light' || preference === 'dark') {
    document.documentElement.dataset.theme = preference;
  }
} catch (_) {
  // The default light theme works when browser storage is unavailable.
}
