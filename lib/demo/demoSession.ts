export const DEMO_STORAGE_KEY = "tcd_demo_user";

export const startDemoSession = () => {
  localStorage.setItem(
    DEMO_STORAGE_KEY,
    JSON.stringify({
      startedAt: Date.now(),
      completed: false,
    })
  );
};

export const getDemoSession = () => {
  const session = localStorage.getItem(DEMO_STORAGE_KEY);

  if (!session) return null;

  return JSON.parse(session);
};

export const completeDemoSession = () => {
  const session = getDemoSession();

  if (!session) return;

  localStorage.setItem(
    DEMO_STORAGE_KEY,
    JSON.stringify({
      ...session,
      completed: true,
    })
  );
};

export const clearDemoSession = () => {
  localStorage.removeItem(DEMO_STORAGE_KEY);
};