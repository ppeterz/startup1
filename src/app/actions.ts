"use server";

import { z } from "zod";
import { generateCompetitorAnalysis } from "@/ai/flows/generate-competitor-analysis";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { initializeApp, getApps, getApp, applicationDefault } from "firebase-admin/app";

// Helper function to initialize Firebase Admin SDK.
function initializeFirebaseAdmin() {
  if (!getApps().length) {
    return initializeApp({ credential: applicationDefault() });
  }
  return getApp();
}

const adminApp = initializeFirebaseAdmin();
const firestoreAdmin = getFirestore(adminApp);


// Waitlist form schema
const WaitlistSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
});

export type WaitlistState = {
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
  };
  success: boolean;
};

// Server action for joining the waitlist
export async function joinWaitlist(
  prevState: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const validatedFields = WaitlistSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed.",
      success: false,
    };
  }
  
  const { name, email } = validatedFields.data;
  
  try {
    const waitlistCollection = firestoreAdmin.collection("waitlist_entries");
    
    // Generate a unique referral code
    const referralCode = Math.random().toString(36).substring(2, 10);
    
    // Add new entry to Firestore
    await waitlistCollection.add({
      name,
      email,
      referralCode,
      timestamp: FieldValue.serverTimestamp(),
    });

    return { message: "Thank you for joining the waitlist!", success: true };
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return { message: "An unexpected error occurred. Please try again.", success: false };
  }
}

// AI Analysis form schema
const AnalysisSchema = z.object({
  competitorUrl: z.string().url({ message: "Please enter a valid URL." }),
});

export type AnalysisState = {
  message?: string;
  errors?: {
    competitorUrl?: string[];
  };
  data?: {
    techStack: string;
    keyFeatures: string;
    actionableInsights: string;
  };
};

// Server action for running the AI analysis
export async function runAnalysis(
  prevState: AnalysisState,
  formData: FormData
): Promise<AnalysisState> {
  const validatedFields = AnalysisSchema.safeParse({
    competitorUrl: formData.get("competitorUrl"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed.",
    };
  }

  try {
    const result = await generateCompetitorAnalysis({
      competitorUrl: validatedFields.data.competitorUrl,
    });
    return { data: result };
  } catch (error) {
    console.error("Error running AI analysis:", error);
    return { message: "Failed to analyze the website. Please try another URL." };
  }
}
