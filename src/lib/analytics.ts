import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export async function logPageView(categoryId: string, toolId: string, path: string) {
  try {
    // 1. Local Storage tracking
    const localStats = JSON.parse(localStorage.getItem('toolStats') || '{}');
    localStats[path] = (localStats[path] || 0) + 1;
    localStorage.setItem('toolStats', JSON.stringify(localStats));

    // 2. Firestore tracking
    if (db) {
      console.log(`[Analytics] Logging view for ${toolId} in ${categoryId}`);
      await addDoc(collection(db, 'pageviews'), {
        toolId,
        categoryId,
        path,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent
      });
    } else {
      console.warn('[Analytics] Firestore DB not initialized, skipping remote log');
    }

    // 3. Google Analytics Event tracking
    if (window.gtag) {
      window.gtag('event', 'view_tool', {
        tool_id: toolId,
        category_id: categoryId,
        page_path: path
      });
    }
  } catch (error) {
    console.error('[Analytics] Failed to log pageview:', error);
  }
}
