import { getFirestore } from './firebase';

export async function logPageView(categoryId: string, toolId: string, path: string) {
  try {
    // 1. Local Storage tracking
    const localStats = JSON.parse(localStorage.getItem('toolStats') || '{}');
    localStats[path] = (localStats[path] || 0) + 1;
    localStorage.setItem('toolStats', JSON.stringify(localStats));

    // 2. Firestore tracking
    const db = await getFirestore();
    if (db) {
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      
      console.log(`[Analytics] Logging view for ${toolId} in ${categoryId}`);
      await addDoc(collection(db, 'pageviews'), {
        toolId,
        categoryId,
        path,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent
      });
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
    console.warn('[Analytics] Failed to log pageview:', error);
  }
}
