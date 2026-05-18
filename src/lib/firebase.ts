// Simple types to avoid importing from firebase SDKs initially
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

let appInstance: any = null;
let authInstance: any = null;
let dbInstance: any = null;

async function getFirebaseApp() {
  if (appInstance) return appInstance;
  const { initializeApp, getApps } = await import('firebase/app');
  
  const appletConfigs = import.meta.glob('/firebase-applet-config.json', { eager: true });
  const appletConfig: any = Object.values(appletConfigs)[0] || {};

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || appletConfig.apiKey || "AIzaSyCLgOFs38m8lPvv-zTj4RKDH9wfOMgw-54",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain || "gen-lang-client-0333581056.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || appletConfig.projectId || "gen-lang-client-0333581056",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket || "gen-lang-client-0333581056.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId || "438100810810",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || appletConfig.appId || "1:438100810810:web:947f34705c9e3ed1696903",
  };

  if (!firebaseConfig.apiKey) {
    console.warn("Firebase configuration is missing.");
    return null;
  }

  appInstance = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  return appInstance;
}

export async function getAuth() {
  if (authInstance) return authInstance;
  const app = await getFirebaseApp();
  if (!app) return null;
  const { getAuth: getBaseAuth } = await import('firebase/auth');
  authInstance = getBaseAuth(app);
  return authInstance;
}

export async function getFirestore() {
  if (dbInstance) return dbInstance;
  const app = await getFirebaseApp();
  if (!app) return null;
  const { getFirestore: getBaseFirestore } = await import('firebase/firestore');
  
  const appletConfigs = import.meta.glob('/firebase-applet-config.json', { eager: true });
  const appletConfig: any = Object.values(appletConfigs)[0] || {};
  const databaseId = import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || 
                    appletConfig.firestoreDatabaseId || 
                    "ai-studio-e4db4fb2-6664-4fcd-a9e9-a3b52797b5d1";

  dbInstance = getBaseFirestore(app, databaseId);
  return dbInstance;
}

export async function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const auth = await getAuth();
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
      tenantId: auth?.currentUser?.tenantId,
    },
    operationType,
    path
  }
  const errorMessage = JSON.stringify(errInfo);
  console.error('Firestore Error: ', errorMessage);
  throw new Error(errorMessage);
}

