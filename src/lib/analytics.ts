import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export async function logPageView(categoryId: string, toolId: string, path: string) {
  try {
    // 1. Local Storage tracking (as requested for MVP/local logic)
    const localStats = JSON.parse(localStorage.getItem('toolStats') || '{}');
    localStats[path] = (localStats[path] || 0) + 1;
    localStorage.setItem('toolStats', JSON.stringify(localStats));

    // 2. Firestore tracking (for the actual Admin Dashboard aggregation)
    if (db) {
      await addDoc(collection(db, 'pageviews'), {
        toolId,
        categoryId,
        path,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent
      });
    }
  } catch (error) {
    console.error('Failed to log pageview:', error);
  }
}
