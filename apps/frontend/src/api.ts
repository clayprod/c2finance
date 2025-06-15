export async function fetchSummary() {
  const res = await fetch('/summary');
  return res.json();
}

export async function fetchAdvisorMessages() {
  const res = await fetch('/advisor/messages');
  return res.json();
}
