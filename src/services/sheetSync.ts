import { DatabaseState, SiteSettings, VolunteerItem, ContactMessage, DonationRecord } from '../types';
import { INITIAL_DATABASE_STATE } from '../data/defaultData';
import { GOOGLE_APPS_SCRIPT_CODE as APPS_SCRIPT_SOURCE } from '../utils/googleAppsScriptCode';

const LOCAL_STORAGE_KEY = 'islamic_foundation_db_v1';

/**
 * Load data from LocalStorage or initialize with default data
 */
export function getLocalDatabase(): DatabaseState {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DATABASE_STATE));
      return INITIAL_DATABASE_STATE;
    }
    const parsed = JSON.parse(raw);
    const mergedSettings = { ...INITIAL_DATABASE_STATE.settings, ...parsed.settings };
    
    // Ensure adminPassword is a string
    if (mergedSettings.adminPassword !== undefined && mergedSettings.adminPassword !== null) {
      mergedSettings.adminPassword = String(mergedSettings.adminPassword);
    }

    // Ensure default deployed script URL is used if empty or whitespace
    if (!mergedSettings.scriptUrl || !String(mergedSettings.scriptUrl).trim()) {
      mergedSettings.scriptUrl = INITIAL_DATABASE_STATE.settings.scriptUrl;
    }
    if (!mergedSettings.googleSheetUrl || !String(mergedSettings.googleSheetUrl).trim()) {
      mergedSettings.googleSheetUrl = INITIAL_DATABASE_STATE.settings.googleSheetUrl || INITIAL_DATABASE_STATE.settings.scriptUrl;
    }

    return {
      ...INITIAL_DATABASE_STATE,
      ...parsed,
      settings: mergedSettings
    };
  } catch (err) {
    console.error('Failed to load local DB:', err);
    return INITIAL_DATABASE_STATE;
  }
}

/**
 * Save data to LocalStorage
 */
export function saveLocalDatabase(db: DatabaseState): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db));
  } catch (err) {
    console.error('Failed to save to local storage:', err);
  }
}

/**
 * Fetch all data from Google Apps Script Web App URL in a single API call
 */
export async function syncFromGoogleSheets(scriptUrl: string): Promise<{ success: boolean; data?: DatabaseState; error?: string }> {
  if (!scriptUrl || !scriptUrl.trim()) {
    return { success: false, error: 'গুগল অ্যাপস স্ক্রিপ্ট Web App URL দেওয়া হয়নি।' };
  }

  const cleanUrl = scriptUrl.trim();

  try {
    const response = await fetch(cleanUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    const resJson = await response.json();

    if (resJson && resJson.status === 'success' && resJson.data) {
      const fetched = resJson.data;
      const current = getLocalDatabase();
      const fetchedSettings = fetched.settings || {};
      if (fetchedSettings.adminPassword !== undefined && fetchedSettings.adminPassword !== null) {
        fetchedSettings.adminPassword = String(fetchedSettings.adminPassword);
      }
      
      const mergedDb: DatabaseState = {
        ...current,
        settings: {
          ...current.settings,
          ...fetchedSettings,
          scriptUrl: cleanUrl // retain existing scriptUrl
        },
        slides: Array.isArray(fetched.slides) && fetched.slides.length > 0 ? fetched.slides : current.slides,
        notices: Array.isArray(fetched.notices) && fetched.notices.length > 0 ? fetched.notices : current.notices,
        activities: Array.isArray(fetched.activities) && fetched.activities.length > 0 ? fetched.activities : current.activities,
        blogs: Array.isArray(fetched.blogs) && fetched.blogs.length > 0 ? fetched.blogs : current.blogs,
        gallery: Array.isArray(fetched.gallery) && fetched.gallery.length > 0 ? fetched.gallery : current.gallery,
        members: Array.isArray(fetched.members) && fetched.members.length > 0 ? fetched.members : current.members,
        volunteers: Array.isArray(fetched.volunteers) && fetched.volunteers.length > 0 ? fetched.volunteers : current.volunteers,
        messages: Array.isArray(fetched.messages) && fetched.messages.length > 0 ? fetched.messages : current.messages,
        donations: Array.isArray(fetched.donations) && fetched.donations.length > 0 ? fetched.donations : current.donations,
        customFields: Array.isArray(fetched.customFields) && fetched.customFields.length > 0 ? fetched.customFields : current.customFields,
        botQnA: Array.isArray(fetched.botQnA) && fetched.botQnA.length > 0 ? fetched.botQnA : current.botQnA,
        socialLinks: Array.isArray(fetched.socialLinks) && fetched.socialLinks.length > 0 ? fetched.socialLinks : current.socialLinks,
        missionQuotes: Array.isArray(fetched.missionQuotes) && fetched.missionQuotes.length > 0 ? fetched.missionQuotes : current.missionQuotes,
        lastSyncedAt: new Date().toISOString()
      };

      saveLocalDatabase(mergedDb);
      return { success: true, data: mergedDb };
    } else {
      throw new Error(resJson?.message || 'গুগল শিট থেকে সঠিক ফরমেটে ডাটা আসেনি।');
    }
  } catch (err: any) {
    console.error('Google Sheets Sync Error:', err);
    return {
      success: false,
      error: err.message || 'গুগল শিটের সাথে সংযোগ স্থাপন করা যায়নি।'
    };
  }
}

/**
 * Send payload to Google Apps Script Web App
 */
export async function pushToGoogleSheets(scriptUrl: string, action: string, payload: any): Promise<{ success: boolean; message?: string }> {
  if (!scriptUrl || !scriptUrl.trim()) {
    // If no script URL, local save is sufficient
    return { success: true, message: 'লোকাল ডেটাবেজে সফলভাবে সংরক্ষিত হয়েছে।' };
  }

  try {
    const response = await fetch(scriptUrl.trim(), {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Google Apps Script handles text/plain CORS smoothly
      },
      body: JSON.stringify({
        action,
        payload
      })
    });

    const resJson = await response.json().catch(() => null);
    if (resJson && resJson.status === 'success') {
      return { success: true, message: resJson.message || 'গুগল শিটে সফলভাবে সংরক্ষিত হয়েছে।' };
    }
    return { success: true, message: 'ডাটা পাঠানো হয়েছে।' };
  } catch (err: any) {
    console.warn('Push to Google Sheets fallback (saved locally):', err);
    return { success: true, message: 'লোকাল স্টোরেজে সংরক্ষিত হয়েছে (গুগল শিট সংযোগ চেক করুন)।' };
  }
}

export const GOOGLE_APPS_SCRIPT_CODE = APPS_SCRIPT_SOURCE;
